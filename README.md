# Sahari Website

Personal brand & services website — React + Vite + Tailwind CSS.

## Stack

- **React 18** + **Vite**
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **lucide-react** for icons

## Getting Started

```bash
cd sahari-website
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build for production

```bash
npm run build
```

Output goes to `dist/` — deploy to Vercel, Netlify, or Cloudflare Pages.

## Deploy to Vercel (recommended)

1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Deploy — Vite is auto-detected

## Customise

- **Links** — update YouTube/Twitter/GitHub in `Footer.jsx` and `Home.jsx`
- **Email** — update `hello@sahari.io` in `Contact.jsx`
- **Contact form** — sign up at [formspree.io](https://formspree.io) and replace the `handleSubmit` in `Contact.jsx`

## Pages

| Route | File |
|-------|------|
| `/` | `src/pages/Home.jsx` |
| `/about` | `src/pages/About.jsx` |
| `/contact` | `src/pages/Contact.jsx` |
