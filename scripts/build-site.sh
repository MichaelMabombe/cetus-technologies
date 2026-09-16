#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
# Stage only public website files; repository and editor files are never uploaded.
python3 - <<'PY'
from pathlib import Path
import shutil
root = Path.cwd()
out = root / 'dist'
if out.is_symlink():
    raise SystemExit('Refusing to replace a symlink at dist')
if out.exists():
    shutil.rmtree(out)
out.mkdir()
for path in root.glob('*.html'):
    shutil.copy2(path, out / path.name)
for name in ('style.css', 'script.js', 'favicon.ico'):
    shutil.copy2(root / name, out / name)
for name in ('assets', 'servicos'):
    shutil.copytree(root / name, out / name)
print(f'Ready: {sum(p.is_file() for p in out.rglob("*"))} public files in dist/')
PY
