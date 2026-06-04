---
title: Gin 与 Echo
description: Go 两大 Web 框架对比与实战。
---

## Gin

Go 最流行的 Web 框架：

```go
package main

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

type User struct {
    Name  string `json:"name"`
    Email string `json:"email"`
}

func main() {
    r := gin.Default()

    r.GET("/ping", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"message": "pong"})
    })

    r.POST("/users", func(c *gin.Context) {
        var user User
        if err := c.ShouldBindJSON(&user); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }
        c.JSON(http.StatusCreated, user)
    })

    // 路径参数
    r.GET("/users/:id", func(c *gin.Context) {
        id := c.Param("id")
        c.JSON(http.StatusOK, gin.H{"id": id})
    })

    r.Run(":8080")
}
```

## Echo

极简高性能 Web 框架：

```go
package main

import (
    "net/http"
    "github.com/labstack/echo/v4"
)

func main() {
    e := echo.New()

    e.GET("/", func(c echo.Context) error {
        return c.String(http.StatusOK, "Hello, Echo!")
    })

    e.GET("/users/:id", func(c echo.Context) error {
        id := c.Param("id")
        return c.JSON(http.StatusOK, map[string]string{"id": id})
    })

    e.Logger.Fatal(e.Start(":1323"))
}
```

## 框架对比

| 特性 | Gin | Echo |
|------|-----|------|
| 性能 | 极高 | 极高 |
| 中间件 | 丰富 | 内置更多 |
| 文档 | 社区丰富 | 官方完善 |
| 自动 TLS | 需额外配置 | 内置 Let's Encrypt |
| 学习曲线 | 低 | 低 |

两者性能接近，Gin 社区更大，Echo 功能更全。选择取决于个人偏好。
