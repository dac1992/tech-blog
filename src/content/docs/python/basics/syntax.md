---
title: Python 基础语法
description: Python 语言的基本语法、数据结构与函数式编程。
---

## 数据结构

### 列表与元组

```python
fruits = ["apple", "banana", "cherry"]
fruits.append("date")
fruits[0]  # "apple"

point = (3, 4)          # 不可变元组
x, y = point            # 解包
```

### 字典与集合

```python
user = {"name": "Alice", "age": 30}
user["email"] = "alice@test.com"  # 添加

# 字典推导
squares = {x: x**2 for x in range(6)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

unique = {1, 2, 3, 2, 1}  # {1, 2, 3}
unique.add(4)
unique & {3, 4, 5}         # 交集 {3, 4}
```

## 列表推导与生成器

```python
# 列表推导
evens = [x for x in range(20) if x % 2 == 0]

# 字典推导
names = ["alice", "bob"]
name_map = {n: n.upper() for n in names}

# 生成器（惰性求值，节省内存）
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
first_10 = [next(fib) for _ in range(10)]
```

## 函数与装饰器

```python
from functools import wraps
import time

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} 耗时 {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "done"
```

## 模式匹配（Python 3.10+）

```python
def handle_command(cmd):
    match cmd.split():
        case ["quit"]:
            print("退出")
        case ["go", direction]:
            print(f"前往 {direction}")
        case ["pick", "up", item]:
            print(f"拾取 {item}")
        case _:
            print("未知命令")
```

## 类型标注

```python
from typing import Optional

def greet(name: str, age: Optional[int] = None) -> str:
    msg = f"Hello, {name}"
    if age is not None:
        msg += f" ({age})"
    return msg

# Python 3.12+ 简化语法
type Vector = list[float]

def scale(scalar: float, vector: Vector) -> Vector:
    return [scalar * n for n in vector]
```
