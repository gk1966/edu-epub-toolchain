"""Rebuild a lathed lobe as a clean surface of revolution (outer envelope), removing self-overlapping faces that z-fight.

Copyright (c) 2026 Georgios Korakakis. MIT License, see LICENSE.txt.
"""
import numpy as np
def lathe_clean(V, nbins=64, seg=48):
    c = V.mean(0); X = V - c
    w, vec = np.linalg.eigh(X.T @ X); ax = vec[:, -1]
    s = X @ ax; r = np.linalg.norm(X - np.outer(s, ax), axis=1)
    lo, hi = s.min(), s.max()
    # orient so that the narrow end is s=lo
    q = (hi - lo) * .1
    if r[s > hi - q].mean() < r[s < lo + q].mean(): ax = -ax; s = -s; lo, hi = -hi, -lo
    # cluster vertices into the rings of the original lathe, take the outer radius of each ring, then resample smoothly
    order = np.argsort(s); ss = s[order]; rr = r[order]; tol = (hi - lo) * 4e-3
    cs, cr = [], []; start = 0
    for k in range(1, len(ss) + 1):
        if k == len(ss) or ss[k] - ss[k - 1] > tol:
            cs.append(ss[start:k].mean()); cr.append(rr[start:k].max()); start = k
    cs = np.array(cs); cr = np.array(cr)
    mids = lo + (hi - lo) * (1 - np.cos(np.linspace(0, np.pi, nbins + 2)[1:-1])) / 2   # denser near the ends
    prof = np.interp(mids, cs, cr)
    # radial centre may be offset from the PCA axis by asymmetry; ignore (lobes are axisymmetric)
    e1 = np.cross(ax, [1, 0, 0] if abs(ax[0]) < .9 else [0, 1, 0]); e1 /= np.linalg.norm(e1); e2 = np.cross(ax, e1)
    th = np.linspace(0, 2 * np.pi, seg, endpoint=False)
    rings = [c + ax * mids[k] + prof[k] * (np.outer(np.cos(th), e1) + np.outer(np.sin(th), e2)) for k in range(nbins)]
    P = np.vstack([c + ax * lo] + rings + [c + ax * hi]); F = []
    for j in range(seg): F.append([0, 1 + (j + 1) % seg, 1 + j])
    for k in range(nbins - 1):
        a0 = 1 + k * seg; a1 = 1 + (k + 1) * seg
        for j in range(seg):
            jn = (j + 1) % seg; F += [[a0 + j, a0 + jn, a1 + j], [a0 + jn, a1 + jn, a1 + j]]
    last = 1 + (nbins - 1) * seg; tipi = len(P) - 1
    for j in range(seg): F.append([last + j, last + (j + 1) % seg, tipi])
    return P, np.array(F)
