import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Youtube, Code2, Dumbbell, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react'

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
  'shadcn/ui', 'HTML & CSS', 'Web Apps', 'Responsive Design',
]

const timeline = [
  {
    icon: <Youtube size={16} />,
    title: 'Started creating on YouTube',
    desc: 'Launched multiple channels across different niches — @SahariYT, @UnclassifiedYTT, and @SupernovaYTT.',
  },
  {
    icon: <Code2 size={16} />,
    title: 'Got serious about web development',
    desc: 'Taught myself React, Tailwind, and modern web tools. Started shipping real projects.',
  },
  {
    icon: <Dumbbell size={16} />,
    title: 'Built a fitness tracker app',
    desc: 'A full web app for logging workouts and tracking progress — built from scratch.',
  },
  {
    icon: <Trophy size={16} />,
    title: 'Built an online chess app',
    desc: 'A fully playable chess game for the web. Clean interface, smooth gameplay.',
  },
  {
    icon: <Code2 size={16} />,
    title: 'Launching Sahari web services',
    desc: 'Now helping businesses and creators get websites that actually do them justice.',
  },
]

export default function About() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-center mb-16"
        >
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">About</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
            About <span className="gradient-text">me</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Self-taught web developer, YouTuber with three channels, and the person
            behind Sahari. I build websites and web apps — and now I'm doing it for other people too.
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
              I started on YouTube — that's where I first put myself out there and started building
              an audience across different niches. While doing that, I got into web development
              and discovered I was actually pretty good at it.
            </p>
            <p>
              I didn't just follow tutorials. I built real things — a fitness tracker app, an
              online chess game, and this website you're looking at right now. Each project taught
              me more than any course could.
            </p>
            <p>
              Now I'm expanding Sahari into web services. If your business or brand deserves a
              better website than it has right now, that's exactly what I do.
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

        {/* YouTube channels */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mb-14"
        >
          <h2 className="text-white font-semibold text-xl mb-5">My YouTube channels</h2>
          <div className="flex flex-col gap-3">
            {[
              { handle: '@SahariYT', desc: 'The main brand channel', href: 'https://youtube.com/@SahariYT' },
              { handle: '@UnclassifiedYTT', desc: 'Monetized · most active', href: 'https://youtube.com/@UnclassifiedYTT' },
              { handle: '@SupernovaYTT', desc: 'Extra content', href: 'https://youtube.com/@SupernovaYTT' },
            ].map((c) => (
              <a
                key={c.handle}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-white/8 transition-all group"
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
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="text-center"
        >
          <p className="text-zinc-400 mb-5">Want to work together?</p>
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
