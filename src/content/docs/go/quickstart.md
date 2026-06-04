---
title: Go 快速开始
description: 从零开始安装 Go 并编写第一个程序。
---

本指南将带你用 5 分钟完成 Go 环境的搭建并运行第一个程序。

## 1. 安装 Go

从 [go.dev/dl](https://go.dev/dl/) 下载对应系统的安装包，或使用包管理器：

```bash
# macOS (Homebrew)
brew install go

# Linux (Ubuntu/Debian)
sudo apt update && sudo apt install golang-go

# Windows (winget)
winget install GoLang.Go
```

验证安装：

```bash
go version
```

## 2. 编写 Hello World

创建文件 `main.go`：

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}
```

运行：

```bash
go run main.go
```

输出：

```
Hello, Go!
```

## 3. 初始化模块

Go 使用模块（module）管理依赖：

```bash
mkdir hello_go
cd hello_go
go mod init hello_go
```

这会创建 `go.mod` 文件：

```go
module hello_go

go 1.22
```

## 4. 添加依赖

安装并使用第三方包：

```bash
go get github.com/gin-gonic/gin
```

`go.mod` 会自动更新：

```go
module hello_go

go 1.22

require github.com/gin-gonic/gin v1.9.1
```

## 5. 常用命令

| 命令 | 作用 |
|------|------|
| `go run` | 编译并运行 |
| `go build` | 编译为可执行文件 |
| `go test` | 运行测试 |
| `go get` | 添加/更新依赖 |
| `go mod tidy` | 清理未使用依赖 |
| `go fmt` | 格式化代码 |
| `go vet` | 静态分析 |
| `go doc` | 查看文档 |

## 6. 简单的 Web 服务

```go
package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, %s!", r.URL.Path[1:])
}

func main() {
    http.HandleFunc("/", handler)
    fmt.Println("Server running at http://localhost:8080")
    http.ListenAndServe(":8080", nil)
}
```

运行：

```bash
go run main.go
```

访问 `http://localhost:8080/World` 查看结果。

## 下一步

- 学习 [Go 核心特性](features/)
- 了解 [Go 常用框架](frameworks/)
