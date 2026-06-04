---
title: Go 核心特性
description: 深入理解 Go 的 Goroutine、Channel、接口与错误处理。
---

## 1. Goroutine

Go 的轻量级线程，由 Go 运行时调度，启动成本极低：

```go
package main

import (
    "fmt"
    "time"
)

func say(s string) {
    for i := 0; i < 3; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    go say("world") // 新 goroutine
    say("hello")    // 主 goroutine
}
```

可以轻松启动数万个 goroutine 而不耗尽系统资源。

## 2. Channel

Goroutine 之间的通信管道，线程安全：

```go
package main

import "fmt"

func main() {
    ch := make(chan string)

    go func() {
        ch <- "来自 goroutine 的消息"
    }()

    msg := <-ch
    fmt.Println(msg)
}
```

### 缓冲 Channel

```go
ch := make(chan int, 2)
ch <- 1
ch <- 2
// ch <- 3 // 阻塞，缓冲区已满
fmt.Println(<-ch) // 1
fmt.Println(<-ch) // 2
```

### Select 多路复用

```go
select {
case msg1 := <-ch1:
    fmt.Println("ch1:", msg1)
case msg2 := <-ch2:
    fmt.Println("ch2:", msg2)
case <-time.After(1 * time.Second):
    fmt.Println("超时")
default:
    fmt.Println("无数据")
}
```

## 3. 接口

Go 的接口是隐式实现的——无需显式声明 `implements`：

```go
type Writer interface {
    Write(p []byte) (n int, err error)
}

type MyWriter struct{}

func (m MyWriter) Write(p []byte) (int, error) {
    fmt.Println(string(p))
    return len(p), nil
}

// MyWriter 自动实现了 Writer 接口
```

### 空接口

`interface{}`（或 Go 1.18+ 的 `any`）可以接收任意类型：

```go
func printAny(v any) {
    fmt.Printf("类型: %T, 值: %v\n", v, v)
}
```

## 4. 错误处理

Go 通过显式返回 `error` 值处理错误：

```go
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("不能除以零")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 0)
    if err != nil {
        fmt.Println("错误:", err)
        return
    }
    fmt.Println("结果:", result)
}
```

Go 1.13+ 支持错误链：

```go
if err != nil {
    return fmt.Errorf("处理失败: %w", err)
}
```

## 5. Defer

延迟执行，常用于资源清理：

```go
func readFile(path string) error {
    f, err := os.Open(path)
    if err != nil {
        return err
    }
    defer f.Close() // 函数返回时自动关闭

    // 处理文件...
    return nil
}
```

多个 defer 按 LIFO（后进先出）顺序执行。

## 6. 泛型（Go 1.18+）

```go
func Max[T comparable](a, b T) T {
    if a > b {
        return a
    }
    return b
}

func main() {
    fmt.Println(Max(3, 5))       // 5
    fmt.Println(Max("a", "z"))   // z
}
```
