'use client'

import { useState } from 'react'
import Link from 'next/link'

type WaitlistState = 'idle' | 'loading' | 'success' | 'error'

const roadmap = [
  { step: '01', title: 'Think like an AI engineer', text: 'Understand AI, ML, deep learning, datasets, training, and inference without hype.' },
  { step: '02', title: 'Work with real data', text: 'Clean datasets, explore patterns, visualize signals, and prepare data for models.' },
  { step: '03', title: 'Train your first models', text: 'Build regression and classification models, then evaluate them properly.' },
  { step: '04', title: 'Enter deep learning', text: 'Learn neural networks, PyTorch basics, and the mental model behind modern AI.' },
  { step: '05', title: 'Ship a portfolio project', text: 'Finish with a real project you can share on GitHub and explain with confidence.' },
]

const projects = [
  'Spam classifier',
  'House price predictor',
  'Image classifier',
  'Recommendation system',
]

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<WaitlistState>('idle')
  const [message, setMessage] = useState('')

  async function joinWaitlist(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('loading')
    setMessage('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'landing_page' }),
      })

      const data = await response.json()

      if (!response.ok || !data.ok) {
        setState('error')
        setMessage(data.message ?? 'Could not join the waitlist. Please try again.')
        return
      }

      setState('success')
      setMessage('You are on the founding waitlist. Week 1 updates are coming soon 🚀')
      setEmail('')
    } catch {
      setState('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-[#080a12] text-white">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#080a12]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-black shadow-lg shadow-blue-600/30">AI</div>
            <div>
              <p className="text-sm font-semibold leading-none">AI Foundations</p>
              <p className="mt-1 text-xs text-white/45">by Theory Of You Academy</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden text-sm text-white/60 transition hover:text-white sm:inline">Login</Link>
            <a href="#waitlist" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#080a12] transition hover:bg-blue-100">Join Waitlist</a>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-[-20rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-[-10rem] top-40 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Founding waitlist now open
            </div>
            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Learn AI by building real projects.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
              AI Foundations is a free 5-week practical course for beginner developers who want to understand machine learning, deep learning, and modern AI workflows without drowning in hype.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#waitlist" className="rounded-2xl bg-blue-600 px-6 py-4 text-center text-sm font-bold text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-500">
                Get Early Access →
              </a>
              <a href="#curriculum" className="rounded-2xl border border-white/12 bg-white/5 px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-white/10">
                View Curriculum
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/55">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Free forever</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">No credit card</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Python friendly</span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-blue-950/30 backdrop-blur">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#101421] p-6">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Course Preview</p>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">Launching soon</span>
              </div>
              <div className="space-y-3">
                {roadmap.slice(0, 4).map((item) => (
                  <div key={item.step} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-xs font-black text-blue-300">{item.step}</span>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                        <p className="mt-1 text-xs leading-5 text-white/50">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="curriculum" className="border-y border-white/10 bg-white/[0.03] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">Curriculum</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Five weeks. One clear path.</h2>
            <p className="mt-4 text-white/60">The first public release will focus on fundamentals, hands-on notebooks, quizzes, and portfolio projects.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {roadmap.map((item) => (
              <div key={item.step} className="rounded-3xl border border-white/10 bg-[#0e1220] p-6">
                <span className="text-sm font-black text-blue-300">WEEK {item.step}</span>
                <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/55">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-300">Projects</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Build things that prove you learned.</h2>
              <p className="mt-4 text-white/60">The goal is not passive watching. The goal is working projects, GitHub proof, and confidence.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((project) => (
                <div key={project} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="mb-6 h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500/25 to-purple-500/25" />
                  <h3 className="text-lg font-bold">{project}</h3>
                  <p className="mt-2 text-sm text-white/55">A beginner-friendly project designed to teach real AI workflow thinking.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="waitlist" className="border-t border-white/10 bg-[#0b0e18] py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Early Access</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Join the founding waitlist.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/60">
            Get launch updates, Week 1 access, project drops, and behind-the-scenes progress from Theory Of You Academy.
          </p>

          <form onSubmit={joinWaitlist} className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="your@email.com"
              className="min-h-14 flex-1 rounded-2xl border border-white/10 bg-[#080a12] px-5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-blue-400"
            />
            <button
              type="submit"
              disabled={state === 'loading'}
              className="min-h-14 rounded-2xl bg-blue-600 px-6 text-sm font-black text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {state === 'loading' ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>

          {message && (
            <p className={`mt-4 text-sm ${state === 'error' ? 'text-red-300' : 'text-emerald-300'}`}>
              {message}
            </p>
          )}

          <p className="mt-5 text-xs text-white/40">No spam. No fake scarcity. Just course updates and early access.</p>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/40">
        Built by Jaber Ali · Theory Of You Academy · AI Foundations
      </footer>
    </main>
  )
}
