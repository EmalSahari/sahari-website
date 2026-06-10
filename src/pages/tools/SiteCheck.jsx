import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Loader2, ArrowRight, Gauge, Zap, RefreshCw,
  AlertTriangle, CheckCircle2, ExternalLink,
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
      }
      setResult(parsed)
      setLoading(false)
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
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
