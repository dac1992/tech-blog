---
title: Java 基础语法
description: Java 语言的基本语法、数据类型、流程控制与异常处理。
---

## 数据类型

### 基本类型

| 类型 | 大小 | 范围 |
|------|------|------|
| `byte` | 1 字节 | -128 ~ 127 |
| `short` | 2 字节 | -32768 ~ 32767 |
| `int` | 4 字节 | -2³¹ ~ 2³¹-1 |
| `long` | 8 字节 | -2⁶³ ~ 2⁶³-1 |
| `float` | 4 字节 | IEEE 754 单精度 |
| `double` | 8 字节 | IEEE 754 双精度 |
| `char` | 2 字节 | Unicode 字符 |
| `boolean` | 1 位 | true / false |

### 引用类型

```java
String name = "Java";          // 字符串
int[] arr = {1, 2, 3};         // 数组
List<String> list = new ArrayList<>(); // 集合
```

## 流程控制

### 条件语句

```java
int score = 85;

if (score >= 90) {
    System.out.println("优秀");
} else if (score >= 60) {
    System.out.println("及格");
} else {
    System.out.println("不及格");
}

// switch 表达式（Java 14+）
String grade = switch (score / 10) {
    case 10, 9 -> "A";
    case 8     -> "B";
    case 7     -> "C";
    case 6     -> "D";
    default    -> "F";
};
```

### 循环语句

```java
// for 循环
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}

// 增强 for 循环
for (String item : list) {
    System.out.println(item);
}

// Stream API（Java 8+）
list.stream()
    .filter(s -> s.startsWith("J"))
    .forEach(System.out::println);
```

## 异常处理

```java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("除零错误: " + e.getMessage());
} finally {
    System.out.println("始终执行");
}

// try-with-resources（自动关闭资源）
try (var conn = dataSource.getConnection();
     var stmt = conn.prepareStatement("SELECT * FROM users")) {
    var rs = stmt.executeQuery();
    while (rs.next()) {
        System.out.println(rs.getString("name"));
    }
}
```

## Record 与 sealed 类（Java 16+/17+）

```java
// Record：不可变数据载体
public record Point(int x, int y) {}

var p = new Point(3, 4);
System.out.println(p.x()); // 3

// Sealed 类：受限继承
public sealed interface Shape permits Circle, Rectangle {}
public record Circle(double radius) implements Shape {}
public record Rectangle(double width, double height) implements Shape {}
```
