---
title: FastAPI 与 Django
description: Python 两大 Web 框架对比与实战。
---

## FastAPI

现代、高性能的异步 Web 框架：

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    description: str | None = None

items: dict[int, Item] = {}

@app.get("/items/{item_id}")
def get_item(item_id: int) -> Item:
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    return items[item_id]

@app.post("/items/", status_code=201)
def create_item(item: Item) -> Item:
    items[len(items) + 1] = item
    return item
```

运行：

```bash
pip install fastapi uvicorn
uvicorn main:app --reload
```

访问 `http://localhost:8000/docs` 即可看到自动生成的 Swagger 文档。

### 依赖注入

```python
from fastapi import Depends

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/users/")
def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()
```

## Django

全功能 Web 框架，自带 ORM、认证、Admin：

```bash
pip install django
django-admin startproject mysite
cd mysite
python manage.py startapp blog
```

### Model 定义

```python
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
```

### 视图与路由

```python
from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.post_list, name='post_list'),
    path('posts/<int:pk>/', views.post_detail, name='post_detail'),
]
```

## 框架对比

| 特性 | FastAPI | Django |
|------|---------|--------|
| 异步支持 | 原生 async | 3.1+ 支持 |
| API 文档 | 自动生成 | 需 drf-spectacular |
| ORM | 需搭配 SQLModel/Alchemy | 内置 Django ORM |
| Admin 后台 | 无 | 内置 |
| 性能 | 极高 | 中等 |
| 适合场景 | API 服务 | 全栈 Web 应用 |
