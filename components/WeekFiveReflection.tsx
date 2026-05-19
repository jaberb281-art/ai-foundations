'use client'

import { useMemo, useState } from 'react'

const prompts = [
  'What problem did your final project solve?',
  'Who is the project for?',
  'How did you use AI in the project?',
  'What did AI help you create, improve, or decide?',
  'What did you improve manually after reviewing the AI output?',
  'What are the current limitations of the project?',
  'What would you build or improve next?',
]

export default function WeekFiveReflection() {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [reviewing, setReviewing] = useState(false)

  const answeredCount = useMemo(() => {
    return prompts.filter((_, index) => answers[index]?.trim()).length
  }, [answers])
  const canReview = answeredCount === prompts.length

  function updateAnswer(index: number, value: string) {
    setAnswers((current) => ({ ...current, [index]: value }))
  }

  function editAnswers() {
    setReviewing(false)
  }

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-[#0d1220] p-5 shadow-2xl shadow-blue-950/20 sm:p-6">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
            Final reflection
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Week 5 Reflection
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/70">
            Write short answers to prepare your final AI project as a clear case study.
          </p>
        </div>

        <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">
            {reviewing ? 'Ready' : 'Answered'}
          </p>
          <p className="mt-1 text-2xl font-black text-white">
            {answeredCount}/{prompts.length}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        {prompts.map((prompt, index) => (
          <section
            key={prompt}
            className="rounded-2xl border border-white/10 bg-[#090d18] p-5"
          >
            <div className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-sm font-black text-blue-200">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <label
                  htmlFor={`reflection-${index}`}
                  className="text-base font-black leading-7 text-white"
                >
                  {prompt}
                </label>
                {reviewing ? (
                  <p className="mt-4 whitespace-pre-wrap rounded-xl border border-emerald-300/20 bg-emerald-500/10 p-4 text-sm leading-6 text-white/78">
                    {answers[index]}
                  </p>
                ) : (
                  <textarea
                    id={`reflection-${index}`}
                    value={answers[index] ?? ''}
                    onChange={(event) => updateAnswer(index, event.target.value)}
                    rows={3}
                    className="mt-4 w-full resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/35 focus:border-cyan-300/45"
                    placeholder="Write a short, honest answer..."
                  />
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {!reviewing ? (
          <button
            type="button"
            disabled={!canReview}
            onClick={() => setReviewing(true)}
            className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/65"
          >
            {canReview ? 'Review answers' : `Answer ${prompts.length - answeredCount} more`}
          </button>
        ) : (
          <button
            type="button"
            onClick={editAnswers}
            className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black text-white transition hover:bg-blue-500"
          >
            Edit answers
          </button>
        )}
      </div>
    </div>
  )
}
