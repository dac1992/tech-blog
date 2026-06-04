---
title: Java 核心特性
description: 深入理解 Java 的面向对象、泛型、Lambda 与并发机制。
---

## 1. 面向对象三大特性

### 封装

通过访问修饰符控制数据访问，保护内部状态：

```java
public class BankAccount {
    private double balance; // 私有字段

    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }

    public double getBalance() {
        return balance;
    }
}
```

### 继承

使用 `extends` 关键字实现代码复用：

```java
public class Animal {
    public void speak() {
        System.out.println("Some sound");
    }
}

public class Dog extends Animal {
    @Override
    public void speak() {
        System.out.println("Woof!");
    }
}
```

### 多态

父类引用指向子类对象，实现运行时动态绑定：

```java
Animal animal = new Dog();
animal.speak(); // 输出 "Woof!"
```

## 2. 泛型

类型安全的参数化类型，编译期即可发现类型错误：

```java
List<String> names = new ArrayList<>();
names.add("Alice");
// names.add(123); // 编译错误！

Map<String, Integer> scores = new HashMap<>();
scores.put("Math", 95);
```

## 3. Lambda 表达式与 Stream API

Java 8 引入函数式编程支持：

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);

// Lambda 过滤 + Stream 处理
List<Integer> evens = numbers.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * n)
    .toList();

// 方法引用
names.forEach(System.out::println);
```

## 4. 并发编程

### 虚拟线程（Java 21+）

轻量级线程，可创建数百万个而不耗尽系统资源：

```java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 10_000).forEach(i -> {
        executor.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1));
            return i;
        });
    });
} // executor.close() 等待所有任务完成
```

### CompletableFuture

声明式异步编程：

```java
CompletableFuture.supplyAsync(() -> fetchUser(id))
    .thenApply(User::getName)
    .thenAccept(System.out::println);
```

## 5. 新特性速览

| 版本 | 特性 |
|------|------|
| Java 16 | 记录类 `record Point(int x, int y) {}` |
| Java 17 | 密封类 `sealed class Shape permits Circle, Square {}` |
| Java 21 | 虚拟线程、结构化并发（Preview） |
| Java 21 | 模式匹配 `switch (obj) { case String s -> ... }` |
