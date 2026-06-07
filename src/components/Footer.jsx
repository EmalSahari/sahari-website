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
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-6 pt-6 border-t border-white/[0.03]">
        <p className="text-xs text-zinc-600 text-center md:text-left">
          {t('footer.builtWith')}{' '}
          <span className="text-zinc-500">React</span>
          <span className="mx-1.5 text-zinc-700">·</span>
          <span className="text-zinc-500">Vite</span>
          <span className="mx-1.5 text-zinc-700">·</span>
          <span className="text-zinc-500">Tailwind</span>
          <span className="mx-1.5 text-zinc-700">·</span>
          <span className="text-zinc-500">Framer Motion</span>
          <span className="mx-1.5 text-zinc-700">·</span>
          <span className="text-zinc-500">Vercel</span>
        </p>
      </div>
    </footer>
  )
}
