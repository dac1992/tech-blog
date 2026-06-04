---
title: Actix-web 与 Axum
description: Rust 两大 Web 框架对比与实战。
---

## Actix-web

高性能异步 Web 框架，基于 Actor 模型：

```rust
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello, Actix-web!")
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(echo)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
```

特点：
- TechEmpower 基准测试常年前列
- 类型安全的路由与提取器
- WebSocket 支持
- 中间件生态完善

## Axum

Tokio 团队官方 Web 框架，与 Tower 生态深度整合：

```rust
use axum::{routing::{get, post}, Json, Router};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct CreateUser {
    name: String,
    email: String,
}

#[derive(Serialize)]
struct User {
    id: u64,
    name: String,
}

async fn create_user(Json(input): Json<CreateUser>) -> Json<User> {
    let user = User { id: 1, name: input.name };
    Json(user)
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(|| async { "Hello, Axum!" }))
        .route("/users", post(create_user));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
```

特点：
- 提取器（Extractor）模式优雅
- 与 Tower 中间件无缝集成
- 由 Tokio 官方维护
- 学习曲线比 Actix 更平缓

## 框架对比

| 特性 | Actix-web | Axum |
|------|-----------|------|
| 性能 | 极高 | 高 |
| 学习曲线 | 中等 | 较低 |
| 生态 | 成熟 | 快速成长 |
| 维护方 | 社区 | Tokio 团队 |
| 适合 | 高性能服务 | 通用 Web 服务 |
