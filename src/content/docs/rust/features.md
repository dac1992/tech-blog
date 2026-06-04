---
title: Rust 核心特性
description: 深入理解 Rust 的所有权、生命周期、模式匹配与错误处理。
---

## 1. 所有权系统

Rust 最核心的创新——编译期内存管理，无需垃圾回收器。

### 三条规则

1. 每个值都有一个所有者（owner）
2. 同一时刻只能有一个所有者
3. 当所有者离开作用域，值将被丢弃

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // 所有权转移（move），s1 不再有效
    // println!("{}", s1); // 编译错误！s1 已被移动
    println!("{}", s2); // OK
}
```

### 借用（Borrowing）

通过引用访问值而不转移所有权：

```rust
fn main() {
    let s = String::from("hello");
    let len = calculate_length(&s); // 不可变借用
    println!("'{}' 的长度是 {}", s, len); // s 仍然可用
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

### 可变借用

```rust
fn main() {
    let mut s = String::from("hello");
    change(&mut s);
    println!("{}", s); // "hello, world"
}

fn change(s: &mut String) {
    s.push_str(", world");
}
```

:::caution[借用规则]
- 要么只能有一个可变引用，要么只能有多个不可变引用
- 引用必须始终有效（编译器检查生命周期）
:::

## 2. 生命周期

编译器通过生命周期确保引用不会悬垂：

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

`'a` 表示返回的引用寿命不能超过 `x` 或 `y` 中较短的那个。

## 3. 模式匹配

Rust 的 `match` 是表达式，且必须穷尽所有分支：

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
}

fn handle_message(msg: Message) {
    match msg {
        Message::Quit => println!("退出"),
        Message::Move { x, y } => println!("移动到 ({}, {})", x, y),
        Message::Write(text) => println!("文本: {}", text),
    }
}
```

## 4. 错误处理

### Result 类型

```rust
use std::fs::File;

fn read_file(path: &str) -> Result<String, std::io::Error> {
    let mut file = File::open(path)?; // ? 运算符传播错误
    let mut contents = String::new();
    std::io::Read::read_to_string(&mut file, &mut contents)?;
    Ok(contents)
}
```

### Option 类型

```rust
fn find_char(s: &str, c: char) -> Option<usize> {
    s.find(c)
}

fn main() {
    match find_char("hello", 'e') {
        Some(index) => println!("找到，位置: {}", index),
        None => println!("未找到"),
    }
}
```

## 5. Trait（特征）

Rust 的类型系统接口：

```rust
trait Drawable {
    fn draw(&self);
}

struct Circle { radius: f64 }

impl Drawable for Circle {
    fn draw(&self) {
        println!("绘制半径为 {} 的圆", self.radius);
    }
}

fn render<T: Drawable>(item: &T) {
    item.draw();
}
```
