import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Loader2, ArrowRight, Gauge, Zap, RefreshCw,
  AlertTriangle, CheckCircle2, ExternalLink, XCircle, AlertCircle,
} from 'lucide-react'
import { useT } from '../../i18n/LanguageContext'
import Seo from '../../components/Seo'

const PSI_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
const PSI_KEY = import.meta.env.VITE_PSI_KEY || ''

function normalizeUrl(raw) {
  let u = raw.trim()
  if (!u) return null
  if (!/^https?:\/\//i.test(u)) u = 'https://' + u
  try {
    const parsed = new URL(u)
    if (!parsed.hostname.includes('.')) return null
    return parsed.href
  } catch {
    return null
  }
}

function scoreColor(score) {
  if (score >= 0.9) return '#22c55e'
  if (score >= 0.5) return '#fbbf24'
  return '#ef4444'
}

function scoreLabelKey(score) {
  if (score >= 0.9) return 'siteCheck.good'
  if (score >= 0.5) return 'siteCheck.needsWork'
  return 'siteCheck.poor'
}

function extractIssues(audits) {
  const list = Object.values(audits).filter(
    (a) => a && a.details && a.details.type === 'opportunity' && (a.details.overallSavingsMs || 0) > 50,
  )
  list.sort((a, b) => (b.details.overallSavingsMs || 0) - (a.details.overallSavingsMs || 0))

  const opportunities = list.slice(0, 3)

  if (opportunities.length < 3) {
    const failing = Object.values(audits)
      .filter(
        (a) =>
          a &&
          a.score !== null &&
          a.score !== undefined &&
          a.score < 0.9 &&
          a.description &&
          !opportunities.includes(a) &&
          a.scoreDisplayMode !== 'informative' &&
          a.scoreDisplayMode !== 'manual' &&
          a.scoreDisplayMode !== 'notApplicable',
      )
      .sort((a, b) => (a.score || 0) - (b.score || 0))
    for (const f of failing) {
      if (opportunities.length >= 3) break
      opportunities.push(f)
    }
  }
  return opportunities
}

function cleanDescription(desc) {
  // Strip markdown links [text](url) -> text, and trailing "Learn more" sentences.
  return desc
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s*Learn (more|how)[^.]*\./gi, '')
    .trim()
}

const PROXY = 'https://api.allorigins.win/raw?url='

async function fetchProxied(url, timeoutMs = 10000) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(`${PROXY}${encodeURIComponent(url)}`, { signal: ctrl.signal })
    if (!res.ok) return null
    return await res.text()
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

function pushCheck(list, status, label, detail) {
  list.push({ status, label, detail })
}

