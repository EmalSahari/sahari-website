import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useRoutes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import WorkWithUs from '../pages/WorkWithUs'
import ChukzHub from '../pages/ChukzHub'
import NotFound from '../pages/NotFound'

export default function AnimatedRoutes() {
  const location = useLocation()

  const element = useRoutes(
    [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/work-with-us', element: <WorkWithUs /> },
      { path: '/contact', element: <Contact /> },
      { path: '/chukz', element: <ChukzHub /> },
      { path: '*', element: <NotFound /> },
    ],
    location,
  )

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {element}
      </motion.div>
    </AnimatePresence>
  )
}
