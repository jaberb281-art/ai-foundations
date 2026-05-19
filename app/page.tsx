import type { ElementType } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import HeroBrain from '@/components/HeroBrain'
import { getSupabasePublicConfig } from '@/lib/supabase/env'
import { createServerClient } from '@/lib/supabase/server'
import {
  MailWarning,
  Home,
  ImageIcon,
  Network,
  TrendingUp,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Theory Of You Academy | AI Foundations Course',
  description:
    'Learn AI Foundations in a five-week practical course with lessons, self-checks, projects, and a portfolio-ready final project.',
}

const roadmap = [
  {
    step: '01',
    title: 'AI Foundations',
    text: 'Understand what AI is, how it learns, and how to think clearly while using AI tools.',
  },
  {
    step: '02',
    title: 'Prompt Engineering Basics',
    text: 'Learn how to give clearer instructions, avoid common mistakes, and build reusable prompts.',
  },
  {
    step: '03',
    title: 'AI Tools & Workflows',
    text: 'Choose the right AI tool, build simple workflows, and turn AI output into useful work.',
  },
  {
    step: '04',
    title: 'Building With AI',
    text: 'Find a real user problem, design one useful AI feature, and plan a simple product.',
  },
  {
    step: '05',
    title: 'Final AI Project',
    text: 'Prepare a portfolio-ready AI project case study with a clear problem, process, and result.',
  },
]

const projects = [
  {
    title: 'AI study assistant',
    tag: 'Week 1',
    text: 'Build a reusable assistant prompt that explains, quizzes, corrects, and plans your next study step.',
    icon: MailWarning,
    badgeIcon: ShieldCheck,
  },
  {
    title: 'Prompt pack',
    tag: 'Week 2',
    text: 'Create a small reusable prompt pack for one real-life use case.',
    icon: Home,
    badgeIcon: TrendingUp,
  },
  {
    title: 'AI content workflow',
    tag: 'Week 3',
    text: 'Turn one idea into a useful content draft with a repeatable AI workflow.',
    icon: ImageIcon,
    badgeIcon: ScanLine,
  },
  {
    title: 'AI mini product plan',
    tag: 'Week 4',
    text: 'Shape one user problem into a simple AI-powered product plan.',
    icon: Network,
    badgeIcon: Sparkles,
  },
  {
    title: 'Final portfolio case study',
    tag: 'Week 5',
    text: 'Present your final AI project with a clear problem, process, output, and reflection.',
    icon: MailWarning,
    badgeIcon: ShieldCheck,
  },
]

