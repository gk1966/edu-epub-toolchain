"""Generate accessible 3D pages (EPUB and web variants) and XHTML fallbacks from configs.py.
usage: python3 gen.py <mode: web|epub|fallback> <outdir> [--images <dir with view pngs>]

Copyright (c) 2026 Georgios Korakakis. MIT License, see LICENSE.txt.
"""
import sys, json, html, base64, os, re
sys.path.insert(0, os.path.dirname(__file__))
from configs import PAGES

HERE = os.path.dirname(os.path.abspath(__file__))
GLB = {k: os.path.join(HERE, "models", v) for k, v in {"glb-02": "02-ethyne-structure-3d.glb", "glb-04": "04-sp-orbital-viewer.glb",
       "glb-06": "06-axes-pi-symmetry.glb", "glb-07": "07-complete-sigma-pi-explorer.glb",
       "glb-c2h6": "ethane.glb", "glb-c2h4": "ethene.glb", "glb-c2h2": "ethyne.glb"}.items()}
ENGINE = open(os.path.join(HERE, 'a11y3d.min.js'), encoding='utf-8').read()
VIEWS = ["side", "axis", "top"]
E = html.escape

CSS = """
:root{--paper:#f4f6f8;--panel:#ffffff;--ink:#15202b;--ink-2:#46525e;--rule:#d3dae1;--accent:#0d625d;--accent-tint:#e2f0ee;--focus:#1a56c4;--stage:#f4f6f8;
--font-body:"Atkinson Hyperlegible","Segoe UI","Noto Sans",Arial,sans-serif;--font-data:"IBM Plex Mono",Consolas,"DejaVu Sans Mono",monospace}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--paper:#0b1014;--panel:#141b21;--ink:#e7edf1;--ink-2:#aab7c1;--rule:#2b3741;--accent:#5fc7bd;--accent-tint:#163634;--focus:#8ab4ff;--stage:#0e1318;color-scheme:dark}}
:root[data-theme="dark"]{--paper:#0b1014;--panel:#141b21;--ink:#e7edf1;--ink-2:#aab7c1;--rule:#2b3741;--accent:#5fc7bd;--accent-tint:#163634;--focus:#8ab4ff;--stage:#0e1318;color-scheme:dark}
*{box-sizing:border-box}
[hidden]{display:none!important}
body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--font-body);font-size:16px;line-height:1.55}
main{max-width:1200px;margin:0 auto;padding:20px max(16px,env(safe-area-inset-right,0px)) 32px max(16px,env(safe-area-inset-left,0px));display:grid;gap:20px}
h1,h2,h3{margin:0;line-height:1.2}
h1{font-size:1.75rem}h2{font-size:1.1rem}
p{margin:0;max-width:68ch}
.eyebrow{font-size:.8rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)}
.lede{color:var(--ink-2)}
.small{font-size:.875rem;color:var(--ink-2)}
:focus-visible{outline:3px solid var(--focus);outline-offset:2px}
html:not(.js3d) .js-only{display:none!important}
/* flex-wrap instead of a viewport media query: EPUB readers show pages in narrow columns while the viewport stays wide */
.layout{display:flex;flex-wrap:wrap;gap:20px;align-items:flex-start}
.stagebox{display:grid;gap:10px;flex:2 1 560px;min-width:min(100%,280px)}
.stage{position:relative;aspect-ratio:4/3;max-width:100%;border:1px solid var(--rule);border-radius:10px;overflow:hidden;background:var(--stage)}
.stage canvas{display:block;width:100%;height:100%}
.stage:focus-within{outline:3px solid var(--focus);outline-offset:2px}
.loading{position:absolute;inset:0;display:grid;place-items:center;color:var(--ink-2);padding:16px;text-align:center}
.toolbar{display:flex;flex-wrap:wrap;gap:8px}
button{font:inherit;font-weight:700;font-size:.92rem;padding:7px 12px;border-radius:6px;border:1px solid var(--accent);background:transparent;color:var(--accent);cursor:pointer}
button[aria-pressed="true"]{background:var(--accent);color:var(--panel)}
button:disabled{opacity:.5;cursor:default}
.keys{font-size:.85rem;color:var(--ink-2)}
kbd{font-family:var(--font-data);font-size:.8rem;border:1px solid var(--rule);border-bottom-width:2px;border-radius:4px;padding:0 5px;background:var(--panel);color:var(--ink)}
.side{display:grid;gap:16px;flex:1 1 300px;min-width:min(100%,280px)}
.card{background:var(--panel);border:1px solid var(--rule);border-radius:10px;padding:14px 16px;display:grid;gap:10px;min-width:0}
.parts{list-style:none;margin:0;padding:0;display:grid;gap:6px}
.part{display:grid;grid-template-columns:auto 1fr auto;gap:4px 10px;align-items:center;padding:6px 8px;border-radius:8px}
.part.on{background:var(--accent-tint)}
.part input{width:18px;height:18px;accent-color:var(--accent);margin:0}
html:not(.js3d) .part{grid-template-columns:1fr}
.part label{font-weight:700}
.part .pdesc{grid-column:1/-1;font-size:.88rem;color:var(--ink-2)}
html.js3d .part .pdesc{display:none}
.part .hl{font-size:.82rem;padding:4px 8px}
.key{display:inline-block;vertical-align:middle;margin-right:8px;width:30px;height:18px;border-radius:4px;border:2px solid var(--ink-2)}
.key[data-pattern="stripes"]{background-image:repeating-linear-gradient(45deg,currentColor 0 3px,transparent 3px 7px)}
.key[data-pattern="dots"]{background-image:radial-gradient(currentColor 1.7px,transparent 2px);background-size:6px 6px}
.live{min-height:3.2em;font-size:.95rem;border-left:3px solid var(--accent);padding-left:10px}
.desc ul{margin:0;padding-left:1.2em;display:grid;gap:6px}
details>summary{cursor:pointer;font-weight:700}
.views{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-top:10px}
.views figure{margin:0;display:grid;gap:6px}
.views img{width:100%;height:auto;border:1px solid var(--rule);border-radius:8px;background:#f4f6f8}
.views figcaption{font-size:.85rem;color:var(--ink-2)}
.lbl3d{position:absolute;pointer-events:none;font-size:.8rem;font-weight:700;padding:1px 6px;border-radius:4px;background:var(--panel);color:var(--ink);border:1px solid var(--rule);transform:translate(-50%,-50%);white-space:nowrap}
footer{font-size:.85rem;color:var(--ink-2)}
@media (prefers-reduced-motion: reduce){*{transition:none!important}}
"""



