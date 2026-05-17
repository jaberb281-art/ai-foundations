import Link from 'next/link'
import CompleteButton from '@/components/CompleteButton'

const ideas = [
  'Instagram carousel workflow',
  'Blog outline workflow',
  'YouTube script workflow',
  'Study notes workflow',
  'Personal brand post workflow',
]

const steps = [
  'Choose one content idea and one audience.',
  'Ask AI to research the topic and list useful angles.',
  'Ask AI to turn the idea into a clear outline.',
  'Ask AI to draft the first version in a simple style.',
  'Ask AI to improve the draft for clarity, specificity, and usefulness.',
  'Review the final draft yourself and add your own examples.',
]

const checklist = [
  'Your workflow starts with one clear content idea.',
  'You used AI for research, structure, drafting, and improvement.',
  'You reviewed the output before treating it as final.',
  'You added at least one human example or opinion.',
  'Your workflow is repeatable for a future content idea.',
]

const reflections = [
  'Which workflow step improved the output the most?',
  'Where did the AI need the most human correction?',
  'What would you change before using this workflow again?',
  'How could this workflow help you create more consistently?',
]

export default function WeekThreeProjectPage() {
  return (
    <main className="min-h-screen bg-[#07090f] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute left-1/2 top-[-18rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-[-12rem] top-24 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 py-16">
          <Link href="/course/week-3" className="text-sm font-semibold text-blue-200 transition hover:text-white">
            Back to Week 3
          </Link>

          <div className="mt-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
              Week 3 Project
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              Build Your First AI Content Workflow
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Create a simple repeatable workflow that uses AI to turn one idea into a useful content draft.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-5 px-5 py-12">
        <div className="rounded-[1.75rem] border border-white/10 bg-[#0d1220] p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">Project objective</p>
          <p className="mt-4 text-base leading-8 text-white/70">
            Learn how to use AI as part of a clear workflow instead of asking for one generic answer and stopping there.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-[#0b0f1a] p-6">
            <h2 className="text-2xl font-black tracking-tight">What you will build</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              A repeatable AI content workflow that moves from idea to research, structure, draft, improvement, and human review.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-cyan-300/20 bg-[#0b0f1a] p-6">
            <h2 className="text-2xl font-black tracking-tight">Suggested workflow ideas</h2>
            <ul className="mt-4 space-y-3">
              {ideas.map((idea) => (
                <li key={idea} className="flex gap-3 text-sm leading-6 text-white/70">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-[#0b0f1a] p-6">
          <h2 className="text-2xl font-black tracking-tight">Step-by-step instructions</h2>
          <ol className="mt-4 grid gap-3">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm leading-6 text-white/70">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-xs font-black text-blue-200">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-[1.75rem] border border-blue-400/25 bg-[#0d1220] p-6 shadow-2xl shadow-blue-950/20">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
            Example workflow template
          </p>
          <div className="mt-5 grid gap-4">
            <WorkflowBlock label="Step 1: Idea" text="I want to create content about [topic] for [audience]." />
            <WorkflowBlock
              label="Step 2: Research"
              text="Ask AI to explain the topic, list key points, and identify common questions."
            />
            <WorkflowBlock label="Step 3: Structure" text="Ask AI to turn the idea into an outline." />
            <WorkflowBlock label="Step 4: Draft" text="Ask AI to write the first version in a clear style." />
            <WorkflowBlock
              label="Step 5: Improve"
              text="Ask AI to make it more specific, useful, and easier to understand."
            />
            <WorkflowBlock
              label="Step 6: Human review"
              text="Check facts, remove weak lines, and add your own examples."
            />
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-[#0b0f1a] p-6">
            <h2 className="text-2xl font-black tracking-tight">Submission checklist</h2>
            <ul className="mt-4 space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-white/70">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-[#0b0f1a] p-6">
            <h2 className="text-2xl font-black tracking-tight">Reflection questions</h2>
            <ul className="mt-4 space-y-3">
              {reflections.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-white/70">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 sm:flex-row">
          <CompleteButton
            itemType="project"
            week="week-3"
            slug="project"
            label="Mark project complete"
          />
          <Link
            href="/course/week-3"
            className="rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-blue-500"
          >
            Back to Week 3
          </Link>
          <Link
            href="/course"
            className="rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
          >
            Back to Course
          </Link>
        </div>
      </section>
    </main>
  )
}

function WorkflowBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#080b14] p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-200">{label}</p>
      <p className="mt-3 text-sm leading-7 text-white/75">{text}</p>
    </div>
  )
}
