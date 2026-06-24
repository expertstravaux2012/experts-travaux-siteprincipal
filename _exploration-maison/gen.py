#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Genere la maison interactive v2 (iso 3/4, coupe de coin).
Projection isometrique parallele -> geometrie exacte et maintenable.
Sorties :
  - maison.svg            (hex inline, pour verification PNG)
  - preview.html          (page autonome ouvrable au navigateur)
  - MaisonInteractive.v2.astro (integre corps-metier.ts, tokens charte)
Contrat conserve : les 12 data-id identiques a corps-metier.ts (DRY/SOLID).
"""
import math, os, re

COS=math.cos(math.radians(30)); SIN=math.sin(math.radians(30))
S=40.0; OX=600.0; OY=505.0
def iso(x,y,z): return (round(OX+(x-y)*COS*S,1), round(OY-z*S+(x+y)*SIN*S,1))
def P(c): return " ".join(f"{p[0]},{p[1]}" for p in c)
def poly(c,cls,extra=""): return f'<polygon class="{cls}" points="{P(c)}" {extra}/>'
def line(a,b,cls): return f'<line x1="{a[0]}" y1="{a[1]}" x2="{b[0]}" y2="{b[1]}" class="{cls}"/>'
def pth(d,cls): return f'<path class="{cls}" d="{d}"/>'

W,D=6.4,5.2
H1,H2=2.8,2.8; HW=H1+H2; RH=2.1; MY=D/2

# ---------- DECOR (statique, non cliquable) ----------
decor=[]
ov=-0.35; dz=0.55
f0=iso(ov,ov,0); f1=iso(W-ov,ov,0); f2=iso(W-ov,D-ov,0); f3=iso(ov,D-ov,0)
f0b=iso(ov,ov,-dz); f1b=iso(W-ov,ov,-dz); f3b=iso(ov,D-ov,-dz)
decor+=[poly([f0,f1,f2,f3],"fnd-top"),poly([f0,f1,f1b,f0b],"fnd-r"),poly([f0,f3,f3b,f0b],"fnd-l")]
decor.append(poly([iso(0,D,0),iso(W,D,0),iso(W,D,HW),iso(0,D,HW)],"in-far"))
decor.append(poly([iso(W,0,0),iso(W,D,0),iso(W,D,HW),iso(W,0,HW)],"in-side"))
decor.append(poly([iso(0,0,H1),iso(W,0,H1),iso(W,D,H1),iso(0,D,H1)],"floor-top"))
te=0.34
decor.append(poly([iso(0,0,H1),iso(W,0,H1),iso(W,0,H1-te),iso(0,0,H1-te)],"floor-edge"))
decor.append(poly([iso(0,0,H1),iso(0,D,H1),iso(0,D,H1-te),iso(0,0,H1-te)],"floor-edge"))
decor.append(line(iso(0,MY,0),iso(0,MY,H1),"in-line"))
# toit (faces non cliquables : pan arriere + pignon droit)
rg0=iso(0,MY,HW+RH); rg1=iso(W,MY,HW+RH)
ea0=iso(0,0,HW); ea1=iso(W,0,HW); eb0=iso(0,D,HW); eb1=iso(W,D,HW)
roof_front=[ea0,ea1,rg1,rg0]; roof_back=[eb0,eb1,rg1,rg0]
gable_r=[iso(W,0,HW),iso(W,D,HW),iso(W,MY,HW+RH)]
gable_l=[iso(0,0,HW),iso(0,MY,HW+RH),iso(0,D,HW)]
decor+=[poly(roof_back,"roof-back"),poly(gable_r,"gable-r")]

# ---------- ART par zone ----------
def box3d(x0,y0,x1,y1,z0,z1,ct,cf,cs):
    A=iso(x0,y0,z1);B=iso(x1,y0,z1);C=iso(x1,y1,z1);Dp=iso(x0,y1,z1)
    a=iso(x0,y0,z0);b=iso(x1,y0,z0);c=iso(x1,y1,z0)
    return poly([A,B,C,Dp],ct)+poly([A,B,b,a],cf)+poly([B,C,c,b],cs)
def frect(x0,y0,x1,y1,z,cls): return poly([iso(x0,y0,z),iso(x1,y0,z),iso(x1,y1,z),iso(x0,y1,z)],cls)
def wave(p0,p1,n=9,amp=7):
    (x0,y0),(x1,y1)=p0,p1; d=f"M {x0} {y0} "
    for i in range(1,n+1):
        t=i/n; x=x0+(x1-x0)*t; y=y0+(y1-y0)*t
        nx=-(y1-y0); ny=(x1-x0); L=math.hypot(nx,ny) or 1; nx/=L; ny/=L
        o=amp*(1 if i%2 else -1); d+=f"Q {x+nx*o:.1f} {y+ny*o:.1f} {x:.1f} {y:.1f} "
    return d

# charpente
truss=[]
for xx in (0.0,1.5,3.0):
    b0=iso(xx,0,HW); b1=iso(xx,D,HW); top=iso(xx,MY,HW+RH); mid=iso(xx,MY,HW)
    truss+=[line(b0,top,"truss"),line(b1,top,"truss"),line(b0,b1,"truss"),line(mid,top,"truss-thin"),
            line(iso(xx,D*0.25,HW),iso(xx,MY*0.6,HW+RH*0.55),"truss-thin"),
            line(iso(xx,D*0.75,HW),iso(xx,MY*1.4,HW+RH*0.55),"truss-thin")]
truss+=[line(iso(0,MY,HW+RH),iso(3.0,MY,HW+RH),"truss-thin"),line(iso(0,0,HW),iso(3.0,0,HW),"truss-thin")]
# toiture (tuiles)
tiles=[line((round(ea0[0]+(rg0[0]-ea0[0])*t,1),round(ea0[1]+(rg0[1]-ea0[1])*t,1)),
            (round(ea1[0]+(rg1[0]-ea1[0])*t,1),round(ea1[1]+(rg1[1]-ea1[1])*t,1)),"tile") for t in [i/6 for i in range(1,6)]]
# isolation
iso_wave=wave(iso(0,0,HW),iso(0,MY,HW+RH))+" "+wave(iso(0,D,HW),iso(0,MY,HW+RH))
# extension
exd1=D+2.2; exh=H1*0.95
ex_top=[iso(0,D,exh),iso(W*0.5,D,exh),iso(W*0.5,exd1,exh),iso(0,exd1,exh)]
ex_left=[iso(0,D,0),iso(0,exd1,0),iso(0,exd1,exh),iso(0,D,exh)]
ex_front=[iso(0,exd1,0),iso(W*0.5,exd1,0),iso(W*0.5,exd1,exh),iso(0,exd1,exh)]
# cuisine
cuisine=box3d(3.3,3.0,5.7,3.7,0,0.95,"wood-t","wood-f","wood-s")+box3d(4.3,4.3,6.0,4.8,0,1.8,"unit-t","unit-f","unit-s")
# chauffage
heat=box3d(1.1,-1.15,2.3,-0.3,0,1.0,"pac-t","pac-f","pac-s")+"".join(line(iso(0.7+i*0.55,0.5,0.02),iso(0.7+i*0.55,2.7,0.02),"coil") for i in range(5))
# salle de bain
sdb=frect(3.5,2.9,5.5,4.4,H1+0.03,"shower")+poly([iso(3.5,2.9,H1),iso(3.5,4.4,H1),iso(3.5,4.4,H1+1.9),iso(3.5,2.9,H1+1.9)],"bglass")
sdb+=line(iso(5.2,3.1,H1+0.1),iso(5.2,3.1,H1+1.8),"fix")+line(iso(5.2,3.1,H1+1.8),iso(4.7,3.1,H1+1.8),"fix")
# electricite
elec=box3d(5.65,0.9,5.95,1.7,H1+0.8,H1+1.6,"panel-t","panel-f","panel-s")
elec+=pth(f"M {iso(5.8,1.3,H1+0.8)[0]} {iso(5.8,1.3,H1+0.8)[1]} L {iso(5.8,1.3,H1-0.1)[0]} {iso(5.8,1.3,H1-0.1)[1]} L {iso(4.6,0.8,H1-0.1)[0]} {iso(4.6,0.8,H1-0.1)[1]}","cable")
# menuiseries (fenetres facade)
win=[]
for (cx,z0) in [(1.4,0.6),(3.7,0.6),(1.4,H1+0.6),(3.7,H1+0.6)]:
    ww,hh=1.2,1.5
    win.append(poly([iso(cx,0,z0),iso(cx+ww,0,z0),iso(cx+ww,0,z0+hh),iso(cx,0,z0+hh)],"win"))
    win.append(line(iso(cx+ww/2,0,z0),iso(cx+ww/2,0,z0+hh),"winbar"))
    win.append(line(iso(cx,0,z0+hh/2),iso(cx+ww,0,z0+hh/2),"winbar"))
facade_poly=[iso(0,0,0),iso(W,0,0),iso(W,0,HW),iso(0,0,HW)]

# ---------- structure par zone : hit + art + leader ----------
ZONES=[
 ("maconnerie",[[f0,f1,f1b,f0b],[f0,f3,f3b,f0b]], "", iso(W*0.7,0,-0.3),(1115,745)),
 ("finitions",[[iso(0,0,H1),iso(W,0,H1),iso(W,D,H1),iso(0,D,H1)]], "", iso(0,D*0.5,H1),(255,400)),
 ("facade",[facade_poly], poly(facade_poly,"facade-fill")+line(iso(0,0,H1),iso(W,0,H1),"facade-band"), iso(W,0,H1*1.25),(1115,330)),
 ("toiture",[roof_front], poly(roof_front,"roof-front")+"".join(tiles), iso(W*0.5,MY*0.5,HW+RH*0.75),(1115,150)),
 ("charpente",[gable_l], "".join(truss), iso(1.5,MY,HW+RH*0.6),(255,150)),
 ("isolation",[gable_l], pth(iso_wave,"iso-wave"), iso(0,MY,HW+RH*0.9),(255,255)),
 ("extension",[ex_left,ex_front], poly(ex_top,"ext-t")+poly(ex_left,"ext-l")+poly(ex_front,"ext-f"), iso(0,exd1*0.8,exh*0.5),(255,710)),
 ("cuisine",[[iso(3.0,2.8,0),iso(W,2.8,0),iso(W,D,0),iso(3.0,D,0)]], cuisine, iso(4.6,3.6,0.6),(1115,650)),
 ("chauffage",[[iso(0.5,-1.3,0),iso(2.5,-1.3,0),iso(2.5,0.2,0),iso(0.5,0.2,0)]], heat, iso(1.7,-0.7,0.6),(255,560)),
 ("salle-de-bain",[[iso(3.3,2.8,H1),iso(W,2.8,H1),iso(W,D,H1),iso(3.3,D,H1)]], sdb, iso(4.5,3.6,H1+0.6),(1115,540)),
 ("electricite",[[iso(5.4,0.7,H1),iso(W,0.7,H1),iso(W,2.0,H1),iso(5.4,2.0,H1)]], elec, iso(5.8,1.3,H1+1.2),(1115,430)),
 ("menuiseries",[facade_poly], "".join(win), iso(3.7,0,H1+1.3),(1115,235)),
]

NOM={'toiture':'Toiture & couverture','charpente':'Charpente','isolation':'Isolation thermique',
 'facade':'Façade & ravalement','maconnerie':'Maçonnerie & gros œuvre','menuiseries':'Menuiseries extérieures',
 'extension':'Extension & surélévation','cuisine':'Cuisine & plomberie','salle-de-bain':'Salle de bain & étanchéité',
 'chauffage':'Chauffage & climatisation','electricite':'Électricité','finitions':'Plâtrerie, carrelage & peinture'}
def esc(t): return t.replace("&","&amp;")

# ---------- STYLE ----------
PALETTE={  # classe -> (token-css-var, proprietes)
}
STYLE_TPL="""
.fnd-top{{fill:{shi};stroke:{ink};stroke-width:1.5}}
.fnd-r{{fill:{out};stroke:{ink};stroke-width:1.5}}
.fnd-l{{fill:{outv};stroke:{ink};stroke-width:1.5}}
.in-far{{fill:{low};stroke:{outv};stroke-width:1}}
.in-side{{fill:{shi};stroke:{outv};stroke-width:1}}
.floor-top{{fill:{con};stroke:{ink};stroke-width:1.4}}
.floor-edge{{fill:{outv};stroke:{ink};stroke-width:1.4}}
.in-line{{stroke:{outv};stroke-width:1}}
.roof-back{{fill:{outv};stroke:{ink};stroke-width:1.5}}
.gable-r{{fill:{shi};stroke:{ink};stroke-width:1.5}}
.hit{{fill:transparent;stroke:none}}
.lead{{stroke:{out};stroke-width:1;fill:none}}
.leaddot{{fill:{ter}}}
.ltxt{{font:600 14px system-ui,-apple-system,Segoe UI,Arial,sans-serif;fill:{ink}}}
/* art par zone */
.facade-fill{{fill:{con};stroke:{ink};stroke-width:1.6}}
.facade-band{{stroke:{ter};stroke-width:3}}
.roof-front{{fill:{terc};stroke:{ink};stroke-width:1.6}}
.tile{{stroke:{ter};stroke-width:1;opacity:.5}}
.truss{{stroke:{ink};stroke-width:2;fill:none;stroke-linecap:round}}
.truss-thin{{stroke:{inkv};stroke-width:1.2;fill:none}}
.iso-wave{{stroke:{ter};stroke-width:2;fill:none;opacity:.8}}
.win{{fill:{secc};stroke:{ink};stroke-width:1.4}}
.winbar{{stroke:{ink};stroke-width:1}}
.ext-t{{fill:{shi};stroke:{ink};stroke-width:1.5}}
.ext-l{{fill:{outv};stroke:{ink};stroke-width:1.5}}
.ext-f{{fill:{con};stroke:{ink};stroke-width:1.5}}
.wood-t{{fill:{terc};stroke:{ink};stroke-width:1.2}}
.wood-f{{fill:{terc};stroke:{ink};stroke-width:1.2;opacity:.85}}
.wood-s{{fill:{terc};stroke:{ink};stroke-width:1.2;opacity:.7}}
.unit-t{{fill:{con};stroke:{ink};stroke-width:1.2}}
.unit-f{{fill:{shi};stroke:{ink};stroke-width:1.2}}
.unit-s{{fill:{outv};stroke:{ink};stroke-width:1.2}}
.pac-t{{fill:{con};stroke:{ink};stroke-width:1.2}}
.pac-f{{fill:{shi};stroke:{ink};stroke-width:1.2}}
.pac-s{{fill:{outv};stroke:{ink};stroke-width:1.2}}
.coil{{stroke:{ter};stroke-width:1.4;opacity:.7}}
.shower{{fill:{secc};stroke:{ink};stroke-width:1.2;opacity:.8}}
.bglass{{fill:{secc};stroke:{ink};stroke-width:1.2;opacity:.5}}
.fix{{stroke:{inkv};stroke-width:1.6}}
.panel-t{{fill:{con};stroke:{ink};stroke-width:1.2}}
.panel-f{{fill:{shi};stroke:{ink};stroke-width:1.2}}
.panel-s{{fill:{outv};stroke:{ink};stroke-width:1.2}}
.cable{{stroke:{ter};stroke-width:1.6;fill:none}}
/* interaction */
.zone{{cursor:pointer}}
.zone .hit{{transition:fill .15s ease}}
.zone:hover .hit,.zone:focus-visible .hit,.zone.is-active .hit{{fill:{terc};opacity:.55}}
.zone:focus-visible{{outline:none}}
"""
HEX=dict(ink="#1a1c1c",inkv="#46474a",out="#76777b",outv="#c7c6ca",low="#f3f3f4",
         con="#eeeeee",shi="#e8e8e8",ter="#c76c00",terc="#ffdcc3",secc="#d3e1f1")
VAR=dict(ink="var(--color-on-surface)",inkv="var(--color-on-surface-variant)",out="var(--color-outline)",
         outv="var(--color-outline-variant)",low="var(--color-surface-container-low)",con="var(--color-surface-container)",
         shi="var(--color-surface-container-high)",ter="var(--color-tertiary)",terc="var(--color-tertiary-container)",
         secc="var(--color-secondary-container)")
STYLE_HEX=STYLE_TPL.format(**HEX)
STYLE_VAR=STYLE_TPL.format(**VAR)

VB='viewBox="0 0 1380 840"'
def leader(ax,ay,tx,ty,nom_expr):
    side="end" if tx<600 else "start"
    dx=-6 if side=="end" else 6
    return (f'<line x1="{ax}" y1="{ay}" x2="{tx}" y2="{ty}" class="lead"/>'
            f'<circle cx="{ax}" cy="{ay}" r="3" class="leaddot"/>'
            f'<text x="{tx+dx}" y="{ty+4}" text-anchor="{side}" class="ltxt">{nom_expr}</text>')

# ============ 1) maison.svg (HEX, labels en dur, pour PNG) ============
def build(style, href_fn, nom_fn, xlink=True):
    href_attr='xlink:href' if xlink else 'href'
    body=[f'<g class="decor" aria-hidden="true">',*decor,'</g>']
    for did,hits,art,anchor,(tx,ty) in ZONES:
        h="".join(poly(hp,"hit") for hp in hits)
        body.append(f'<a class="zone" data-id="{did}" {href_attr}={href_fn(did)} aria-label={nom_fn(did,attr=True)}>'
                    f'<title>{nom_fn(did)}</title>{h}{art}</a>')
    body.append('<g class="labels" aria-hidden="true">')
    for did,hits,art,anchor,(tx,ty) in ZONES:
        body.append(leader(anchor[0],anchor[1],tx,ty,nom_fn(did)))
    body.append('</g>')
    ns='xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' if xlink else ''
    return (f'<svg {VB} {ns} role="img" aria-label="Coupe isometrique d\'une maison ; chaque partie est un lien vers un corps de metier.">'
            f'<style>{style}</style>\n'+"\n".join(body)+'\n</svg>')

# HEX standalone (labels en dur)
svg_hex=build(STYLE_HEX,
    href_fn=lambda d:f'"#{d}"',
    nom_fn=lambda d,attr=False: ('"'+esc(NOM[d])+'"') if attr else esc(NOM[d]))
open("maison.svg","w").write('<rect width="1380" height="840" fill="#fff"/>'.join(['',''])+svg_hex.replace("<style>","<style>svg{background:#fff}\n",1))
# pour PNG, ajoute fond blanc
open("maison.svg","w").write(svg_hex.replace('<style>', '<style>\n', 1))
print("maison.svg OK")

OUT="/sessions/great-affectionate-bell/mnt/experts-travaux/experts-travaux-site/_exploration-maison"
os.makedirs(OUT,exist_ok=True)

# ============ 2) preview.html (autonome) ============
svg_preview=build(STYLE_VAR,
    href_fn=lambda d:f'"#{d}"',
    nom_fn=lambda d,attr=False: ('"'+esc(NOM[d])+'"') if attr else esc(NOM[d]),
    xlink=True)
legend_items="\n".join(
 f'<li><a class="legend-item" data-id="{d}" href="#{d}"><span class="dot"></span>{esc(NOM[d])}</a></li>'
 for d,_,_,_,_ in ZONES)
ROOT_VARS=";".join(f"--color-{k}:{v}" for k,v in [
 ("on-surface","#1a1c1c"),("on-surface-variant","#46474a"),("outline","#76777b"),
 ("outline-variant","#c7c6ca"),("surface","#f9f9f9"),("surface-container-lowest","#ffffff"),
 ("surface-container-low","#f3f3f4"),("surface-container","#eeeeee"),("surface-container-high","#e8e8e8"),
 ("surface-container-highest","#e2e2e2"),("tertiary","#c76c00"),("tertiary-container","#ffdcc3"),
 ("secondary-container","#d3e1f1")])
HTML=f"""<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Maison interactive v2 — exploration</title>
<style>
:root{{{ROOT_VARS}}}
*{{box-sizing:border-box}}
body{{margin:0;font-family:system-ui,-apple-system,Segoe UI,Arial,sans-serif;background:var(--color-surface);color:var(--color-on-surface)}}
.wrap{{max-width:1180px;margin:0 auto;padding:40px 24px}}
h1{{font-size:22px;font-weight:700;margin:0 0 4px}}
.sub{{color:var(--color-on-surface-variant);margin:0 0 28px;font-size:15px}}
.card{{border:1px solid var(--color-outline-variant);background:var(--color-surface-container-lowest);padding:24px}}
.maison svg{{width:100%;height:auto;overflow:visible}}
ul{{list-style:none;padding:0;margin:28px 0 0;display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--color-outline-variant);border:1px solid var(--color-outline-variant)}}
@media(max-width:900px){{ul{{grid-template-columns:repeat(2,1fr)}}}}
@media(max-width:560px){{ul{{grid-template-columns:1fr}}}}
.legend-item{{display:flex;align-items:center;gap:10px;background:var(--color-surface-container-lowest);padding:14px;text-decoration:none;color:var(--color-on-surface);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;transition:background .15s}}
.dot{{width:8px;height:8px;background:var(--color-outline);flex:0 0 auto;transition:background .15s}}
.legend-item:hover,.legend-item.is-active{{background:var(--color-surface-container)}}
.legend-item:hover .dot,.legend-item.is-active .dot{{background:var(--color-tertiary)}}
</style></head>
<body><div class="wrap">
<h1>Maison interactive — proposition v2 (iso 3/4)</h1>
<p class="sub">Re-dessin inspiré de l'illustration de référence, dans la charte du site. Survolez une zone ou la légende. Dossier d'exploration — n'affecte pas le site.</p>
<div class="card">
<div class="maison">{svg_preview}</div>
<ul>{legend_items}</ul>
</div></div>
<script>
const zones=[...document.querySelectorAll('.zone')],items=[...document.querySelectorAll('.legend-item')];
const set=(id,a)=>{{[...zones,...items].forEach(e=>{{if(e.dataset.id===id)e.classList.toggle('is-active',a)}})}};
[...zones,...items].forEach(e=>{{const id=e.dataset.id;if(!id)return;
 e.addEventListener('mouseenter',()=>set(id,true));e.addEventListener('mouseleave',()=>set(id,false));
 e.addEventListener('focus',()=>set(id,true));e.addEventListener('blur',()=>set(id,false));}});
