"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import Link from "next/link";
import { LessonMeta } from "@/lib/mdx/loader";

/* ── Types ─────────────────────────────────────────────────── */
interface Props {
    lesson: LessonMeta;
    children: ReactNode;
}

/* ── Difficulty badge colour map ───────────────────────────── */
const difficultyStyle: Record<string, { bg: string; text: string; border: string }> = {
    Beginner: {
        bg: "rgba(52,211,153,0.08)",
        text: "#6ee7b7",
        border: "rgba(52,211,153,0.2)",
    },
    Intermediate: {
        bg: "rgba(251,191,36,0.08)",
        text: "#fcd34d",
        border: "rgba(251,191,36,0.2)",
    },
    Advanced: {
        bg: "rgba(248,113,113,0.08)",
        text: "#fca5a5",
        border: "rgba(248,113,113,0.2)",
    },
};

/* ── Component ─────────────────────────────────────────────── */
export default function LessonShell({ lesson, children }: Props) {
    const [progress, setProgress] = useState(0);
    const [activeIdx, setActiveIdx] = useState(0);
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
    const articleRef = useRef<HTMLElement>(null);

    /* ── Collect headings from rendered article ──────────────── */
    useEffect(() => {
        const article = articleRef.current;
        if (!article) return;

        const els = Array.from(article.querySelectorAll("h2, h3")) as HTMLElement[];
        setHeadings(
            els.map((el) => ({
                id: el.id || "",
                text: el.textContent?.trim() ?? "",
                level: el.tagName === "H2" ? 2 : 3,
            }))
        );
    }, []);

    /* ── Reading progress ────────────────────────────────────── */
    useEffect(() => {
        const onScroll = () => {
            const doc = document.documentElement;
            const scrollable = doc.scrollHeight - doc.clientHeight;
            if (scrollable > 0) setProgress((window.scrollY / scrollable) * 100);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* ── Active section via IntersectionObserver ─────────────── */
    useEffect(() => {
        const article = articleRef.current;
        if (!article) return;

        const els = Array.from(article.querySelectorAll("h2, h3")) as HTMLElement[];
        if (els.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const idx = els.indexOf(entry.target as HTMLElement);
                        if (idx !== -1) setActiveIdx(idx);
                    }
                }
            },
            { rootMargin: "-15% 0px -75% 0px" }
        );

        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [headings]);

    /* ── Scroll to heading ───────────────────────────────────── */
    function scrollToHeading(idx: number) {
        const article = articleRef.current;
        if (!article) return;
        const els = Array.from(article.querySelectorAll("h2, h3")) as HTMLElement[];
        els[idx]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const diff = difficultyStyle[lesson.difficulty] ?? difficultyStyle.Beginner;

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "var(--bg-base)",
                color: "var(--text-primary)",
            }}
        >
            {/* ── Reading progress bar ──────────────────────────────── */}
            <div
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Reading progress"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 60,
                    height: "2px",
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #3b82f6, #2dd4bf)",
                    boxShadow: "0 0 10px rgba(59,130,246,0.55)",
                    transition: "width 0.1s linear",
                    pointerEvents: "none",
                }}
            />

            {/* ── Top nav ───────────────────────────────────────────── */}
            <nav
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 50,
                    borderBottom: "1px solid var(--border)",
                    background: "rgba(7,9,15,0.88)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                }}
            >
                <div
                    style={{
                        maxWidth: "80rem",
                        margin: "0 auto",
                        padding: "0 1.25rem",
                        height: "52px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                    }}
                >
                    {/* Logo */}
                    <Link
                        href="/dashboard"
                        style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}
                    >
                        <div
                            style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "8px",
                                background: "var(--accent)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.7rem",
                                fontWeight: 900,
                                color: "#fff",
                                letterSpacing: "0.02em",
                                flexShrink: 0,
                            }}
                        >
                            AI
                        </div>
                        <span
                            style={{
                                fontSize: "0.875rem",
                                fontWeight: 600,
                                color: "var(--text-secondary)",
                            }}
                        >
                            AI Foundations
                        </span>
                    </Link>

                    {/* Inline progress strip (desktop) */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.625rem",
                            flex: 1,
                            maxWidth: "220px",
                        }}
                    >
                        <div
                            style={{
                                flex: 1,
                                height: "3px",
                                borderRadius: "999px",
                                background: "var(--bg-subtle)",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    height: "100%",
                                    borderRadius: "999px",
                                    width: `${progress}%`,
                                    background: "linear-gradient(90deg, #3b82f6, #2dd4bf)",
                                    transition: "width 0.3s ease",
                                }}
                            />
                        </div>
                        <span
                            style={{
                                fontSize: "0.7rem",
                                color: "var(--text-muted)",
                                minWidth: "28px",
                                textAlign: "right",
                            }}
                        >
                            {Math.round(progress)}%
                        </span>
                    </div>

                    {/* Dashboard link */}
                    <Link
                        href="/dashboard"
                        style={{
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: "var(--text-muted)",
                            textDecoration: "none",
                            padding: "0.375rem 0.75rem",
                            borderRadius: "0.625rem",
                            border: "1px solid var(--border)",
                            transition: "color 0.15s, border-color 0.15s",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)";
                            (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                        }}
                    >
                        ← Dashboard
                    </Link>
                </div>
            </nav>

            {/* ── Cinematic hero ────────────────────────────────────── */}
            <header
                style={{
                    position: "relative",
                    overflow: "hidden",
                    background: "var(--bg-raised)",
                    borderBottom: "1px solid var(--border)",
                }}
            >
                {/* Atmospheric glow — top centre */}
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        top: "-10rem",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "42rem",
                        height: "28rem",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }}
                />
                {/* Secondary glow — top right */}
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        top: "2rem",
                        right: "-6rem",
                        width: "22rem",
                        height: "22rem",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }}
                />

                <div
                    style={{
                        position: "relative",
                        maxWidth: "80rem",
                        margin: "0 auto",
                        padding: "3.5rem 1.25rem 4rem",
                    }}
                >
                    {/* ── Breadcrumb + badges ──────────────────────────── */}
                    <div
                        className="animate-fade-up"
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: "0.5rem",
                            marginBottom: "1.5rem",
                        }}
                    >
                        {/* Week badge */}
                        <span
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "0.2rem 0.7rem",
                                borderRadius: "999px",
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                background: "rgba(59,130,246,0.1)",
                                border: "1px solid rgba(59,130,246,0.22)",
                                color: "#93c5fd",
                                letterSpacing: "0.04em",
                            }}
                        >
                            Week {lesson.week}
                        </span>

                        {/* Difficulty badge */}
                        <span
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "0.2rem 0.7rem",
                                borderRadius: "999px",
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                background: diff.bg,
                                border: `1px solid ${diff.border}`,
                                color: diff.text,
                                letterSpacing: "0.04em",
                            }}
                        >
                            {lesson.difficulty}
                        </span>

                        {/* Reading time */}
                        <span
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "0.2rem 0.7rem",
                                borderRadius: "999px",
                                fontSize: "0.72rem",
                                background: "var(--bg-overlay)",
                                border: "1px solid var(--border)",
                                color: "var(--text-muted)",
                            }}
                        >
                            {lesson.readingTime}
                        </span>
                    </div>

                    {/* ── Lesson title ─────────────────────────────────── */}
                    <h1
                        className="animate-fade-up animate-delay-1"
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(1.9rem, 5vw, 3.1rem)",
                            fontWeight: 700,
                            lineHeight: 1.15,
                            letterSpacing: "-0.02em",
                            color: "var(--text-primary)",
                            maxWidth: "42rem",
                            margin: 0,
                        }}
                    >
                        {lesson.title}
                    </h1>

                    {/* ── Description ──────────────────────────────────── */}
                    {lesson.description && (
                        <p
                            className="animate-fade-up animate-delay-2"
                            style={{
                                marginTop: "1.25rem",
                                maxWidth: "38rem",
                                fontSize: "1.0625rem",
                                lineHeight: 1.75,
                                color: "var(--text-secondary)",
                            }}
                        >
                            {lesson.description}
                        </p>
                    )}

                    {/* ── Learning objectives grid ──────────────────────── */}
                    {lesson.objectives.length > 0 && (
                        <div
                            className="animate-fade-up animate-delay-3"
                            style={{ marginTop: "2.5rem" }}
                        >
                            <p
                                style={{
                                    fontSize: "0.68rem",
                                    fontWeight: 800,
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase",
                                    color: "var(--text-muted)",
                                    marginBottom: "0.875rem",
                                }}
                            >
                                By the end of this lesson
                            </p>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                                    gap: "0.625rem",
                                    maxWidth: "52rem",
                                }}
                            >
                                {lesson.objectives.map((obj, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: "0.75rem",
                                            padding: "0.875rem 1rem",
                                            borderRadius: "0.875rem",
                                            background: "var(--bg-overlay)",
                                            border: "1px solid var(--border)",
                                        }}
                                    >
                                        {/* Check icon */}
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            style={{ flexShrink: 0, marginTop: "0.125rem" }}
                                            aria-hidden="true"
                                        >
                                            <circle
                                                cx="8"
                                                cy="8"
                                                r="7.5"
                                                stroke="rgba(59,130,246,0.35)"
                                            />
                                            <path
                                                d="M5 8l2 2 4-4"
                                                stroke="#3b82f6"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span
                                            style={{
                                                fontSize: "0.875rem",
                                                lineHeight: 1.55,
                                                color: "var(--text-secondary)",
                                            }}
                                        >
                                            {obj}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* ── Body: article + sidebar ───────────────────────────── */}
            <div
                style={{
                    maxWidth: "80rem",
                    margin: "0 auto",
                    padding: "2.5rem 1.25rem 4rem",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: "2rem",
                    }}
                    className="lesson-layout"
                >
                    {/* ── Article ───────────────────────────────────────── */}
                    <article
                        ref={articleRef}
                        style={{
                            minWidth: 0,
                            borderRadius: "1.125rem",
                            border: "1px solid var(--border)",
                            background: "var(--bg-raised)",
                            padding: "2rem 1.5rem",
                        }}
                    >
                        {children}
                    </article>

                    {/* ── Sidebar ───────────────────────────────────────── */}
                    <aside className="lesson-sidebar">
                        <div
                            style={{
                                position: "sticky",
                                top: "4.5rem",
                                borderRadius: "1rem",
                                border: "1px solid var(--border)",
                                background: "var(--bg-raised)",
                                padding: "1.25rem",
                            }}
                        >
                            {/* Section label */}
                            <p
                                style={{
                                    fontSize: "0.65rem",
                                    fontWeight: 800,
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase",
                                    color: "var(--text-muted)",
                                    marginBottom: "0.875rem",
                                }}
                            >
                                In this lesson
                            </p>

                            {/* Heading list */}
                            {headings.length > 0 ? (
                                <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                    {headings.map((h, i) => (
                                        <li key={i}>
                                            <button
                                                onClick={() => scrollToHeading(i)}
                                                style={{
                                                    width: "100%",
                                                    textAlign: "left",
                                                    background: "none",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    padding: "0.3rem 0 0.3rem 0.625rem",
                                                    fontSize: h.level === 2 ? "0.8rem" : "0.75rem",
                                                    fontWeight: h.level === 2 ? 600 : 400,
                                                    lineHeight: 1.5,
                                                    color:
                                                        i === activeIdx
                                                            ? "var(--accent)"
                                                            : "var(--text-muted)",
                                                    borderLeft:
                                                        i === activeIdx
                                                            ? "2px solid var(--accent)"
                                                            : "2px solid transparent",
                                                    transition: "color 0.2s, border-color 0.2s",
                                                    paddingLeft:
                                                        h.level === 3
                                                            ? i === activeIdx
                                                                ? "1.25rem"
                                                                : "1rem"
                                                            : i === activeIdx
                                                                ? "0.625rem"
                                                                : "0.625rem",
                                                    opacity: i === activeIdx ? 1 : 0.7,
                                                }}
                                            >
                                                {h.text}
                                            </button>
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                /* Skeleton shown before headings are collected */
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                    {[80, 65, 65, 55, 70].map((w, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                height: "10px",
                                                width: `${w}%`,
                                                borderRadius: "4px",
                                                background: "var(--bg-overlay)",
                                            }}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Tags */}
                            {lesson.tags.length > 0 && (
                                <div style={{ marginTop: "1.5rem" }}>
                                    <p
                                        style={{
                                            fontSize: "0.65rem",
                                            fontWeight: 800,
                                            letterSpacing: "0.12em",
                                            textTransform: "uppercase",
                                            color: "var(--text-muted)",
                                            marginBottom: "0.625rem",
                                        }}
                                    >
                                        Tags
                                    </p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                                        {lesson.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                style={{
                                                    fontSize: "0.72rem",
                                                    padding: "0.2rem 0.55rem",
                                                    borderRadius: "0.4rem",
                                                    background: "var(--bg-overlay)",
                                                    border: "1px solid var(--border)",
                                                    color: "var(--text-muted)",
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>

            {/* ── Responsive layout styles ──────────────────────────── */}
            <style>{`
        @media (min-width: 1024px) {
          .lesson-layout {
            grid-template-columns: 1fr 240px !important;
          }
          .lesson-sidebar {
            display: block !important;
          }
        }
        .lesson-sidebar {
          display: none;
        }
        @media (min-width: 768px) {
          article {
            padding: 2.75rem 3rem !important;
          }
        }
      `}</style>
        </div>
    );
}
