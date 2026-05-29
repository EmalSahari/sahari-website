import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

export default function Reveal({
  children,
  i = 0,
  className = '',
  amount = 0.2,
}) {
  const isMobile = useIsMobile()
  const blur = isMobile ? 3 : 8
  const y = isMobile ? 16 : 28

  const variants = {
    hidden: {
      opacity: 0,
      y,
      filter: `blur(${blur}px)`,
    },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: isMobile ? 0.5 : 0.7,
        delay: i * (isMobile ? 0.05 : 0.08),
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
