import { Link } from 'react-router-dom'
import { Youtube, Github, Instagram } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'

export default function Footer() {
  const t = useT()
  return (
    <footer className="border-t border-white/5 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-black font-bold text-xs">
            S
          </div>
          <span className="text-zinc-400 text-sm">
            © {new Date().getFullYear()} Emal Sahari / Sahari. {t('footer.copyright')}
            <span className="hidden sm:inline text-zinc-600 mx-2">·</span>
            <span className="block sm:inline text-zinc-500 text-xs sm:text-sm">CVR 45468054</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/emal.sahari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-pink-400 transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://youtube.com/@SahariYT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-red-400 transition-colors"
            aria-label="YouTube"
          >
            <Youtube size={18} />
          </a>
          <a
            href="https://github.com/EmalSahari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
        </div>

        <nav className="flex items-center gap-5 text-sm text-zinc-500">
          <Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
          <Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link>
          <Link to="/work-with-us" className="hover:text-white transition-colors">{t('nav.workWithUs')}</Link>
          <Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link>
          <Link to="/tools/brand-kit" className="hover:text-white transition-colors">{t('nav.brandKit')}</Link>
          <Link to="/tools/site-check" className="hover:text-white transition-colors">{t('nav.siteCheck')}</Link>
        </nav>
      </div>

    </footer>
  )
}
