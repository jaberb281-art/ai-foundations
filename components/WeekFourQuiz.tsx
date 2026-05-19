'use client'

import { useMemo, useState } from 'react'

const questions = [
  {
    question: 'Why should an AI product start with a real user problem?',
    options: [
      'Because the problem explains who needs help and what AI should improve',
      'Because every AI tool automatically becomes a useful product',
      'Because product planning should avoid users completely',
      'Because the newest model always decides the product idea',
    ],
    answer: 0,
    explanation:
      'Problem-first thinking keeps the product focused on a real person, task, and pain point instead of a vague use of AI.',
  },
  {
    question: 'Which option is the clearest real problem?',
    options: [
      'An AI app that writes things',
      'A smart platform for everyone',
      'Students applying for internships struggle to write clear resume bullet points',
      'A tool with many AI features',
    ],
    answer: 2,
    explanation:
      'A strong problem names a user, a task, and a pain point. The resume example is specific enough to design for.',
  },
  {
    question: 'What is a user pain point?',
    options: [
      'A moment where a user feels stuck, slow, confused, or frustrated',
      'A random technology trend',
      'A feature name',
      'A color choice in the interface',
    ],
    answer: 0,
    explanation:
      'Pain points are moments of friction. They help you understand what the product should actually solve.',
  },
  {
    question: 'What are the three basic parts of an AI feature?',
    options: [
      'Input, process, output',
      'Logo, color, animation',
      'Price, ads, followers',
      'Name, slogan, launch date',
    ],
    answer: 0,
    explanation:
      'A useful AI feature should define what the user gives, what AI does, and what useful result comes back.',
  },
  {
    question: 'Why should beginners avoid building “AI for everything”?',
    options: [
      'It usually becomes too broad, hard to test, and unclear for users',
      'Because AI cannot help with specific tasks',
      'Because small features are never useful',
      'Because every product must include every feature at launch',
    ],
    answer: 0,
    explanation:
      'Focused features are easier to build, explain, test, and improve. A first version should solve one clear task.',
  },
  {
    question: 'What does MVP mean in simple product planning?',
    options: [
      'The smallest useful version of the product',
      'The most visually complex product',
      'A product with every possible feature',
      'A product that never needs user feedback',
    ],
    answer: 0,
    explanation:
      'An MVP is the smallest version that can still deliver the core value and help you test the idea.',
  },
  {
    question: 'Which is a good success criterion for an AI study planner?',
    options: [
      'The user gets a clear study plan they can follow today',
      'The product has ten unrelated features',
      'The app uses AI in every screen',
      'The user never has to read the output',
    ],
    answer: 0,
    explanation:
      'Success criteria should connect back to the original problem and show whether the product helped.',
  },
  {
    question: 'What should a simple AI product plan include?',
    options: [
      'User, problem, AI feature, input, output, first version, and success criteria',
      'Only the product name',
      'Only a list of AI tools',
      'Only a finished business plan',
    ],
    answer: 0,
    explanation:
      'A simple product plan connects the user problem to one AI feature and defines what the first version should do.',
  },
]

export default function WeekFourQuiz() {
  const [selected, setSelected] = useState<Record<number, number>>({})
  const [checked, setChecked] = useState(false)

  const score = useMemo(() => {
    return questions.reduce((total, question, index) => {
      return selected[index] === question.answer ? total + 1 : total
    }, 0)
  }, [selected])

  const answeredCount = Object.keys(selected).length
  const canCheck = answeredCount === questions.length

  function chooseAnswer(questionIndex: number, optionIndex: number) {
    if (checked) return
    setSelected((current) => ({ ...current, [questionIndex]: optionIndex }))
  }

  function tryAgain() {
    setSelected({})
    setChecked(false)
  }

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-[#0d1220] p-5 shadow-2xl shadow-blue-950/20 sm:p-6">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
            Self-check
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Week 4 Quiz
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/70">
            Answer all questions, then check your score and review the explanations.
          </p>
        </div>

        <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">
            {checked ? 'Score' : 'Answered'}
          </p>
          <p className="mt-1 text-2xl font-black text-white">
            {checked ? `${score}/${questions.length}` : `${answeredCount}/${questions.length}`}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        {questions.map((question, questionIndex) => {
          const selectedAnswer = selected[questionIndex]
          const isCorrect = selectedAnswer === question.answer

          return (
            <section
              key={question.question}
              className="rounded-2xl border border-white/10 bg-[#090d18] p-5"
            >
              <div className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-sm font-black text-blue-200">
                  {questionIndex + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-black leading-7 text-white">{question.question}</h3>

                  <div className="mt-4 grid gap-2">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = selectedAnswer === optionIndex
                      const isAnswer = question.answer === optionIndex
                      const showCorrect = checked && isAnswer
                      const showWrong = checked && isSelected && !isAnswer

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => chooseAnswer(questionIndex, optionIndex)}
                          disabled={checked}
                          className={`rounded-xl border px-4 py-3 text-left text-sm leading-6 transition ${
                            showCorrect
                              ? 'border-emerald-300/45 bg-emerald-500/10 text-emerald-100'
                              : showWrong
                                ? 'border-red-300/45 bg-red-500/10 text-red-100'
                                : isSelected
                                  ? 'border-cyan-300/45 bg-cyan-500/10 text-white'
                                  : 'border-white/10 bg-white/[0.04] text-white/72 hover:border-blue-300/35 hover:bg-white/[0.07]'
                          }`}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>

                  {checked && (
                    <div
                      className={`mt-4 rounded-xl border p-4 ${
                        isCorrect
                          ? 'border-emerald-300/25 bg-emerald-500/10'
                          : 'border-blue-300/25 bg-blue-500/10'
                      }`}
                    >
                      <p className="text-sm font-black text-white">
                        {isCorrect ? 'Correct' : 'Review this'}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/72">
                        {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {!checked ? (
          <button
            type="button"
            disabled={!canCheck}
            onClick={() => setChecked(true)}
            className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/65"
          >
            {canCheck ? 'Check answers' : `Answer ${questions.length - answeredCount} more`}
          </button>
        ) : (
          <button
            type="button"
            onClick={tryAgain}
            className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black text-white transition hover:bg-blue-500"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  )
}
