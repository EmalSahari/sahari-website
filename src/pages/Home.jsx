import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Youtube, Code2, Sparkles, Globe, Layers, Zap } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

const services = [
  {
    icon: <Globe size={20} />,
    title: 'Website Design & Development',
    desc: 'Clean, modern websites built with React and Tailwind. Fast, responsive, and built to impress.',
  },
  {
    icon: <Layers size={20} />,
    title: 'UI/UX & Component Design',
    desc: 'Pixel-perfect interfaces using 21st.dev components and shadcn/ui, tailored to your brand.',
  },
  {
    icon: <Zap size={20} />,
    title: 'Vibe Coding Consultation',
    desc: 'Not sure how to build something? Let\'s pair up and ship it together using AI-assisted development.',
  },
]

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-indigo-600/8 rounded-full blur-[100px]" />
        </div>

        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm"
        >
          <Sparkles size={14} />
          <span>Content creator & web developer</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] max-w-4xl"
        >
          Building digital{' '}
          <span className="gradient-text">experiences</span>{' '}
          that actually ship.
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 text-lg text-zinc-400 max-w-xl leading-relaxed"
        >
          I'm Emal — I make content on YouTube and build websites for people
          who want something that looks as good as it works.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-violet-900/40"
          >
            Work with me
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="https://youtube.com/@sahari"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white font-medium rounded-xl transition-all duration-200 bg-white/5 hover:bg-white/8"
          >
            <Youtube size={16} className="text-red-400" />
            Watch my content
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 text-xs"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-zinc-600" />
          scroll
        </motion.div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">What I do</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Services I offer
          </h2>
          <p className="mt-4 text-zinc-400 max-w-lg mx-auto">
            From full websites to quick consultations — I help people build better things on the web.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="gradient-border group relative p-6 bg-[#0f0f0f] rounded-xl hover:bg-[#131313] transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-violet-500/15 text-violet-400 flex items-center justify-center mb-5 group-hover:bg-violet-500/25 transition-colors">
                {s.icon}
              </div>
              <h3 className="text-white font-semibold mb-2 leading-snug">{s.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* YouTube section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-950/30 to-[#0f0f0f] p-10 md:p-14 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent pointer-events-none" />
          <Youtube size={40} className="text-red-400 mx-auto mb-5" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Find me on YouTube
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto mb-8">
            I post about web development, vibe coding, and building things with AI.
            Come learn with me.
          </p>
          <a
            href="https://youtube.com/@sahari"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-medium rounded-xl transition-colors duration-200"
          >
            <Youtube size={16} />
            Subscribe to the channel
          </a>
        </motion.div>
      </section>

      {/* CTA strip */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-900/40 to-indigo-900/40 border border-violet-500/20 p-10 md:p-14 text-center"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl" />
          <Code2 size={32} className="text-violet-400 mx-auto mb-5" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to build something?
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto mb-8">
            Whether you need a full website or just want to talk through an idea —
            I'm open to new projects.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-violet-900/40"
          >
            Let's talk
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