def strip_fns(m):
    d = {k: v for k, v in m.items() if k not in ("post", "build")}
    return d

def part_list(page_id, m):
    rows = []
    for g in m["groups"]:
        gid = f'{m["id"]}-{g["id"]}'; sw = g["safe"]["light"]
        pat = f' data-pattern="{g["pattern"]}"' if g.get("pattern") else ''
        rows.append(f'<li class="part" id="row-{gid}"><input type="checkbox" class="js-only" id="chk-{gid}" checked="checked" disabled="disabled"/>'
                    f'<label for="chk-{gid}"><span class="key" id="key-{gid}" aria-hidden="true" style="color:{sw};border-color:{sw};background-color:{"transparent" if pat else sw}"{pat}></span>{E(g["label"])}</label>'
                    f'<button type="button" class="hl js-only" disabled="disabled" aria-pressed="false" aria-describedby="chk-{gid}">Highlight</button>'
                    f'<p class="pdesc">{E(g["description"])}</p></li>')
    return '<ul class="parts">' + "".join(rows) + '</ul>'

def description(m):
    items = "".join(f'<li><strong>{E(g["label"])}.</strong> {E(g["description"])}</li>' for g in m["groups"])
    return f'<p>{E(m["summary"])}</p><p>Parts of the model:</p><ul>{items}</ul>'

