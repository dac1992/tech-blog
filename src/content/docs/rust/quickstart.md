---
title: Rust 快速开始
description: 从零开始安装 Rust 工具链并编写第一个程序。
---

本指南将带你用 5 分钟完成 Rust 环境的搭建并运行第一个程序。

## 1. 安装 Rust

使用官方推荐的 `rustup` 工具：

```bash
# Linux / macOS
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Windows
# 下载并运行 https://win.rustup.rs/
```

安装完成后，加载环境变量：

```bash
source $HOME/.cargo/env
```

验证安装：

```bash
rustc --version
cargo --version
```

## 2. 创建项目

使用 Cargo 快速创建项目：

```bash
cargo new hello_rust
cd hello_rust
```

项目结构：

```
hello_rust/
├── Cargo.toml    # 项目配置与依赖
└── src/
    └── main.rs   # 入口文件
```

## 3. 编写 Hello World

`src/main.rs` 默认已包含：

```rust
fn main() {
    println!("Hello, Rust!");
}
```

编译并运行：

```bash
cargo run
```

输出：

```
Hello, Rust!
```

## 4. 添加依赖

在 `Cargo.toml` 中添加依赖：

```toml
[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
```

然后使用：

```rust
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct User {
    name: String,
    age: u32,
}

#[tokio::main]
async fn main() {
    let user = User {
        name: "Alice".to_string(),
        age: 30,
    };
    let json = serde_json::to_string(&user).unwrap();
    println!("{}", json);
}
```

## 5. 常用 Cargo 命令

| 命令 | 作用 |
|------|------|
| `cargo build` | 编译项目 |
| `cargo run` | 编译并运行 |
| `cargo test` | 运行测试 |
| `cargo check` | 快速检查语法（不生成可执行文件）|
| `cargo fmt` | 格式化代码 |
| `cargo clippy` | 静态分析与建议 |
| `cargo doc --open` | 生成并打开文档 |

## 下一步

- 学习 [Rust 核心特性](features/)
- 了解 [Rust 常用框架](frameworks/)
