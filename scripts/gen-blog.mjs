/**
 * Build-time fetch of Virko articles. Runs after vite build so the dist
 * folder exists. Pulls the list of articles, then fetches each article's
 * full HTML in parallel, then writes:
 *
 *   dist/blog-data.json
 *     The full payload the React app reads at runtime to render the blog
 *     list and individual articles. Single source of truth.
 *
 *   dist/blog/index.html
 *     Static shell for the list page with the right title and description
 *     so search engines and link-preview scrapers see proper metadata.
 *
 *   dist/blog/<slug>/index.html
 *     Static shell per article with per-article title, description, OG
 *     tags, canonical URL, and the article HTML baked into the root div
 *     so non-JS crawlers see the content. React clears the root on
 *     mount and renders its own copy from blog-data.json for SPA users.
 *
 *   Also appends blog URLs to dist/sitemap.xml so Google discovers them.
 *
 * The Virko API key is read from VIRKO_API_KEY in the build environment.
 * It never reaches the client bundle. If the key is missing or the API
 * call fails, the script emits an empty blog list and logs a warning so
 * the build still succeeds.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = join(__dirname, '..', 'dist')
const SITE = 'https://sahari.io'
const VIRKO_BASE = 'https://www.virko.io/api/v1/content'

if (!existsSync(dist)) {
  console.error('dist/ does not exist, run vite build first.')
  process.exit(1)
}

const KEY = process.env.VIRKO_API_KEY || ''
if (!KEY) {
  console.warn('[gen-blog] VIRKO_API_KEY not set. Writing empty blog data.')
}

const baseHtml = readFileSync(join(dist, 'index.html'), 'utf8')

function escape(s) {
  if (s == null) return ''
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

async function fetchJSON(url) {
  if (!KEY) return null
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${KEY}` },
    })
    if (!res.ok) {
      console.warn(`[gen-blog] ${url} returned ${res.status}`)
      return null
    }
    return await res.json()
  } catch (err) {
    console.warn(`[gen-blog] ${url} failed: ${err.message}`)
    return null
  }
}

function plainText(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function makeDescription(article) {
  if (article.excerpt) return article.excerpt
  if (article.description) return article.description
  const txt = plainText(article.html || article.content || '')
  return txt.length > 160 ? txt.slice(0, 157) + '...' : txt
}

function patchListHtml(html, articleCount) {
  const title = articleCount > 0
    ? `Blog · Sahari`
    : `Blog · Sahari`
  const desc = articleCount > 0
    ? `Articles, tips, and insights from Sahari on websites, SEO, software and running a small studio in Denmark.`
    : `Articles from Sahari on websites, SEO, software and running a small studio in Denmark.`
  const url = `${SITE}/blog`
  let out = html
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
  out = out.replace(/<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escape(desc)}" />`)
  out = out.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escape(title)}" />`)
  out = out.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escape(desc)}" />`)
  out = out.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${url}" />`)
  out = out.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escape(title)}" />`)
  out = out.replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escape(desc)}" />`)
  out = out.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`)
  return out
}

function patchArticleHtml(html, article) {
  const title = `${article.title || article.slug} · Sahari`
  const desc = makeDescription(article)
  const slug = article.slug
  const url = `${SITE}/blog/${slug}`
  const image = article.image || article.coverImage || `${SITE}/og-image.png`

  let out = html
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
  out = out.replace(/<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escape(desc)}" />`)
  out = out.replace(/<meta property="og:type" content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="article" />`)
  out = out.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escape(title)}" />`)
  out = out.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escape(desc)}" />`)
  out = out.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${url}" />`)
  out = out.replace(/<meta property="og:image" content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${escape(image)}" />`)
  out = out.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escape(title)}" />`)
  out = out.replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escape(desc)}" />`)
  out = out.replace(/<meta name="twitter:image" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:image" content="${escape(image)}" />`)
  out = out.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`)

  // Bake article content into the root div so crawlers without JS see it.
  // React clears the root on mount and re-renders from blog-data.json.
  const body = article.html || article.content || ''
  const seoFallback = `<article style="max-width:42rem;margin:5rem auto;padding:0 1.5rem;color:#e5e5e5;font-family:system-ui,sans-serif">
<h1>${escape(article.title || '')}</h1>
${body}
</article>`
  out = out.replace('<div id="root"></div>', `<div id="root">${seoFallback}</div>`)

  return out
}

function appendSitemap(slugs) {
  const sitemapPath = join(dist, 'sitemap.xml')
  if (!existsSync(sitemapPath)) return
  let xml = readFileSync(sitemapPath, 'utf8')

  const entries = ['/blog', ...slugs.map((s) => `/blog/${s}`)]
    .map(
      (path) => `  <url>
    <loc>${SITE}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`,
    )
    .join('\n')

  xml = xml.replace('</urlset>', `${entries}\n</urlset>`)
  writeFileSync(sitemapPath, xml)
}

async function main() {
  // Fetch the article list.
  const list = await fetchJSON(VIRKO_BASE)
  const items = list?.articles || list?.items || list || []

  if (!Array.isArray(items) || items.length === 0) {
    console.warn('[gen-blog] No articles found. Writing empty blog data.')
    writeFileSync(join(dist, 'blog-data.json'), JSON.stringify({ articles: [] }, null, 2))
    mkdirSync(join(dist, 'blog'), { recursive: true })
    writeFileSync(join(dist, 'blog', 'index.html'), patchListHtml(baseHtml, 0))
    return
  }

  // For each article that does not already have full HTML, fetch the detail.
  const fullArticles = await Promise.all(
    items.map(async (item) => {
      if (item.html || item.content) return item
      const detail = await fetchJSON(`${VIRKO_BASE}/${item.slug}`)
      if (!detail) return item
      return { ...item, ...(detail.article || detail) }
    }),
  )

  const articles = fullArticles.filter((a) => a && a.slug)

  // Write the JSON payload the React app reads at runtime.
  writeFileSync(
    join(dist, 'blog-data.json'),
    JSON.stringify({ articles }, null, 2),
  )

  // List page HTML.
  mkdirSync(join(dist, 'blog'), { recursive: true })
  writeFileSync(join(dist, 'blog', 'index.html'), patchListHtml(baseHtml, articles.length))

  // Per-article HTML.
  for (const a of articles) {
    const dir = join(dist, 'blog', a.slug)
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.html'), patchArticleHtml(baseHtml, a))
    console.log(`wrote /blog/${a.slug}/index.html`)
  }

  // Append blog URLs to sitemap.
  appendSitemap(articles.map((a) => a.slug))

  console.log(`[gen-blog] Wrote ${articles.length} articles.`)
}

main().catch((err) => {
  console.error('[gen-blog] Failed:', err)
  // Do not fail the build over content fetching.
  process.exit(0)
})
