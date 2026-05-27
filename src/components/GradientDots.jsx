import { useEffect, useRef } from 'react'

/**
 * Recreates the efferd "Gradient Dots" style:
 * dense grid of dots, each independently cycling through the site's
 * violet → indigo → purple palette in a travelling wave pattern.
 */
export default function GradientDots({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const SPACING = 22       // px between dot centres
    const RADIUS  = 1.4      // dot radius
    const SPEED   = 0.0004   // how fast the wave travels
    const WAVE_SCALE = 0.012 // spatial frequency of the wave

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
        // Travelling diagonal wave — phase depends on position + time
        const phase = (d.x + d.y) * WAVE_SCALE + t

        // Hue oscillates through violet / indigo / blue-violet range
        const hue = 250 + Math.sin(phase) * 35              // 215–285
        const sat = 80  + Math.sin(phase * 1.3 + 1) * 15   // 65–95 %
        const lit = 60  + Math.sin(phase * 0.9 + 2) * 12   // 48–72 %
        const alpha = 0.18 + Math.sin(phase * 0.7) * 0.14  // 0.04–0.32

        ctx.beginPath()
        ctx.arc(d.x, d.y, RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${hue.toFixed(1)},${sat.toFixed(1)}%,${lit.toFixed(1)}%,${alpha.toFixed(3)})`
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
