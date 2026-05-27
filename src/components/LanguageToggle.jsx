import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageToggle({ className = '' }) {
  const { lang, setLang } = useLanguage()
  const options = [
    { code: 'en', label: 'EN', aria: 'English' },
    { code: 'da', label: 'DA', aria: 'Dansk' },
  ]
  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center rounded-lg border border-white/10 bg-white/5 p-0.5 text-xs font-medium ${className}`}
    >
      {options.map((o) => (
        <button
          key={o.code}
          type="button"
          onClick={() => setLang(o.code)}
          aria-label={o.aria}
          aria-pressed={lang === o.code}
          className={`px-2.5 py-1 rounded-md transition-colors ${
            lang === o.code
              ? 'bg-white/10 text-white'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
