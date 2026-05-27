import SparklesCore from './SparklesCore'

/**
 * Sparkles — wraps content with a SparklesCore canvas underneath,
 * with gradient masks to fade the edges. Matches Aceternity Sparkles style.
 */
export default function SparklesText({ children, className = '', height = 'h-40' }) {
  return (
    <span className={`relative inline-flex flex-col items-center ${className}`}>
      {children}
      {/* Particle canvas sits below text, gradient-masked on sides */}
      <span className={`relative w-full ${height} -mt-2`} aria-hidden="true">
        <span
          className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4 mx-auto"
          style={{ opacity: 0.5 }}
        />
        <span
          className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent h-px w-1/2 mx-auto blur-sm"
          style={{ opacity: 0.6 }}
        />
        <SparklesCore
          className="absolute inset-0"
          particleCount={120}
          speed={0.25}
        />
        {/* Gradient fade left + right */}
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, #080808 80%)',
          }}
        />
      </span>
    </span>
  )
}
