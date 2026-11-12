import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useRoutes } from 'react-router-dom'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import WorkWithUs from '../pages/WorkWithUs'
import Work from '../pages/Work'
import BlackStone from '../pages/BlackStone'
import DriftCoffee from '../pages/DriftCoffee'
import MorkBarber from '../pages/MorkBarber'
import Blog from '../pages/Blog'
import BlogPost from '../pages/BlogPost'
import NotFound from '../pages/NotFound'
import YouTube from '../pages/YouTube'

export default function AnimatedRoutes() {
  const location = useLocation()

  const element = useRoutes(
    [
      { path: '/', element: <Home /> },
      { path: '/youtube', element: <YouTube /> },
      { path: '/work-with-us', element: <WorkWithUs /> },
      { path: '/contact', element: <Contact /> },
      { path: '/work', element: <Work /> },
      { path: '/black-stone', element: <BlackStone /> },
      { path: '/drift', element: <DriftCoffee /> },
      { path: '/mork', element: <MorkBarber /> },
      { path: '/blog', element: <Blog /> },
      { path: '/blog/:slug', element: <BlogPost /> },
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
