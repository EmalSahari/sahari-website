import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

export default function Reveal({
  children,
  i = 0,
  className = '',
  amount = 0.2,
}) {
  const isMobile = useIsMobile()

  const variants = isMobile
    ? {
        hidden: { opacity: 0, y: 14 },
        show: (i = 0) => ({
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.45,
            delay: i * 0.04,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        }),
      }
    : {
        hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
        show: (i = 0) => ({
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.7,
            delay: i * 0.08,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        }),
      }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      custom={i}
      className={className}
    >
      {children}
    </motion.div>
  )
}