function runHeadChecks(html, lang) {
  const checks = []
  if (!html) return checks
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const labels = lang === 'da' ? {
    title: 'Title-tag',
    titleMissing: 'Mangler title-tag. Google bruger den som overskrift i søgeresultatet.',
    titleShort: (n) => `For kort (${n} tegn). Sigt efter 50-60.`,
    titleLong: (n) => `For lang (${n} tegn). Google trunkerer typisk ved 60.`,
    titleOk: (n) => `${n} tegn, indenfor det optimale interval.`,
    desc: 'Meta description',
    descMissing: 'Mangler meta description. Bruges af Google som teaser i søgeresultatet.',
    descShort: (n) => `For kort (${n} tegn). Sigt efter 120-160.`,
    descLong: (n) => `For lang (${n} tegn). Google trunkerer typisk ved 160.`,
    descOk: (n) => `${n} tegn, indenfor det optimale interval.`,
    h1: 'H1 overskrift',
    h1Missing: 'Ingen H1 fundet. Hver side bør have præcis én.',
    h1Multiple: (n) => `${n} H1-tags fundet. Brug kun én per side.`,
    h1Ok: 'Præcis ét H1-tag.',
    canonical: 'Canonical-tag',
    canonicalMissing: 'Ingen canonical-tag. Hjælper Google med at undgå duplicate content.',
    canonicalOk: 'Canonical-tag til stede.',
    lang: 'Lang-attribut på <html>',
    langMissing: 'Mangler lang-attribut. Fortæller browsere og søgemaskiner sproget.',
    langOk: (l) => `Sat til "${l}".`,
    viewport: 'Mobile viewport',
    viewportMissing: 'Mangler viewport meta-tag. Siden vil ikke skalere korrekt på mobil.',
    viewportOk: 'Viewport meta-tag til stede.',
    og: 'Open Graph tags',
    ogMissing: 'Mangler. Sider uden OG-tags viser et generisk preview når de deles på sociale medier.',
    ogPartial: (m) => `Mangler: ${m.join(', ')}.`,
    ogOk: 'og:title, og:description og og:image er til stede.',
    twitter: 'Twitter/X kort',
    twitterMissing: 'Mangler twitter:card meta-tag.',
    twitterOk: 'Twitter card meta-tag til stede.',
    structuredData: 'Structured data (JSON-LD)',
    structuredMissing: 'Ingen JSON-LD fundet. Schema.org markup hjælper Google forstå indholdet og gør siden berettiget til rich results.',
    structuredOk: (n) => `${n} JSON-LD blok${n === 1 ? '' : 'ke'} fundet.`,
    altText: 'Alt-tekst på billeder',
    altNone: 'Ingen billeder på siden.',
    altLow: (p, t) => `${p} ud af ${t} billeder mangler alt-tekst.`,
    altOk: (t) => `Alle ${t} billeder har alt-tekst.`,
    words: 'Indholdsmængde',
    wordsLow: (n) => `Kun ~${n} ord på siden. Tyndt indhold kan dårligere ranke.`,
    wordsOk: (n) => `~${n} ord, godt grundlag for SEO.`,
  } : {
    title: 'Title tag',
    titleMissing: 'Missing title tag. Google uses it as the search result heading.',
    titleShort: (n) => `Too short (${n} chars). Aim for 50-60.`,
    titleLong: (n) => `Too long (${n} chars). Google typically truncates around 60.`,
    titleOk: (n) => `${n} chars, within the sweet spot.`,
    desc: 'Meta description',
    descMissing: 'Missing meta description. Google uses it as the snippet under your title.',
    descShort: (n) => `Too short (${n} chars). Aim for 120-160.`,
    descLong: (n) => `Too long (${n} chars). Google typically truncates around 160.`,
    descOk: (n) => `${n} chars, within the sweet spot.`,
    h1: 'H1 heading',
    h1Missing: 'No H1 found. Every page should have exactly one.',
    h1Multiple: (n) => `${n} H1 tags found. Use only one per page.`,
    h1Ok: 'Exactly one H1 tag.',
    canonical: 'Canonical tag',
    canonicalMissing: 'No canonical link tag. Helps Google avoid duplicate content issues.',
    canonicalOk: 'Canonical tag present.',
    lang: 'Lang attribute on <html>',
    langMissing: 'Missing lang attribute. Tells browsers and search engines the page language.',
    langOk: (l) => `Set to "${l}".`,
    viewport: 'Mobile viewport',
    viewportMissing: 'Missing viewport meta tag. The page will not scale correctly on phones.',
    viewportOk: 'Viewport meta tag present.',
    og: 'Open Graph tags',
    ogMissing: 'Missing. Pages without OG tags get a generic preview when shared on social.',
    ogPartial: (m) => `Missing: ${m.join(', ')}.`,
    ogOk: 'og:title, og:description and og:image all present.',
    twitter: 'Twitter/X card',
    twitterMissing: 'Missing twitter:card meta tag.',
    twitterOk: 'Twitter card meta tag present.',
    structuredData: 'Structured data (JSON-LD)',
    structuredMissing: 'No JSON-LD found. Schema.org markup helps Google understand the content and makes the page eligible for rich results.',
    structuredOk: (n) => `${n} JSON-LD block${n === 1 ? '' : 's'} found.`,
    altText: 'Image alt text',
    altNone: 'No images on the page.',
    altLow: (p, t) => `${p} of ${t} images missing alt text.`,
    altOk: (t) => `All ${t} images have alt text.`,
    words: 'Content depth',
    wordsLow: (n) => `Only ~${n} words on the page. Thin content can rank poorly.`,
    wordsOk: (n) => `~${n} words, solid SEO foundation.`,
  }

  // Title
  const title = doc.querySelector('title')?.textContent?.trim() || ''
  if (!title) pushCheck(checks, 'fail', labels.title, labels.titleMissing)
  else if (title.length < 30) pushCheck(checks, 'warn', labels.title, labels.titleShort(title.length))
  else if (title.length > 65) pushCheck(checks, 'warn', labels.title, labels.titleLong(title.length))
  else pushCheck(checks, 'pass', labels.title, labels.titleOk(title.length))

  // Meta description
  const desc = doc.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() || ''
  if (!desc) pushCheck(checks, 'fail', labels.desc, labels.descMissing)
  else if (desc.length < 80) pushCheck(checks, 'warn', labels.desc, labels.descShort(desc.length))
  else if (desc.length > 170) pushCheck(checks, 'warn', labels.desc, labels.descLong(desc.length))
  else pushCheck(checks, 'pass', labels.desc, labels.descOk(desc.length))

  // H1
  const h1s = doc.querySelectorAll('h1')
  if (h1s.length === 0) pushCheck(checks, 'fail', labels.h1, labels.h1Missing)
  else if (h1s.length > 1) pushCheck(checks, 'warn', labels.h1, labels.h1Multiple(h1s.length))
  else pushCheck(checks, 'pass', labels.h1, labels.h1Ok)

  // Canonical
  const canonical = doc.querySelector('link[rel="canonical"]')
  if (!canonical) pushCheck(checks, 'warn', labels.canonical, labels.canonicalMissing)
  else pushCheck(checks, 'pass', labels.canonical, labels.canonicalOk)

  // Lang
  const htmlLang = doc.documentElement.getAttribute('lang')
  if (!htmlLang) pushCheck(checks, 'warn', labels.lang, labels.langMissing)
  else pushCheck(checks, 'pass', labels.lang, labels.langOk(htmlLang))

  // Viewport
  const viewport = doc.querySelector('meta[name="viewport"]')
  if (!viewport) pushCheck(checks, 'fail', labels.viewport, labels.viewportMissing)
  else pushCheck(checks, 'pass', labels.viewport, labels.viewportOk)

  // Open Graph
  const ogTitle = doc.querySelector('meta[property="og:title"]')
  const ogDesc = doc.querySelector('meta[property="og:description"]')
  const ogImage = doc.querySelector('meta[property="og:image"]')
  const ogPresent = [ogTitle, ogDesc, ogImage].filter(Boolean).length
  if (ogPresent === 0) pushCheck(checks, 'fail', labels.og, labels.ogMissing)
  else if (ogPresent < 3) {
    const missing = []
    if (!ogTitle) missing.push('og:title')
    if (!ogDesc) missing.push('og:description')
    if (!ogImage) missing.push('og:image')
    pushCheck(checks, 'warn', labels.og, labels.ogPartial(missing))
  } else pushCheck(checks, 'pass', labels.og, labels.ogOk)

  // Twitter card
  const twCard = doc.querySelector('meta[name="twitter:card"]')
  if (!twCard) pushCheck(checks, 'warn', labels.twitter, labels.twitterMissing)
  else pushCheck(checks, 'pass', labels.twitter, labels.twitterOk)

  // Structured data
  const jsonLd = doc.querySelectorAll('script[type="application/ld+json"]')
  if (jsonLd.length === 0) pushCheck(checks, 'warn', labels.structuredData, labels.structuredMissing)
  else pushCheck(checks, 'pass', labels.structuredData, labels.structuredOk(jsonLd.length))

  // Image alt coverage
  const images = doc.querySelectorAll('img')
  if (images.length === 0) {
    pushCheck(checks, 'pass', labels.altText, labels.altNone)
  } else {
    const missing = Array.from(images).filter((img) => !img.getAttribute('alt')?.trim()).length
    if (missing === 0) pushCheck(checks, 'pass', labels.altText, labels.altOk(images.length))
    else pushCheck(checks, missing > images.length / 2 ? 'fail' : 'warn', labels.altText, labels.altLow(missing, images.length))
  }

  // Word count (approx)
  const bodyText = doc.body?.textContent?.replace(/\s+/g, ' ').trim() || ''
  const words = bodyText ? bodyText.split(' ').filter(Boolean).length : 0
  if (words < 200) pushCheck(checks, 'warn', labels.words, labels.wordsLow(words))
  else pushCheck(checks, 'pass', labels.words, labels.wordsOk(words))

  return checks
}

