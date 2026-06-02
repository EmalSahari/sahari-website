import { useEffect } from 'react'

const DEFAULT_DESC =
  'Software studio in Denmark building secure websites, mobile apps, backends and custom tools. End-to-end delivery from DKK 9,995. Founded by Emal Sahari.'

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const [, key, name] = selector.match(/meta\[(.*?)="(.*?)"\]/) || []
    if (key && name) el.setAttribute(key, name)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

export default function Seo({ title, description = DEFAULT_DESC }) {
  useEffect(() => {
    const fullTitle = title ? `${title} · Sahari` : 'Sahari: Websites, apps & custom software'
    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', description)
  }, [title, description])

  return null
}
