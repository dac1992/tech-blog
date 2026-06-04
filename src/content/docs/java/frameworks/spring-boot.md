---
title: Spring Boot
description: Spring Boot 框架核心概念与实战。
---

## 快速创建项目

使用 [Spring Initializr](https://start.spring.io/) 生成项目骨架：

```bash
curl https://start.spring.io/starter.zip \
  -d dependencies=web,data-jpa \
  -d javaVersion=21 \
  -d type=maven-project \
  -o demo.zip && unzip demo.zip -d demo
```

## REST API 开发

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> list() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User get(@PathVariable Long id) {
        return userService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@RequestBody @Valid CreateUserRequest request) {
        return userService.create(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}
```

## 自动配置原理

Spring Boot 的核心是 `@SpringBootApplication`，它组合了：

- `@SpringBootConfiguration` — 标识配置类
- `@EnableAutoConfiguration` — 启用自动配置
- `@ComponentScan` — 组件扫描

自动配置通过 `spring.factories` 和条件注解实现：

```java
@Configuration
@ConditionalOnClass(DataSource.class)
@ConditionalOnMissingBean(DataSource.class)
@EnableConfigurationProperties(DataSourceProperties.class)
public class DataSourceAutoConfiguration {
    // 仅当 classpath 有 DataSource 且没有自定义 DataSource 时才生效
}
```

## 配置管理

`application.yml`：

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: postgres
    password: secret
  jpa:
    hibernate:
      ddl-auto: update

app:
  jwt:
    secret: ${JWT_SECRET:default-secret}
    expiration: 86400000
```

使用 `@Value` 或 `@ConfigurationProperties` 注入：

```java
@ConfigurationProperties(prefix = "app.jwt")
public record JwtProperties(String secret, long expiration) {}
```

## 分层架构

```
controller/   → 接收请求、参数校验
service/      → 业务逻辑
repository/   → 数据访问
model/        → 实体与 DTO
config/       → 配置类
```