async function runDiscoveryChecks(targetUrl, lang) {
  const checks = []
  let origin
  try {
    origin = new URL(targetUrl).origin
  } catch {
    return checks
  }

  const labels = lang === 'da' ? {
    robots: 'robots.txt',
    robotsMissing: 'Ingen robots.txt fundet. Anbefales for at vejlede crawlere.',
    robotsOk: 'Findes på /robots.txt.',
    sitemap: 'Sitemap.xml',
    sitemapMissing: 'Ingen sitemap.xml fundet. Et sitemap hjælper Google opdage alle dine sider.',
    sitemapOk: 'Findes på /sitemap.xml.',
  } : {
    robots: 'robots.txt',
    robotsMissing: 'No robots.txt found. It is recommended to guide search engine crawlers.',
    robotsOk: 'Present at /robots.txt.',
    sitemap: 'Sitemap.xml',
    sitemapMissing: 'No sitemap.xml found. A sitemap helps Google discover all your pages.',
    sitemapOk: 'Present at /sitemap.xml.',
  }

  const [robots, sitemap] = await Promise.all([
    fetchProxied(`${origin}/robots.txt`, 6000),
    fetchProxied(`${origin}/sitemap.xml`, 6000),
  ])

  if (robots && /user-agent/i.test(robots)) {
    pushCheck(checks, 'pass', labels.robots, labels.robotsOk)
  } else {
    pushCheck(checks, 'warn', labels.robots, labels.robotsMissing)
  }

  if (sitemap && (/<urlset|<sitemapindex/i.test(sitemap))) {
    pushCheck(checks, 'pass', labels.sitemap, labels.sitemapOk)
  } else {
    pushCheck(checks, 'warn', labels.sitemap, labels.sitemapMissing)
  }

  return checks
}

