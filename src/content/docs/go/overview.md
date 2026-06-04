---
title: Go 技术概览
description: 全面了解 Go 编程语言的核心特性、并发模型与生态系统。
---

Go（又称 Golang）由 Google 的 Robert Griesemer、Rob Pike 和 Ken Thompson 于 2009 年推出。Go 以简洁、高效、并发著称，是云原生基础设施的主力语言。

## 核心特性

- **极简语法** — 只有 25 个关键字，学习成本低
- **原生并发** — goroutine + channel，CSP 并发模型
- **编译快速** — 大型项目秒级编译
- **内置工具链** — 格式化、测试、文档一站搞定
- **单一二进制** — 编译产出无依赖的可执行文件

## 版本演进

| 版本 | 年份 | 重点特性 |
|------|------|---------|
| 1.0 | 2012 | 稳定版发布 |
| 1.11 | 2018 | Modules 实验性支持 |
| 1.18 | 2022 | 泛型（Generics）、Fuzzing |
| 1.21 | 2023 | 内置函数改进、`log/slog` 结构化日志 |
| 1.22 | 2024 | for-range 支持整数、路由增强 |

## 应用领域

- **云原生** — Docker、Kubernetes、etcd、Prometheus
- **微服务** — 高并发 API 网关与服务
- **CLI 工具** — 跨平台命令行工具
- **网络编程** — 代理、负载均衡器
- **DevOps** — Terraform、Hugo