def static_views(page_id, m, imgsrc):
    figs = []
    for v in VIEWS:
        note = m["views"][v]["note"]; lab = m["views"][v]["label"]
        src = imgsrc(page_id, m["id"], v)
        if src: figs.append(f'<figure><img src="{src}" alt="{E(lab + ": " + note)}"/><figcaption>{E(lab)}</figcaption></figure>')
    return "".join(figs)

def page_html(page_id, P, mode, imgsrc):
    multi = len(P["models"]) > 1
    tabs = ""
    if multi:
        tabs = '<div class="toolbar js-only" role="group" aria-label="Choose molecule">' + "".join(
            f'<button type="button" data-model="{m["id"]}" aria-pressed="{"true" if i == 0 else "false"}">{E(m["name"])}</button>' for i, m in enumerate(P["models"])) + '</div>'
    panels = ""
    for m in P["models"]:
        sv = static_views(page_id, m, imgsrc)
        panels += (f'<section class="card" data-model-panel="{m["id"]}" aria-labelledby="h-parts-{m["id"]}"><h2 id="h-parts-{m["id"]}">Parts: {E(m["name"])}</h2>'
                   f'<p class="small js-only">Show or hide each part. “Highlight” dims the other parts and reads out the description of the selected part.</p>{part_list(page_id, m)}'
                   f'<details class="desc"><summary>Model description</summary>{description(m)}</details>'
                   + (f'<details class="static" open="open"><summary>Static views</summary><div class="views">{sv}</div></details>' if sv else '') + '</section>')
    glbs = ""
    for m in P["models"]:
        if m.get("glb"):
            glbs += f'<script type="application/octet-stream" id="{m["glb"]}">{base64.b64encode(open(GLB[m["glb"]], "rb").read()).decode()}</script>\n'
    cfg = {"models": [strip_fns(m) for m in P["models"]]}
    fns = ""
    for i, m in enumerate(P["models"]):
        if m.get("post"): fns += f'CFG.models[{i}].post={m["post"]};\n'
        if m.get("build"): fns += f'CFG.models[{i}].build={m["build"]};\n'
    engine_tag = f'<script>{ENGINE}</script>' if mode == "web" else '<script src="../scripts/a11y3d.min.js"></script>'
    build12 = ""
    fb = "" if mode == "web" else f'<p class="small">If the 3D view does not work, the <a href="../chapters/{P["fallback"]}.xhtml">static page</a> contains the same information.</p>'
    return f"""<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>{E(P["title"])}</title>
<script>document.documentElement.classList.add('js3d');</script>
<style>{CSS}</style>
</head>
<body>
<main>
<header style="display:grid;gap:6px"><p class="eyebrow">{E(P["eyebrow"])}</p><h1>{E(P["title"])}</h1><p class="lede">{E(P["lede"])}</p></header>
{tabs}
<div class="layout">
<section class="stagebox js-only" aria-label="3D model">
<div class="stage" id="stage"><canvas id="c" tabindex="0" role="application" aria-roledescription="interactive 3D model" aria-label="3D model" aria-describedby="keyHelp"></canvas><div class="loading" id="loading">Loading model…</div></div>
<div class="toolbar" role="group" aria-label="Views"><button type="button" data-view="side" data-num="1" aria-pressed="true">1 Side view</button><button type="button" data-view="axis" data-num="2" aria-pressed="false">2 Along the axis</button><button type="button" data-view="top" data-num="3" aria-pressed="false">3 Top view</button><button type="button" id="zoomIn">Zoom in</button><button type="button" id="zoomOut">Zoom out</button></div>
<div class="toolbar" role="group" aria-label="Display"><button type="button" id="palSafe" aria-pressed="true">Colours for colour vision deficiency</button><button type="button" id="palOrig" aria-pressed="false">Original colours</button><button type="button" id="labels" aria-pressed="true">Labels on the model</button><button type="button" id="spin" aria-pressed="false">Auto-rotate</button></div>
<p class="keys" id="keyHelp">Keyboard, with the model selected: <kbd>←</kbd> <kbd>→</kbd> <kbd>↑</kbd> <kbd>↓</kbd> rotate in 15° steps · <kbd>+</kbd> <kbd>−</kbd> zoom · <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> views · <kbd>0</kbd> reset · <kbd>D</kbd> describe the view.</p>
</section>
<div class="side">
<section class="card js-only" aria-labelledby="h-live"><h2 id="h-live">What you see now</h2><p class="live" id="live" aria-live="polite" aria-atomic="true"></p></section>
{panels}
</div>
</div>
{fb}
<footer><p>3D models: Georgios Korakakis, Autodesk 3ds Max, CC BY-NC 4.0. a11y3d viewer with three.js (MIT). Colours checked with the CVD Lab 2.1 core (Machado et al., 2009 · CIEDE2000). English version: translated derivative of the Greek original; requires verification.</p></footer>
</main>
{glbs}{engine_tag}
{build12}
<script>
var CFG={json.dumps(cfg, ensure_ascii=False)};
{fns}
document.querySelectorAll('.static').forEach(function(d){{d.removeAttribute('open');}});
window.A11Y3D_START(CFG);
</script>
</body>
</html>
"""

