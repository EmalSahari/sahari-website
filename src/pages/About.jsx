import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Youtube, Code2, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

const skills = [
  'React', 'Tailwind CSS', 'Vite', 'JavaScript', 'Framer Motion',
  'shadcn/ui', 'HTML & CSS', 'AI-assisted dev', 'Figma basics',
]

const timeline = [
  {
    icon: <Youtube size={16} />,
    title: 'Started the YouTube channel',
    desc: 'Began creating content around web development and building in public.',
  },
  {
    icon: <Code2 size={16} />,
    title: 'Got into vibe coding',
    desc: 'Started using AI tools to build faster and ship more — and teaching others to do the same.',
  },
  {
    icon: <Sparkles size={16} />,
    title: 'Launching Sahari services',
    desc: 'Now offering website development to help businesses and creators establish their presence online.',
  },
]

export default function About() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-center mb-16"
        >
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">About</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
            Hey, I'm{' '}
            <span className="gradient-text">Emal</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
            I'm a content creator and self-taught web developer based online.
            I run the Sahari YouTube channel and I'm building out web services
            for people who want great-looking, functional websites.
          </p>
        </motion.div>

        {/* Story */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="gradient-border bg-[#0f0f0f] rounded-2xl p-8 mb-10"
        >
          <h2 className="text-white font-semibold text-xl mb-4">The story so far</h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              I started Sahari as a YouTube channel — a place to document what I was learning,
              share my process, and connect with other builders. Over time I got really into
              web development, especially the new wave of AI-assisted "vibe coding" where you
              can ship things fast without fighting your tools.
            </p>
            <p>
              The more I built, the more people asked me to help them build too.
              So that's what I'm doing now — expanding Sahari into a proper service
              where I help businesses and creators get a real web presence that actually
              looks as good as their work deserves.
            </p>
            <p>
              I love clean design, dark UIs, and components that just feel right.
              If you've found this site, you probably do too.
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mb-12"
        >
          <h2 className="text-white font-semibold text-xl mb-6">How we got here</h2>
          <div className="relative space-y-6 pl-6 border-l border-white/10">
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[1.85rem] w-7 h-7 rounded-full bg-[#0f0f0f] border border-violet-500/40 flex items-center justify-center text-violet-400">
                  {item.icon}
                </div>
                <h3 className="text-white font-medium mb-1">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mb-14"
        >
          <h2 className="text-white font-semibold text-xl mb-5">Tools & skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-sm hover:border-violet-500/40 hover:text-white transition-colors"
              >
                <CheckCircle2 size={12} className="text-violet-400" />
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="text-center"
        >
          <p className="text-zinc-400 mb-5">Sounds like something you're into?</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-violet-900/40"
          >
            Get in touch
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
