import { useRef, useState } from 'react'

/**
 * SpotlightCard — matches the easemize Spotlight Card style.
 * A bright neon beam tracks the cursor along the card border,
 * with a soft inner radial glow following the mouse.
 */
export default function SpotlightCard({
  children,
  className = '',
  glowColor = '167,139,250',  // violet-400 in rgb
}) {
  const cardRef = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-2xl ${className}`}
      style={{ isolation: 'isolate' }}
    >
      {/* ── Border beam ─────────────────────────────────────────── */}
      {/* Outer glow ring — very bright at cursor, fades away */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          padding: '1px',
          background: `radial-gradient(200px circle at ${pos.x}px ${pos.y}px, rgba(${glowColor}, 0.9), rgba(${glowColor}, 0.15) 40%, transparent 65%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {/* Subtle always-visible base border */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          padding: '1px',
          background: `rgba(${glowColor}, 0.12)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* ── Inner surface glow ───────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, rgba(${glowColor}, 0.12), transparent 65%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
