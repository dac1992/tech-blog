---
title: Rust 模式匹配与枚举
description: Rust 强大的枚举类型与模式匹配语法。
---

## 枚举（Enum）

Rust 的枚举可以携带数据，极其灵活：

```rust
enum Shape {
    Circle(f64),
    Rectangle { width: f64, height: f64 },
    Triangle(f64, f64, f64),
}

let shape = Shape::Rectangle { width: 3.0, height: 4.0 };
```

## match 表达式

```rust
fn area(shape: &Shape) -> f64 {
    match shape {
        Shape::Circle(r) => std::f64::consts::PI * r * r,
        Shape::Rectangle { width, height } => width * height,
        Shape::Triangle(a, b, c) => {
            let s = (a + b + c) / 2.0;
            (s * (s - a) * (s - b) * (s - c)).sqrt()
        }
    }
}
```

## Option 与 Result

Rust 用枚举替代空指针和异常：

```rust
// Option：可能缺失的值
fn find_user(id: u32) -> Option<String> {
    if id == 1 { Some("Alice".into()) } else { None }
}

// Result：可能失败的操作
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 { Err("除零错误".into()) } else { Ok(a / b) }
}

// 使用 ? 操作符传播错误
fn process() -> Result<(), String> {
    let user = find_user(1).ok_or("用户不存在")?;
    let result = divide(10.0, 2.0)?;
    println!("{}: {}", user, result);
    Ok(())
}
```

## if let 与 while let

```rust
// 只关心一种变体时
if let Shape::Circle(r) = shape {
    println!("圆的半径: {}", r);
}

// 迭代 Option
let mut iter = Some(0);
while let Some(n) = iter {
    if n > 5 { break; }
    println!("{}", n);
    iter = Some(n + 1);
}
```
