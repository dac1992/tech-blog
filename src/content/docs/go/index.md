---
title: Go
description: Go 编程语言技术栈概览与学习指南。
---

Go（又称 Golang）是由 Google 于 2009 年开源的编程语言，由 Robert Griesemer、Rob Pike 和 Ken Thompson 设计。Go 以简洁、高效、并发友好著称，是云原生时代的核心语言之一。

## 为什么选择 Go？

- **编译速度快**：依赖管理简单，编译时间以秒计
- **二进制部署**：编译为单个静态二进制文件，无依赖烦恼
- **内置并发**：`goroutine` + `channel` 让并发编程变得简单
- **标准库丰富**：网络、HTTP、JSON、加密等开箱即用
- **垃圾回收**：自动内存管理，开发者聚焦业务逻辑
- **工具链完善**：gofmt、go vet、go test 等内置工具

## 核心特性

| 特性 | 说明 |
|------|------|
| Goroutine | 轻量级线程，轻松启动数万个并发任务 |
| Channel | 线程安全的数据通道，CSP 并发模型 |
| 接口隐式实现 | 无需显式声明 `implements` |
| 跨平台编译 | `GOOS`/`GOARCH` 交叉编译 |
| defer 机制 | 资源清理的优雅方案 |

## 典型应用领域

- **云原生基础设施**：Docker、Kubernetes、etcd、Prometheus 均由 Go 编写
- **微服务后端**：Gin、Echo 等框架性能优异
- **CLI 工具**：kubectl、Terraform、Hugo
- **区块链**：以太坊、Hyperledger Fabric
- **网络编程**：高性能代理、负载均衡器

## 导航

- [Go 快速开始](go/quickstart/) — 安装 Go 并编写第一个程序
- [Go 核心特性](go/features/) — Goroutine、Channel、接口详解
- [Go 常用框架](go/frameworks/) — Gin、GORM 等主流框架介绍
