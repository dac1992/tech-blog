---
title: Python 异步编程
description: asyncio 异步编程、协程与异步生态。
---

## async/await 基础

```python
import asyncio

async def fetch_data(url: str) -> str:
    await asyncio.sleep(1)  # 模拟 IO
    return f"Data from {url}"

async def main():
    result = await fetch_data("https://api.example.com")
    print(result)

asyncio.run(main())
```

## 并发执行

```python
async def main():
    # 并发执行多个任务
    tasks = [
        fetch_data("https://api1.example.com"),
        fetch_data("https://api2.example.com"),
        fetch_data("https://api3.example.com"),
    ]
    results = await asyncio.gather(*tasks)
    for r in results:
        print(r)
```

## aiohttp 异步 HTTP

```python
import aiohttp

async def fetch_json(url: str) -> dict:
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()

async def main():
    data = await fetch_json("https://api.github.com")
    print(data["current_user_url"])

asyncio.run(main())
```

## 异步数据库

```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

engine = create_async_engine("postgresql+asyncpg://user:pass@localhost/db")
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession)

async def get_users():
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(User))
        return result.scalars().all()
```

## 异步 vs 同步选择

| 场景 | 推荐方式 |
|------|---------|
| Web API（大量 IO） | async（FastAPI + uvicorn） |
| CPU 密集计算 | 同步 + 多进程 |
| 爬虫 | async（aiohttp + asyncio） |
| 数据处理 | 同步（Pandas / NumPy） |
| 混合场景 | async 为主，`run_in_executor` 处理 CPU 任务 |

## FastAPI 异步实战

```python
from fastapi import FastAPI
import asyncio

app = FastAPI()

@app.get("/parallel")
async def parallel_requests():
    results = await asyncio.gather(
        fetch_data("https://api1.example.com"),
        fetch_data("https://api2.example.com"),
    )
    return {"results": results}
```