function AnimatedProjectIcon({
  Icon,
  BadgeIcon,
  index,
}: {
  Icon: ElementType
  BadgeIcon: ElementType
  index: number
}) {
  return (
    <div className="relative mb-7 flex h-16 w-16 items-center justify-center rounded-3xl border border-cyan-300/15 bg-white/[0.04] shadow-[0_0_35px_rgba(59,130,246,0.15)]">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/25 via-purple-500/20 to-cyan-400/20 blur-sm" />

      <div
        className="absolute inset-[-8px] rounded-[2rem] border border-blue-400/10"
        style={{
          animation: `iconOrbit ${5 + index}s linear infinite`,
        }}
      />

      <div className="relative z-10">
        <Icon className="h-7 w-7 text-blue-100" strokeWidth={2.2} />
      </div>

      <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-[#111827] shadow-lg">
        <BadgeIcon className="h-3.5 w-3.5 text-cyan-200" />
      </div>

      <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/70 blur-[1px]" />

      <span
        className="absolute h-1.5 w-1.5 rounded-full bg-blue-300"
        style={{
          animation: `dataPulse ${2.5 + index * 0.35}s ease-in-out infinite`,
        }}
      />
    </div>
  )
}

async function getIsAuthenticated() {
  if (!getSupabasePublicConfig()) {
    return false
  }

  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return Boolean(user)
}

export default async function HomePage() {
  const isAuthenticated = await getIsAuthenticated()
  const heroPrimary = isAuthenticated
    ? { label: 'Go to Dashboard', href: '/dashboard' }
    : { label: 'Start Learning', href: '/login' }
  const heroSecondary = isAuthenticated
    ? { label: 'Continue Course', href: '/course' }
    : { label: 'View Curriculum', href: '#curriculum' }

  return (
    <main className="min-h-screen bg-[#080a12] text-white">
      <nav className="fixed left-0 top-0 z-[100] w-full border-b border-white/10 bg-[#050711]/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-5">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-white/[0.04] shadow-[0_0_35px_rgba(34,211,238,0.12)]">
              <div className="absolute inset-[-5px] rounded-[1.3rem] border border-cyan-400/20 animate-spin-slow" />

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-cyan-400/20 blur-sm" />

              <Image
                src="/logo.png"
                alt="Theory Of You Academy"
                width={34}
                height={34}
                className="relative z-10 object-contain"
                priority
              />
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-black tracking-tight text-white">
                Theory Of You
              </p>
              <p className="text-xs font-medium text-white/40">
                AI Foundations
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur md:flex">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-full px-4 py-2 text-sm font-medium text-white/55 transition hover:bg-white/10 hover:text-white"
                >
                  Dashboard
                </Link>

                <Link
                  href="/course"
                  className="rounded-full px-4 py-2 text-sm font-medium text-white/55 transition hover:bg-white/10 hover:text-white"
                >
                  Course
                </Link>
              </>
            ) : (
              <>
                <a
                  href="#curriculum"
                  className="rounded-full px-4 py-2 text-sm font-medium text-white/55 transition hover:bg-white/10 hover:text-white"
                >
                  Curriculum
                </a>

                <a
                  href="#projects"
                  className="rounded-full px-4 py-2 text-sm font-medium text-white/55 transition hover:bg-white/10 hover:text-white"
                >
                  Projects
                </a>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="hidden text-sm font-semibold text-white/50 transition hover:text-white sm:inline md:hidden"
                >
                  Dashboard
                </Link>
                <Link
                  href="/course"
                  className="hidden text-sm font-semibold text-white/50 transition hover:text-white sm:inline md:hidden"
                >
                  Course
                </Link>
                <form action="/auth/sign-out" method="post">
                  <button
                    type="submit"
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white/65 transition hover:bg-white/10 hover:text-white"
                  >
                    Sign out
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/login"
                className="group relative overflow-hidden rounded-full bg-white px-5 py-2.5 text-sm font-black text-[#050711] shadow-[0_0_30px_rgba(255,255,255,0.12)] transition hover:scale-[1.03]"
              >
                <span className="relative z-10">Sign in</span>

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-blue-200/70 to-transparent transition duration-700 group-hover:translate-x-full" />
              </Link>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      </nav>

      <section className="relative overflow-hidden pt-20">
        <div className="absolute left-1/2 top-[-20rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-[-10rem] top-40 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Start learning now
            </div>

            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Learn AI by building real projects.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
              AI Foundations is a five-week practical course for learners who want to understand AI, write better prompts, build useful workflows, and finish a portfolio-ready project.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={heroPrimary.href} className="rounded-2xl bg-blue-600 px-6 py-4 text-center text-sm font-bold text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-500">
                {heroPrimary.label}
              </Link>
              <Link href={heroSecondary.href} className="rounded-2xl border border-white/12 bg-white/5 px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-white/10">
                {heroSecondary.label}
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/55">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Free forever</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">No credit card required</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Beginner friendly</span>
            </div>
          </div>

          <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-blue-950/30 backdrop-blur">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.18),transparent_55%)]" />
            <div className="relative z-10">
              <HeroBrain />
            </div>
          </div>
        </div>
      </section>

      <section id="curriculum" className="relative border-y border-white/10 bg-white/[0.03] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">Curriculum</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Five weeks. One clear path.
            </h2>
            <p className="mt-4 text-white/60">
              Follow a complete path of short lessons, self-checks, and projects across five practical weeks.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {roadmap.map((item) => (
              <div key={item.step} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0e1220] p-6 transition hover:-translate-y-1 hover:border-blue-400/30">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 transition group-hover:opacity-100" />
                <div className="relative">
                  <span className="text-sm font-black text-blue-300">WEEK {item.step}</span>
                  <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/55">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="relative overflow-hidden py-24">
        <div className="absolute left-[-12rem] top-20 h-96 w-96 rounded-full bg-purple-600/15 blur-3xl" />
        <div className="absolute right-[-10rem] bottom-10 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-purple-300">Projects</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">
                Build things that prove you learned.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/60">
                The goal is not passive watching. The goal is clear practice, useful outputs, and confidence.
              </p>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm font-bold text-white">Project-first learning</p>
                <p className="mt-2 text-sm leading-6 text-white/50">
                  Every project turns the week into something concrete: a study assistant, prompt pack, workflow, product plan, or final case study.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {projects.map((project, index) => {
                const Icon = project.icon
                const BadgeIcon = project.badgeIcon

                return (
                  <div
                    key={project.title}
                    className="group relative min-h-[280px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d111d] p-7 transition duration-500 hover:-translate-y-2 hover:border-blue-400/30 hover:shadow-[0_20px_70px_rgba(37,99,235,0.18)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition group-hover:bg-cyan-400/15" />

                    <div className="relative z-10">
                      <AnimatedProjectIcon Icon={Icon} BadgeIcon={BadgeIcon} index={index} />

                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-blue-200">
                        {project.tag}
                      </span>

                      <h3 className="mt-5 text-2xl font-black tracking-tight text-white">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-white/55">
                        {project.text}
                      </p>

                      <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                        Portfolio ready
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="start" className="relative border-t border-white/10 bg-[#0b0e18] py-20">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">AI Foundations</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">
            Start learning now.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/60">
            Free forever. No credit card required. Beginner friendly.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={heroPrimary.href} className="rounded-2xl bg-blue-600 px-6 py-4 text-center text-sm font-black text-white transition hover:bg-blue-500">
              {heroPrimary.label}
            </Link>
            <Link href={heroSecondary.href} className="rounded-2xl border border-white/12 bg-white/5 px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-white/10">
              {heroSecondary.label}
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/40">
        Built by Jaber Ali | Theory Of You Academy | AI Foundations
      </footer>

    </main>
  )
}
