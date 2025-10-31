# Repository Guidelines

## Project Structure & Module Organization
Source lives in `app.py`, `models.py`, and related helpers; `run.py` bootstraps the Flask server for development. HTML templates are under `templates/`, and the SQLite database is created in `instance/class_points.db` on first run. Build assets (`build.spec`, `build.bat`, `BUILD_README.md`) document the PyInstaller packaging flow.

## Build, Test, and Development Commands
- `python -m venv .venv && source .venv/bin/activate` (or `.venv\Scripts\activate` on Windows) — create an isolated environment.
- `pip install -r requirements.txt` — install Flask, SQLAlchemy, pandas, openpyxl, and other runtime dependencies.
- `python run.py` — start the dev server at `http://127.0.0.1:5000`; it will auto-create the SQLite database.
- `pyinstaller build.spec` — reproduce the Windows desktop build defined in `build.spec` (see `BUILD_README.md` for variants).

## Coding Style & Naming Conventions
Follow standard PEP 8 with 4‑space indentation. Keep modules and packages in lowercase with underscores, functions and variables in `snake_case`, and Flask Blueprints/routes named after their feature area (e.g., `students`, `statistics`). Template files should stay noun-based (`students.html`) and extend `templates/base.html`. Prefer SQLAlchemy models and queries encapsulated in `models.py` to keep `app.py` lean.

## Testing Guidelines
Automated tests are not yet in the repo. When adding tests, place them under a new `tests/` directory, target pytest, and name files `test_<feature>.py`. Aim for coverage of critical database operations (student CRUD, point adjustments, report generation) and Excel export helpers. Until pytest scaffolding lands, smoke-test locally by running `python run.py` and exercising workflows through the UI.

## Commit & Pull Request Guidelines
Use concise, imperative commit subjects (`Add daily summary endpoint`) and include context in the body when the change touches data schema or packaging. For pull requests, provide: purpose, key implementation notes, manual verification steps (commands or UI paths), and screenshots/GIFs when updating templates or charts. Link related issues and mention migrations or data backfills so reviewers can plan deployments.

## Data & Configuration Tips
Never version `instance/class_points.db`; treat it as generated state. For testing, copy it with `cp instance/class_points.db backup/` or start fresh by deleting the file. If you alter default ports or file paths, reflect the change in `run.py`, `app.py`, and the README to keep the PyInstaller build aligned.
