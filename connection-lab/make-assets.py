"""Rebuild original procedural illustrations and bounded transfer fixtures."""
import hashlib
import json
import random
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

root = Path(__file__).parent / 'assets'
root.mkdir(exist_ok=True)
titles = ['Coastlines', 'High ground', 'Night signals', 'Open water']
texts = ['A quiet edge between land and sea.', 'Following the contour of the hills.', 'Finding a path after the light fades.', 'Small waves, a very wide horizon.']
manifest = {'images': [], 'articles': []}
yy, xx = np.mgrid[0:500, 0:800]
rng = np.random.default_rng(20261024)
for index, title in enumerate(titles):
    noise = rng.normal(0, 13, (500, 800, 1))
    wave = np.sin(xx / 90 + np.sin(yy / 81) * 2 + index) * 12
    sky = np.array([[32, 66, 79], [80, 87, 80], [25, 32, 62], [37, 80, 96]])[index]
    base = sky + yy[..., None] / 500 * np.array([20, 27, 18]) + noise + wave[..., None]
    image = Image.fromarray(np.clip(base, 0, 255).astype('uint8'))
    draw = ImageDraw.Draw(image)
    for layer in range(6):
        ridge = []
        for x in range(0, 801, 4):
            y = 210 + layer * 46 + 40 * np.sin(x / (100 + layer * 20) + index * 2 + layer) + 10 * np.sin(x / 35 + layer)
            ridge.append((x, int(y)))
        color = ((24 + layer * 4, 47 + layer * 5, 55 + layer * 5) if index != 1 else (68 - layer * 5, 87 - layer * 4, 70 - layer * 2))
        draw.polygon(ridge + [(800, 500), (0, 500)], fill=color)
        draw.line(ridge, fill=(99 + layer * 8, 145 + layer * 6, 142 + layer * 5), width=2)
    draw.ellipse((600, 65, 660, 125), fill=(222, 208, 163))
    # Fine paper grain gives the illustrations detail and realistic JPEG payloads.
    final = np.array(image).astype(float) + rng.normal(0, 7, (500, 800, 1))
    image = Image.fromarray(np.clip(final, 0, 255).astype('uint8'))
    name = f'journal-{index + 1}.jpg'
    image.save(root / name, quality=90, optimize=True)
    manifest['images'].append({'file': name, 'size': (root / name).stat().st_size, 'title': title, 'text': texts[index]})
    article = {'title': title, 'sections': [texts[index] + ' ' + 'The journal follows a changing landscape: a few observations, a map, and an image from the route. ' * 12 for _ in range(4)]}
    article_name = f'article-{index + 1}.json'
    (root / article_name).write_text(json.dumps(article), encoding='utf-8')
    manifest['articles'].append({'file': article_name, 'size': (root / article_name).stat().st_size})
block = random.Random(20261024).randbytes(2_000_000)
(root / 'block.bin').write_bytes(block)
manifest['block_sha256'] = hashlib.sha256(block).hexdigest()
(root / 'manifest.js').write_text('window.connectionLabAssets = ' + json.dumps(manifest, indent=2) + ';\n', encoding='utf-8')
print(json.dumps(manifest, indent=2))
