import { useEffect, useState } from 'react'
import { YT_FALLBACK, formatCount } from '../data/youtube'

// One request per page load, shared by every component that asks.
let request = null

function loadStats() {
  if (!request) {
    request = fetch('/api/yt-stats')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data || typeof data.subs !== 'number') return null
        return {
          subs: formatCount(data.subs),
          views: formatCount(data.views),
          videos: data.videos ? formatCount(data.videos) : null,
          channels: String(data.channels),
        }
      })
      .catch(() => null)
  }
  return request
}

/** Live YouTube totals, with the fallback figures until (or unless) they load. */
export default function useYtStats() {
  const [stats, setStats] = useState(YT_FALLBACK)

  useEffect(() => {
    let alive = true
    loadStats().then((live) => {
      if (alive && live) setStats(live)
    })
    return () => {
      alive = false
    }
  }, [])

  return stats
}
