import math

def fillet_path(pts, radii, prec=2):
    """Closed polygon -> SVG path with circular fillets (convex or concave)."""
    n = len(pts); out = []
    f = lambda v: f"{round(v, prec):g}"
    for i in range(n):
        P = pts[i]; Pp = pts[i-1]; Pn = pts[(i+1) % n]; r = radii[i]
        up = (Pp[0]-P[0], Pp[1]-P[1]); un = (Pn[0]-P[0], Pn[1]-P[1])
        lp = math.hypot(*up); ln = math.hypot(*un)
        up = (up[0]/lp, up[1]/lp); un = (un[0]/ln, un[1]/ln)
        cosang = max(-1, min(1, up[0]*un[0] + up[1]*un[1]))
        th = math.acos(cosang)
        if r <= 0 or th < 1e-6 or abs(th - math.pi) < 1e-6:
            out.append(('L', P)); continue
        d = r / math.tan(th/2)
        d = min(d, lp*0.49, ln*0.49); r = d * math.tan(th/2)
        A = (P[0]+up[0]*d, P[1]+up[1]*d); B = (P[0]+un[0]*d, P[1]+un[1]*d)
        # direction of travel: prev -> P -> next ; cross of (P-Pp) x (Pn-P)
        cross = (P[0]-Pp[0])*(Pn[1]-P[1]) - (P[1]-Pp[1])*(Pn[0]-P[0])
        sweep = 1 if cross > 0 else 0
        out.append(('A', A, B, r, sweep))
    s = []
    for j, seg in enumerate(out):
        if seg[0] == 'L':
            s.append(('M' if j == 0 else 'L') + f(seg[1][0]) + ' ' + f(seg[1][1]))
        else:
            _, A, B, r, sw = seg
            s.append(('M' if j == 0 else 'L') + f(A[0]) + ' ' + f(A[1]))
            s.append(f"A{f(r)} {f(r)} 0 0 {sw} {f(B[0])} {f(B[1])}")
    return ''.join(s) + 'Z'

def arm(p):
    W, T, apex, ys, c1, c2 = p['W'], p['T'], p['apex'], p['ys'], p['c1'], p['c2']
    k = (apex - ys) / W
    V = T * math.sqrt(1 + k*k)
    pts = [
        (W, -ys),                      # A outer end (top of cut)
        (0, -apex),                    # B outer apex
        (-W, -ys),                     # C outer left vertex
        (-W, -k*W + c2),               # D outer bottom-left of diagonal
        (0, c2),                       # E face bottom
        (0, c1),                       # F face top
        (-W+T, k*(-W+T) + c1),         # G inner corner
        (-W+T, -apex + V + k*(W-T)),   # H inner left vertex
        (0, -apex + V),                # I inner apex
        (W, -apex + V + k*W),          # J inner end (bottom of cut)
    ]
    r = p['r']
    radii = [r['end'], r['apex'], r['side'], r['side2'], r['end'], r['face'], r['inner'], r.get('innerSide', r['inner']), r['inner'], r['end']]
    return pts, radii, k, V

def rot(pts):
    return [(-x, -y) for x, y in pts]
