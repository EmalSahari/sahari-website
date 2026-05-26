import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Youtube, Code2, Sparkles, Globe, Layout, Dumbbell, Trophy } from 'lucide-react'

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
    desc: 'Clean, modern websites built with React and Tailwind. Fast, responsive, and built to make your business look serious.',
  },
  {
    icon: <Layout size={20} />,
    title: 'Landing Pages',
    desc: 'High-converting single-page sites for your product, offer, or brand. Designed to impress and built to perform.',
  },
  {
    icon: <Code2 size={20} />,
    title: 'Custom Web Apps',
    desc: 'From fitness trackers to interactive tools — if you can imagine it, it can be built. Let\'s scope it out.',
  },
]

const projects = [
  {
    icon: <Dumbbell size={20} />,
    title: 'Fitness Tracker App',
    desc: 'A full workout and fitness tracking web app. Log exercises, track progress, and stay consistent.',
    tag: 'Web App',
    color: 'from-emerald-900/40 to-[#0f0f0f]',
    border: 'border-emerald-500/20',
    iconBg: 'bg-emerald-500/15 text-emerald-400',
  },
  {
    icon: <Trophy size={20} />,
    title: 'Online Chess App',
    desc: 'A fully playable chess app built for the web. Clean interface, smooth moves, real gameplay.',
    tag: 'Web App',
    color: 'from-amber-900/40 to-[#0f0f0f]',
    border: 'border-amber-500/20',
    iconBg: 'bg-amber-500/15 text-amber-400',
  },
]

const channels = [
  { handle: '@SahariYT', desc: 'Main channel', href: 'https://youtube.com/@SahariYT' },
  { handle: '@UnclassifiedYTT', desc: 'Monetized · latest uploads', href: 'https://youtube.com/@UnclassifiedYTT' },
  { handle: '@SupernovaYTT', desc: 'Extra content', href: 'https://youtube.com/@SupernovaYTT' },
]

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-indigo-600/8 rounded-full blur-[100px]" />
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm"
        >
          <Sparkles size={14} />
          <span>Web developer & content creator</span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] max-w-4xl"
        >
          Websites that look{' '}
          <span className="gradient-text">as good</span>{' '}
          as your work.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 text-lg text-zinc-400 max-w-xl leading-relaxed"
        >
          I'm Emal — I build websites and web apps for businesses and creators
          who want a real online presence. Also a YouTuber with three channels.
        </motion.p>

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
            href="https://youtube.com/@SahariYT"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white font-medium rounded-xl transition-all duration-200 bg-white/5"
          >
            <Youtube size={16} className="text-red-400" />
            Watch my content
          </a>
        </motion.div>

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
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            What I build
          </h2>
          <p className="mt-4 text-zinc-400 max-w-lg mx-auto">
            From simple landing pages to full custom apps — I handle the whole thing.
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

      {/* Projects */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Things I've built
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl border ${p.border} bg-gradient-to-br ${p.color} p-8`}
            >
              <div className={`w-10 h-10 rounded-lg ${p.iconBg} flex items-center justify-center mb-5`}>
                {p.icon}
              </div>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{p.tag}</span>
              <h3 className="text-white font-semibold text-xl mt-1 mb-2">{p.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* YouTube */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-950/30 to-[#0f0f0f] p-10 md:p-14"
        >
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1">
              <Youtube size={36} className="text-red-400 mb-5" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Also a YouTuber
              </h2>
              <p className="text-zinc-400 leading-relaxed max-w-md">
                I run three YouTube channels across different niches. Come check out the content.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-w-[220px]">
              {channels.map((c) => (
                <a
                  key={c.handle}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-white/8 transition-all group"
                >
                  <Youtube size={16} className="text-red-400 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">{c.handle}</p>
                    <p className="text-zinc-500 text-xs">{c.desc}</p>
                  </div>
                  <ArrowRight size={14} className="text-zinc-600 ml-auto group-hover:text-zinc-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
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