def fallback_xhtml(page_id, P, imgsrc):
    body = ""
    for m in P["models"]:
        figs = ""
        for v in VIEWS:
            note = m["views"][v]["note"]; lab = m["views"][v]["label"]; src = imgsrc(page_id, m["id"], v)
            if src: figs += f'<figure><img src="{src}" alt="{E(lab + ": " + note)}"/><figcaption>{E(lab)}</figcaption></figure>'
        items = "".join(f'<li><strong>{E(g["label"])}.</strong> {E(g["description"])}</li>' for g in m["groups"])
        head = f'<h2>{E(m["name"])}</h2>' if len(P["models"]) > 1 else ''
        hx = 'h3' if len(P['models']) > 1 else 'h2'
        body += f'<section>{head}<p>{E(m["summary"])}</p>{figs}<{hx}>Parts of the model</{hx}><ul>{items}</ul></section>'
    return f"""<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="en-GB" xml:lang="en-GB">
<head><meta charset="utf-8"/><title>{E(P["title"])}: static version</title><link rel="stylesheet" type="text/css" href="../styles/ebook.css"/></head>
<body><main role="main"><section epub:type="chapter" aria-labelledby="t"><h1 id="t">{E(P["title"])}: static version</h1>
<p>This page gives the same information as the interactive 3D model, for reading applications that do not run 3D content.</p>{body}
<p><a href="../interactive/{page_id}.html">Interactive version</a></p></section></main></body></html>
"""

if __name__ == "__main__":
    mode, out = sys.argv[1], sys.argv[2]
    imgdir = sys.argv[sys.argv.index("--images") + 1] if "--images" in sys.argv else None
    os.makedirs(out, exist_ok=True)
    def imgsrc(pid, mid, v):
        if not imgdir: return None
        fn = f"{pid}-{mid}-{v}.jpg"; p = os.path.join(imgdir, fn)
        if not os.path.exists(p): return None
        if mode == "web": return "data:image/jpeg;base64," + base64.b64encode(open(p, "rb").read()).decode()
        return f"../images/v3/{fn}"
    for pid, P in PAGES.items():
        if mode == "fallback":
            open(os.path.join(out, P["fallback"] + ".xhtml"), "w", encoding="utf-8").write(fallback_xhtml(pid, P, imgsrc))
        else:
            open(os.path.join(out, pid + ".html"), "w", encoding="utf-8").write(page_html(pid, P, mode, imgsrc))
    print("ok", mode, out)
