"""Read-only structural atlas image audit; visual/model accuracy requires human review."""
import hashlib
import json
import re
from collections import defaultdict
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
raw = (ROOT / 'assets/catalog.js').read_text()
items = json.loads(raw[raw.index('['):raw.rindex(']') + 1])
missing, errors, hashes = [], [], defaultdict(list)
for item in items:
    path = ROOT / 'assets/illustrations' / (item['slug'] + '.webp')
    if not path.exists():
        missing.append({key: item[key] for key in ('slug', 'name', 'category')})
        if item.get('illustration'):
            errors.append(f"Catalog promises absent image: {item['slug']}")
        continue
    if not item.get('illustration'):
        errors.append(f"Image not enabled in catalog: {item['slug']}")
    try:
        with Image.open(path) as image:
            image.load()
            if image.format != 'WEBP' or min(image.size) < 500:
                errors.append(f"Unexpected format/size: {item['slug']} {image.format} {image.size}")
    except Exception as exc:
        errors.append(f"Unreadable: {item['slug']}: {exc}")
    hashes[hashlib.sha256(path.read_bytes()).hexdigest()].append(item['slug'])
for page in ROOT.rglob('*.html'):
    for path in re.findall(r'<img[^>]+src="(/assets/[^"?]+)', page.read_text()):
        if not (ROOT / path.lstrip('/')).exists():
            errors.append(f"Broken image path: {page.relative_to(ROOT)} {path}")
report = dict(total=len(items), present=len(items)-len(missing), missing=missing,
              duplicate_images=[v for v in hashes.values() if len(v)>1], errors=errors)
print(json.dumps(report, ensure_ascii=False, indent=2))
raise SystemExit(bool(errors))
