"""Convert the authors' 3ds Max exports (.3ds, VRML97 .WRL) to GLB, keeping object names and material colours.

Copyright (c) 2026 Georgios Korakakis. MIT License, see LICENSE.txt.
"""
import struct, re, sys, json, numpy as np, trimesh

def _chunks(d, off, end):
    while off + 6 <= end:
        cid, ln = struct.unpack_from('<HI', d, off)
        if ln < 6 or off + ln > end: break
        yield cid, off, ln; off += ln

def _color(d, o, end):
    for c, oo, l in _chunks(d, o, end):
        if c == 0x0011 or c == 0x0012: return [x / 255 for x in d[oo+6:oo+9]]
        if c == 0x0010 or c == 0x0013: return list(struct.unpack_from('<3f', d, oo+6))
    return [.8, .8, .8]

def read_3ds(path):
    d = open(path, 'rb').read(); mats = {}; objs = []
    def walk(off, end):
        for cid, o, ln in _chunks(d, off, end):
            if cid in (0x4D4D, 0x3D3D): walk(o+6, o+ln)
            elif cid == 0xAFFF:
                m = {'name': '', 'diffuse': [.8,.8,.8], 'transparency': 0}
                for c, oo, l in _chunks(d, o+6, o+ln):
                    if c == 0xA000: m['name'] = d[oo+6:d.find(b'\0', oo+6)].decode('latin1')
                    elif c == 0xA020: m['diffuse'] = _color(d, oo+6, oo+l)
                    elif c == 0xA050:
                        for c2, o2, l2 in _chunks(d, oo+6, oo+l):
                            if c2 == 0x0030: m['transparency'] = struct.unpack_from('<H', d, o2+6)[0] / 100
                            if c2 == 0x0031: m['transparency'] = struct.unpack_from('<f', d, o2+6)[0]
                mats[m['name']] = m
            elif cid == 0x4000:
                n = d.find(b'\0', o+6); name = d[o+6:n].decode('latin1')
                for c2, o2, l2 in _chunks(d, n+1, o+ln):
                    if c2 != 0x4100: continue
                    V = F = None; fm = []
                    for c3, o3, l3 in _chunks(d, o2+6, o2+l2):
                        if c3 == 0x4110:
                            nv = struct.unpack_from('<H', d, o3+6)[0]
                            V = np.frombuffer(d, '<f4', nv*3, o3+8).reshape(-1, 3).copy()
                        if c3 == 0x4120:
                            nf = struct.unpack_from('<H', d, o3+6)[0]
                            F = np.frombuffer(d, '<u2', nf*4, o3+8).reshape(-1, 4)[:, :3].astype(int)
                            for c4, o4, l4 in _chunks(d, o3+8+nf*8, o3+l3):
                                if c4 == 0x4130:
                                    e = d.find(b'\0', o4+6); fm.append(d[o4+6:e].decode('latin1'))
                    if V is not None and F is not None and len(F):
                        objs.append({'name': name, 'V': V, 'F': F, 'mat': fm[0] if fm else None})
    walk(0, len(d))
    for ob in objs:
        m = mats.get(ob['mat'], {'diffuse': [.8,.8,.8], 'transparency': 0})
        ob['color'] = m['diffuse']; ob['alpha'] = 1 - m['transparency']
        ob['V'] = ob['V'][:, [0, 2, 1]] * [1, 1, -1]   # 3ds Z-up -> glTF Y-up
    return objs

# ---------- VRML97 (generic recursive-descent parser) ----------
def _tokens(s):
    s = re.sub(r'#[^\n]*', '', s)
    return re.findall(r'"[^"]*"|[{}\[\]]|[^\s{}\[\],]+', s)

