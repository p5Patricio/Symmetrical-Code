"""Horizontal lockup: mark + "SymmetricalCode" wordmark (Syne 800) as outlines.
Usage: python3 lockup.py <out_dir>   (run build.py <out_dir> first)
"""
import io, os, re, sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import uharfbuzz as hb
OUT = sys.argv[1]
HERE = os.path.dirname(os.path.abspath(__file__))
SYNE = os.path.join(HERE, '../../videos/fonts/syne.woff2')
f = TTFont(SYNE); f = instantiateVariableFont(f, {'wght': 800})
buf = io.BytesIO(); f.flavor = None; f.save(buf); data = buf.getvalue()
font = TTFont(io.BytesIO(data)); gs = font.getGlyphSet(); upm = font['head'].unitsPerEm
hbf = hb.Font(hb.Face(data))
def shape(text, size, track_em):
    b = hb.Buffer(); b.add_str(text); b.guess_segment_properties(); hb.shape(hbf, b)
    order = font.getGlyphOrder(); s = size / upm; x = 0; paths = []
    for i, (info, pos) in enumerate(zip(b.glyph_infos, b.glyph_positions)):
        pen = SVGPathPen(gs, ntos=lambda v: f"{round(v, 2):g}")
        gs[order[info.codepoint]].draw(TransformPen(pen, (s, 0, 0, -s, x + pos.x_offset*s, -pos.y_offset*s)))
        paths.append(pen.getCommands())
        x += pos.x_advance * s + (track_em * size if i < len(b.glyph_infos)-1 else 0)
    return ''.join(paths), x
SIZE = 200; TRACK = -0.02
d1, w1 = shape('Symmetrical', SIZE, TRACK)
d2, w2 = shape('Code', SIZE, TRACK)
gap = TRACK * SIZE  # same tracking between the two words: they read as one word, as on the site
cap = font['OS/2'].sCapHeight * SIZE / upm
mark = open(f'{OUT}/symmetrical-code-mark.svg').read()
defs = re.search(r'<defs>.*</defs>', mark, re.S).group(0)
body = re.search(r'</defs>(.*)</svg>', mark, re.S).group(1)
# Mark is 440x540; scale it so it is a bit taller than the cap height, then sit text on its center line.
MH = 300; ms = MH / 540; MW = 440 * ms; PAD = 20; GAP = 64
tx = PAD + MW + GAP; base = PAD + MH/2 + cap/2
W = tx + w1 + gap + w2 + PAD; H = MH + PAD*2
def lockup(text_col, code_col, title):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}" width="{W:.0f}" height="{H:.0f}" role="img" aria-labelledby="t">
  <title id="t">{title}</title>
  <!-- Wordmark: Syne 800, tracking -0.02em, converted to outlines (no font needed). -->
  {defs}
  <g transform="translate({PAD} {PAD}) scale({ms:.6f})">{body}</g>
  <path d="{d1}" transform="translate({tx:.2f} {base:.2f})" fill="{text_col}"/>
  <path d="{d2}" transform="translate({tx + w1 + gap:.2f} {base:.2f})" fill="{code_col}"/>
</svg>
'''
open(f'{OUT}/symmetrical-code-lockup-dark.svg', 'w').write(lockup('#E6ECF5', '#005CFD', 'Symmetrical Code'))
open(f'{OUT}/symmetrical-code-lockup-light.svg', 'w').write(lockup('#0A0F1A', '#005CFD', 'Symmetrical Code'))
print(W, H, cap)
