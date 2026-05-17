'use client'

import { useEffect, useState } from 'react'

type CompleteButtonProps = {
  itemType: 'lesson' | 'quiz' | 'project'
  week: string
  slug: string
  initialCompleted?: boolean
  label?: string
}

type ProgressResponse = {
  progress?: {
    completed?: boolean
  } | null
  error?: string
}

export default function CompleteButton({
  itemType,
  week,
  slug,
  initialCompleted = false,
  label = 'Mark complete',
}: CompleteButtonProps) {
  const [completed, setCompleted] = useState(initialCompleted)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true
    const params = new URLSearchParams({ itemType, week, slug })

    async function loadProgress() {
      try {
        const response = await fetch(`/api/progress?${params.toString()}`)

        if (!response.ok) return

        const data = (await response.json()) as ProgressResponse

        if (isMounted && data.progress) {
          setCompleted(Boolean(data.progress.completed))
        }
      } catch {
        // Keep the optimistic default if progress cannot be fetched.
      }
    }

    loadProgress()

    return () => {
      isMounted = false
    }
  }, [itemType, week, slug])

  async function toggleComplete() {
    const nextCompleted = !completed
    const previousCompleted = completed

    setCompleted(nextCompleted)
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemType,
          week,
          slug,
          completed: nextCompleted,
        }),
      })

      const data = (await response.json()) as ProgressResponse

      if (!response.ok) {
        throw new Error(data.error ?? 'Unable to update progress.')
      }
    } catch (caughtError) {
      setCompleted(previousCompleted)
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to update progress.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={toggleComplete}
        disabled={loading}
        aria-pressed={completed}
        className={`rounded-2xl px-5 py-3 text-center text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-75 ${
          completed
            ? 'border border-emerald-300/30 bg-emerald-500/15 text-emerald-100 hover:bg-emerald-500/20'
            : 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500'
        }`}
      >
        {loading ? 'Saving...' : completed ? 'Completed' : label}
      </button>
      {error && (
        <p role="status" aria-live="polite" className="text-sm font-semibold text-red-200">
          {error}
        </p>
      )}
    </div>
  )
}
