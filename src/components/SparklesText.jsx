import SparklesCore from './SparklesCore'

/**
 * Sparkles - renders a contained sparkle field behind children.
 * The canvas is absolutely positioned so it never affects layout.
 * Matches the Aceternity Sparkles pattern: section-level background under text.
 */
export default function SparklesText({ children, className = '' }) {
  return (
    <span className={`relative inline-block ${className}`}>
      {/* Sparkle canvas - absolutely positioned, doesn't affect layout */}
      <span
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          inset: '-40px -60px',
          zIndex: 0,
        }}
      >
        <SparklesCore
          className="w-full h-full"
          particleCount={80}
          speed={0.2}
          colors={['#a78bfa', '#818cf8', '#c4b5fd', '#e0e7ff']}
        />
        {/* Fade edges so particles don't hard-clip */}
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(8,8,8,0.95) 80%)',
          }}
        />
      </span>
      {/* Text sits above */}
      <span className="relative" style={{ zIndex: 1 }}>{children}</span>
    </span>
  )
}
