import Link from 'next/link'
import CompleteButton from '@/components/CompleteButton'
import UnlockedWeekGate from '@/components/UnlockedWeekGate'

const ideas = [
  'AI study planner',
  'AI resume helper',
  'AI small business assistant',
  'AI content assistant',
  'AI language learning helper',
]

const steps = [
  'Choose one real user problem.',
  'Describe who has the problem and why it matters.',
  'Define one AI feature that would help.',
  'Decide what input the user gives the AI.',
  'Decide what output the AI returns.',
  'Write the simplest useful first version.',
]

const checklist = [
  'Your plan solves one clear user problem.',
  'The target user is specific.',
  'The AI feature has a clear input and output.',
  'The first version is simple enough to explain.',
  'You can describe why the product would be useful.',
]

const reflections = [
  'What user problem felt most worth solving?',
  'Where does AI add real value in your idea?',
  'What would make the first version too complicated?',
  'What would you test first with a real user?',
]

export default function WeekFourProjectPage() {
  return (
    <UnlockedWeekGate week={4}>
      <main className="min-h-screen bg-[#07090f] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute left-1/2 top-[-18rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-[-12rem] top-24 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 py-16">
          <Link href="/course/week-4" className="text-sm font-semibold text-blue-200 transition hover:text-white">
            Back to Week 4
          </Link>

          <div className="mt-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">Week 4 Project</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              Build Your First AI Mini Product Plan
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Create a simple AI product plan for one real user problem.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-5 px-5 py-12">
        <InfoCard eyebrow="Project objective" text="Learn how to shape an AI idea around a real user problem, not just a cool feature." />

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-[#0b0f1a] p-6">
            <h2 className="text-2xl font-black tracking-tight">What you will build</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              A simple AI mini product plan that explains the problem, user, AI feature, input, output, and first version.
            </p>
          </div>
          <ListCard title="Suggested product ideas" items={ideas} dot="bg-cyan-300" />
        </div>

        <ListCard title="Step-by-step instructions" items={steps} ordered />

        <TemplateCard
          title="Example product plan template"
          blocks={[
            ['Problem', 'Who has the problem and why does it matter?'],
            ['User', 'Who is this for?'],
            ['AI feature', 'What will the AI help the user do?'],
            ['Input', 'What does the user give the AI?'],
            ['Output', 'What does the AI return?'],
            ['First version', 'What is the simplest useful version?'],
          ]}
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <ListCard title="Submission checklist" items={checklist} dot="bg-emerald-300" />
          <ListCard title="Reflection questions" items={reflections} dot="bg-violet-300" />
        </div>

        <div className="flex flex-col gap-3 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 sm:flex-row">
          <CompleteButton
            itemType="project"
            week="week-4"
            slug="project"
            label="Mark project complete"
          />
          <Link href="/course/week-4" className="rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-blue-500">
            Back to Week 4
          </Link>
          <Link href="/course" className="rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10">
            Back to Course
          </Link>
        </div>
      </section>
      </main>
    </UnlockedWeekGate>
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
