---
title: Python 快速开始
description: 从零开始安装 Python 并编写第一个程序。
---

本指南将带你用 5 分钟完成 Python 环境的搭建并运行第一个程序。

## 1. 安装 Python

从 [python.org](https://www.python.org/downloads/) 下载最新版本，或使用包管理器：

```bash
# macOS (Homebrew)
brew install python

# Linux (Ubuntu/Debian)
sudo apt update && sudo apt install python3 python3-pip

# Windows (winget)
winget install Python.Python.3.12
```

验证安装：

```bash
python3 --version  # macOS/Linux
python --version   # Windows
```

## 2. 编写 Hello World

创建文件 `hello.py`：

```python
print("Hello, Python!")
```

运行：

```bash
python hello.py
```

输出：

```
Hello, Python!
```

## 3. 使用虚拟环境

Python 推荐为每个项目创建独立的虚拟环境：

```bash
# 创建虚拟环境
python -m venv myenv

# 激活虚拟环境
# macOS/Linux
source myenv/bin/activate

# Windows
myenv\Scripts\activate

# 退出虚拟环境
deactivate
```

## 4. 安装依赖

使用 `pip` 管理包：

```bash
pip install requests flask numpy pandas

# 保存依赖列表
pip freeze > requirements.txt

# 安装依赖列表
pip install -r requirements.txt
```

## 5. 简单的 Web 服务

使用 Flask：

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello, Flask!"

if __name__ == '__main__':
    app.run(debug=True)
```

安装并运行：

```bash
pip install flask
python app.py
```

访问 `http://localhost:5000` 查看结果。

## 6. 常用工具

| 工具 | 作用 |
|------|------|
| **pip** | 包管理器 |
| **venv** / **virtualenv** | 虚拟环境 |
| **pytest** | 测试框架 |
| **black** | 代码格式化 |
| **flake8** / **ruff** | 代码检查 |
| **mypy** | 静态类型检查 |
| **poetry** | 现代依赖管理与打包 |
| **uv** | 极速 Python 包管理器 |

## 下一步

- 学习 [Python 核心特性](features/)
- 了解 [Python 常用框架](frameworks/)
