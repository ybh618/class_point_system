@echo off
chcp 65001 >nul
echo ========================================
echo   班级积分管理系统 - 构建脚本
echo ========================================
echo.

echo 正在检查 PyInstaller 是否已安装...
pip show pyinstaller >nul 2>&1
if %errorlevel% neq 0 (
    echo PyInstaller 未安装，正在安装...
    pip install pyinstaller
    if %errorlevel% neq 0 (
        echo 安装 PyInstaller 失败！
        pause
        exit /b 1
    )
    echo PyInstaller 安装成功！
) else (
    echo PyInstaller 已安装。
)

echo.
echo 正在构建应用程序...
pyinstaller build.spec

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   构建成功！
    echo ========================================
    echo.
    echo 生成的文件在 dist 文件夹中：
    echo   - dist\class_points_system\ 文件夹包含完整的应用程序
    echo.
    echo 运行方法：
    echo   1. 进入 dist\class_points_system\ 文件夹
    echo   2. 双击运行 class_points_system.exe
    echo   3. 在浏览器中访问 http://127.0.0.1:5000
    echo.
) else (
    echo.
    echo ========================================
    echo   构建失败！
    echo ========================================
    echo.
)

pause