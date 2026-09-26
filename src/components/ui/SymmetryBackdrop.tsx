import './SymmetryBackdrop.css';

/**
 * CSS-only hero backdrop ("symmetry axis") — a grid and a soft glow behind
 * the logo. Replaces the old Aurora WebGL canvas: no JS, no continuous
 * animation. The 1px vertical center-axis line was removed per client
 * feedback (read too visible against the grid) — only the grid and the glow
 * remain. Purely decorative, so it is hidden from assistive tech. The parent
 * must be `position: relative` (or similar) for this to anchor correctly —
 * see HeroSection.
 */
export default function SymmetryBackdrop() {
  return (
    <div className="symmetry-backdrop" aria-hidden="true">
      <div className="symmetry-backdrop__grid" />
      <div className="symmetry-backdrop__glow" />
    </div>
  );
}
