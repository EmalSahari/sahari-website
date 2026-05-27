import { useRef, useState } from 'react'

/**
 * Spotlight Card — cursor-tracking radial glow on the inner surface
 * plus a matching border-glow that brightens nearest to the cursor.
 *
 * Usage:
 *   <SpotlightCard className="rounded-2xl border border-violet-500/20 bg-[#0f0f0f] p-8">
 *     …content…
 *   </SpotlightCard>
 */
export default function SpotlightCard({ children, className = '', glowColor = '139,92,246' }) {
  const cardRef = useRef(null)
  const [pos, setPos] = useState({ x: -999, y: -999 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setPos({ x: -999, y: -999 }) }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Border glow layer — sits on top of everything, paints only the border area */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, rgba(${glowColor},0.25), transparent 70%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />
      {/* Inner surface glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(${glowColor},0.10), transparent 60%)`,
        }}
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
