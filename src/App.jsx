import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { LanguageProvider } from './i18n/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AnimatedRoutes from './components/AnimatedRoutes'
import CookieNotice from './components/CookieNotice'
import ScrollToTop from './components/ScrollToTop'
import GradientDots from './components/GradientDots'

const STANDALONE_ROUTES = ['/black-stone', '/drift', '/mork']

function Layout() {
  const location = useLocation()
  const isStandalone = STANDALONE_ROUTES.includes(location.pathname)

  if (isStandalone) {
    return <AnimatedRoutes />
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-[#080808]">
      <GradientDots className="z-0" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
      <CookieNotice />
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
