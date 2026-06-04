---
title: Go 并发编程
description: goroutine、channel 与并发模式。
---

## Goroutine

轻量级线程，初始栈仅 2KB：

```go
func main() {
    go func() {
        fmt.Println("并发执行")
    }()

    go sayHello("World")
    time.Sleep(time.Second) // 等待 goroutine 完成
}

func sayHello(name string) {
    fmt.Printf("Hello, %s!\n", name)
}
```

## Channel

goroutine 间通信的管道：

```go
// 无缓冲 channel（同步）
ch := make(chan string)

go func() {
    ch <- "hello" // 发送
}()

msg := <-ch // 接收
fmt.Println(msg)

// 带缓冲 channel
ch = make(chan int, 3)
ch <- 1
ch <- 2
fmt.Println(<-ch) // 1
```

## select 多路复用

```go
func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() {
        time.Sleep(100 * time.Millisecond)
        ch1 <- "result 1"
    }()

    go func() {
        time.Sleep(200 * time.Millisecond)
        ch2 <- "result 2"
    }()

    select {
    case msg := <-ch1:
        fmt.Println(msg)
    case msg := <-ch2:
        fmt.Println(msg)
    case <-time.After(500 * time.Millisecond):
        fmt.Println("超时")
    }
}
```

## sync 包

```go
var wg sync.WaitGroup

for i := 0; i < 5; i++ {
    wg.Add(1)
    go func(id int) {
        defer wg.Done()
        fmt.Printf("Worker %d\n", id)
    }(i)
}

wg.Wait() // 等待所有 goroutine 完成
```

## 常见并发模式

### Fan-out / Fan-in

```go
func fanOut(input <-chan int, workers int) <-chan int {
    out := make(chan int)
    var wg sync.WaitGroup

    for i := 0; i < workers; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for v := range input {
                out <- process(v)
            }
        }()
    }

    go func() {
        wg.Wait()
        close(out)
    }()

    return out
}
```

### Context 取消

```go
ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
defer cancel()

select {
case <-doWork(ctx):
    fmt.Println("完成")
case <-ctx.Done():
    fmt.Println("超时或取消:", ctx.Err())
}
```
