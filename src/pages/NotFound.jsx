import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="pt-28 pb-20 min-h-[80vh] flex items-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-500/15 text-violet-400 mb-6">
            <Compass size={28} />
          </div>
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">404</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-5">
            Page <span className="gradient-text">not found</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-md mx-auto mb-10">
            The page you're looking for doesn't exist or has moved. Let's get you back on track.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-violet-900/40"
          >
            <ArrowLeft size={16} />
            Back home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
