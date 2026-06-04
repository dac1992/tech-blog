---
title: Go 性能优化
description: Go 程序性能分析、优化技巧与最佳实践。
---

## pprof 性能分析

```go
import _ "net/http/pprof"

func main() {
    go func() {
        http.ListenAndServe("localhost:6060", nil)
    }()
    // 业务代码...
}
```

命令行分析：

```bash
# CPU 分析
go tool pprof http://localhost:6060/debug/pprof/profile

# 内存分析
go tool pprof http://localhost:6060/debug/pprof/heap

# 在浏览器中查看
go tool pprof -http=:8080 cpu.prof
```

## 基准测试

```go
func BenchmarkFib(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Fib(30)
    }
}
```

```bash
go test -bench=. -benchmem
```

## 常见优化技巧

### 1. 减少内存分配

```go
// ❌ 每次循环分配
for i := 0; i < 1000; i++ {
    buf := make([]byte, 1024)
    process(buf)
}

// ✅ 复用 buffer
buf := make([]byte, 1024)
for i := 0; i < 1000; i++ {
    process(buf)
}
```

### 2. sync.Pool 对象复用

```go
var pool = sync.Pool{
    New: func() interface{} {
        return make([]byte, 1024)
    },
}

buf := pool.Get().([]byte)
// 使用 buf...
pool.Put(buf)
```

### 3. 字符串拼接

```go
// ❌ 频繁分配
s := ""
for _, v := range parts {
    s += v
}

// ✅ strings.Builder
var b strings.Builder
for _, v := range parts {
    b.WriteString(v)
}
s := b.String()
```

### 4. 避免逃逸

```go
// ❌ 逃逸到堆
func newPoint() *Point {
    return &Point{1, 2}
}

// ✅ 栈分配
func newPoint() Point {
    return Point{1, 2}
}
```
