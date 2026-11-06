"""Build the three comparison models (ethane, ethene, ethyne) from the authors' 3ds Max exports.
- converts .3ds / .WRL to GLB with meaningful part names (old name kept in name_map.json)
- ethane and ethene: rotates each C–H bundle (hybrid lobe + H sphere + H letter + its label) about its carbon nucleus
  to the ideal hybridisation angle (sp3: H–C–C 109.47°, staggered; sp2: H–C–C 120°, planar). Ethyne is left as authored (179°).
- centres the molecule, scales to ~2 units, drops lights, invisible helpers and duplicate lobes.

Copyright (c) 2026 Georgios Korakakis. MIT License, see LICENSE.txt.
"""
import sys, re, json, numpy as np
sys.path.insert(0, __import__('os').path.dirname(__import__('os').path.abspath(__file__))); import conv, trimesh
U = __import__('os').path.join(sys.argv[1] if len(sys.argv) > 1 else '.', '')   # folder 'efarmoges triths' with the 3ds Max exports

def rot_about(V, c, a, b):
    """rotate points V about centre c by the rotation taking unit a to unit b"""
    a = a / np.linalg.norm(a); b = b / np.linalg.norm(b); v = np.cross(a, b); s = np.linalg.norm(v); cth = a @ b
    if s < 1e-9: return V
    K = np.array([[0, -v[2], v[1]], [v[2], 0, -v[0]], [-v[1], v[0], 0]]) / s
    R = np.eye(3) + np.sin(np.arctan2(s, cth)) * K + (1 - cth) * K @ K
    return (V - c) @ R.T + c

def cen(o): return o['V'].mean(0)
def tip(o, c): d = np.linalg.norm(o['V'] - c, axis=1); return o['V'][d.argmax()] - c

def ideal_dirs(u, n, hcc, phase_from):
    """n directions making angle hcc with -u (i.e. H–C–C = hcc when u points to the other C), azimuth snapped to 360/n steps"""
    e1 = np.cross(u, [1, 0, 0] if abs(u[0]) < .9 else [0, 1, 0]); e1 /= np.linalg.norm(e1); e2 = np.cross(u, e1)
    th = np.radians(180 - hcc)   # angle from -u... we want angle between d and u equal hcc
    out = []
    for d in phase_from:  # current directions -> snapped azimuths
        out.append(np.arctan2(d @ e2, d @ e1))
    step = 2 * np.pi / n
    # best common phase
    ph = np.angle(np.mean(np.exp(1j * n * np.array(out)))) / n
    res = []
    for a in out:
        k = np.round((a - ph) / step); az = ph + k * step
        res.append(np.cos(np.radians(hcc)) * u + np.sin(np.radians(hcc)) * (np.cos(az) * e1 + np.sin(az) * e2))
    return res

def bundle_fix(objs, C, lobes, Hs, followers, hcc, staggered_with=None):
    """C: [c1,c2]; lobes/Hs: lists of objects; followers: objects that move with the nearest lobe or H"""
    for i in range(2):
        c = C[i]; u = (C[1 - i] - c) / np.linalg.norm(C[1 - i] - c)
        L = [o for o in lobes if np.argmin([np.linalg.norm(cen(o) - x) for x in C]) == i]
        H = [o for o in Hs if np.argmin([np.linalg.norm(cen(o) - x) for x in C]) == i]
        n = len(L)
        ld = [tip(o, c) / np.linalg.norm(tip(o, c)) for o in L]
        ideal = ideal_dirs(u, n, hcc, ld)
        for o, a, b in zip(L, ld, ideal): o['_R'] = (a, b); o['V'] = rot_about(o['V'], c, a, b)
        for h in H:
            d = cen(h) - c; d /= np.linalg.norm(d)
            j = int(np.argmax([d @ x for x in ideal])); h['_R'] = (d, ideal[j]); h['V'] = rot_about(h['V'], c, d, ideal[j])
        for f in followers:
            if f.get('_moved'): continue
            fc = cen(f)
            if np.argmin([np.linalg.norm(fc - x) for x in C]) != i: continue
            # follow the nearest H (letters) or lobe (sigma labels)
            cand = H + L
            k = int(np.argmin([np.linalg.norm(fc - cen(o)) for o in cand]))
            a, b = cand[k]['_R']; f['V'] = rot_about(f['V'], c, a, b); f['_moved'] = True

