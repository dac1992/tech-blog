---
title: Python 面向对象
description: Python 的类、继承、描述符与设计模式。
---

## 类的定义

```python
class User:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age

    @property
    def info(self) -> str:
        return f"{self.name}, {self.age}岁"

    def __repr__(self) -> str:
        return f"User({self.name!r}, {self.age})"

user = User("Alice", 30)
print(user.info)  # "Alice, 30岁"
```

## 继承与多态

```python
class Animal:
    def __init__(self, name: str):
        self.name = name

    def speak(self) -> str:
        raise NotImplementedError

class Dog(Animal):
    def speak(self) -> str:
        return f"{self.name}: 汪汪!"

class Cat(Animal):
    def speak(self) -> str:
        return f"{self.name}: 喵喵~"

# 多态
animals = [Dog("旺财"), Cat("小花")]
for animal in animals:
    print(animal.speak())
```

## 数据类（dataclass）

```python
from dataclasses import dataclass, field

@dataclass
class Product:
    name: str
    price: float
    tags: list[str] = field(default_factory=list)

    @property
    def price_with_tax(self) -> float:
        return self.price * 1.13

p = Product("键盘", 299.0, ["外设", "机械"])
print(p)  # Product(name='键盘', price=299.0, tags=['外设', '机械'])
```

## 上下文管理器

```python
from contextlib import contextmanager

@contextmanager
def timer(label: str):
    import time
    start = time.perf_counter()
    yield
    elapsed = time.perf_counter() - start
    print(f"{label}: {elapsed:.4f}s")

with timer("查询数据库"):
    # 模拟耗时操作
    import time
    time.sleep(0.5)
```

## 抽象基类

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float: ...

    @abstractmethod
    def perimeter(self) -> float: ...

class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius

    def area(self) -> float:
        return 3.14159 * self.radius ** 2

    def perimeter(self) -> float:
        return 2 * 3.14159 * self.radius
```
