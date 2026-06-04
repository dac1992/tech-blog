---
title: Python 核心特性
description: 深入理解 Python 的列表推导、装饰器、生成器与类型提示。
---

## 1. 列表推导式

Pythonic 的方式创建列表：

```python
# 传统方式
squares = []
for x in range(10):
    squares.append(x ** 2)

# 列表推导式
squares = [x ** 2 for x in range(10)]

# 带条件过滤
evens = [x for x in range(20) if x % 2 == 0]

# 字典推导式
square_dict = {x: x ** 2 for x in range(5)}

# 集合推导式
square_set = {x ** 2 for x in range(20)}
```

## 2. 装饰器

在不修改原函数的情况下增强功能：

```python
import time
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"{func.__name__} 耗时: {elapsed:.4f} 秒")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Done"

slow_function()  # 输出: slow_function 耗时: 1.0001 秒
```

### 类装饰器与 `@property`

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("半径不能为负数")
        self._radius = value

    @property
    def area(self):
        return 3.14159 * self._radius ** 2

c = Circle(5)
print(c.area)  # 78.53975
c.radius = 10
print(c.area)  # 314.159
```

## 3. 生成器

惰性求值，节省内存：

```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

for num in fibonacci(10):
    print(num)

# 生成器表达式（类似列表推导式，但惰性）
sum_of_squares = sum(x ** 2 for x in range(1000000))
```

## 4. 上下文管理器

优雅地管理资源：

```python
# 使用 with 语句
with open('file.txt', 'r') as f:
    content = f.read()
# 文件自动关闭

# 自定义上下文管理器
from contextlib import contextmanager

@contextmanager
def managed_resource():
    print("资源初始化")
    yield "资源"
    print("资源清理")

with managed_resource() as r:
    print(f"使用 {r}")
```

## 5. 类型提示（Python 3.5+）

```python
from typing import List, Dict, Optional

def greet(name: str, times: int = 1) -> str:
    return (f"Hello, {name}!\n") * times

def process_users(users: List[Dict[str, Optional[int]]]) -> None:
    for user in users:
        print(user.get("name"), user.get("age"))

# Python 3.10+
def find(item: str | None) -> bool:
    return item is not None

# Python 3.12
def add[T](a: T, b: T) -> T:
    return a + b
```

配合 `mypy` 进行静态类型检查：

```bash
pip install mypy
mypy my_script.py
```

## 6. 特殊方法（魔术方法）

```python
class Vector:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __len__(self):
        return int((self.x ** 2 + self.y ** 2) ** 0.5)

v1 = Vector(3, 4)
v2 = Vector(1, 2)
print(v1 + v2)  # Vector(4, 6)
print(len(v1))  # 5
```
