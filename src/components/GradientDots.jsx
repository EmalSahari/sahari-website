import { useEffect, useRef } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

/**
 * Layered wave grid: three interfering sin fields ride across a dense dot
 * lattice, modulating each dot's brightness, size and warmth so the
 * background reads like a slow shimmer instead of a static pattern.
 */
export default function GradientDots({ className = '' }) {
  const canvasRef = useRef(null)
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    if (reduce) return
    if (window.matchMedia('(max-width: 768px)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const SPACING = 22
    const BASE_RADIUS = 1.3
    const SPEED = 0.004
    const WAVE_SCALE = 0.018

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

      // Lissajous-style orbit for the radial wave center so ripples don't
      // feel mechanical.
      const cx = width  * (0.5 + 0.35 * Math.cos(t * 0.25))
      const cy = height * (0.5 + 0.35 * Math.sin(t * 0.37))

      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]

        const phase1 = (d.x + d.y) * WAVE_SCALE + t
        const phase2 = (d.x - d.y) * WAVE_SCALE * 0.6 + t * 0.7
        const dx = d.x - cx
        const dy = d.y - cy
        const phase3 = Math.sqrt(dx * dx + dy * dy) * 0.014 - t * 1.2

        const wave =
          Math.sin(phase1) * 0.4 +
          Math.sin(phase2) * 0.3 +
          Math.sin(phase3) * 0.3

        const intensity = (wave + 1) * 0.5
        const alpha = 0.05 + intensity * 0.22
        const radius = BASE_RADIUS * (0.75 + intensity * 0.7)

        // White → warm cream at peaks (subtle amber tint).
        const g = 255 - ((intensity * 22) | 0)
        const b = 255 - ((intensity * 80) | 0)

        ctx.beginPath()
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,${g},${b},${alpha})`
        ctx.fill()
      }

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
  }, [reduce])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}
