import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { getLesson, getLessonsForWeek } from "@/lib/mdx/loader";
import Quiz from "@/components/Quiz";
import LessonShell from "@/components/LessonShell";
import CompleteButton from "@/components/CompleteButton";
import {
  Callout,
  InsightCard,
  ConceptGrid,
  ConceptPill,
  KeyTerm,
  Steps,
  Step,
  CompareBlock,
  StatRow,
  StatCard,
  Divider,
} from "@/components/mdx-components";

/* ── Static params ─────────────────────────────────────────── */
export async function generateStaticParams() {
  const params: { week: string; lesson: string }[] = [];
  for (let w = 1; w <= 5; w++) {
    const lessons = getLessonsForWeek(w);
    lessons.forEach((l) =>
      params.push({ week: `week-${w}`, lesson: l.slug })
    );
  }
  return params;
}

/* ── Per-lesson metadata ───────────────────────────────────── */
interface Props {
  params: Promise<{ week: string; lesson: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { week, lesson: lessonSlug } = await params;
  const weekNumber = parseInt(week.replace("week-", ""), 10);
  const lesson = await getLesson(weekNumber, lessonSlug);
  if (!lesson) return {};
  return {
    title: `${lesson.title} — AI Foundations`,
    description: lesson.description ?? `Week ${weekNumber}: ${lesson.title}`,
  };
}

/* ── Quiz loader ───────────────────────────────────────────── */
async function loadQuiz(weekNumber: number, lessonSlug: string) {
  try {
    const fs = await import("fs");
    const path = await import("path");
    const quizPath = path.join(
      process.cwd(),
      "content",
      `week-${weekNumber}`,
      `${lessonSlug}.quiz.json`
    );
    if (!fs.existsSync(quizPath)) return null;
    const raw = fs.readFileSync(quizPath, "utf-8");
    return JSON.parse(raw) as {
      title: string;
      questions: { question: string; options: string[]; answer: string }[];
    };
  } catch {
    return null;
  }
}

/* ── Page ──────────────────────────────────────────────────── */
export default async function LessonPage({ params }: Props) {
  const { week, lesson: lessonSlug } = await params;
  const weekNumber = parseInt(week.replace("week-", ""), 10);

  const lesson = await getLesson(weekNumber, lessonSlug);
  if (!lesson) notFound();

  const quizData = await loadQuiz(weekNumber, lessonSlug);

  const siblings = getLessonsForWeek(weekNumber);
  const idx = siblings.findIndex((l) => l.slug === lessonSlug);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx < siblings.length - 1 ? siblings[idx + 1] : null;

  const mdxComponents = {
    Callout,
    InsightCard,
    ConceptGrid,
    ConceptPill,
    KeyTerm,
    Steps,
    Step,
    CompareBlock,
    StatRow,
    StatCard,
    Divider,
    // Quiz is rendered once after the MDX body, not inline.
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote>{children}</blockquote>
    ),
  };

  return (
    <LessonShell lesson={lesson}>

      {/* ── MDX body ─────────────────────────────────────────── */}
      <div className="lesson-prose">
        <MDXRemote
          source={lesson.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, rehypeHighlight],
            },
          }}
        />
      </div>

      {/* ── End-of-lesson quiz ───────────────────────────────── */}
      {quizData && (
        <Quiz title={quizData.title} questions={quizData.questions} />
      )}

      <div style={{ marginTop: "2rem" }}>
        <CompleteButton
          itemType="lesson"
          week={week}
          slug={lessonSlug}
          label="Mark lesson complete"
        />
      </div>

      {/* ── Lesson navigation ────────────────────────────────── */}
      <nav aria-label="Lesson navigation" style={{ marginTop: "3.5rem" }}>
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--border), transparent)",
            marginBottom: "1.5rem",
          }}
        />
        <div className="lesson-nav-grid">

          {/* Previous */}
          {prev ? (
            <Link href={prev.href} className="nav-card">
              <span className="nav-card-label">← Previous lesson</span>
              <span className="nav-card-title">{prev.title}</span>
            </Link>
          ) : (
            <div />
          )}

          {/* Next or module complete */}
          {next ? (
            <Link href={next.href} className="nav-card right">
              <span className="nav-card-label">Next lesson →</span>
              <span className="nav-card-title">{next.title}</span>
            </Link>
          ) : (
            <Link href="/dashboard" className="nav-card accent right">
              <span className="nav-card-label">Module complete →</span>
              <span className="nav-card-title">Back to Dashboard</span>
            </Link>
          )}

        </div>
      </nav>
    </LessonShell>
  );
}
