#!/usr/bin/env python3
"""Conservative content-aware image re-framing. No generative or weapon-shape edits."""
import argparse
import json
from pathlib import Path
from statistics import median
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
CAT=ROOT/'data/catalog.json'
DIR=ROOT/'assets/illustrations'
REPORT=ROOT/'docs/qa/2026-11-08/media-framing.json'
TARGET=(1600,900)

def find_subject(im):
    im=im.convert('RGB')
    w,h=im.size
    corners=[im.getpixel(p) for p in [(2,2),(w-3,2),(2,h-3),(w-3,h-3)]]
    bg=tuple(int(median(p[i] for p in corners)) for i in range(3))
    if max(abs(p[i]-bg[i]) for p in corners for i in range(3))>25:
        return None,'background not uniform',bg
    pixels=im.resize((192,120),Image.Resampling.BILINEAR).load()
    hits=[]
    for y in range(120):
        for x in range(192):
            color=pixels[x,y]
            if max(abs(color[i]-bg[i]) for i in range(3))>=28:
                hits.append((x,y))
    if len(hits)<70 or len(hits)>.75*192*120:
        return None,'inconclusive foreground',bg
    xs=sorted(x for x,y in hits)
    ys=sorted(y for x,y in hits)
    q=int(len(hits)*.001)
    x0,x1,y0,y1=xs[q],xs[-q-1],ys[q],ys[-q-1]
    if x1-x0<8 or y1-y0<6 or (x1-x0>190 and y1-y0>117):
        return None,'inconclusive foreground bounds',bg
    box=((x0-1)*w/192,(y0-1)*h/120,(x1+2)*w/192,(y1+2)*h/120)
    cx,cy=(box[0]+box[2])/2,(box[1]+box[3])/2
    return (box,(cx-w/2)/w,(cy-h/2)/h),None,bg

def align(im,box,bg):
    w,h=im.size
    bw,bh=box[2]-box[0],box[3]-box[1]
    scale=min(.86*1600/bw,.80*900/bh,1.65)
    r=im.resize((round(w*scale),round(h*scale)),Image.Resampling.LANCZOS)
    cx,cy=(box[0]+box[2])/2,(box[1]+box[3])/2
    canvas=Image.new('RGB',TARGET,bg)
    canvas.paste(r,(round(800-cx*scale),round(450-cy*scale)))
    return canvas,scale

def run(apply):
    catalog=json.loads(CAT.read_text('utf-8'))
    results=[]
    corrected=0
    for item in catalog:
        if 'illustration' not in item:
            continue
        p=DIR/(item['slug']+'.webp')
        if not p.is_file():
            raise SystemExit('Missing image: '+str(p))
        with Image.open(p) as src: im=src.convert('RGB')
        declared=(item['illustration']['width'],item['illustration']['height'])
        if im.size!=declared:
            raise SystemExit(f"Metadata mismatch {item['slug']}: {im.size} != {declared}")
        found,reason,bg=find_subject(im)
        record={'slug':item['slug'],'size':list(im.size)}
        if not found:
            record.update(status='manual-review',reason=reason)
        else:
            box,dx,dy=found
            record.update(offset_x=round(dx,3),offset_y=round(dy,3))
            if abs(dx)<=.075 and abs(dy)<=.08:
                record['status']='centered'
            elif im.size==TARGET:
                record['status']='normalized-previously'
            elif apply:
                normalized,scale=align(im,box,bg)
                normalized.save(p,'WEBP',quality=94,method=6)
                item['illustration']['width'],item['illustration']['height']=TARGET
                record.update(status='corrected',scale=round(scale,3))
                corrected+=1
            else:
                record['status']='off-center'
        results.append(record)
    if len(catalog)!=337 or len(results)!=265:
        raise SystemExit('Unexpected catalog/image count')
    if apply:
        if corrected:
            CAT.write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n','utf-8')
        REPORT.parent.mkdir(parents=True,exist_ok=True)
        REPORT.write_text(json.dumps({
            'catalog':len(catalog),'image_count':len(results),'image_pending':72,
            'corrected':corrected,'results':results,
            'method':'subject bounding box, 1600x900 solid-matte reframing; no crop of detected subject'
        },ensure_ascii=False,indent=2)+'\n','utf-8')
    print(json.dumps({'illustrated':len(results),'pending':72,'corrected':corrected,
                      'manual_review':sum(r['status']=='manual-review' for r in results),
                      'off_center':sum(r['status']=='off-center' for r in results)},ensure_ascii=False))

if __name__=='__main__':
    ap=argparse.ArgumentParser()
    ap.add_argument('--apply',action='store_true')
    ap.add_argument('--check',action='store_true')
    args=ap.parse_args()
    run(args.apply)
