from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin,urlsplit,unquote
from hashlib import sha256
from collections import Counter
import json,re,sys,xml.etree.ElementTree as ET

root=Path(sys.argv[1] if len(sys.argv)>1 else '.').resolve()
host='weapons.guidehollow.com'
class Page(HTMLParser):
    def __init__(self,path):
        super().__init__(convert_charrefs=True);self.tags=[];self.ids=[];self.structured=[];self.in_schema=False;self.schema='';self.feed(path.read_text())
    def handle_starttag(self,tag,attrs):
        a=dict(attrs);self.tags.append((tag,a))
        if a.get('id'):self.ids.append(a['id'])
        if tag=='script' and a.get('type')=='application/ld+json':self.in_schema=True;self.schema=''
    def handle_data(self,text):
        if self.in_schema:self.schema+=text
    def handle_endtag(self,tag):
        if tag=='script' and self.in_schema:self.structured.append(json.loads(self.schema));self.in_schema=False

catalog=json.loads((root/'assets/catalog.js').read_text().strip().removeprefix('window.GH_DATA=').removesuffix(';'))
pages={('/' if p.parent==root else '/'+p.parent.relative_to(root).as_posix()+'/'):Page(p) for p in root.rglob('index.html') if '.git' not in p.parts}
categories=Counter(x['category'] for x in catalog);slugs={x['slug'] for x in catalog};illustrated={x['slug'] for x in catalog if 'illustration' in x}
assert len(slugs)==len(catalog)
urls={urlsplit(x.text).path for x in ET.parse(root/'sitemap.xml').iter() if x.tag.endswith('}loc')}
assert set(pages)==urls and len(pages)==len(catalog)+6
assert (root/'CNAME').read_text().strip()==host
assert 'Sitemap: https://'+host+'/sitemap.xml' in (root/'robots.txt').read_text()
home=(root/'index.html').read_text();atlas=(root/'atlas/index.html').read_text();compare=(root/'compare/index.html').read_text()
assert f'{len(catalog)}개 공개 상세 페이지' in home,'Home count must come from the public catalog, not stale33'
assert 'DOCUMENTARY PHOTO' not in home and '오늘의 무기' not in home and 'LATEST ENTRIES' not in home
assert '원고 상태' not in atlas and '원고 완성' not in atlas
assert atlas.count('class="weapon-card')==24,'Initial atlas is one24entry page'
assert {a['href'].split('/')[2] for t,a in pages['/atlas/'].tags if t=='a' and a.get('href','').startswith('/weapons/')}==slugs,'Static links must expose every public detail without JavaScript'
for category,n in categories.items():
    href='/atlas/?category='+__import__('urllib.parse',fromlist=['quote']).quote(category)
    tile=next(x for x in re.findall(r'<a class="category-tile"[\s\S]*?</a>',home) if href in x)
    assert re.search(r'class="category-number">'+str(n)+r'\b',tile),category
assert '<table class="spec-table"' in compare and 'scope="row"' in compare and 'scope="col"' in compare
assert 'm1a2-sepv3-us' in compare and 'K2 · 현대로템 일반 공개형' in compare
errors=[]
for route,p in pages.items():
    raw=(root/route.lstrip('/')/'index.html').read_text()
    assert p.ids.count('main-content')==1 or any(t=='main' and a.get('id') for t,a in p.tags),route
    assert len(p.ids)==len(set(p.ids)),(route,'duplicate ids')
    assert sum(t=='h1' for t,a in p.tags)==1,route
    assert any(t=='meta' and a.get('name')=='naver-site-verification' and a.get('content')=='5de654028d35e953db53c015396e799f5c7ae12d' for t,a in p.tags),route
    assert [a.get('href') for t,a in p.tags if t=='link' and a.get('rel')=='canonical']==['https://'+host+route],route
    scripts=[urlsplit(a['src']).path for t,a in p.tags if t=='script' and a.get('src')]
    for asset in ['catalog-core.js','catalog.js']:
        assert scripts.count('/assets/'+asset)==int(route in ['/atlas/','/compare/']),(route,'page-specific script',asset)
    assert scripts.count('/assets/site.js')==int(route!='/motion/'),(route,'shared page interactions')
    for tag,a in p.tags:
        key={'a':'href','script':'src','img':'src','link':'href'}.get(tag)
        if not key or not a.get(key):continue
        url=urlsplit(urljoin('https://'+host+route,a[key]))
        if url.netloc!=host:continue
        target=root/unquote(url.path.lstrip('/'))
        if not (target.is_file() or (target/'index.html').is_file()):errors.append((route,'missing',a[key]))
        if url.fragment and url.path in pages and unquote(url.fragment) not in pages[url.path].ids:errors.append((route,'missing fragment',a[key]))
        if tag=='img':
            assert a.get('alt') and int(a.get('width',0))>0 and int(a.get('height',0))>0,(route,a)
            assert not url.path.startswith(('/assets/photos/','/assets/weapons/')),(route,'unapproved photo or legacy render')
    for asset,version in re.findall(r'/assets/(catalog-core\.js|catalog\.js|editorial\.js|site\.js|style\.css)\?v=([a-f0-9]+)',raw):assert version==sha256((root/'assets'/asset).read_bytes()).hexdigest()[:12],(route,asset)
assert not errors,errors[:20]
assert {p.stem for p in (root/'assets/illustrations').glob('*.webp')}==illustrated
assert not (root/'assets/photos').exists()
for row in catalog:
    route='/weapons/'+row['slug']+'/';p=pages[route];raw=(root/route.lstrip('/')/'index.html').read_text()
    expected_url='https://'+host+route
    assert [a.get('content') for t,a in p.tags if t=='meta' and a.get('property')=='og:type']==['article'],(route,'expected exactly one og:type=article')
    assert [a.get('content') for t,a in p.tags if t=='meta' and a.get('property')=='og:url']==[expected_url],(route,'og:url')
    expected_images=['https://'+host+'/assets/illustrations/'+row['slug']+'.webp'] if row['slug'] in illustrated else []
    assert [a.get('content') for t,a in p.tags if t=='meta' and a.get('property')=='og:image']==expected_images,(route,'og:image')
    schema=[x for s in p.structured for x in s.get('@graph',[])];article=next(x for x in schema if x.get('@type')=='TechArticle')
    assert article['url']==article['mainEntityOfPage']==expected_url,(route,'structured URL')
    assert ([article['image']] if 'image' in article else [])==expected_images,(route,'structured image')
    assert article['headline']==row['name'] and 'author' not in article and 'datePublished' not in article
    assert any(x.get('@type')=='BreadcrumbList' for x in schema)
    if row['slug'] not in ['m1-abrams','f35-lightning-ii']:assert 'dateModified' not in article
    if row['review'].get('date'):assert row['review']['date'] in raw,row['slug']
    if row['slug'] in illustrated:
        assert 'photo-credit' in p.ids and '실물 사진 기반 AI 일러스트' in raw
        assert any(t=='img' and a.get('src')=='/assets/illustrations/'+row['slug']+'.webp' for t,a in p.tags)
        credit=raw.split('id="photo-credit"',1)[1].split('</p>',1)[0]
        if '/licenses/by-sa/' in credit:assert '같은' in credit
        if 'dvidshub.net/about/copyright' in credit:assert 'does not imply or constitute DoW endorsement' in raw,row['slug']
print(f'PASS: {len(pages)} routes; {len(catalog)} public articles; {len(illustrated)} images; static links, counts, source credits, schema, dates, metadata and shared-asset hashes')
