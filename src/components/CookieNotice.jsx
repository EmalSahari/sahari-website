import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'

const STORAGE_KEY = 'sahari.cookie.accepted'

export default function CookieNotice() {
  const t = useT()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-50"
        >
          <div className="gradient-border bg-[#0f0f0f]/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl shadow-black/20">
            <button
              onClick={accept}
              aria-label="Dismiss"
              className="absolute top-3 right-3 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
            <p className="text-white text-sm font-medium mb-1">{t('cookie.heading')}</p>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4 pr-6">
              {t('cookie.body')}
            </p>
            <button
              onClick={accept}
              className="w-full px-4 py-2 bg-white hover:bg-zinc-200 text-black text-sm font-medium rounded-lg transition-all duration-200 shadow-lg shadow-black/30"
            >
              {t('cookie.accept')}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
