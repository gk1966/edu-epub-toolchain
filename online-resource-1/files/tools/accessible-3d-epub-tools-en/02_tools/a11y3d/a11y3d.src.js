// Copyright (c) 2026 Georgios Korakakis. MIT License, see LICENSE.txt.
// a11y3d — accessible 3D viewer for chemistry e-publications (GLB or procedural models).
// Progressive enhancement: the page already holds a static parts list, description and images;
// this script adds the 3D stage, keyboard control, live announcements and two checked palettes.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const $ = id => document.getElementById(id);
const VIEWS_DEFAULT = { side: "Side view", axis: "Along the axis", top: "Top view" };

function theme() {
  const t = document.documentElement.getAttribute('data-theme');
  if (t) return t;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function nameChain(o) { const n = []; while (o) { if (o.name) n.push(o.name); o = o.parent; } return n; }
function hexOf(m) { return m && m.color ? '#' + m.color.getHexString(THREE.SRGBColorSpace).toUpperCase() : ''; }
let PAT = {};
function pattern(kind) {
  if (PAT[kind]) return PAT[kind];
  const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#fff'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#000';
  if (kind === 'stripes') { for (let i = -64; i < 128; i += 16) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i + 8, 0); x.lineTo(i + 72, 64); x.lineTo(i + 64, 64); x.fill(); } }
  else { for (let i = 8; i < 64; i += 16) for (let j = 8; j < 64; j += 16) { x.beginPath(); x.arc(i, j, 4, 0, 7); x.fill(); } }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(4, 4); t.colorSpace = THREE.SRGBColorSpace;
  return PAT[kind] = t;
}

