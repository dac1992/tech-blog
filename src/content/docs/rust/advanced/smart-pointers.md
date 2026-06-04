---
title: Rust 智能指针与 Trait
description: Rust 中的智能指针类型与 Trait 对象详解。
---

## 智能指针

### Box\<T\> — 堆分配

```rust
let b = Box::new(5);
println!("b = {}", b);

// 递归类型必须使用 Box
enum List {
    Cons(i32, Box<List>),
    Nil,
}
use List::{Cons, Nil};
let list = Cons(1, Box::new(Cons(2, Box::new(Nil))));
```

### Rc\<T\> — 引用计数

```rust
use std::rc::Rc;

let a = Rc::new(5);
let b = Rc::clone(&a); // 引用计数 +1
let c = Rc::clone(&a); // 引用计数 +1
println!("引用计数: {}", Rc::strong_count(&a)); // 3
```

### Arc\<T\> — 原子引用计数（线程安全）

```rust
use std::sync::Arc;
use std::thread;

let data = Arc::new(vec![1, 2, 3]);

for _ in 0..3 {
    let data = Arc::clone(&data);
    thread::spawn(move || {
        println!("{:?}", *data);
    });
}
```

## Trait 与 Trait 对象

### 定义与实现 Trait

```rust
trait Summary {
    fn summarize(&self) -> String;

    // 默认实现
    fn preview(&self) -> String {
        format!("{}...", &self.summarize()[..20.min(self.summarize().len())])
    }
}

struct Article { title: String, content: String }

impl Summary for Article {
    fn summarize(&self) -> String {
        format!("{}: {}", self.title, self.content)
    }
}
```

### Trait 对象（动态分发）

```rust
fn print_summary(item: &dyn Summary) {
    println!("{}", item.summarize());
}

let article = Article {
    title: "Rust".into(),
    content: "Learn Rust".into(),
};
print_summary(&article);
```

### 常用标准 Trait

| Trait | 用途 |
|-------|------|
| `Debug` | 格式化调试输出 `{:?}` |
| `Clone` | 显式深拷贝 |
| `Copy` | 隐式位拷贝（栈上类型） |
| `From/Into` | 类型转换 |
| `Display` | 格式化用户输出 `{}` |
| `Iterator` | 迭代器 |
| `Send/Sync` | 线程安全标记 |
