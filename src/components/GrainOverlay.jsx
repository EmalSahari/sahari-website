/**
 * Subtle full-screen film grain texture overlay. Fixed position so it does
 * not scroll with the page, pointer-events-none so it never blocks input,
 * very low opacity so it just gives the surface a slight analog grain
 * instead of looking like a flat dark canvas.
 */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="noise pointer-events-none fixed inset-0 z-[60] opacity-[0.18] mix-blend-overlay"
    />
  )
}
