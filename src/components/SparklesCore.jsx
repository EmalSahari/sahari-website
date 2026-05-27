import { useEffect, useRef } from 'react'

/**
 * SparklesCore — canvas particle system matching the Aceternity Sparkles style.
 * Hundreds of tiny dots drift slowly, pulse in opacity, creating a galaxy/nebula feel.
 */
export default function SparklesCore({
  className = '',
  particleCount = 160,
  minSize = 0.6,
  maxSize = 1.8,
  speed = 0.3,
  colors = ['#a78bfa', '#818cf8', '#c4b5fd', '#ffffff', '#e0e7ff'],
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let particles = []
    let raf = null
    let width = 0, height = 0

    function rand(min, max) { return Math.random() * (max - min) + min }

    function createParticle() {
      return {
        x: rand(0, width),
        y: rand(0, height),
        vx: rand(-speed, speed),
        vy: rand(-speed, speed),
        size: rand(minSize, maxSize),
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: rand(0, 1),
        opacitySpeed: rand(0.003, 0.012),
        opacityDir: Math.random() > 0.5 ? 1 : -1,
        maxOpacity: rand(0.4, 0.9),
      }
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      particles = Array.from({ length: particleCount }, createParticle)
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      particles.forEach(p => {
        // Drift
        p.x += p.vx
        p.y += p.vy

        // Wrap around
        if (p.x < -2) p.x = width + 2
        if (p.x > width + 2) p.x = -2
        if (p.y < -2) p.y = height + 2
        if (p.y > height + 2) p.y = -2

        // Pulse opacity
        p.opacity += p.opacitySpeed * p.opacityDir
        if (p.opacity >= p.maxOpacity) { p.opacity = p.maxOpacity; p.opacityDir = -1 }
        if (p.opacity <= 0) { p.opacity = 0; p.opacityDir = 1 }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
      })

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    raf = requestAnimationFrame(draw)

    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [particleCount, minSize, maxSize, speed, colors])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    />
  )
}
