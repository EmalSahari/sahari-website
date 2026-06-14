import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { LanguageProvider } from './i18n/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AnimatedRoutes from './components/AnimatedRoutes'
import CookieNotice from './components/CookieNotice'
import ScrollToTop from './components/ScrollToTop'
import GradientDots from './components/GradientDots'
import GrainOverlay from './components/GrainOverlay'
import CustomCursor from './components/CustomCursor'
import LoadingSequence from './components/LoadingSequence'
import PageTransition from './components/PageTransition'

const STANDALONE_ROUTES = ['/black-stone', '/drift', '/mork', '/tools/brand-kit']

function Layout() {
  const location = useLocation()
  const isStandalone = STANDALONE_ROUTES.includes(location.pathname)

  if (isStandalone) {
    return (
      <>
        <GrainOverlay />
        <CustomCursor />
        <PageTransition />
        <AnimatedRoutes />
      </>
    )
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-[#080808]">
      <GradientDots className="z-0" />
      <GrainOverlay />
      <CustomCursor />
      <PageTransition />
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
  const [loadingDone, setLoadingDone] = useState(false)
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <AnimatePresence>
          {!loadingDone && <LoadingSequence onDone={() => setLoadingDone(true)} />}
        </AnimatePresence>
        <Layout />
        <Analytics />
      </Router>
    </LanguageProvider>
  )
}

export default App