from remesh import lathe_clean
def finish(objs, names, out, keep):
    sel = [o for o in objs if o['name'] in names]
    for o in sel:
        n = names[o['name']]
        if 'lobe' in n and not re.match(r'^pi', n):
            o['V'], o['F'] = lathe_clean(o['V'])
    allV = np.vstack([o['V'] for o in sel if not names[o['name']].startswith('axis')])
    mid = (allV.max(0) + allV.min(0)) / 2; sc = 2.0 / (allV.max(0) - allV.min(0)).max()
    nm = {}
    for o in sel:
        o['V'] = (o['V'] - mid) * sc; nm[names[o['name']]] = o['name']; o['src'] = o['name']; o['name'] = names[o['name']]
    conv.to_glb(sel, out)
    json.dump(nm, open(out + '.names.json', 'w'), indent=1, ensure_ascii=False)
    print(out, len(sel), 'parts')

def by(objs, pat): return [o for o in objs if re.match(pat, o['name'])]
def check(objs, C, Hs, label):
    for h in Hs:
        hc = cen(h); i = int(np.argmin([np.linalg.norm(hc - x) for x in C])); a = hc - C[i]; b = C[1 - i] - C[i]
        print(label, 'H–C–C', round(np.degrees(np.arccos(a @ b / np.linalg.norm(a) / np.linalg.norm(b))), 1))

# ---------------- ethane (sp3 deino desmoys/ffhh.WRL) ----------------
A = conv.read_wrl(U + 'ybridismos/sp3 deino desmoys/ffhh.WRL')
nuc = by(A, r'^VIFS06'); C = [cen(o) for o in nuc]
lobes = by(A, r'^Circle0[357]_'); Hs = by(A, r'^Sphere0[146789]$')
letters = [o for o in A if re.match(r'^Text', o['name']) and np.allclose(o['color'], [.031, .031, .533], atol=.01)]
sig = [o for o in A if re.match(r'^Text', o['name']) and np.allclose(o['color'], [.694, .345, .102], atol=.01)]
bundle_fix(A, C, lobes, Hs, letters + sig, 109.47)
check(A, C, Hs, 'ethane')
names = {}
for o in by(A, r'^Circle01_'): names[o['name']] = 'sigma_CC_sp3_lobe_' + ('C1' if cen(o)[2] < 0 else 'C2')
for k, o in enumerate(lobes): names[o['name']] = f'sp3_lobe_CH_{k+1}'
for k, o in enumerate(Hs): names[o['name']] = f'H_atom_{k+1}'
for k, o in enumerate(letters): names[o['name']] = f'label3d_H_{k+1}'
for k, o in enumerate(sig): names[o['name']] = f'label3d_sigma_{k+1}'
for k, o in enumerate(nuc): names[o['name']] = f'C_nucleus_{k+1}'
for o in A:
    if re.match(r'^(Cylinder|Cone)', o['name']): names[o['name']] = 'axis_' + o['name']
    if re.match(r'^Text', o['name']) and o['name'] not in names: names[o['name']] = 'axis_label_' + o['name']
finish(A, names, './ethane.glb', None)

# ---------------- ethene (sp2 desmous/Untitled.3ds) ----------------
B = conv.read_3ds(U + 'ybridismos/sp2 desmous/Untitled.3ds')
nuc = by(B, r'^VIFS06'); C = [cen(o) for o in nuc]
lobes = by(B, r'^Circle0[35]_'); Hs = by(B, r'^VSph')
letters = by(B, r'^Text(07|08|10|11)-'); sig = [o for o in B if re.match(r'^Text', o['name']) and np.allclose(o['color'], [.694, .341, .102], atol=.01)]
# sp2: lobes keep the molecular plane (their current plane) — snap with n=2 about the C–C axis inside that plane
def plane_fix(objs, C, lobes, Hs, followers):
    for i in range(2):
        c = C[i]; u = (C[1 - i] - c) / np.linalg.norm(C[1 - i] - c)
        L = [o for o in lobes if np.argmin([np.linalg.norm(cen(o) - x) for x in C]) == i]
        H = [o for o in Hs if np.argmin([np.linalg.norm(cen(o) - x) for x in C]) == i]
        pn = np.array([0, 1., 0]); pn -= (pn @ u) * u; pn /= np.linalg.norm(pn)   # p orbital direction = plane normal
        e = np.cross(pn, u)
        def ideal(d):
            s = np.sign(d @ e); return np.cos(np.radians(120)) * u + np.sin(np.radians(120)) * s * e
        for o in L:
            a = tip(o, c); a /= np.linalg.norm(a); b = ideal(a); o['_R'] = (a, b); o['V'] = rot_about(o['V'], c, a, b)
        for h in H:
            a = cen(h) - c; a /= np.linalg.norm(a); b = ideal(a); h['_R'] = (a, b); h['V'] = rot_about(h['V'], c, a, b)
        for f in followers:
            fc = cen(f)
            if f.get('_moved') or np.argmin([np.linalg.norm(fc - x) for x in C]) != i: continue
            cand = H + L; k = int(np.argmin([np.linalg.norm(fc - cen(o)) for o in cand]))
            a, b = cand[k]['_R']; f['V'] = rot_about(f['V'], c, a, b); f['_moved'] = True
