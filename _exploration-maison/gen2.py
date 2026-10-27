#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Overlay hybride : photo (raster) en fond + calque interactif vectoriel.
Sorties dans _exploration-maison/ : preview-photo.html + MaisonInteractive.hybride.astro
Source unique des zones : zones.py (coordonnees en % de l'image)."""
import importlib.util, os

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("z", os.path.join(HERE, "zones.py"))
z = importlib.util.module_from_spec(spec)
spec.loader.exec_module(z)
ZONES = z.ZONES
MARK = getattr(z, "MARK", {})
OUT = HERE

NOM={'toiture':'Toiture & couverture','charpente':'Charpente','isolation':'Isolation thermique',
 'facade':'Façade & ravalement','maconnerie':'Maçonnerie & gros œuvre','menuiseries':'Menuiseries extérieures',
 'extension':'Extension & surélévation','cuisine':'Cuisine & plomberie','salle-de-bain':'Salle de bain & étanchéité',
 'chauffage':'Chauffage & climatisation','electricite':'Électricité','finitions':'Plâtrerie, carrelage & peinture'}
SLUG={'toiture':'toiture-couverture','charpente':'charpente','isolation':'isolation-thermique',
 'facade':'facade-ravalement','maconnerie':'maconnerie-gros-oeuvre','menuiseries':'menuiseries-exterieures',
 'extension':'extension-surelevation','cuisine':'cuisine','salle-de-bain':'salle-de-bain',
 'chauffage':'chauffage-climatisation','electricite':'electricite','finitions':'platrerie-peinture-carrelage'}
def esc(t): return t.replace("&","&amp;")

# maison-coupe.webp : 1600×893 px
RATIO = 1600 / 893
VB_W, VB_H = 1560, 900
IMG_X, IMG_W = 290, 1000
IMG_H = IMG_W / RATIO
IMG_Y = (VB_H - IMG_H) / 2

# Calibrage global (zones.py trace sur PNG source ; leger decalage gauche+bas sur le webp).
# Ajuster ici puis relancer gen2.py — s'applique aux 12 polygones et aux pastilles MARK.
OFFSET_X = 4
OFFSET_Y = -4


def AX(xp):
    return round(IMG_X + (xp + OFFSET_X) * IMG_W / 100, 1)


def AY(yp):
    return round(IMG_Y + (yp + OFFSET_Y) * IMG_H / 100, 1)
def centroid(pts):
    xs=[AX(x) for x,y in pts]; ys=[AY(y) for x,y in pts]
    return (round(sum(xs)/len(xs),1), round(sum(ys)/len(ys),1))
def ptsattr(pts): return " ".join(f"{AX(x)},{AY(y)}" for x,y in pts)

CENT={k:( (AX(MARK[k][0]),AY(MARK[k][1])) if k in MARK else centroid(v)) for k,v in ZONES.items()}
LEFT=['facade','menuiseries','isolation','maconnerie','chauffage','finitions']
RIGHT=['toiture','charpente','salle-de-bain','cuisine','electricite','extension']
def col_layout(ids,xlab,anchor):
    ids=sorted(ids,key=lambda k:CENT[k][1])
    n=len(ids); top,bot=110,800; step=(bot-top)/(n-1)
    out={}
    for i,k in enumerate(ids): out[k]=(xlab, round(top+i*step,1), anchor)
    return out
LAB={}; LAB.update(col_layout(LEFT,278,'end')); LAB.update(col_layout(RIGHT,1300,'start'))

def zones_svg(href_fn,xlink):
    href=('xlink:href' if xlink else 'href')
    out=[]
    for k,pts in ZONES.items():
        out.append(f'<a class="zone" data-id="{k}" {href}={href_fn(k)}><title>{esc(NOM[k]) if False else "%TITLE_"+k+"%"}</title>'
                   f'<polygon class="hit" points="{ptsattr(pts)}"/></a>')
    return "\n".join(out)
def labels_svg(txt_fn):
    out=[]
    for k in ZONES:
        xl,yl,anc=LAB[k]; cx,cy=CENT[k]
        dx=-8 if anc=='end' else 8
        out.append(f'<g class="lab" data-id="{k}">'
                   f'<line x1="{cx}" y1="{cy}" x2="{xl}" y2="{yl}" class="lead"/>'
                   f'<circle cx="{cx}" cy="{cy}" r="4" class="leaddot"/>'
                   f'<text x="{xl+dx}" y="{yl+4}" text-anchor="{anc}" class="ltxt">%TXT_{k}%</text></g>')
    return "\n".join(out)

STYLE_TPL="""
.hybride .wrap{{position:relative;width:100%}}
.hybride svg{{width:100%;height:auto;display:block;overflow:visible}}
.labels{{pointer-events:none;user-select:none;-webkit-user-select:none}}
.hit{{fill:transparent;stroke:transparent;stroke-width:2;cursor:pointer;transition:fill-opacity .15s,fill .15s,stroke .15s}}
.zone:hover .hit,.zone:focus-visible .hit,.zone.is-active .hit{{fill:{ter};fill-opacity:.30;stroke:{ter}}}
.hybride svg a.zone:focus,.hybride svg a.zone:active{{outline:none!important}}
.legend-item:focus:not(:focus-visible){{outline:none}}
.lead{{stroke:{ink};stroke-width:1.2;opacity:.5}}
.leaddot{{fill:{ter};stroke:{lowest};stroke-width:1.5}}
.ltxt{{font:600 14px system-ui,-apple-system,Segoe UI,Arial,sans-serif;fill:{ink}}}
.lab.is-active .ltxt{{fill:{ter}}}
.lab.is-active .lead{{opacity:1;stroke:{ter}}}
.lab.is-active .leaddot{{r:5.5}}
"""
HEXV=dict(ter="#c76c00",ink="#1a1c1c",lowest="#ffffff")
VARV=dict(ter="var(--color-tertiary)",ink="var(--color-on-surface)",lowest="var(--color-surface-container-lowest)")

def build_svg(img_href,href_fn,txt_fn,xlink):
    ns='xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"'
    body=zones_svg(href_fn,xlink)
    labs=labels_svg(txt_fn)
    svg=(f'<svg viewBox="0 0 {VB_W} {VB_H}" {ns} role="img" '
         f'aria-label="Coupe d\'une maison ; chaque partie est un lien vers un corps de metier.">'
         f'<image href="{img_href}" xlink:href="{img_href}" x="{IMG_X}" y="{round(IMG_Y,1)}" '
         f'width="{IMG_W}" height="{round(IMG_H,1)}" preserveAspectRatio="xMidYMid meet"/>'
         f'\n{body}\n<g class="labels">\n{labs}\n</g>\n</svg>')
    # substitution titres / textes
    for k in ZONES:
        svg=svg.replace(f'%TITLE_{k}%', txt_fn(k,True))
        svg=svg.replace(f'%TXT_{k}%', txt_fn(k,False))
    return svg

# ---------- preview-photo.html (autonome) ----------
ROOT=";".join(f"--color-{a}:{b}" for a,b in [("on-surface","#1a1c1c"),("on-surface-variant","#46474a"),
 ("outline","#76777b"),("outline-variant","#c7c6ca"),("surface","#f9f9f9"),("surface-container-lowest","#ffffff"),
 ("surface-container","#eeeeee"),("tertiary","#c76c00")])
svg_prev=build_svg("maison-coupe.webp",
    href_fn=lambda k:f'"#{SLUG[k]}"',
    txt_fn=lambda k,t=False: esc(NOM[k]),
    xlink=True)
legend="\n".join(f'<li><a class="legend-item" data-id="{k}" href="#{SLUG[k]}"><span class="dot"></span>{esc(NOM[k])}</a></li>' for k in ZONES)
HTML=f"""<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Maison hybride — photo + calque interactif</title>
<style>
:root{{{ROOT}}}
*{{box-sizing:border-box}} body{{margin:0;font-family:system-ui,-apple-system,Segoe UI,Arial,sans-serif;background:var(--color-surface);color:var(--color-on-surface)}}
.wrap-page{{max-width:1240px;margin:0 auto;padding:40px 24px}}
h1{{font-size:22px;margin:0 0 4px}} .sub{{color:var(--color-on-surface-variant);margin:0 0 24px;font-size:15px}}
.card{{border:1px solid var(--color-outline-variant);background:var(--color-surface-container-lowest);padding:20px}}
{STYLE_TPL.format(**HEXV)}
ul{{list-style:none;padding:0;margin:24px 0 0;display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--color-outline-variant);border:1px solid var(--color-outline-variant)}}
@media(max-width:900px){{ul{{grid-template-columns:repeat(2,1fr)}}}} @media(max-width:560px){{ul{{grid-template-columns:1fr}}}}
.legend-item{{display:flex;align-items:center;gap:10px;background:var(--color-surface-container-lowest);padding:14px;text-decoration:none;color:var(--color-on-surface);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;transition:background .15s}}
.dot{{width:8px;height:8px;background:var(--color-outline);flex:0 0 auto;transition:background .15s}}
.legend-item:hover,.legend-item.is-active{{background:var(--color-surface-container)}}
.legend-item:hover .dot,.legend-item.is-active .dot{{background:var(--color-tertiary)}}
</style></head><body><div class="wrap-page">
<h1>Maison interactive — hybride (photo + calque)</h1>
<p class="sub">Photo en fond, 12 zones cliquables alignées dessus, libellés FR nets. Survolez une zone ou la légende. Exploration — n'affecte pas le site.</p>
<div class="card hybride"><div class="wrap">{svg_prev}</div><ul>{legend}</ul></div>
</div>
<script>
const Z=[...document.querySelectorAll('.zone')],I=[...document.querySelectorAll('.legend-item')],L=[...document.querySelectorAll('.lab')];
const set=(id,a)=>[...Z,...I,...L].forEach(e=>{{if(e.dataset.id===id)e.classList.toggle('is-active',a)}});
[...Z,...I].forEach(e=>{{e.addEventListener('mousedown',ev=>{{if(ev.button===0)ev.preventDefault()}})}});
[...Z,...I,...L].forEach(e=>{{const id=e.dataset.id;if(!id)return;
 e.addEventListener('mouseenter',()=>set(id,true));e.addEventListener('mouseleave',()=>set(id,false));
 e.addEventListener('focus',()=>set(id,true));e.addEventListener('blur',()=>set(id,false));}});
</script></body></html>"""
open(os.path.join(OUT,"preview-photo.html"),"w").write(HTML)
print("preview-photo.html OK")

# ---------- MaisonInteractive.hybride.astro ----------
svg_astro=build_svg("/assets/maison-coupe.webp",
    href_fn=lambda k:f"{{hrefFor('{k}')}}",
    txt_fn=lambda k,t=False:(f"{{labelFor('{k}')}}"),
    xlink=False)
svg_astro_ind="\n".join("      "+l for l in svg_astro.split("\n"))
ASTRO='''---
// Maison interactive — HYBRIDE (photo realiste + calque interactif vectoriel).
// EXPLORATION : variante a comparer avec MaisonInteractive.astro (line-art).
// Contrat identique : 12 data-id = corps-metier.ts (source de verite unique, DRY).
// Coordonnees des zones en % (cf. _exploration-maison/zones.py + gen2.py).
// PROMOTION : copier _exploration-maison/maison-coupe.webp -> public/assets/maison-coupe.webp
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

    <div class="hybride mx-auto mb-10 max-w-5xl border border-outline-variant bg-surface-container-lowest p-4 sm:p-8">
      <div class="wrap">
__SVG__
      </div>
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
__STYLE__
  .legend-item:hover .legend-dot,.legend-item:focus-visible .legend-dot,.legend-item.is-active .legend-dot { background-color: var(--color-tertiary); }
  .legend-item.is-active,.legend-item:hover { background-color: var(--color-surface-container); }
</style>

<script>
  const Z = Array.from(document.querySelectorAll<HTMLElement>('#expertises .zone'));
  const I = Array.from(document.querySelectorAll<HTMLElement>('#expertises .legend-item'));
  const L = Array.from(document.querySelectorAll<HTMLElement>('#expertises .lab'));
  const set = (id: string, a: boolean) => { for (const el of [...Z,...I,...L]) if (el.dataset.id===id) el.classList.toggle('is-active', a); };
  for (const el of [...Z,...I]) { el.addEventListener('mousedown', (e) => { if (e.button === 0) e.preventDefault(); }); }
  for (const el of [...Z,...I,...L]) { const id = el.dataset.id; if(!id) continue;
    el.addEventListener('mouseenter',()=>set(id,true)); el.addEventListener('mouseleave',()=>set(id,false));
    el.addEventListener('focus',()=>set(id,true)); el.addEventListener('blur',()=>set(id,false)); }
</script>
'''
astro=ASTRO.replace("__SVG__",svg_astro_ind).replace("__STYLE__",STYLE_TPL.format(**VARV))
open(os.path.join(OUT,"MaisonInteractive.hybride.astro"),"w").write(astro)
print("MaisonInteractive.hybride.astro OK")