</script></body></html>"""
open(os.path.join(OUT,"preview.html"),"w").write(HTML)
print("preview.html OK")

# ============ 3) MaisonInteractive.v2.astro ============
svg_astro=build(STYLE_VAR,
    href_fn=lambda d:f"{{hrefFor('{d}')}}",
    nom_fn=lambda d,attr=False: (f"{{labelFor('{d}')}}"),
    xlink=False)
ASTRO='''---
// Maison interactive v2 — perspective isometrique 3/4 (coupe de coin).
// EXPLORATION : variante a comparer avec MaisonInteractive.astro (line-art).
// Contrat identique : 12 data-id = corps-metier.ts (source de verite unique, DRY).
// Geometrie generee par projection iso (cf. _exploration-maison/gen.py).
import { corpsMetier } from '../src/data/corps-metier';
import SectionHeading from '../src/components/ui/SectionHeading.astro';

const byId = Object.fromEntries(corpsMetier.map((c) => [c.id, c]));
const hrefFor = (id: string) => `/metiers/${byId[id].slug}`;
const labelFor = (id: string) => byId[id].nom;
---

<section id="expertises" class="border-b border-outline-variant bg-surface">
  <div class="mx-auto max-w-[1280px] px-4 py-16 sm:px-8 lg:px-16 lg:py-24">
    <SectionHeading eyebrow="Expertises" title="Un savoir-faire complet, du gros œuvre aux finitions." class="mb-4" />
    <p class="mb-12 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
      Tous les corps de métier de votre chantier, maîtrisés en interne et coordonnés
      par un seul interlocuteur, du devis à la remise des clés.
    </p>

    <div class="maison mx-auto mb-10 max-w-5xl border border-outline-variant bg-surface-container-lowest p-6 sm:p-10">
__SVG__
    </div>

    <p class="mb-6 text-sm font-semibold uppercase tracking-[0.05em] text-on-surface-variant">
      Cliquez sur un métier pour découvrir notre approche, nos garanties et nos réalisations.
    </p>
    <ul class="grid grid-cols-1 gap-px border border-outline-variant bg-outline-variant sm:grid-cols-2 lg:grid-cols-4">
      {corpsMetier.map((c) => (
        <li>
          <a class="legend-item flex h-full flex-col gap-1 bg-surface-container-lowest p-4 transition-colors" data-id={c.id} href={`/metiers/${c.slug}`}>
            <span class="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.05em] text-on-surface">
              <span class="legend-dot h-2 w-2 shrink-0 bg-outline transition-colors" aria-hidden="true" />
              {c.nom}
            </span>
            <span class="pl-5 text-sm leading-relaxed text-on-surface-variant">{c.description}</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
</section>

<style>
  .maison svg { overflow: visible; }
  .legend-item:hover .legend-dot,.legend-item:focus-visible .legend-dot,.legend-item.is-active .legend-dot { background-color: var(--color-tertiary); }
  .legend-item.is-active,.legend-item:hover { background-color: var(--color-surface-container); }
</style>

<script>
  const zones = Array.from(document.querySelectorAll<HTMLElement>('#expertises .zone'));
  const items = Array.from(document.querySelectorAll<HTMLElement>('#expertises .legend-item'));
  const setActive = (id: string, active: boolean) => {
    for (const el of [...zones, ...items]) { if (el.dataset.id === id) el.classList.toggle('is-active', active); }
  };
  for (const el of [...zones, ...items]) {
    const id = el.dataset.id; if (!id) continue;
    el.addEventListener('mouseenter', () => setActive(id, true));
    el.addEventListener('mouseleave', () => setActive(id, false));
    el.addEventListener('focus', () => setActive(id, true));
    el.addEventListener('blur', () => setActive(id, false));
  }
</script>
'''
# indente le svg dans le bloc
svg_indented="\n".join("      "+l for l in svg_astro.split("\n"))
open(os.path.join(OUT,"MaisonInteractive.v2.astro"),"w").write(ASTRO.replace("__SVG__",svg_indented))
print("MaisonInteractive.v2.astro OK")

# README court
open(os.path.join(OUT,"README.md"),"w").write(
"""# _exploration-maison

Variante **v2** de la maison interactive : perspective isométrique 3/4 (coupe de coin),
inspirée de l'illustration de référence, dans la charte du site.

Dossier préfixé `_` → **ignoré par le routage Astro**, aucun impact sur le site en production.

## Fichiers
- `preview.html` — ouvre dans un navigateur pour juger le rendu (survol + légende).
- `MaisonInteractive.v2.astro` — composant prêt à comparer avec
  `src/components/sections/MaisonInteractive.astro` (même contrat : 12 `data-id`,
  liens via `corps-metier.ts`, tokens charte, a11y, hover synchronisé).
- `gen.py` — générateur de la géométrie (projection isométrique).

## Comparaison
- Actuel : `src/components/sections/MaisonInteractive.astro` (line-art monochrome de face).
- Proposé : ce dossier (iso 3/4 coloré + libellés à rappel).

Pour promouvoir la v2 : remplacer le contenu de l'actuel par celui de `MaisonInteractive.v2.astro`
(en ajustant les chemins d'import `../../` au lieu de `../`).
""")
print("README.md OK")
