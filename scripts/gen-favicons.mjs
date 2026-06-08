import sharp from 'sharp'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pub = join(__dirname, '..', 'public')

const svg = readFileSync(join(pub, 'favicon.svg'))

const targets = [
  { size: 180, out: 'apple-touch-icon.png' },
  { size: 192, out: 'favicon-192.png' },
  { size: 512, out: 'favicon-512.png' },
]

for (const { size, out } of targets) {
  await sharp(svg).resize(size, size).png().toFile(join(pub, out))
  console.log(`wrote ${out} (${size}x${size})`)
}
