---
title: Rust 所有权与借用
description: Rust 核心概念：所有权、借用、生命周期。
---

## 所有权规则

Rust 的三条基本规则：

1. 每个值都有一个 **所有者**（owner）
2. 同一时刻只能有一个所有者
3. 所有者离开作用域时，值被丢弃（drop）

```rust
let s1 = String::from("hello");
let s2 = s1;        // 所有权转移（move）
// println!("{}", s1); // ❌ 编译错误：s1 已失效
println!("{}", s2);   // ✅
```

## 借用与引用

### 不可变引用

```rust
fn calculate_length(s: &String) -> usize {
    s.len()
}

let s = String::from("hello");
let len = calculate_length(&s); // 借用，不获取所有权
println!("'{}' 的长度是 {}", s, len); // s 仍然有效
```

### 可变引用

```rust
fn append_world(s: &mut String) {
    s.push_str(", world");
}

let mut s = String::from("hello");
append_world(&mut s);
println!("{}", s); // "hello, world"
```

**关键规则**：同一作用域内，要么只能有一个可变引用，要么只能有多个不可变引用，二者不可共存。

## 生命周期

生命周期标注帮助编译器验证引用的有效性：

```rust
// 显式生命周期标注
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

// 结构体中的生命周期
struct Parser<'a> {
    content: &'a str,
}

impl<'a> Parser<'a> {
    fn new(content: &'a str) -> Self {
        Parser { content }
    }
}
```

## 所有权 vs 垃圾回收

| 机制 | Rust（所有权） | Java/Go（GC） | C/C++（手动） |
|------|-------------|-------------|------------|
| 运行时开销 | 零 | 有 GC 暂停 | 零 |
| 内存安全 | 编译期保证 | 运行期保证 | 无保证 |
| 开发者负担 | 学习曲线陡 | 低 | 高 |
