---
title: GORM 数据访问
description: Go ORM 框架 GORM 的使用与最佳实践。
---

## 基本使用

```go
import (
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

type User struct {
    gorm.Model
    Name  string
    Email string `gorm:"uniqueIndex"`
    Age   int
}

func main() {
    db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
    if err != nil {
        panic("数据库连接失败")
    }

    db.AutoMigrate(&User{})
}
```

## CRUD 操作

```go
// 创建
db.Create(&User{Name: "Alice", Email: "alice@test.com", Age: 25})

// 查询
var user User
db.First(&user, 1)                          // 按主键
db.First(&user, "email = ?", "alice@test.com") // 条件查询

var users []User
db.Where("age > ?", 20).Find(&users)        // 条件筛选
db.Limit(10).Offset(0).Find(&users)          // 分页

// 更新
db.Model(&user).Update("Age", 26)
db.Model(&user).Updates(User{Age: 26, Name: "Alice W."})

// 删除
db.Delete(&user)
```

## 关联关系

```go
type Order struct {
    gorm.Model
    UserID uint
    Item   string
    Price  float64
}

// 预加载
db.Preload("Orders").Find(&users)

// Join 查询
db.Joins("JOIN orders ON orders.user_id = users.id").
    Where("orders.price > ?", 100).
    Find(&users)
```

## 事务

```go
err := db.Transaction(func(tx *gorm.DB) error {
    if err := tx.Create(&User{Name: "Bob"}).Error; err != nil {
        return err
    }
    if err := tx.Create(&Order{Item: "Book", Price: 29.9}).Error; err != nil {
        return err
    }
    return nil
})
```
