---
title: Java 面向对象编程
description: Java 的封装、继承、多态与接口设计。
---

## 封装

通过访问修饰符控制数据可见性：

```java
public class User {
    private String name;
    private int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Getter / Setter
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(int age) {
        if (age < 0) throw new IllegalArgumentException("年龄不能为负数");
        this.age = age;
    }
}
```

## 继承

Java 只支持单继承，一个类只能继承一个父类：

```java
public class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    public void speak() {
        System.out.println(name + " makes a sound");
    }
}

public class Dog extends Animal {
    private String breed;

    public Dog(String name, String breed) {
        super(name);
        this.breed = breed;
    }

    @Override
    public void speak() {
        System.out.println(name + " barks!");
    }
}
```

## 多态

通过接口和重写实现运行时多态：

```java
public interface Drawable {
    void draw();
}

public class Circle implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing a circle");
    }
}

public class Square implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing a square");
    }
}

// 运行时多态
Drawable shape = new Circle();
shape.draw(); // "Drawing a circle"
```

## 接口的默认方法（Java 8+）

```java
public interface Loggable {
    void log(String message);

    // 默认方法
    default void logError(String message) {
        log("[ERROR] " + message);
    }

    // 静态方法
    static Loggable console() {
        return System.out::println;
    }
}
```

## 设计原则（SOLID）

| 原则 | 含义 |
|------|------|
| **S** — 单一职责 | 一个类只有一个引起变化的原因 |
| **O** — 开闭原则 | 对扩展开放，对修改关闭 |
| **L** — 里氏替换 | 子类对象能替换父类对象 |
| **I** — 接口隔离 | 接口应小而专一 |
| **D** — 依赖倒置 | 依赖抽象而非具体实现 |
