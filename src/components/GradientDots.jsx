import { useEffect, useRef } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

/**
 * Dense grid of dots, alpha-modulated by a travelling diagonal wave.
 * Pure white, no color shift, to keep the background quiet.
 */
export default function GradientDots({ className = '' }) {
  const canvasRef = useRef(null)
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    if (reduce) return
    // Skip canvas entirely on mobile, competes with scroll and causes jank on iOS
    if (window.matchMedia('(max-width: 768px)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const SPACING = 28       // px between dot centres (was 22, ~36% fewer dots)
    const RADIUS  = 1.4      // dot radius
    const SPEED   = 0.0014   // how fast the wave travels
    const WAVE_SCALE = 0.020 // spatial frequency of the wave

    let width = 0, height = 0
    let dots = []
    let raf = null
    let running = !document.hidden

    function resize() {
      const dpr = window.devicePixelRatio || 1
      width  = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width  = width  * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)

      const offX = (width  % SPACING) / 2
      const offY = (height % SPACING) / 2
      const cols = Math.ceil(width  / SPACING) + 1
      const rows = Math.ceil(height / SPACING) + 1

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

      // For loop over forEach is measurably faster on large arrays.
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        const phase = (d.x + d.y) * WAVE_SCALE + t
        const alpha = 0.10 + Math.sin(phase * 0.7) * 0.07
        ctx.beginPath()
        ctx.arc(d.x, d.y, RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    function start() {
      if (raf) return
      raf = requestAnimationFrame(draw)
    }
    function stop() {
      if (!raf) return
      cancelAnimationFrame(raf)
      raf = null
    }
    function onVisibility() {
      running = !document.hidden
      if (running) start()
      else stop()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    document.addEventListener('visibilitychange', onVisibility)
    resize()
    if (running) start()

    return () => {
      stop()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
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
