'use client'

import { useMemo, useState } from 'react'

const questions = [
  {
    question: 'What is a prompt?',
    options: [
      'A clear message or instruction given to an AI system',
      'A database table that stores AI answers',
      'A guarantee that AI will be correct',
      'A hidden code that makes AI conscious',
    ],
    answer: 0,
    explanation:
      'A prompt is the instruction, question, or message you give to an AI tool to guide its response.',
  },
  {
    question: 'Why do prompts matter?',
    options: [
      'They replace the need to check AI output',
      'They help the AI understand the task, context, and expected result',
      'They make every answer short',
      'They stop AI from using patterns',
    ],
    answer: 1,
    explanation:
      'Better prompts give the AI clearer direction, which usually leads to more useful and focused answers.',
  },
  {
    question: 'Which set of ingredients makes a prompt stronger?',
    options: [
      'Instruction, context, and goal',
      'Emotion, luck, and speed',
      'One word and no details',
      'A long message with no clear task',
    ],
    answer: 0,
    explanation:
      'A strong prompt often explains what to do, what context matters, and what goal the output should serve.',
  },
  {
    question: 'Which prompt is stronger?',
    options: [
      'Explain prompts.',
      'Explain prompts to a beginner using one example and three key takeaways.',
      'Help.',
      'Write something about AI.',
    ],
    answer: 1,
    explanation:
      'The stronger prompt gives audience, topic, example requirement, and output shape.',
  },
  {
    question: 'What does role prompting do?',
    options: [
      'It tells the AI what kind of helper or perspective to use',
      'It forces the AI to always be correct',
      'It removes the need for context',
      'It only works for coding tasks',
    ],
    answer: 0,
    explanation:
      'Role prompting sets the assistant style or perspective, such as tutor, editor, planner, or code reviewer.',
  },
  {
    question: 'What is a useful constraint in a prompt?',
    options: [
      'Make it under 150 words and avoid technical jargon',
      'Do anything you want',
      'Ignore the audience',
      'Give every possible answer',
    ],
    answer: 0,
    explanation:
      'Constraints give boundaries, such as length, tone, audience level, or things to avoid.',
  },
  {
    question: 'Why should you specify output format?',
    options: [
      'So the answer is organized in the way you need',
      'So the AI never needs context',
      'So the AI stops explaining',
      'So the prompt becomes vague',
    ],
    answer: 0,
    explanation:
      'Output format tells the AI whether you want bullets, a table, steps, a checklist, or another structure.',
  },
  {
    question: 'What is a common prompting mistake?',
    options: [
      'Checking the answer before using it',
      'Giving clear context',
      'Treating AI output as always correct',
      'Asking for examples',
    ],
    answer: 2,
    explanation:
      'AI can sound confident and still be wrong, so important outputs should be checked before you rely on them.',
  },
]

export default function WeekTwoQuiz() {
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
            Week 2 Quiz
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
