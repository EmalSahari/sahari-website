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
    path: '/about',
    title: 'About · Sahari',
    description: 'Solo software studio in Aarhus. Emal Sahari builds secure websites, apps, backends and tools end to end. Also a content creator with 84K+ YouTube subscribers.',
  },
  {
    path: '/work',
    title: 'Work · Sahari',
    description: 'Selected projects by Sahari: Mokio booking platform, the Brand Kit Generator, Wordo, client websites and design demos.',
  },
  {
    path: '/pricing',
    title: 'Pricing · Sahari',
    description: 'Fixed-price websites and software from DKK 4,995. Three transparent tiers plus add-ons for payments, booking and ongoing care.',
  },
  {
    path: '/contact',
    title: 'Contact · Sahari',
    description: 'Got a project in mind? Send Emal Sahari a message and get a reply within a day.',
  },
  {
    path: '/work-with-us',
    title: 'Careers · Sahari',
    description: 'Open roles and collaborations at Sahari: voice actor, video editor, animator, thumbnail designer and more.',
  },
  {
    path: '/tools/brand-kit',
    title: 'Brand Kit Generator: free color palette and font pairing tool | Sahari',
    description: 'Generate brand color palettes and Google Font pairings in seconds. Lock colors, edit hex, check WCAG contrast, preview on hero, card and device mockups, export to CSS, Tailwind, SCSS, JSON or PDF. Free, no signup.',
  },
  {
    path: '/tools/site-check',
    title: 'Will Google find your site? · Sahari',
    description: 'Free SEO and speed audit powered by Google PageSpeed Insights. Find out why your site is not ranking and what is costing you visitors.',
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
