import Link from 'next/link'
import CompleteButton from '@/components/CompleteButton'
import UnlockedWeekGate from '@/components/UnlockedWeekGate'

const steps = [
  'Choose one topic you genuinely want to understand.',
  'Copy the prompt structure and replace [topic] with your topic.',
  'Run the prompt in your AI tool of choice.',
  'Answer the five practice questions without asking for hints first.',
  'Ask the assistant to review your answers and create a simple one-day study plan.',
  'Revise the prompt so it feels clearer and more useful for you.',
]

const checklist = [
  'Your assistant explains the topic simply.',
  'It asks five practice questions.',
  'It reviews your answers after you respond.',
  'It tells you what to study next.',
  'You saved the final prompt for reuse.',
]

const reflections = [
  'What did the assistant explain well?',
  'Where did the assistant feel vague or too advanced?',
  'What instruction improved the output the most?',
  'How could you reuse this prompt for future lessons?',
]

export default function WeekOneProjectPage() {
  return (
    <UnlockedWeekGate week={1}>
      <main className="min-h-screen bg-[#07090f] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute left-1/2 top-[-18rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-[-12rem] top-24 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 py-16">
          <Link href="/course/week-1" className="text-sm font-semibold text-blue-200 transition hover:text-white">
            Back to Week 1
          </Link>

          <div className="mt-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
              Week 1 Project
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              Build Your First AI Study Assistant
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Create a reusable AI study assistant prompt that can explain topics, quiz you, correct your mistakes, and give you a simple daily study plan.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-5 px-5 py-12">
        <div className="rounded-[1.75rem] border border-white/10 bg-[#0d1220] p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">Project objective</p>
          <p className="mt-4 text-base leading-8 text-white/70">
            Learn how to give AI a clear role, a focused task, and a feedback rule so it becomes a useful learning partner instead of a generic chatbot.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-[#0b0f1a] p-6">
            <h2 className="text-2xl font-black tracking-tight">What you will build</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              A reusable prompt template for an AI study assistant that can explain a topic, test your understanding, correct your answers, and recommend what to study next.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-cyan-300/20 bg-[#0b0f1a] p-6">
            <h2 className="text-2xl font-black tracking-tight">Step-by-step instructions</h2>
            <ol className="mt-4 space-y-3">
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
        </div>

        <div className="rounded-[1.75rem] border border-blue-400/25 bg-[#0d1220] p-6 shadow-2xl shadow-blue-950/20">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
            Example prompt structure
          </p>
          <div className="mt-5 grid gap-4">
            <PromptBlock
              label="System role"
              text="You are my patient AI study assistant. Explain concepts simply, ask me questions, correct my mistakes, and help me improve step by step."
            />
            <PromptBlock
              label="User task"
              text="I want to learn [topic]. First explain it like I am a beginner, then give me 5 practice questions, then review my answers."
            />
            <PromptBlock
              label="Improvement rule"
              text="After I answer, tell me what I got right, what I got wrong, and what I should study next."
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
            week="week-1"
            slug="project"
            label="Mark project complete"
          />
          <Link
            href="/course/week-1"
            className="rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-blue-500"
          >
            Back to Week 1
          </Link>
          <Link
            href="/dashboard"
            className="rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10"
          >
            Back to Dashboard
          </Link>
        </div>
      </section>
      </main>
    </UnlockedWeekGate>
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
