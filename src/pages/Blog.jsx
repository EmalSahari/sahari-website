import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'

function fmtDate(iso, lang) {
  if (!iso) return ''
  try {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return ''
    return new Intl.DateTimeFormat(lang === 'da' ? 'da-DK' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(d)
  } catch {
    return ''
  }
}

export default function Blog() {
  const t = useT()
  const lang = t('nav.home') === 'Hjem' ? 'da' : 'en'
  const [articles, setArticles] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch('/blog-data.json')
      .then((r) => (r.ok ? r.json() : { articles: [] }))
      .then((data) => {
        if (!cancelled) setArticles(data.articles || [])
      })
      .catch(() => {
        if (!cancelled) setArticles([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="pt-28 pb-20">
      <Seo title="Blog" description="Articles, tips and insights on websites, SEO, software and running a small studio in Denmark." />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <p className="text-red-400 text-sm font-medium tracking-widest uppercase mb-3">
            {t('blog.eyebrow')}
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.02] mb-5">
            {t('blog.heading')}
          </h1>
          <div className="h-[2px] w-12 bg-red-400 mb-6" />
          <p className="text-zinc-400 max-w-lg leading-relaxed">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        {articles === null && (
          <p className="text-zinc-500 text-sm">{t('blog.loading')}</p>
        )}

        {articles && articles.length === 0 && (
          <p className="text-zinc-500 text-sm">{t('blog.empty')}</p>
        )}

        {articles && articles.length > 0 && (
          <div className="border-t border-white/10">
            {articles.map((a, i) => (
              <Reveal key={a.slug} i={i}>
                <Link
                  to={`/blog/${a.slug}`}
                  className="group grid md:grid-cols-12 gap-3 md:gap-6 py-8 border-b border-white/10 items-baseline transition-colors hover:border-red-500/30"
                >
                  <span className="md:col-span-2 text-xs text-red-400 font-medium tracking-widest uppercase tabular-nums">
                    {fmtDate(a.publishedAt || a.date || a.createdAt, lang)}
                  </span>
                  <h2 className="md:col-span-7 font-display text-xl md:text-2xl font-bold text-white tracking-tight transition-transform duration-300 group-hover:translate-x-1.5">
                    {a.title}
                  </h2>
                  <span className="md:col-span-3 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 group-hover:text-red-300 transition-colors md:justify-end">
                    {t('blog.readMore')}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