def read_wrl(path):
    T = _tokens(open(path, encoding='latin1').read()); pos = [0]
    def peek(k=0): return T[pos[0]+k] if pos[0]+k < len(T) else None
    def nxt(): t = T[pos[0]]; pos[0] += 1; return t
    def isnode():
        t = peek()
        return t == 'DEF' or t == 'USE' or (peek(1) == '{' and t not in ('{','[',']','}'))
    def node():
        name = None
        if peek() == 'DEF': nxt(); name = nxt()
        if peek() == 'USE': nxt(); return {'type': 'USE', 'ref': nxt()}
        typ = nxt(); assert nxt() == '{'
        f = {}
        while peek() != '}':
            k = nxt()
            if k in ('ROUTE',): nxt(); nxt(); nxt(); continue
            f[k] = value()
        nxt(); return {'type': typ, 'name': name, 'f': f}
    def value():
        if peek() == '[':
            nxt(); arr = []
            while peek() != ']':
                arr.append(node() if isnode() else nxt())
            nxt(); return arr
        if isnode(): return node()
        vals = []
        while peek() not in ('}', None) and not (peek(1) in ('{','[') and not _num(peek())) and _num(peek()) or peek() in ('TRUE','FALSE') or (peek() or '').startswith('"'):
            vals.append(nxt())
            if vals[-1] in ('TRUE','FALSE') or vals[-1].startswith('"'): break
        return vals
    def _num(t):
        try: float(t); return True
        except: return False
    roots = []
    while pos[0] < len(T):
        if isnode(): roots.append(node())
        else: nxt()
    objs = []
    def fl(v): return [float(x) for x in v]
    def mat_from(app):
        m = {'color': [.8,.8,.8], 'alpha': 1}
        if isinstance(app, dict):
            mt = app['f'].get('material')
            if isinstance(mt, dict):
                if 'diffuseColor' in mt['f']: m['color'] = fl(mt['f']['diffuseColor'])
                if 'transparency' in mt['f']: m['alpha'] = 1 - float(mt['f']['transparency'][0])
        return m
    def walk(n, M, name):
        if not isinstance(n, dict): return
        t = n['type']; f = n['f'] if 'f' in n else {}
        if t == 'Transform':
            L = np.eye(4)
            tr = fl(f.get('translation', [0,0,0])); sc = fl(f.get('scale', [1,1,1])); rot = fl(f.get('rotation', [0,0,1,0]))
            c = fl(f.get('center', [0,0,0])); so = fl(f.get('scaleOrientation', [0,0,1,0]))
            def R(r):
                ax = np.array(r[:3]); nn = np.linalg.norm(ax)
                return trimesh.transformations.rotation_matrix(r[3], ax/nn) if nn > 0 else np.eye(4)
            Tm = trimesh.transformations.translation_matrix
            L = Tm(tr) @ Tm(c) @ R(rot) @ R(so) @ np.diag(sc + [1]) @ np.linalg.inv(R(so)) @ Tm([-x for x in c])
            for ch in f.get('children', []): walk(ch, M @ L, n['name'] or name)
        elif t in ('Group', 'Collision', 'Anchor', 'Billboard'):
            for ch in f.get('children', []): walk(ch, M, n['name'] or name)
        elif t == 'Shape':
            g = f.get('geometry'); m = mat_from(f.get('appearance'))
            if not isinstance(g, dict): return
            gt = g['type']; gf = g['f']
            if gt == 'IndexedFaceSet':
                co = gf.get('coord')
                if not isinstance(co, dict): return
                P = np.array(fl(co['f']['point'])).reshape(-1, 3); faces = []; cur = []
                for x in [int(v) for v in gf.get('coordIndex', [])]:
                    if x < 0:
                        for k in range(1, len(cur)-1): faces.append([cur[0], cur[k], cur[k+1]])
                        cur = []
                    else: cur.append(x)
                if cur:
                    for k in range(1, len(cur)-1): faces.append([cur[0], cur[k], cur[k+1]])
                if gf.get('ccw', ['TRUE'])[0] == 'FALSE': faces = [[a,c,b] for a,b,c in faces]
                mesh = trimesh.Trimesh(P, np.array(faces), process=False)
            elif gt == 'Sphere': mesh = trimesh.creation.icosphere(3, float(gf.get('radius', [1])[0]))
            elif gt == 'Box': mesh = trimesh.creation.box(fl(gf.get('size', [2,2,2])))
            elif gt == 'Cylinder':
                mesh = trimesh.creation.cylinder(float(gf.get('radius',[1])[0]), float(gf.get('height',[2])[0]), 32)
                mesh.apply_transform(trimesh.transformations.rotation_matrix(-np.pi/2, [1,0,0]))
            elif gt == 'Cone':
                mesh = trimesh.creation.cone(float(gf.get('bottomRadius',[1])[0]), float(gf.get('height',[2])[0]), 32)
                mesh.apply_transform(trimesh.transformations.rotation_matrix(-np.pi/2, [1,0,0]) @ trimesh.transformations.translation_matrix([0,0,-float(gf.get('height',[2])[0])/2]))
            else: return
            V = (np.c_[mesh.vertices, np.ones(len(mesh.vertices))] @ M.T)[:, :3]
            objs.append({'name': name, 'V': V, 'F': np.asarray(mesh.faces), **m})
    for r in roots: walk(r, np.eye(4), None)
    return objs

def to_glb(objs, out):
    sc = trimesh.Scene(); seen = {}
    for ob in objs:
        nm = ob['name'] or 'unnamed'; seen[nm] = seen.get(nm, 0) + 1
        if seen[nm] > 1: nm = f"{nm}_{seen[nm]}"
        m = trimesh.Trimesh(ob['V'], ob['F'], process=False); m.merge_vertices(merge_tex=True, merge_norm=True); m.update_faces(m.unique_faces()); m.remove_unreferenced_vertices(); trimesh.repair.fix_normals(m, multibody=True); _ = m.vertex_normals
        c = list(ob['color']) + [ob['alpha']]
        mat = trimesh.visual.material.PBRMaterial(name=nm + '_mat', baseColorFactor=[float(x) for x in c], metallicFactor=0, roughnessFactor=.6,
                                                   alphaMode='BLEND' if ob['alpha'] < .99 else 'OPAQUE', doubleSided=False)
        m.visual = trimesh.visual.TextureVisuals(material=mat)
        sc.add_geometry(m, node_name=nm, geom_name=nm)
    sc.export(out, include_normals=True)

if __name__ == '__main__':
    src, out = sys.argv[1], sys.argv[2]
    objs = read_3ds(src) if src.lower().endswith('.3ds') else read_wrl(src)
    summary = []
    for ob in objs:
        V = ob['V']; summary.append({'name': ob['name'], 'nv': len(V), 'nf': len(ob['F']), 'color': [round(x, 3) for x in ob['color']], 'alpha': round(ob['alpha'], 2),
                                     'center': [round(x, 2) for x in V.mean(0)], 'size': [round(x, 2) for x in V.max(0) - V.min(0)]})
    json.dump(summary, open(out + '.json', 'w'), indent=1, ensure_ascii=False)
    to_glb(objs, out); print(out, len(objs), 'objects')