plane_fix(B, C, lobes, Hs, letters + sig)
check(B, C, Hs, 'ethene')
names = {}
for o in by(B, r'^Circle01_'): names[o['name']] = 'sigma_CC_sp2_lobe_' + ('C1' if cen(o)[2] > 0 else 'C2')
for k, o in enumerate(lobes): names[o['name']] = f'sp2_lobe_CH_{k+1}'
for k, o in enumerate(Hs): names[o['name']] = f'H_atom_{k+1}'
for k, o in enumerate(letters): names[o['name']] = f'label3d_H_{k+1}'
for k, o in enumerate(sig): names[o['name']] = f'label3d_sigma_{k+1}'
for k, o in enumerate(nuc): names[o['name']] = f'C_nucleus_{k+1}'
for k, o in enumerate(by(B, r'^Circle(09|05|19|22)-F')): names[o['name']] = f'pi_p_lobe_{k+1}'
for k, o in enumerate(by(B, r'^VCyl')): names[o['name']] = f'pi_overlap_line_{k+1}'
for k, o in enumerate(by(B, r'^Text(03|12)-')): names[o['name']] = f'label3d_pi_{k+1}'
for o in B:
    if re.match(r'^(Cylinder|Cone)', o['name']): names[o['name']] = 'axis_' + o['name']
    if re.match(r'^Text(02|05)-', o['name']): names[o['name']] = 'axis_label_' + o['name']
finish(B, names, './ethene.glb', None)

# ---------------- ethyne (σ π δειχνω αιθινιο/deixno.3ds) ----------------
Y = conv.read_3ds(U + 'efarmoges 2/σ π δειχνω αιθινιο/deixno.3ds')
names = {}
for o in Y:
    n = o['name']; z = cen(o)[2]
    if n in ('Circle03-F', 'Circle25-F'): names[n] = 'sigma_CC_sp_lobe_' + ('C1' if z > 0 else 'C2')
    elif n in ('Circle01-F', 'Circle26-F'): names[n] = 'sp_lobe_CH_' + ('1' if z > 0 else '2')
    elif n in ('Circle09-F', 'Circle16-F', 'Circle19-F', 'Circle21-F'): names[n] = f'pi1_p_lobe_{n[6:8]}'
    elif n in ('Circle06-F', 'Circle18-F', 'Circle20-F', 'Circle27-F'): names[n] = f'pi2_p_lobe_{n[6:8]}'
    elif n in ('VCyl001', 'VCyl004'): names[n] = f'pi1_overlap_line_{n[-1]}'
    elif n in ('VCyl002', 'VCyl003'): names[n] = f'pi2_overlap_line_{n[-1]}'
    elif re.match(r'^VSph', n): names[n] = 'H_atom_' + n[-1]
    elif re.match(r'^Text(07|08)-', n): names[n] = 'label3d_H_' + n[4:6]
    elif re.match(r'^Text(06|09|10)-', n): names[n] = 'label3d_sigma_' + n[4:6]
    elif re.match(r'^Text(11|12|13|14)-', n): names[n] = 'label3d_pi_' + n[4:6]
    elif re.match(r'^Text(03|15)-', n): names[n] = 'label3d_orbital_' + n[4:6]
    elif re.match(r'^(Cylinder|Cone)', n): names[n] = 'axis_' + n
    elif re.match(r'^Text(01|02|04|05)-', n): names[n] = 'axis_label_' + n
    # dropped: Circle05-F and Circle22-F (exact duplicates of 16 and 21), small back lobes Circle02/04/23/24
finish(Y, names, './ethyne.glb', None)
