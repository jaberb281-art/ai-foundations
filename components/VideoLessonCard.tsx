type VideoLessonCardProps = {
  title: string
  description: string
  duration?: string
  status?: 'coming-soon' | 'available'
  embedUrl?: string
}

export default function VideoLessonCard({
  title,
  description,
  duration,
  status = 'coming-soon',
  embedUrl,
}: VideoLessonCardProps) {
  const hasVideo = status === 'available' && Boolean(embedUrl)

  return (
    <section className="rounded-[1.75rem] border border-cyan-300/20 bg-white/[0.05] p-5 shadow-2xl shadow-blue-950/25">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]">
        {hasVideo ? (
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.3),transparent_58%)]" />
            <div className="absolute left-8 top-8 h-20 w-20 rounded-full bg-violet-500/20 blur-2xl" />
            <div className="absolute bottom-6 right-6 h-24 w-24 rounded-full bg-cyan-400/15 blur-2xl" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-[0_0_35px_rgba(34,211,238,0.18)]">
              <span className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-cyan-100" />
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-black text-white">{title}</h2>
            {duration && (
              <span className="rounded-full border border-blue-300/20 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-100">
                {duration}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-6 text-white/70">{description}</p>
          {!hasVideo && (
            <p className="mt-3 text-sm font-semibold text-cyan-100">Video coming soon.</p>
          )}
        </div>

        <span
          className={`shrink-0 rounded-2xl border px-4 py-3 text-center text-sm font-black ${
            hasVideo
              ? 'border-cyan-300/25 bg-cyan-500/10 text-cyan-100'
              : 'cursor-not-allowed border-white/10 bg-white/[0.04] text-white/70'
          }`}
          aria-disabled={!hasVideo}
        >
          {hasVideo ? 'Watch now' : 'Coming soon'}
        </span>
      </div>
    </section>
  )
}
