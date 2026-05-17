import Link from 'next/link'
import CompleteButton from '@/components/CompleteButton'

const ideas = [
  'Study helper',
  'Instagram caption helper',
  'Resume improvement helper',
  'Business idea validator',
  'Daily planning assistant',
]

const steps = [
  'Choose one real-life use case you care about.',
  'Write the goal, audience, and constraints for that use case.',
  'Create three reusable prompts for the same use case.',
  'Test each prompt with a simple example.',
  'Improve the prompts by adding clearer context and quality rules.',
  'Save the final prompt pack so you can reuse it later.',
]

const checklist = [
  'Your prompt pack focuses on one clear use case.',
  'Each prompt includes role, context, task, and quality rules.',
  'You tested each prompt at least once.',
  'You improved weak prompts after testing.',
  'You saved the final version in a clean format.',
]

const reflections = [
  'Which prompt gave the strongest output, and why?',
  'What context did the AI need before it became useful?',
  'Which weak prompt did you improve the most?',
  'How could this prompt pack save you time in real life?',
]

export default function WeekTwoProjectPage() {
  return (
    <main className="min-h-screen bg-[#07090f] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute left-1/2 top-[-18rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-[-12rem] top-24 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 py-16">
          <Link href="/course/week-2" className="text-sm font-semibold text-blue-200 transition hover:text-white">
            Back to Week 2
          </Link>

          <div className="mt-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
              Week 2 Project
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              Build Your First Prompt Pack
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Create a small reusable prompt pack for one real-life use case so you can practice clearer AI instructions.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-5 px-5 py-12">
        <div className="rounded-[1.75rem] border border-white/10 bg-[#0d1220] p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">Project objective</p>
          <p className="mt-4 text-base leading-8 text-white/70">
            Learn how to turn a vague request into reusable prompts with a clear role, context, task, and quality rules.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-[#0b0f1a] p-6">
            <h2 className="text-2xl font-black tracking-tight">What you will build</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              A small prompt pack with three reusable prompts for one useful real-life task.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-cyan-300/20 bg-[#0b0f1a] p-6">
            <h2 className="text-2xl font-black tracking-tight">Suggested prompt pack ideas</h2>
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
            Example prompt template
          </p>
          <div className="mt-5 grid gap-4">
            <PromptBlock label="Role" text="You are a helpful assistant specialized in [task]." />
            <PromptBlock
              label="Context"
              text="I am trying to [goal]. My audience/user is [audience]. My constraints are [constraints]."
            />
            <PromptBlock label="Task" text="Create [output] that helps me achieve [result]." />
            <PromptBlock
              label="Quality rules"
              text="Make it clear, practical, specific, and easy to improve."
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
            week="week-2"
            slug="project"
            label="Mark project complete"
          />
          <Link
            href="/course/week-2"
            className="rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-blue-500"
          >
            Back to Week 2
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

function PromptBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#080b14] p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-200">{label}</p>
      <p className="mt-3 text-sm leading-7 text-white/75">{text}</p>
    </div>
  )
}
