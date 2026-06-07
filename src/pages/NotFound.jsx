import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'
import Seo from '../components/Seo'

export default function NotFound() {
  const t = useT()
  return (
    <div className="pt-28 pb-20 min-h-[80vh] flex items-center">
      <Seo title="404" description="The page you're looking for doesn't exist or has moved." />
      <div className="max-w-2xl mx-auto px-6 text-center relative">
        {/* Big background 404 */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="text-[200px] md:text-[280px] font-black text-white/[0.03] leading-none tracking-tighter">
            404
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <p className="text-zinc-400 text-sm font-medium tracking-widest uppercase mb-4">
            {t('notFound.eyebrow')}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-5">
            {t('notFound.heading.start')}{' '}
            <span className="gradient-text">{t('notFound.heading.highlight')}</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-md mx-auto mb-10">
            {t('notFound.subtitle')}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-200 text-black font-medium rounded-xl transition-all duration-200 shadow-lg shadow-black/40"
          >
            <ArrowLeft size={16} />
            {t('notFound.back')}
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
