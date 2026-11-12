/**
 * Postbuild step: write per-route index.html files into dist/, each with the
 * right title, description, og:url and canonical baked in. Vercel will serve
 * these when someone hits the URL directly, so social previews and non-JS
 * crawlers see route-specific metadata instead of the SPA shell defaults.
 *
 * Client-side, the React Router app still mounts as normal; the Seo component
 * keeps the head in sync when the user navigates between routes after load.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = join(__dirname, '..', 'dist')
const SITE = 'https://sahari.io'

if (!existsSync(dist)) {
  console.error('dist/ does not exist, run vite build first.')
  process.exit(1)
}

const baseHtml = readFileSync(join(dist, 'index.html'), 'utf8')

// Per-route copy. Same default OG image for all unless overridden.
const ROUTES = [
  {
    path: '/youtube',
    title: 'YouTube · Sahari',
    description: 'Three YouTube channels with 100K+ subscribers and 18M+ views: institutions and everyday systems, architecture and history, and space. Sponsorship inquiries welcome.',
  },
  {
    path: '/work',
    title: 'Projects · Sahari',
    description: 'Projects built by Sahari: Virko, the Mokio booking platform and the NexByg website.',
  },
  {
    path: '/contact',
    title: 'Contact · Sahari',
    description: 'Sponsorships, collaborations or a project: send Sahari a message and get a reply within a day.',
  },
  {
    path: '/work-with-us',
    title: 'Work with us · Sahari',
    description: 'Work with Sahari: sponsor the videos, or join the content team. Currently hiring a 3D animator and a motion graphics editor.',
  },
  {
    path: '/black-stone',
    title: 'BLACK STONE · Custom tattoo studio · Copenhagen',
    description: 'Concept site for a fictional tattoo studio in Copenhagen by Sahari. Editorial layout, heavy typography, photo-led.',
  },
  {
    path: '/drift',
    title: 'DRIFT · Specialty coffee · København',
    description: 'Concept site for a fictional specialty coffee shop in Copenhagen by Sahari.',
  },
  {
    path: '/mork',
    title: 'MØRK · Barber by Rasmus Mørk · Aarhus',
    description: 'Concept site for a fictional solo barber in Aarhus by Sahari. Sharp typography, sand palette, live slot counter.',
  },
]

function escape(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function patchHtml(html, route) {
  const url = `${SITE}${route.path}`
  const t = escape(route.title)
  const d = escape(route.description)
  let out = html

  // Replace document <title>
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)

  // description, og:title, og:description, og:url, twitter:title, twitter:description
  out = out.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${d}" />`,
  )
  out = out.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${t}" />`,
  )
  out = out.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${d}" />`,
  )
  out = out.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${url}" />`,
  )
  out = out.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${t}" />`,
  )
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${d}" />`,
  )
  out = out.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`,
  )

  return out
}

let written = 0
for (const route of ROUTES) {
  const targetDir = join(dist, route.path.replace(/^\//, ''))
  mkdirSync(targetDir, { recursive: true })
  const html = patchHtml(baseHtml, route)
  writeFileSync(join(targetDir, 'index.html'), html)
  written++
  console.log(`wrote ${route.path}/index.html`)
}

console.log(`Generated ${written} route HTML files.`)
