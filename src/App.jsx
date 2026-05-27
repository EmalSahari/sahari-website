import { BrowserRouter as Router } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AnimatedRoutes from './components/AnimatedRoutes'
import CookieNotice from './components/CookieNotice'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#080808]">
          <Navbar />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
          <CookieNotice />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
