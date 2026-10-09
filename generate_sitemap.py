from pathlib import Path
import sys,xml.etree.ElementTree as ET
from urllib.parse import urlsplit
if len(sys.argv)!=2 or not sys.argv[1].startswith('https://') or not urlsplit(sys.argv[1]).netloc:
 raise SystemExit('Usage: python generate_sitemap.py https://your-real-domain.example')
base=sys.argv[1].rstrip('/')
root=ET.Element('urlset',xmlns='http://www.sitemaps.org/schemas/sitemap/0.9')
paths=['index.html','contact.html','el/index.html','el/contact.html']
paths += [str(p.relative_to(Path(__file__).parent)).replace('\\','/') for p in sorted(Path(__file__).parent.glob('**/projects/*.html'))]
for path in paths:ET.SubElement(ET.SubElement(root,'url'),'loc').text=base+'/'+path
ET.indent(root)
ET.ElementTree(root).write(Path(__file__).parent/'sitemap.xml',encoding='utf-8',xml_declaration=True)
print('Created sitemap.xml with',len(paths),'pages')
