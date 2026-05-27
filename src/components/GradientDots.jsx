import { useEffect, useRef } from 'react'

/**
 * Animated gradient-dot grid background.
 * A canvas grid of dots lit by two slowly drifting radial gradients (violet + indigo),
 * matching the site's colour palette.
 */
export default function GradientDots({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const DOT_SPACING = 28
    const DOT_RADIUS = 1.2
    const BASE_ALPHA = 0.09
    const GLOW_ALPHA = 0.55
    const GLOW_RADIUS = 320

    let width = 0
    let height = 0
    let cols = 0
    let rows = 0
    let dots = []
    let raf = null

    // Two orbs drifting around the canvas
    const orbs = [
      { x: 0.3, y: 0.3, vx: 0.00018, vy: 0.00013, r: [139, 92, 246] },   // violet
      { x: 0.7, y: 0.65, vx: -0.00014, vy: 0.00017, r: [79, 70, 229] },  // indigo
    ]

    function resize() {
      const dpr = window.devicePixelRatio || 1
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)

      cols = Math.ceil(width / DOT_SPACING) + 1
      rows = Math.ceil(height / DOT_SPACING) + 1
      dots = []
      const offsetX = (width % DOT_SPACING) / 2
      const offsetY = (height % DOT_SPACING) / 2
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ x: offsetX + c * DOT_SPACING, y: offsetY + r * DOT_SPACING })
        }
      }
    }

    function lerp(a, b, t) {
      return a + (b - a) * t
    }

    function draw(ts) {
      ctx.clearRect(0, 0, width, height)

      // Move orbs
      orbs.forEach(o => {
        o.x += o.vx
        o.y += o.vy
        if (o.x < 0 || o.x > 1) o.vx *= -1
        if (o.y < 0 || o.y > 1) o.vy *= -1
      })

      // For each dot, compute the colour influence from both orbs
      dots.forEach(d => {
        let brightness = 0
        let rgb = [255, 255, 255]

        orbs.forEach(o => {
          const ox = o.x * width
          const oy = o.y * height
          const dist = Math.sqrt((d.x - ox) ** 2 + (d.y - oy) ** 2)
          const influence = Math.max(0, 1 - dist / GLOW_RADIUS)
          if (influence > brightness) {
            brightness = influence
            rgb = o.r
          }
        })

        const alpha = lerp(BASE_ALPHA, GLOW_ALPHA, brightness * brightness)
        ctx.beginPath()
        ctx.arc(d.x, d.y, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha.toFixed(3)})`
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(() => { resize(); })
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