export function start(CFG) {
  const stage = $('stage'), canvas = $('c'), live = $('live');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  } catch (e) { fail(); return; }
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 4 / 3, 0.01, 1000);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x444455, 1.6));
  const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(-2, 3, 2); scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, .6); fill.position.set(2, 1, -2); scene.add(fill);

  const S = { palette: 'safe', labels: true, spin: false, view: 'side', az: 0, el: .35, dist: 6, base: 6,
    center: new THREE.Vector3(), axisDir: new THREE.Vector3(1, 0, 0), up: new THREE.Vector3(0, 1, 0), side: new THREE.Vector3(0, 0, 1),
    focus: null, model: null, root: null, groups: {} };

  function fail() {
    document.documentElement.classList.remove('js3d');
    const l = $('loading'); if (l) l.textContent = 'The 3D model could not be loaded in this application. The static images and the description still apply.';
  }

  function colourFor(g) {
    if (S.palette === 'orig') return { hex: g.orig, alpha: g.origAlpha ?? 1 };
    const t = theme(); return { hex: g.safe[t], alpha: (g.safeAlpha && g.safeAlpha[t]) ?? g.origAlpha ?? 1 };
  }
  function applyLook() {
    const bg = getComputedStyle(document.documentElement).getPropertyValue('--stage').trim() || '#0e1318';
    scene.background = new THREE.Color(bg);
    Object.values(S.groups).forEach(g => {
      const { hex, alpha } = colourFor(g);
      const dim = S.focus && S.focus !== g.id;
      g.meshes.forEach(m => {
        const mat = m.material; mat.color.set(hex);
        const a = dim ? Math.min(alpha, .08) : alpha;
        mat.transparent = a < 1; mat.opacity = a; mat.depthWrite = a >= 1;
        mat.side = (alpha < 1 || dim) ? THREE.DoubleSide : THREE.FrontSide; // closed lobes carry duplicate flipped faces
        const want = (g.pattern && S.palette === 'safe') ? pattern(g.pattern) : null;
        if (mat.map !== want) { mat.map = want; mat.needsUpdate = true; }
        m.visible = g.visible;
      });
      g.edges.forEach(e => { e.material.color.set(hex); e.material.opacity = dim ? .15 : 1; e.material.transparent = dim; e.visible = g.visible && S.palette === 'safe'; });
      const sw = $("key-" + S.model.id + "-" + g.id);
      if (sw) { sw.style.color = hex; sw.style.borderColor = hex; sw.style.backgroundColor = (g.pattern && S.palette === 'safe') ? 'transparent' : hex;
        sw.dataset.pattern = (g.pattern && S.palette === 'safe') ? g.pattern : ''; }
    });
  }
  function say(t) { live.textContent = ''; setTimeout(() => { live.textContent = t; }, 60); }
  function visibleSummary() {
    const v = S.model.groups.filter(m => S.groups[m.id] && S.groups[m.id].meshes.length && S.groups[m.id].visible && !m.quiet).map(m => m.label);
    return v.length ? `Visible: ${v.join(', ')}.` : 'No parts are visible.';
  }
  function viewLabel(v) { return (S.model.views && S.model.views[v] && S.model.views[v].label) || VIEWS_DEFAULT[v]; }
  function describeView() {
    const note = S.view && S.model.views && S.model.views[S.view] ? S.model.views[S.view].note : 'The view has been changed by rotation.';
    return `${S.view ? viewLabel(S.view) : 'Free view'}. ${note} ${visibleSummary()}`;
  }
  function placeCamera() {
    const d = new THREE.Vector3().addScaledVector(S.side, Math.cos(S.el) * Math.cos(S.az)).addScaledVector(S.axisDir, Math.cos(S.el) * Math.sin(S.az)).addScaledVector(S.up, Math.sin(S.el));
    camera.position.copy(S.center).addScaledVector(d, S.dist);
    camera.up.copy(Math.abs(Math.sin(S.el)) > .99 ? S.side.clone().negate() : S.up);
    camera.lookAt(S.center);
  }
  function pressViews() { document.querySelectorAll('[data-view]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === S.view))); }
  function setView(v, announce = true) {
    S.view = v;
    if (v === 'side') { S.az = 0; S.el = .35; }
    if (v === 'axis') { S.az = Math.PI / 2 - .0001; S.el = 0; }
    if (v === 'top') { S.az = 0; S.el = Math.PI / 2 - .001; }
    pressViews(); placeCamera(); if (announce) say(describeView());
  }
  function resize() { const w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
  new ResizeObserver(resize).observe(stage);

  const proj = new THREE.Vector3();
  function updateLabels() {
    const shown = [];
    Object.values(S.groups).forEach(g => {
      if (!g.labelEl) return;
      const show = S.labels && g.visible && g.meshes.length && (!S.focus || S.focus === g.id);
      g.labelEl.hidden = !show; if (!show) return;
      proj.copy(g.anchor).project(camera);
      shown.push({ g, x: (proj.x * .5 + .5) * stage.clientWidth, y: (-proj.y * .5 + .5) * stage.clientHeight, w: g.labelEl.offsetWidth || 90 });
    });
    shown.sort((a, b) => a.y - b.y);
    for (let i = 0; i < shown.length; i++) for (let j = 0; j < i; j++) { const a = shown[j], b = shown[i]; if (Math.abs(a.x - b.x) < (a.w + b.w) / 2 + 4 && b.y - a.y < 24) b.y = a.y + 24; }
    shown.forEach(l => { l.g.labelEl.style.left = Math.max(l.w / 2 + 4, Math.min(stage.clientWidth - l.w / 2 - 4, l.x)) + 'px'; l.g.labelEl.style.top = Math.min(stage.clientHeight - 14, l.y) + 'px'; });
  }
  function loop() { if (S.spin) { S.az += .004; S.view = null; pressViews(); placeCamera(); } renderer.render(scene, camera); updateLabels(); requestAnimationFrame(loop); }

  // pointer + wheel keep the mouse behaviour of the original viewers
  let drag = null;
  canvas.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY }; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', e => { if (!drag) return; S.az -= (e.clientX - drag.x) * .01; S.el = Math.max(-1.5, Math.min(1.5, S.el + (e.clientY - drag.y) * .01)); drag = { x: e.clientX, y: e.clientY }; S.view = null; pressViews(); placeCamera(); });
  canvas.addEventListener('pointerup', () => { drag = null; });
  canvas.addEventListener('wheel', e => { e.preventDefault(); zoom(e.deltaY > 0 ? 1.1 : 1 / 1.1, false); }, { passive: false });
  function zoom(f, announce = true) { S.dist = Math.max(S.base * .35, Math.min(S.base * 3, S.dist * f)); placeCamera(); if (announce) say(f < 1 ? 'Zoomed in.' : 'Zoomed out.'); }
  const STEP = Math.PI / 12; let rotT = null, acc = { h: 0, v: 0 };
  function rot(dh, dv) {
    S.az += dh * STEP; S.el = Math.max(-1.5, Math.min(1.5, S.el + dv * STEP)); S.view = null; pressViews(); placeCamera();
    acc.h += dh; acc.v += dv; clearTimeout(rotT);
    rotT = setTimeout(() => { const p = []; if (acc.h) p.push(`${Math.abs(acc.h * 15)}° ${acc.h < 0 ? 'left' : 'right'}`); if (acc.v) p.push(`${Math.abs(acc.v * 15)}° ${acc.v > 0 ? 'up' : 'down'}`); say(`Rotated ${p.join(' and ')}. Press D for a description of the view.`); acc = { h: 0, v: 0 }; }, 500);
  }
  // Listen on window in the capture phase and stop handled keys there, so that a reading system's
  // document-level key handlers (e.g. Thorium's page turning on arrow keys) do not also act on them.
  window.addEventListener('keydown', e => {
    if (e.target !== canvas) return;
    const k = e.key; let used = true;
    if (k === 'ArrowLeft') rot(-1, 0); else if (k === 'ArrowRight') rot(1, 0); else if (k === 'ArrowUp') rot(0, 1); else if (k === 'ArrowDown') rot(0, -1);
    else if (k === '+' || k === '=') zoom(1 / 1.2); else if (k === '-' || k === '_') zoom(1.2);
    else if (k === '1') setView('side'); else if (k === '2') setView('axis'); else if (k === '3') setView('top');
    else if (k === '0' || k === 'Home') { S.dist = S.base; setView('side'); }
    else if ('dDδΔ'.includes(k)) say(describeView());
    else used = false;
    if (used) { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);
  document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => setView(b.dataset.view)));
  $('zoomIn').addEventListener('click', () => zoom(1 / 1.2)); $('zoomOut').addEventListener('click', () => zoom(1.2));
  const setPal = p => { S.palette = p; $('palSafe').setAttribute('aria-pressed', String(p === 'safe')); $('palOrig').setAttribute('aria-pressed', String(p === 'orig')); applyLook();
    say(p === 'safe' ? 'Colours checked for colour vision deficiency, with patterns and outlines.' : 'Original EPUB colours.'); };
  $('palSafe').addEventListener('click', () => setPal('safe')); $('palOrig').addEventListener('click', () => setPal('orig'));
  $('labels').addEventListener('click', e => { S.labels = !S.labels; e.currentTarget.setAttribute('aria-pressed', String(S.labels)); });
  $('spin').addEventListener('click', e => { S.spin = !S.spin; e.currentTarget.setAttribute('aria-pressed', String(S.spin)); say(S.spin ? 'Auto-rotate: on.' : 'Auto-rotate: stopped.'); });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyLook);
  new MutationObserver(applyLook).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  function wireParts(model) {
    // rows that belong to other models must not keep handlers that point to an old model
    document.querySelectorAll('.part').forEach(li => {
      if (li.id.startsWith('row-' + model.id + '-')) return;
      const c = li.querySelector('input'), b = li.querySelector('button.hl');
      if (c) { c.onchange = null; c.disabled = true; } if (b) { b.onclick = null; b.disabled = true; b.setAttribute('aria-pressed', 'false'); }
      li.classList.remove('on');
    });
    model.groups.forEach(gc => {
      const g = S.groups[gc.id]; const li = $('row-' + model.id + '-' + gc.id); if (!li) return;
      if (!g || !g.meshes.length) { li.hidden = true; return; }
      li.hidden = false;
      const chk = li.querySelector('input'), hl = li.querySelector('button.hl');
      chk.checked = g.visible; chk.disabled = false; hl.disabled = false; hl.setAttribute('aria-pressed', 'false'); li.classList.remove('on');
      chk.onchange = () => { g.visible = chk.checked; applyLook(); say(`${g.label}: ${g.visible ? 'shown' : 'hidden'}. ${visibleSummary()}`); };
      hl.onclick = () => {
        S.focus = S.focus === g.id ? null : g.id;
        model.groups.forEach(x => { const r = $('row-' + model.id + '-' + x.id); if (!r) return; r.classList.toggle('on', S.focus === x.id); const b = r.querySelector('button.hl'); if (b) b.setAttribute('aria-pressed', String(S.focus === x.id)); });
        if (S.focus && !g.visible) { g.visible = true; chk.checked = true; }
        applyLook(); say(S.focus ? `Highlighted: ${g.label}. ${g.description}` : `Highlight off. ${visibleSummary()}`);
      };
    });
  }

  async function loadModel(model) {
    if (S.root) { scene.remove(S.root); }
    stage.querySelectorAll('.lbl3d').forEach(e => e.remove());
    S.groups = Object.fromEntries(model.groups.map(g => [g.id, { ...g, meshes: [], visible: !g.off, edges: [], labelEl: null }]));
    S.focus = null; S.model = model;
    let root;
    if (model.glb) {
      const b64 = $(model.glb).textContent.trim(); const bin = atob(b64); const bytes = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      root = (await new GLTFLoader().parseAsync(bytes.buffer, '')).scene;
    } else root = new THREE.Group();
    scene.add(root); S.root = root;
    const extra = model.build ? model.build(THREE, root) : [];
    const all = [];
    root.traverse(o => { if (o.isMesh) all.push(o); });
    all.forEach(o => {
      const names = nameChain(o);
      if ((model.hide || []).some(h => names.some(n => n.includes(h)))) { o.visible = false; return; }
      o.material = o.material.clone();
      const pre = extra.find(x => x.object === o);
      let g = pre ? model.groups.find(m => m.id === pre.group) : null;
      if (!g) g = model.groups.find(m => m.match && m.match.some(t => names.some(n => n.includes(t))));
      if (!g) { const hx = hexOf(o.material); g = model.groups.find(m => m.matchColor && m.matchColor.includes(hx)); }
      if (g) { S.groups[g.id].meshes.push(o); o.userData.group = g.id; }
    });
    root.updateMatrixWorld(true);
    if (model.post) model.post({ THREE, groups: S.groups, root });
    // axis of the molecule
    const box = new THREE.Box3();
    Object.values(S.groups).forEach(g => g.meshes.forEach(m => { if (!g.quiet) box.expandByObject(m); }));
    const size = box.getSize(new THREE.Vector3()); box.getCenter(S.center);
    if (model.axis && model.axis.dir) { S.axisDir = new THREE.Vector3(...model.axis.dir).normalize(); S.up = new THREE.Vector3(...model.axis.up).normalize(); }
    else {
      let ab = box;
      if (model.axis && model.axis.group && S.groups[model.axis.group]) { ab = new THREE.Box3(); S.groups[model.axis.group].meshes.forEach(m => ab.expandByObject(m)); }
      const s2 = ab.getSize(new THREE.Vector3()), dims = [s2.x, s2.y, s2.z], ax = dims.indexOf(Math.max(...dims));
      const unit = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)];
      S.axisDir = unit[ax]; S.up = ax === 1 ? unit[2] : unit[1];
    }
    S.side = new THREE.Vector3().crossVectors(S.axisDir, S.up).normalize();
    S.base = S.dist = Math.max(size.x, size.y, size.z) * (model.zoom || 1.12);
    camera.near = S.base / 100; camera.far = S.base * 20; camera.updateProjectionMatrix();
    let pi = 0;
    Object.values(S.groups).forEach(g => {
      if (!g.meshes.length) return;
      let far = null, fd = -1;
      g.meshes.forEach(m => { const c = new THREE.Box3().setFromObject(m).getCenter(new THREE.Vector3()); const d = c.distanceTo(S.center); if (d > fd) { fd = d; far = c; } });
      g.anchor = far;
      if (g.outline) {
        const gb = new THREE.Box3(); g.meshes.forEach(m => gb.expandByObject(m));
        const dirs = [S.up.clone().addScaledVector(S.axisDir, -.5), S.side.clone().addScaledVector(S.axisDir, .5), S.up.clone().negate().addScaledVector(S.axisDir, .5)];
        const dir = dirs[pi++ % 3]; const c = new THREE.Vector3(dir.x > .01 ? gb.max.x : dir.x < -.01 ? gb.min.x : (gb.min.x + gb.max.x) / 2, dir.y > .01 ? gb.max.y : dir.y < -.01 ? gb.min.y : (gb.min.y + gb.max.y) / 2, dir.z > .01 ? gb.max.z : dir.z < -.01 ? gb.min.z : (gb.min.z + gb.max.z) / 2);
        g.anchor = c.lerp(gb.getCenter(new THREE.Vector3()), .12);
        g.meshes.forEach(m => { const e = new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry, 30), new THREE.LineBasicMaterial({ color: 0xffffff })); m.add(e); g.edges.push(e); });
      }
      if (g.pattern) g.meshes.forEach(m => { // GLB parts exported without UVs: project so the pattern shows
        const geo = m.geometry; if (geo.attributes.uv) return;
        geo.computeBoundingBox(); const c = geo.boundingBox.getCenter(new THREE.Vector3()), sz = geo.boundingBox.getSize(new THREE.Vector3()), p = geo.attributes.position, uv = new Float32Array(p.count * 2);
        const big = Math.max(sz.x, sz.y, sz.z) || 1;
        for (let i = 0; i < p.count; i++) { const x = p.getX(i) - c.x, y = p.getY(i) - c.y, z = p.getZ(i) - c.z; uv[2 * i] = (x + z) / big * .6; uv[2 * i + 1] = y / big * .6; }
        geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
      });
      if (g.layer === 'front') g.meshes.forEach(m => { m.material.polygonOffset = true; m.material.polygonOffsetFactor = -2; m.material.polygonOffsetUnits = -2; m.renderOrder = 1; });
      if (!g.quiet) { const el = document.createElement('div'); el.className = 'lbl3d'; el.textContent = g.label; el.setAttribute('aria-hidden', 'true'); stage.appendChild(el); g.labelEl = el; }
    });
    document.querySelectorAll('[data-view]').forEach(b => { b.textContent = b.dataset.num + ' ' + viewLabel(b.dataset.view); });
    canvas.setAttribute('aria-label', `${model.name} in 3D. Select it and use the arrow keys to rotate it.`);
    wireParts(model); applyLook(); resize(); setView('side', false);
  }

  async function boot() {
    const models = CFG.models;
    await loadModel(models[0]);
    document.documentElement.classList.add('ready3d');
    const l = $('loading'); if (l) l.remove();
    // model tabs (only when there is more than one model)
    document.querySelectorAll('[data-model]').forEach(b => b.addEventListener('click', async () => {
      const m = models.find(x => x.id === b.dataset.model); if (!m || m === S.model) return;
      document.querySelectorAll('[data-model]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      document.querySelectorAll('[data-model-panel]').forEach(p => { p.hidden = p.dataset.modelPanel !== m.id; });
      await loadModel(m); say(`Selected: ${m.name}. ${describeView()}`);
    }));
    document.querySelectorAll('[data-model-panel]').forEach(p => { p.hidden = p.dataset.modelPanel !== models[0].id; });
    live.textContent = describeView();
    window.__ready = true;
    loop();
  }
  boot().catch(err => { console.error(err); fail(); });
}
window.A11Y3D_START = start;
