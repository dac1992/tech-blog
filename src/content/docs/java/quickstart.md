---
title: Java 快速开始
description: 从零开始搭建 Java 开发环境并编写第一个程序。
---

本指南将带你从零开始，在 5 分钟内完成 Java 开发环境的搭建并运行第一个程序。

## 1. 安装 JDK

推荐使用 [SDKMAN!](https://sdkman.io/) 管理 JDK 版本：

```bash
# 安装 SDKMAN
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# 安装 Java 21 (LTS)
sdk install java 21.0.3-tem

# 验证安装
java -version
javac -version
```

Windows 用户也可以直接下载 [Eclipse Temurin](https://adoptium.net/) 安装包。

## 2. 编写 Hello World

创建文件 `HelloWorld.java`：

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
```

编译并运行：

```bash
javac HelloWorld.java
java HelloWorld
```

输出：

```
Hello, Java!
```

## 3. 使用 IDE

推荐使用以下 IDE 进行 Java 开发：

- **IntelliJ IDEA** — JetBrains 出品，功能最强大，社区版免费
- **VS Code** — 轻量级，安装 Extension Pack for Java 即可
- **Eclipse** — 经典开源 IDE，企业级插件丰富

## 4. 使用 Maven 管理项目

创建 `pom.xml`：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
                             http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>my-app</artifactId>
    <version>1.0</version>
    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
</project>
```

运行：

```bash
mvn compile
mvn exec:java -Dexec.mainClass="HelloWorld"
```

## 下一步

- 学习 [Java 核心特性](features/)
- 了解 [Java 常用框架](frameworks/)
