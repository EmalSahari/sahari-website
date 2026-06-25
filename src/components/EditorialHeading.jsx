import { motion } from 'framer-motion'

/**
 * Page or section heading shared across the inner pages. Eyebrow in amber
 * small caps, display-type heading, a short amber rule underneath that
 * picks up the hero highlight motif, and an optional subtitle.
 *
 * Defaults to left-aligned because that is the rhythm change that pulls
 * the site away from the centred-grid template, but passing center makes
 * it work for the few sections that still need centred symmetry.
 */
export default function EditorialHeading({
  eyebrow,
  heading,
  subtitle,
  align = 'left',
  size = 'lg',
  ruleColor = 'bg-red-400',
  className = '',
}) {
  const isCenter = align === 'center'
  const containerClass = isCenter ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl'
  const ruleClass = isCenter ? 'mx-auto' : ''
  const sizeClass = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-3xl md:text-5xl',
    xl: 'text-4xl md:text-6xl',
  }[size]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${containerClass} ${className}`}
    >
      {eyebrow && (
        <p className="text-red-400 text-sm font-medium tracking-widest uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display ${sizeClass} font-bold text-white tracking-tight leading-[1.05]`}>
        {heading}
      </h2>
      <div className={`mt-5 h-[2px] w-12 ${ruleColor} ${ruleClass}`} />
      {subtitle && (
        <p className={`mt-6 text-zinc-400 leading-relaxed ${isCenter ? 'max-w-xl mx-auto' : 'max-w-lg'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
