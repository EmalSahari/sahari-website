import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'
import Seo from '../components/Seo'

function fmtDate(iso, lang) {
  if (!iso) return ''
  try {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return ''
    return new Intl.DateTimeFormat(lang === 'da' ? 'da-DK' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(d)
  } catch {
    return ''
  }
}

export default function BlogPost() {
  const t = useT()
  const lang = t('nav.home') === 'Hjem' ? 'da' : 'en'
  const { slug } = useParams()
  const [state, setState] = useState({ status: 'loading', article: null })

  useEffect(() => {
    let cancelled = false
    fetch('/blog-data.json')
      .then((r) => (r.ok ? r.json() : { articles: [] }))
      .then((data) => {
        if (cancelled) return
        const article = (data.articles || []).find((a) => a.slug === slug)
        if (article) setState({ status: 'ready', article })
        else setState({ status: 'missing', article: null })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'missing', article: null })
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  const { status, article } = state

  return (
    <div className="pt-28 pb-20">
      <Seo
        title={article?.title || 'Blog'}
        description={
          article?.excerpt ||
          article?.description ||
          'Article from Sahari.'
        }
      />

      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            {t('blog.backToList')}
          </Link>
        </motion.div>

        {status === 'loading' && (
          <p className="text-zinc-500 text-sm">{t('blog.loading')}</p>
        )}

        {status === 'missing' && (
          <div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.02] mb-5">
              {t('blog.notFound.heading')}
            </h1>
            <p className="text-zinc-400 mb-6">{t('blog.notFound.body')}</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-zinc-200 text-black font-medium rounded-xl text-sm transition-all"
            >
              {t('blog.backToList')}
            </Link>
          </div>
        )}

        {status === 'ready' && article && (
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <header className="mb-10">
              {(article.publishedAt || article.date || article.createdAt) && (
                <p className="text-xs text-red-400 font-medium tracking-widest uppercase mb-4">
                  {fmtDate(
                    article.publishedAt || article.date || article.createdAt,
                    lang,
                  )}
                </p>
              )}
              <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.02] mb-5">
                {article.title}
              </h1>
              <div className="h-[2px] w-12 bg-red-400" />
            </header>

            <div
              className="prose-blog text-zinc-300"
              dangerouslySetInnerHTML={{
                __html: article.html || article.content || article.body || '',
              }}
            />
          </motion.article>
        )}
      </div>
    </div>
  )
}
