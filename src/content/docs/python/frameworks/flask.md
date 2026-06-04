---
title: Flask 微框架
description: Flask 轻量级 Web 开发实战。
---

## 基本使用

```python
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/')
def hello():
    return jsonify({"message": "Hello, Flask!"})

@app.route('/users/<int:user_id>')
def get_user(user_id):
    return jsonify({"id": user_id, "name": "Alice"})

if __name__ == '__main__':
    app.run(debug=True)
```

## 蓝图（Blueprint）

模块化组织路由：

```python
# auth.py
from flask import Blueprint

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    return jsonify({"token": "abc123"})

@auth_bp.route('/logout')
def logout():
    return jsonify({"message": "已登出"})

# app.py
app.register_blueprint(auth_bp)
```

## 常用扩展

| 扩展 | 用途 |
|------|------|
| Flask-SQLAlchemy | ORM |
| Flask-Migrate | 数据库迁移 |
| Flask-Login | 用户认证 |
| Flask-WTF | 表单处理 |
| Flask-CORS | 跨域处理 |
| Flask-RESTful | REST API |

## 示例：REST API

```python
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

@app.route('/users', methods=['GET'])
def list_users():
    users = User.query.all()
    return jsonify([{"id": u.id, "name": u.name} for u in users])

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = User(name=data['name'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"id": user.id, "name": user.name}), 201
```
