'use client'

import { useMemo, useState } from 'react'

const questions = [
  {
    question: 'What is the best beginner-friendly description of AI?',
    options: [
      'A system that can learn patterns and make predictions',
      'A machine with human emotions',
      'A database that stores every answer perfectly',
      'A program that never makes mistakes',
    ],
    answer: 0,
    explanation:
      'AI systems learn useful patterns from data and use those patterns to make predictions or generate outputs.',
  },
  {
    question: 'How does AI usually learn?',
    options: [
      'By guessing randomly until it feels right',
      'By studying examples in training data',
      'By copying human emotions',
      'By reading one perfect rule for every situation',
    ],
    answer: 1,
    explanation:
      'AI learns from many examples. The examples help it discover patterns that can be used on new inputs.',
  },
  {
    question: 'Why is data important in AI?',
    options: [
      'Data is the training material AI learns from',
      'Data makes AI conscious',
      'Data removes every possible error',
      'Data is only needed after the model is finished',
    ],
    answer: 0,
    explanation:
      'Data shapes what the model can learn. Better, clearer data usually gives the model better patterns to learn from.',
  },
  {
    question: 'Why can AI make mistakes?',
    options: [
      'It always ignores data',
      'It may learn weak patterns or face situations it has not learned well',
      'It has personal opinions',
      'It refuses to use examples',
    ],
    answer: 1,
    explanation:
      'AI predictions can fail when the data is incomplete, the pattern is misleading, or the new situation is different from training examples.',
  },
  {
    question: 'What does generalizing mean?',
    options: [
      'Memorizing one exact answer',
      'Using learned patterns to handle new examples',
      'Avoiding all training data',
      'Only repeating the training examples',
    ],
    answer: 1,
    explanation:
      'Generalizing means the model can apply what it learned to new examples instead of only remembering old ones.',
  },
  {
    question: 'What is a key difference between AI and human thinking?',
    options: [
      'AI always understands context better than people',
      'Humans use experience and context, while AI predicts from learned patterns',
      'Humans only memorize, while AI feels emotions',
      'There is no difference',
    ],
    answer: 1,
    explanation:
      'Humans understand through lived experience, memory, emotion, and context. AI generates outputs from learned patterns.',
  },
  {
    question: 'What is a smart way to use AI critically?',
    options: [
      'Accept the first answer if it sounds confident',
      'Ask for assumptions, examples, and possible mistakes',
      'Use AI only for final decisions',
      'Avoid giving context',
    ],
    answer: 1,
    explanation:
      'Critical AI use means asking follow-up questions, checking assumptions, and verifying important information.',
  },
  {
    question: 'What should a good AI study assistant prompt include?',
    options: [
      'A clear role, a learning task, and a rule for feedback',
      'Only the word “study”',
      'No topic or goal',
      'A request for the shortest possible answer every time',
    ],
    answer: 0,
    explanation:
      'A strong prompt gives the AI a role, explains what you want to learn, and tells it how to review your answers.',
  },
]

export default function WeekOneQuiz() {
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
            Week 1 Quiz
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
