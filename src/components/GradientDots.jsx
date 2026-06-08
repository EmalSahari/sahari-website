import { useEffect, useRef } from 'react'

/**
 * Dense grid of dots, alpha-modulated by a travelling diagonal wave.
 * Pure white - no color shift - to keep the background quiet.
 */
export default function GradientDots({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Skip canvas entirely on mobile - competes with scroll and causes jank on iOS
    if (window.matchMedia('(max-width: 768px)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const SPACING = 22       // px between dot centres
    const RADIUS  = 1.4      // dot radius
    const SPEED   = 0.0014   // how fast the wave travels
    const WAVE_SCALE = 0.020 // spatial frequency of the wave

    let width = 0, height = 0, cols = 0, rows = 0
    let dots = []
    let raf = null

    function resize() {
      const dpr = window.devicePixelRatio || 1
      width  = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width  = width  * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)

      const offX = (width  % SPACING) / 2
      const offY = (height % SPACING) / 2
      cols = Math.ceil(width  / SPACING) + 1
      rows = Math.ceil(height / SPACING) + 1

      dots = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: offX + c * SPACING,
            y: offY + r * SPACING,
          })
        }
      }
    }

    function draw(ts) {
      const t = ts * SPEED
      ctx.clearRect(0, 0, width, height)

      dots.forEach(d => {
        // Travelling diagonal wave - phase depends on position + time
        const phase = (d.x + d.y) * WAVE_SCALE + t
        const alpha = 0.10 + Math.sin(phase * 0.7) * 0.07  // 0.03-0.17

        ctx.beginPath()
        ctx.arc(d.x, d.y, RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}
