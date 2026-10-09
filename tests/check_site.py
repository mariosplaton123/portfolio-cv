"""Dependency-free checks for static routes, language pairs and the sitemap."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'cv.mariosplaton.gr'


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.ids, self.refs, self.alternates = set(), [], {}
        self.lang = None
        self.feed(path.read_text(encoding='utf-8'))

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'html':
            self.lang = attrs.get('lang')
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        for name in ('href', 'src'):
            if name in attrs:
                self.refs.append(attrs[name])
        if tag == 'link' and attrs.get('rel') == 'alternate':
            self.alternates[attrs.get('hreflang')] = attrs['href']


pages = {p.relative_to(ROOT).as_posix(): Page(p) for p in ROOT.rglob('*.html')}
errors = []
checked = 0
for name, page in pages.items():
    expected_lang = 'el' if name.startswith('el/') else 'en'
    if page.lang != expected_lang:
        errors.append(f'{name}: wrong document language')
    for ref in page.refs:
        url = urlsplit(ref)
        if url.scheme not in ('', 'http', 'https') or (url.netloc and url.netloc != ORIGIN):
            continue
        target = (ROOT / unquote(url.path.lstrip('/'))) if url.netloc or url.path.startswith('/') else (ROOT / name).parent / unquote(url.path)
        if not url.path:
            target = ROOT / name
        if target.is_dir():
            target /= 'index.html'
        target = target.resolve()
        checked += 1
        if not target.is_file():
            errors.append(f'{name}: missing {ref}')
        elif url.fragment and target.suffix == '.html':
            target_name = target.relative_to(ROOT).as_posix()
            if unquote(url.fragment) not in pages[target_name].ids:
                errors.append(f'{name}: missing fragment {ref}')
    for lang in ('en', 'el'):
        alternate = page.alternates.get(lang)
        if not alternate:
            errors.append(f'{name}: missing {lang} alternate')
            continue
        counterpart = pages.get(urlsplit(alternate).path.lstrip('/'))
        if not counterpart or counterpart.lang != lang or counterpart.alternates.get(expected_lang) != f'https://{ORIGIN}/{name}':
            errors.append(f'{name}: non-reciprocal {lang} alternate')

sitemap = ET.parse(ROOT / 'sitemap.xml')
listed = {urlsplit(el.text).path.lstrip('/') for el in sitemap.findall('.//{*}loc')}
if listed != set(pages):
    errors.append(f'Sitemap mismatch: {listed.symmetric_difference(pages)}')
for pdf in (ROOT / 'assets').glob('*.pdf'):
    if not pdf.read_bytes().startswith(b'%PDF-'):
        errors.append(f'Invalid PDF: {pdf.name}')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'PASS: {len(pages)} pages, {checked} local references, reciprocal languages, sitemap and PDF signatures')
