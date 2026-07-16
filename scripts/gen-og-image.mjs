import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pub = join(__dirname, '..', 'public')

// Subtle dot grid in the background (matches the site).
function dotGrid() {
  const spacing = 32
  const dots = []
  for (let x = spacing; x < 1200; x += spacing) {
    for (let y = spacing; y < 630; y += spacing) {
      dots.push(`<circle cx="${x}" cy="${y}" r="1.1" fill="white" opacity="0.05"/>`)
    }
  }
  return dots.join('')
}

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#080808"/>
  ${dotGrid()}

  <!-- Soft amber glow top-right corner -->
  <defs>
    <radialGradient id="glow" cx="1" cy="0" r="1">
      <stop offset="0" stop-color="#fbbf24" stop-opacity="0.18"/>
      <stop offset="0.5" stop-color="#fbbf24" stop-opacity="0.05"/>
      <stop offset="1" stop-color="#fbbf24" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Logo block: white square with black S, matching navbar -->
  <rect x="80" y="80" width="76" height="76" rx="16" fill="#ffffff"/>
  <text x="118" y="138" text-anchor="middle"
        font-family="Helvetica, Arial, sans-serif" font-weight="900" font-size="48" fill="#0a0a0a">S</text>

  <!-- Wordmark next to logo -->
  <text x="180" y="135"
        font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="44" fill="#ffffff" letter-spacing="-0.02em">Sahari</text>

  <!-- Main headline -->
  <text x="80" y="370"
        font-family="Helvetica, Arial, sans-serif" font-weight="900" font-size="90" fill="#ffffff" letter-spacing="-0.04em">Software that</text>
  <text x="80" y="470"
        font-family="Helvetica, Arial, sans-serif" font-weight="900" font-size="90" letter-spacing="-0.04em">
    <tspan fill="#ffffff">works</tspan><tspan fill="#fbbf24" font-style="italic"> as good</tspan><tspan fill="#ffffff">.</tspan>
  </text>

  <!-- Bottom row -->
  <text x="80" y="570"
        font-family="Helvetica, Arial, sans-serif" font-weight="500" font-size="24" fill="#a1a1aa">Software studio · Aarhus, Denmark</text>

  <text x="1120" y="570" text-anchor="end"
        font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="24" fill="#fbbf24">sahari.io</text>
</svg>
`

await sharp(Buffer.from(svg))
  .png()
  .toFile(join(pub, 'og-image.png'))

console.log('wrote og-image.png (1200x630)')
