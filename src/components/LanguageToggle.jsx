import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageToggle({ className = '' }) {
  const { lang, setLang } = useLanguage()
  const options = [
    { code: 'en', flag: '🇬🇧', aria: 'English' },
    { code: 'da', flag: '🇩🇰', aria: 'Dansk' },
  ]
  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center rounded-lg border border-white/10 bg-white/5 p-0.5 ${className}`}
    >
      {options.map((o) => (
        <button
          key={o.code}
          type="button"
          onClick={() => setLang(o.code)}
          aria-label={o.aria}
          aria-pressed={lang === o.code}
          className={`px-2 py-1 rounded-md text-base leading-none transition-all ${
            lang === o.code
              ? 'bg-white/10 opacity-100 scale-105'
              : 'opacity-50 hover:opacity-90'
          }`}
        >
          {o.flag}
        </button>
      ))}
    </div>
  )
}
