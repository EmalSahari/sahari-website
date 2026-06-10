import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_URL = 'https://sahari.io'
const DEFAULT_DESC =
  'Software studio in Denmark. Secure websites, mobile apps, backends and custom tools. Fixed pricing from DKK 4,995.'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

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

function setLinkHref(rel, value) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', value)
}

export default function Seo({ title, description = DEFAULT_DESC, image = DEFAULT_IMAGE }) {
  const location = useLocation()

  useEffect(() => {
    const fullTitle = title ? `${title} · Sahari` : 'Sahari: Websites, apps & custom software'
    const url = `${SITE_URL}${location.pathname}`

    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="og:image"]', 'content', image)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', description)
    setMeta('meta[name="twitter:image"]', 'content', image)
    setLinkHref('canonical', url)
  }, [title, description, image, location.pathname])

  return null
}
