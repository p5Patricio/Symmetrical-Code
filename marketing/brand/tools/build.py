"""Symmetrical Code mark, rebuilt as vectors from public/logo.webp.
Usage: python3 build.py <out_dir>
"""
import math, os, sys
from geom import fillet_path, arm, rot
OUT = sys.argv[1]
P = {'W': 214.5, 'T': 74.5, 'apex': 263.5, 'ys': 132.5, 'c1': 25.3, 'c2': 111.5,
     'r': {'end': 13, 'apex': 16, 'side': 59, 'side2': 37, 'face': 16, 'inner': 4, 'innerSide': 20}}
CX, CY, VW, VH = 220, 270, 440, 540
pts, radii, k, V = arm(P)
cyan = [(x + CX, y + CY) for x, y in pts]
blue = [(x + CX, y + CY) for x, y in rot(pts)]
d_cyan = fillet_path(cyan, radii, 2); d_blue = fillet_path(blue, radii, 2)
f = lambda v: f"{round(v, 2):g}"

# Fold: the front band's inner edge, extended past the inner apex, is the seam.
# Shadow fades perpendicular to the seam into the band that sits behind it.
I = (0, -P['apex'] + V); sx = V / (2 * k); S = (sx, -P['apex'] + k * sx)
nl = math.hypot(k, 1); n = (k / nl, 1 / nl)                 # seam normal, into the back band
ul = math.hypot(1, k); u = (1 / ul, k / ul)                 # back band direction
far = 320
cyan_fold = [I, S, (S[0] + far*u[0], S[1] + far*u[1]), (I[0] + far*u[0], I[1] + far*u[1])]
mid = ((I[0] + S[0]) / 2, (I[1] + S[1]) / 2)
def place(p, flip=False):
    x, y = p
    if flip: x, y = -x, -y
    return (x + CX, y + CY)
def poly(ps): return 'M' + 'L'.join(f"{f(x)} {f(y)}" for x, y in ps) + 'Z'
FADE = 78
cf = [place(p) for p in cyan_fold]; bf = [place(p, True) for p in cyan_fold]
cg = (place(mid), place((mid[0] + FADE*n[0], mid[1] + FADE*n[1])))
bg = (place(mid, True), place((mid[0] + FADE*n[0], mid[1] + FADE*n[1]), True))

HEAD = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VW} {VH}" width="{VW}" height="{VH}"'
def full(title):
    return f'''{HEAD} role="img" aria-labelledby="t">
  <title id="t">{title}</title>
  <!-- Symmetrical Code mark. Two identical arms, one rotated 180° around the center ({CX}, {CY}).
       Vectorized from public/logo.webp; colors sampled from that file. -->
  <defs>
    <linearGradient id="sc-cyan" gradientUnits="userSpaceOnUse" x1="123" y1="76" x2="239" y2="308">
      <stop offset="0" stop-color="#02E8F0"/>
      <stop offset=".38" stop-color="#00D9EF"/>
      <stop offset=".7" stop-color="#00BDE4"/>
      <stop offset="1" stop-color="#00A0D6"/>
    </linearGradient>
    <linearGradient id="sc-blue" gradientUnits="userSpaceOnUse" x1="0" y1="168" x2="0" y2="532">
      <stop offset="0" stop-color="#008EFD"/>
      <stop offset=".55" stop-color="#0070FB"/>
      <stop offset="1" stop-color="#0056EE"/>
    </linearGradient>
    <linearGradient id="sc-cyan-fold" gradientUnits="userSpaceOnUse" x1="{f(cg[0][0])}" y1="{f(cg[0][1])}" x2="{f(cg[1][0])}" y2="{f(cg[1][1])}">
      <stop offset="0" stop-color="#0088C2" stop-opacity=".32"/>
      <stop offset="1" stop-color="#0088C2" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="sc-blue-fold" gradientUnits="userSpaceOnUse" x1="{f(bg[0][0])}" y1="{f(bg[0][1])}" x2="{f(bg[1][0])}" y2="{f(bg[1][1])}">
      <stop offset="0" stop-color="#003AAE" stop-opacity=".9"/>
      <stop offset="1" stop-color="#003AAE" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="sc-clip-cyan"><path d="{d_cyan}"/></clipPath>
    <clipPath id="sc-clip-blue"><path d="{d_blue}"/></clipPath>
  </defs>
  <g id="arm-top">
    <path d="{d_cyan}" fill="url(#sc-cyan)"/>
    <path d="{poly(cf)}" fill="url(#sc-cyan-fold)" clip-path="url(#sc-clip-cyan)"/>
  </g>
  <g id="arm-bottom">
    <path d="{d_blue}" fill="url(#sc-blue)"/>
    <path d="{poly(bf)}" fill="url(#sc-blue-fold)" clip-path="url(#sc-clip-blue)"/>
  </g>
</svg>
'''
def flat(title, top, bottom):
    return f'''{HEAD} role="img" aria-labelledby="t">
  <title id="t">{title}</title>
  <path id="arm-top" d="{d_cyan}" fill="{top}"/>
  <path id="arm-bottom" d="{d_blue}" fill="{bottom}"/>
</svg>
'''
os.makedirs(OUT, exist_ok=True)
open(f'{OUT}/symmetrical-code-mark.svg', 'w').write(full('Symmetrical Code'))
open(f'{OUT}/symmetrical-code-mark-flat.svg', 'w').write(flat('Symmetrical Code', '#02E0FB', '#005CFD'))
open(f'{OUT}/symmetrical-code-mark-mono.svg', 'w').write(flat('Symmetrical Code', 'currentColor', 'currentColor'))
