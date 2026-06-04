---
title: Go 基础语法
description: Go 语言的基本语法、数据类型与流程控制。
---

## 变量声明

```go
// 显式声明
var name string = "Go"

// 类型推断
var age = 15

// 短变量声明（函数内）
lang := "Go"

// 多变量声明
x, y := 1, 2

// 常量
const Pi = 3.14159
```

## 基本数据类型

```go
// 整数
var i int = 42
var i64 int64 = 1e9

// 浮点数
var f float64 = 3.14

// 字符串
s := "Hello, Go"
raw := `多行
字符串`

// 布尔
b := true

// 数组与切片
arr := [3]int{1, 2, 3}    // 固定长度数组
slice := []int{1, 2, 3}   // 动态切片
slice = append(slice, 4)
```

## 流程控制

```go
// if-else
if age >= 18 {
    fmt.Println("成年")
} else {
    fmt.Println("未成年")
}

// if 带初始化语句
if err := doSomething(); err != nil {
    log.Fatal(err)
}

// for 循环（Go 只有 for）
for i := 0; i < 10; i++ {
    fmt.Println(i)
}

// while 风格
for x > 0 {
    x--
}

// range 迭代
for i, v := range slice {
    fmt.Printf("索引: %d, 值: %d\n", i, v)
}

// switch（自动 break）
switch os := runtime.GOOS; os {
case "darwin":
    fmt.Println("macOS")
case "linux":
    fmt.Println("Linux")
default:
    fmt.Println(os)
}
```

## 结构体与方法

```go
type User struct {
    Name string
    Age  int
}

// 方法
func (u User) Greet() string {
    return fmt.Sprintf("Hi, I'm %s", u.Name)
}

// 指针接收者（可修改原对象）
func (u *User) Birthday() {
    u.Age++
}

user := User{Name: "Alice", Age: 30}
fmt.Println(user.Greet())
user.Birthday()
```

## 接口

```go
type Writer interface {
    Write([]byte) (int, error)
}

// 隐式实现（无需 implements 声明）
type Buffer struct{ data []byte }

func (b *Buffer) Write(p []byte) (int, error) {
    b.data = append(b.data, p...)
    return len(p), nil
}

var w Writer = &Buffer{}
```
