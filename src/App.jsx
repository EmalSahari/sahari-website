import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { LanguageProvider } from './i18n/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AnimatedRoutes from './components/AnimatedRoutes'
import CookieNotice from './components/CookieNotice'
import ScrollToTop from './components/ScrollToTop'
import GradientDots from './components/GradientDots'

const ARTIST_ROUTES = ['/chukz', '/hamfrasyd']

function Layout() {
  const location = useLocation()
  const isArtistPage = ARTIST_ROUTES.includes(location.pathname)

  return (
    <div className="relative flex flex-col min-h-screen bg-[#080808]">
      {!isArtistPage && <GradientDots className="z-0" />}
      <div className="relative z-10 flex flex-col min-h-screen">
        {!isArtistPage && <Navbar />}
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        {!isArtistPage && <Footer />}
      </div>
      {!isArtistPage && <CookieNotice />}
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Layout />
        <Analytics />
      </Router>
    </LanguageProvider>
  )
}

export default App