function extractSeoFailures(lh) {
  // SEO category audits that did not pass.
  const seoCat = lh.categories?.seo
  if (!seoCat?.auditRefs) return []
  const audits = lh.audits
  const failing = []
  for (const ref of seoCat.auditRefs) {
    const a = audits[ref.id]
    if (!a) continue
    if (a.scoreDisplayMode === 'notApplicable' || a.scoreDisplayMode === 'manual' || a.scoreDisplayMode === 'informative') continue
    if (a.score === null || a.score === undefined) continue
    if (a.score >= 1) continue
    failing.push(a)
  }
  return failing
}

function sortChecks(checks) {
  const order = { fail: 0, warn: 1, pass: 2 }
  return [...checks].sort((a, b) => order[a.status] - order[b.status])
}

function ScoreRing({ label, score, sublabel }) {
  const pct = Math.round(score * 100)
  const color = scoreColor(score)
  const r = 30
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - score)
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-[76px] h-[76px]">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 76 76">
          <circle cx="38" cy="38" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          <motion.circle
            cx="38"
            cy="38"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center font-bold text-lg tabular-nums"
          style={{ color }}
        >
          {pct}
        </span>
      </div>
      <span className="text-white text-sm font-medium text-center leading-tight">{label}</span>
      {sublabel && <span className="text-[11px]" style={{ color }}>{sublabel}</span>}
    </div>
  )
}

