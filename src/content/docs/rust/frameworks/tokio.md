---
title: Tokio 异步运行时
description: Rust 异步编程核心运行时 Tokio 的使用。
---

## 基本使用

```rust
#[tokio::main]
async fn main() {
    println!("Hello, Tokio!");
}
```

等价于：

```rust
fn main() {
    tokio::runtime::Builder::new_multi_thread()
        .enable_all()
        .build()
        .unwrap()
        .block_on(async {
            println!("Hello, Tokio!");
        })
}
```

## 异步 TCP 服务

```rust
use tokio::net::TcpListener;
use tokio::io::{AsyncReadExt, AsyncWriteExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let listener = TcpListener::bind("127.0.0.1:8080").await?;

    loop {
        let (mut socket, _) = listener.accept().await?;
        tokio::spawn(async move {
            let mut buf = [0; 1024];
            loop {
                let n = match socket.read(&mut buf).await {
                    Ok(n) if n == 0 => return,
                    Ok(n) => n,
                    Err(e) => { eprintln!("读取错误: {}", e); return; }
                };
                if socket.write_all(&buf[0..n]).await.is_err() { return; }
            }
        });
    }
}
```

## 通道（Channel）

```rust
use tokio::sync::mpsc;

#[tokio::main]
async fn main() {
    let (tx, mut rx) = mpsc::channel(32);

    tokio::spawn(async move {
        tx.send("hello".to_string()).await.unwrap();
        tx.send("world".to_string()).await.unwrap();
    });

    while let Some(msg) = rx.recv().await {
        println!("收到: {}", msg);
    }
}
```

## 并发任务

```rust
use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    let task1 = tokio::spawn(async {
        sleep(Duration::from_secs(1)).await;
        "任务1完成"
    });

    let task2 = tokio::spawn(async {
        sleep(Duration::from_secs(2)).await;
        "任务2完成"
    });

    let (r1, r2) = tokio::join!(task1, task2);
    println!("{}, {}", r1.unwrap(), r2.unwrap());
}
```
