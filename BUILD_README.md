# 班级积分管理系统 - 构建说明

## 构建配置说明

本项目提供了完整的 PyInstaller 构建配置，可以将 Flask 应用程序打包为独立的可执行文件。

## 文件说明

- `build.spec` - PyInstaller 配置文件
- `build.bat` - Windows 构建脚本
- `BUILD_README.md` - 构建说明文档

## 构建方法

### 方法一：使用构建脚本（推荐）

1. 双击运行 `build.bat`
2. 脚本会自动检查并安装 PyInstaller
3. 自动构建应用程序
4. 构建完成后，在 `dist` 文件夹中找到生成的可执行文件

### 方法二：手动构建

```bash
# 安装 PyInstaller（如果未安装）
pip install pyinstaller

# 使用 spec 文件构建
pyinstaller build.spec

# 或者直接构建
pyinstaller --onefile --console --add-data "templates;templates" --hidden-import=flask --hidden-import=flask_sqlalchemy --hidden-import=pandas --hidden-import=openpyxl --hidden-import=sqlalchemy run.py
```

## 构建配置特点

### 包含的依赖项
- Flask 及相关组件
- SQLAlchemy 数据库 ORM
- Pandas 数据处理
- OpenPyXL Excel 处理
- NumPy 数值计算

### 排除的库（减小体积）
- Matplotlib
- SciPy
- Scikit-learn
- PIL/Pillow
- Tkinter
- 测试相关库

### 数据文件
- 自动包含所有模板文件 (`templates/*.html`)

## 生成的文件

构建完成后，在 `dist` 文件夹中会生成：

- `class_points_system/` - 完整的应用程序文件夹
  - `class_points_system.exe` - 主程序
  - `templates/` - 模板文件
  - 各种依赖库文件

## 运行方法

1. 进入 `dist/class_points_system/` 文件夹
2. 双击运行 `class_points_system.exe`
3. 程序会自动启动 Flask 服务器
4. 在浏览器中访问 `http://127.0.0.1:5000`

## 注意事项

1. **首次运行**：程序会自动创建数据库文件 (`instance/class_points.db`)
2. **控制台窗口**：当前配置显示控制台窗口，方便查看日志和调试
3. **数据库路径**：打包后数据库文件会创建在程序所在目录的 `instance` 文件夹中
4. **端口占用**：如果 5000 端口被占用，程序可能无法启动

## 自定义配置

### 修改为无控制台窗口

在 `build.spec` 中将：
```python
console=True,
```
改为：
```python
console=False,
```

### 添加图标

在 `build.spec` 中设置：
```python
icon='icon.ico',
```

### 添加静态文件

如果需要包含静态文件，取消注释：
```python
# a.datas += Tree('static', prefix='static')
```

## 故障排除

1. **构建失败**：检查 Python 环境是否正确，依赖包是否安装
2. **运行时缺少模块**：在 `hiddenimports` 中添加相应的模块
3. **模板文件缺失**：确保 `templates` 文件夹中的所有文件都被正确包含
4. **数据库问题**：确保程序有写入权限，可以创建数据库文件