function VitalCard({ label, value, score }) {
  const color = score === null || score === undefined ? '#a1a1aa' : scoreColor(score)
  return (
    <div className="rounded-xl border border-white/10 bg-[#0f0f0f] p-4 text-center">
      <p className="text-[10px] tracking-widest uppercase text-zinc-500 mb-1.5">{label}</p>
      <p className="text-lg font-bold tracking-tight" style={{ color }}>{value || '-'}</p>
    </div>
  )
}

function SeoCheckRow({ check }) {
  const tone = {
    pass: { icon: <CheckCircle2 size={16} className="text-emerald-400" />, ring: 'border-transparent' },
    warn: { icon: <AlertTriangle size={16} className="text-amber-400" />, ring: 'border-transparent' },
    fail: { icon: <XCircle size={16} className="text-red-400" />, ring: 'border-transparent' },
  }[check.status]
  return (
    <div className={`flex items-start gap-3 rounded-xl border ${tone.ring} p-3 hover:bg-white/[0.02] transition-colors`}>
      <span className="flex-shrink-0 mt-0.5">{tone.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium leading-tight">{check.label}</p>
        <p className="text-zinc-500 text-xs mt-1 leading-relaxed">{check.detail}</p>
      </div>
    </div>
  )
}

export default function SiteCheck() {
  const t = useT()
  const lang = t('nav.home') === 'Hjem' ? 'da' : 'en'
  const navigate = useNavigate()

  const [url, setUrl] = useState('')
  const strategy = 'mobile'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const resultRef = useRef(null)

  useEffect(() => {
    document.title = `${t('siteCheck.heading')} | Sahari`
  }, [t])

  const runScan = async (e) => {
    if (e) e.preventDefault()
    const target = normalizeUrl(url)
    if (!target) {
      setError(t('siteCheck.error.invalid'))
      return
    }
    setError(null)
    setLoading(true)
    setResult(null)

    try {
      const params = new URLSearchParams({ url: target, strategy })
      for (const c of ['performance', 'seo', 'accessibility', 'best-practices']) {
        params.append('category', c)
      }
      if (PSI_KEY) params.append('key', PSI_KEY)

      const res = await fetch(`${PSI_ENDPOINT}?${params.toString()}`)
      if (res.status === 429 || res.status === 403) {
        setError(t('siteCheck.error.rate'))
        setLoading(false)
        return
      }
      if (!res.ok) {
        setError(t('siteCheck.error.failed'))
        setLoading(false)
        return
      }
      const data = await res.json()
      const lh = data.lighthouseResult
      if (!lh) {
        setError(t('siteCheck.error.failed'))
        setLoading(false)
        return
      }

      const cats = lh.categories
      const audits = lh.audits
      const parsed = {
        finalUrl: data.id || target,
        scores: {
          performance: cats.performance?.score ?? 0,
          seo: cats.seo?.score ?? 0,
          accessibility: cats.accessibility?.score ?? 0,
          bestPractices: cats['best-practices']?.score ?? 0,
        },
        vitals: {
          lcp: audits['largest-contentful-paint'],
          cls: audits['cumulative-layout-shift'],
          tbt: audits['total-blocking-time'],
          fcp: audits['first-contentful-paint'],
        },
        issues: extractIssues(audits),
        seoFailures: extractSeoFailures(lh),
        seoChecks: null,
      }
      setResult(parsed)
      setLoading(false)
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)

      // Fetch HTML + robots + sitemap in parallel, run head checks, then patch result.
      const [html, discovery] = await Promise.all([
        fetchProxied(target, 10000),
        runDiscoveryChecks(target, lang),
      ])
      const headChecks = runHeadChecks(html, lang)
      const combined = sortChecks([...headChecks, ...discovery])
      setResult((prev) => prev ? { ...prev, seoChecks: combined } : prev)
    } catch {
      setError(t('siteCheck.error.failed'))
      setLoading(false)
    }
  }

  const reset = () => {
    setResult(null)
    setError(null)
    setUrl('')
  }

  const goToContact = () => {
    if (!result) return
    const s = result.scores
    const lines = [
      lang === 'da' ? 'Min site-rapport fra Sahari:' : 'My site report from Sahari:',
      '',
      `${lang === 'da' ? 'Side' : 'Site'}: ${result.finalUrl}`,
      `${t('siteCheck.score.seo')}: ${Math.round(s.seo * 100)}/100`,
      `${t('siteCheck.score.performance')}: ${Math.round(s.performance * 100)}/100`,
      `${t('siteCheck.score.accessibility')}: ${Math.round(s.accessibility * 100)}/100`,
      `${t('siteCheck.score.bestPractices')}: ${Math.round(s.bestPractices * 100)}/100`,
      '',
      lang === 'da' ? '(Jeg vil gerne have det forbedret)' : '(I would like this improved)',
    ]
    const message = encodeURIComponent(lines.join('\n'))
    navigate(`/contact?message=${message}`)
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <Seo
        title={t('siteCheck.heading')}
        description="Free SEO and speed audit powered by Google PageSpeed Insights. Find out why your site is not ranking and what is costing you visitors."
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 max-w-2xl mx-auto"
        >
          <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">
            {t('siteCheck.eyebrow')}
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight mb-5 leading-[1.05]">
            {t('siteCheck.heading')}
          </h1>
          <div className="h-[2px] w-12 bg-amber-400 mx-auto mb-6" />
          <p className="text-zinc-400 text-lg leading-relaxed">
            {t('siteCheck.subtitle')}
          </p>
        </motion.div>

        {/* Input */}
        <motion.form
          onSubmit={runScan}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t('siteCheck.placeholder')}
                disabled={loading}
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400/50 transition-colors disabled:opacity-60"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed text-black font-semibold rounded-xl transition-colors whitespace-nowrap"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Gauge size={16} />}
              {loading ? t('siteCheck.scanning') : t('siteCheck.scan')}
            </button>
          </div>

          {error && (
            <p className="text-center text-red-400 text-sm mt-4 flex items-center justify-center gap-2">
              <AlertTriangle size={14} />
              {error}
            </p>
          )}
        </motion.form>

        {/* Loading skeleton */}
        {loading && (
          <div className="mt-12 flex flex-col items-center gap-4 text-zinc-500">
            <Loader2 size={28} className="animate-spin text-amber-400" />
            <p className="text-sm">{t('siteCheck.scanning')}</p>
          </div>
        )}

        {/* Results */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14"
            >
              {/* Scanned URL */}
              <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
                <div className="min-w-0">
                  <p className="text-[10px] tracking-widest uppercase text-zinc-500 mb-1">
                    {t('siteCheck.mobile')}
                  </p>
                  <p className="text-white font-medium truncate">{result.finalUrl}</p>
                </div>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors flex-shrink-0"
                >
                  <RefreshCw size={14} />
                  {t('siteCheck.scanAgain')}
                </button>
              </div>

              {/* Scores */}
              <div className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-6 md:p-8 mb-5">
                <h2 className="text-[11px] tracking-[0.3em] uppercase text-amber-400 font-semibold mb-6">
                  {t('siteCheck.scores')}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <ScoreRing
                    label={t('siteCheck.score.seo')}
                    score={result.scores.seo}
                    sublabel={t(scoreLabelKey(result.scores.seo))}
                  />
                  <ScoreRing
                    label={t('siteCheck.score.performance')}
                    score={result.scores.performance}
                    sublabel={t(scoreLabelKey(result.scores.performance))}
                  />
                  <ScoreRing
                    label={t('siteCheck.score.accessibility')}
                    score={result.scores.accessibility}
                    sublabel={t(scoreLabelKey(result.scores.accessibility))}
                  />
                  <ScoreRing
                    label={t('siteCheck.score.bestPractices')}
                    score={result.scores.bestPractices}
                    sublabel={t(scoreLabelKey(result.scores.bestPractices))}
                  />
                </div>
              </div>

              {/* SEO checklist */}
              <div className="mb-5">
                <h2 className="text-[11px] tracking-[0.3em] uppercase text-amber-400 font-semibold mb-4">
                  {t('siteCheck.seoCheck')}
                </h2>
                {result.seoChecks === null ? (
                  <div className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-5 flex items-center gap-3 text-zinc-400">
                    <Loader2 size={16} className="animate-spin text-amber-400" />
                    <p className="text-sm">{t('siteCheck.seoCheckLoading')}</p>
                  </div>
                ) : result.seoChecks.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-5 flex items-center gap-3 text-zinc-500">
                    <AlertCircle size={16} />
                    <p className="text-sm">{t('siteCheck.seoCheckUnavailable')}</p>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-2 grid sm:grid-cols-2 gap-1">
                    {result.seoChecks.map((c, i) => (
                      <SeoCheckRow key={i} check={c} />
                    ))}
                  </div>
                )}
              </div>

              {/* Failing SEO audits from PageSpeed */}
              {result.seoFailures.length > 0 && (
                <div className="mb-5">
                  <h2 className="text-[11px] tracking-[0.3em] uppercase text-amber-400 font-semibold mb-4">
                    {t('siteCheck.seoFailuresHeading')}
                  </h2>
                  <div className="space-y-3">
                    {result.seoFailures.map((a, i) => (
                      <div key={a.id || i} className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-5">
                        <div className="flex items-start gap-3">
                          <XCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium leading-snug">{a.title}</p>
                            <p className="text-zinc-500 text-sm mt-1.5 leading-relaxed">
                              {cleanDescription(a.description || '')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Core Web Vitals */}
              <div className="mb-5">
                <h2 className="text-[11px] tracking-[0.3em] uppercase text-amber-400 font-semibold mb-4">
                  {t('siteCheck.vitals')}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <VitalCard label={t('siteCheck.vitals.lcp')} value={result.vitals.lcp?.displayValue} score={result.vitals.lcp?.score} />
                  <VitalCard label={t('siteCheck.vitals.cls')} value={result.vitals.cls?.displayValue} score={result.vitals.cls?.score} />
                  <VitalCard label={t('siteCheck.vitals.tbt')} value={result.vitals.tbt?.displayValue} score={result.vitals.tbt?.score} />
                  <VitalCard label={t('siteCheck.vitals.fcp')} value={result.vitals.fcp?.displayValue} score={result.vitals.fcp?.score} />
                </div>
              </div>

              {/* Top issues */}
              <div className="mb-8">
                <h2 className="text-[11px] tracking-[0.3em] uppercase text-amber-400 font-semibold mb-4">
                  {t('siteCheck.issues')}
                </h2>
                {result.issues.length === 0 ? (
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-6 flex items-center gap-3 text-emerald-300">
                    <CheckCircle2 size={20} />
                    <p className="text-sm">{t('siteCheck.noIssues')}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {result.issues.map((issue, i) => {
                      const savings = issue.details?.overallSavingsMs
                      return (
                        <div key={issue.id || i} className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-5">
                          <div className="flex items-start gap-4">
                            <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                              {i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-3 flex-wrap">
                                <p className="text-white font-medium leading-snug">{issue.title}</p>
                                {savings > 0 && (
                                  <span className="text-xs font-semibold text-amber-300 whitespace-nowrap flex items-center gap-1">
                                    <Zap size={11} />
                                    {t('siteCheck.estSavings')} {(savings / 1000).toFixed(1)}s
                                  </span>
                                )}
                              </div>
                              <p className="text-zinc-500 text-sm mt-1.5 leading-relaxed">
                                {cleanDescription(issue.description || '')}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 to-[#0f0f0f] p-6 md:p-8">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                  {t('siteCheck.cta.heading')}
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-6 max-w-xl">
                  {t('siteCheck.cta.body')}
                </p>
                <button
                  onClick={goToContact}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-amber-900/40"
                >
                  {t('siteCheck.cta.button')}
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Powered by */}
              <p className="text-center text-[11px] text-zinc-600 mt-6 flex items-center justify-center gap-1.5">
                <ExternalLink size={11} />
                {t('siteCheck.poweredBy')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
