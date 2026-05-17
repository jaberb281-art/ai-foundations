import Link from 'next/link'
import CompleteButton from '@/components/CompleteButton'

const options = [
  'AI study assistant',
  'Prompt pack',
  'AI content workflow',
  'AI product plan',
  'Custom AI project',
]

const steps = [
  'Choose one final project option.',
  'Define the problem it solves.',
  'Explain how you used AI in the process.',
  'Show what you created.',
  'Describe why the result is useful.',
  'Write what you would improve next.',
]

const checklist = [
  'Your case study has a clear project title.',
  'The problem is easy to understand.',
  'Your AI process is explained clearly.',
  'The output or result is specific.',
  'You included a reflection on what to improve next.',
]

const reflections = [
  'Which part of the course helped your final project most?',
  'What did AI help you do faster or better?',
  'Where did human judgment matter most?',
  'What would you build next if you had more time?',
]

export default function WeekFiveProjectPage() {
  return (
    <main className="min-h-screen bg-[#07090f] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute left-1/2 top-[-18rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-[-12rem] top-24 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 py-16">
          <Link href="/course/week-5" className="text-sm font-semibold text-blue-200 transition hover:text-white">
            Back to Week 5
          </Link>

          <div className="mt-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Week 5 Project</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              Create Your Final AI Portfolio Project
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Create a final AI project case study that explains the problem, workflow, AI usage, result, and lessons learned.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-5 px-5 py-12">
        <InfoCard eyebrow="Project objective" text="Learn how to present your AI work as a clear portfolio-ready case study." />

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-[#0b0f1a] p-6">
            <h2 className="text-2xl font-black tracking-tight">What you will build</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              A final AI project case study that explains what you built, why it matters, how you used AI, and what you learned.
            </p>
          </div>
          <ListCard title="Final project options" items={options} dot="bg-cyan-300" />
        </div>

        <ListCard title="Step-by-step instructions" items={steps} ordered />

        <TemplateCard
          title="Example portfolio case study template"
          blocks={[
            ['Project title', 'What did you build?'],
            ['Problem', 'What problem does it solve?'],
            ['Process', 'How did you use AI?'],
            ['Output', 'What did you create?'],
            ['Result', 'Why is it useful?'],
            ['Reflection', 'What would you improve next?'],
          ]}
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <ListCard title="Submission checklist" items={checklist} dot="bg-emerald-300" />
          <ListCard title="Reflection questions" items={reflections} dot="bg-violet-300" />
        </div>

        <div className="flex flex-col gap-3 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 sm:flex-row">
          <CompleteButton
            itemType="project"
            week="week-5"
            slug="project"
            label="Mark project complete"
          />
          <Link href="/course/week-5" className="rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-blue-500">
            Back to Week 5
          </Link>
          <Link href="/course" className="rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10">
            Back to Course
          </Link>
        </div>
      </section>
    </main>
  )
}

function InfoCard({ eyebrow, text }: { eyebrow: string; text: string }) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-[#0d1220] p-6">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">{eyebrow}</p>
      <p className="mt-4 text-base leading-8 text-white/70">{text}</p>
    </div>
  )
}

function ListCard({ title, items, dot, ordered = false }: { title: string; items: string[]; dot?: string; ordered?: boolean }) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-[#0b0f1a] p-6">
      <h2 className="text-2xl font-black tracking-tight">{title}</h2>
      <ol className="mt-4 grid gap-3">
        {items.map((item, index) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-white/70">
            {ordered ? (
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-xs font-black text-blue-200">
                {index + 1}
              </span>
            ) : (
              <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${dot ?? 'bg-cyan-300'}`} />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function TemplateCard({ title, blocks }: { title: string; blocks: [string, string][] }) {
  return (
    <div className="rounded-[1.75rem] border border-blue-400/25 bg-[#0d1220] p-6 shadow-2xl shadow-blue-950/20">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">{title}</p>
      <div className="mt-5 grid gap-4">
        {blocks.map(([label, text]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-[#080b14] p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-200">{label}</p>
            <p className="mt-3 text-sm leading-7 text-white/75">{text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
