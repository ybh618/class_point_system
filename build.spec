# -*- mode: python ; coding: utf-8 -*-

block_cipher = None


# 应用程序入口点
a = Analysis(
    ['run.py'],
    pathex=[],
    binaries=[],
    datas=[
        # 包含模板文件
        ('templates/*.html', 'templates'),
        # 包含迁移工具
        ('database_migration.py', '.'),
        ('DATABASE_MIGRATION_GUIDE.md', '.'),
        # 包含其他必要的文件
    ],
    hiddenimports=[
        'flask',
        'flask_sqlalchemy',
        'pandas',
        'openpyxl',
        'sqlalchemy',
        'sqlalchemy.ext',
        'sqlalchemy.dialects.sqlite',
        'sqlalchemy.dialects',
        'sqlalchemy.util._collections',
        'sqlalchemy.sql.default_comparator',
        'pandas._libs.tslibs.nattype',
        'pandas._libs.tslibs.base',
        'pandas.core.arrays.sparse',
        'pandas.core.computation.ops',
        'pandas.io.formats.format',
        'jinja2',
        'jinja2.ext',
        'werkzeug',
        'werkzeug.middleware.dispatcher',
        'markupsafe',
        'itsdangerous',
        'click',
        'numpy',
        'numpy.core._multiarray_umath',
        'numpy.libs',
        'datetime',
        'io',
        'os',
        'sys',
        'models',
        'app'
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[
        'matplotlib',  # 排除不需要的库以减小体积
        'scipy',
        'sklearn',
        'PIL',
        'tkinter',
        'test',
        'unittest',
        'pytest',
        'distutils',
    ],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)

# 添加数据文件
# 确保包含所有模板文件
a.datas += Tree('templates', prefix='templates')

# 如果有其他数据文件，也包含进来
# a.datas += [('config.ini', 'config.ini', 'DATA')]

# 创建可执行文件
pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='class_points_system',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,  # 设置为 True 显示控制台窗口，方便调试
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=None,  # 可以设置图标文件路径，例如: 'icon.ico'
)

# 创建文件夹形式的发布包
coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='class_points_system',
)