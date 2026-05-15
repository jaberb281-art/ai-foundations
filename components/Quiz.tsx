"use client";

import { useState } from "react";

/* ─────────────────────────────────────────────────────────────
   AI FOUNDATIONS — PREMIUM QUIZ COMPONENT
   Drop-in replacement for the existing Quiz.tsx.
   Preserves the exact same QuizProps API — no other files
   need to change to use this component.
   ───────────────────────────────────────────────────────────── */

/* ── Types ─────────────────────────────────────────────────── */
export type Question = {
    question: string;
    options: string[];
    answer: string;
};

export type QuizProps = {
    title: string;
    questions: Question[];
};

type OptionState = "idle" | "selected" | "correct" | "wrong";

/* ── Option state icon ─────────────────────────────────────── */
function OptionIcon({ state }: { state: OptionState }) {
    if (state === "correct") {
        return (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                <circle cx="10" cy="10" r="10" fill="rgba(52,211,153,0.15)" />
                <path
                    d="M6 10l3 3 5-6"
                    stroke="#34d399"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }
    if (state === "wrong") {
        return (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                <circle cx="10" cy="10" r="10" fill="rgba(239,68,68,0.15)" />
                <path
                    d="M7 7l6 6M13 7l-6 6"
                    stroke="#f87171"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        );
    }
    if (state === "selected") {
        return (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                <circle cx="10" cy="10" r="9.5" stroke="#3b82f6" />
                <circle cx="10" cy="10" r="5" fill="#3b82f6" />
            </svg>
        );
    }
    // idle
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <circle cx="10" cy="10" r="9.5" stroke="rgba(255,255,255,0.15)" />
        </svg>
    );
}

/* ── Option style map ──────────────────────────────────────── */
const optionStyles: Record<OptionState, React.CSSProperties> = {
    idle: {
        background: "var(--bg-overlay)",
        borderColor: "rgba(255,255,255,0.08)",
        color: "var(--text-secondary)",
    },
    selected: {
        background: "rgba(59,130,246,0.09)",
        borderColor: "#3b82f6",
        color: "var(--text-primary)",
    },
    correct: {
        background: "rgba(52,211,153,0.08)",
        borderColor: "#34d399",
        color: "#6ee7b7",
    },
    wrong: {
        background: "rgba(239,68,68,0.08)",
        borderColor: "#f87171",
        color: "#fca5a5",
    },
};

/* ── Radial score ring ─────────────────────────────────────── */
function ScoreRing({ pct, color }: { pct: number; color: string }) {
    const r = 30;
    const circumference = 2 * Math.PI * r;
    const offset = circumference * (1 - pct / 100);

    return (
        <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
            {/* Track */}
            <circle
                cx="40" cy="40" r={r}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="6"
            />
            {/* Fill */}
            <circle
                cx="40" cy="40" r={r}
                fill="none"
                stroke={color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 40 40)"
                style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.34,1.56,0.64,1)" }}
            />
            {/* Label */}
            <text
                x="40" y="40"
                dominantBaseline="middle"
                textAnchor="middle"
                fill={color}
                fontSize="13"
                fontWeight="800"
                fontFamily="var(--font-body)"
            >
                {pct}%
            </text>
        </svg>
    );
}

/* ── Main component ────────────────────────────────────────── */
export default function Quiz({ title, questions }: QuizProps) {
    const [selected, setSelected] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [animStates, setAnimStates] = useState<Record<number, "correct" | "wrong" | null>>({});

    const total = questions.length;
    const answered = Object.keys(selected).length;
    const score = submitted
        ? questions.reduce((acc, q, i) => (selected[i] === q.answer ? acc + 1 : acc), 0)
        : 0;
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;

    const scoreColor =
        pct >= 80 ? "#34d399" : pct >= 50 ? "#fbbf24" : "#f87171";

    const scoreMessage =
        pct >= 80
            ? "Excellent — you nailed the concepts."
            : pct >= 50
                ? "Good effort. Review the sections you missed."
                : "Take another pass through the lesson, then try again.";

    /* ── Handlers ─────────────────────────────────────────────── */
    function handleSelect(qIdx: number, option: string) {
        if (submitted) return;
        setSelected((prev) => ({ ...prev, [qIdx]: option }));
    }

    function handleSubmit() {
        if (answered < total) return;
        const states: Record<number, "correct" | "wrong"> = {};
        questions.forEach((q, i) => {
            states[i] = selected[i] === q.answer ? "correct" : "wrong";
        });
        setAnimStates(states);
        setSubmitted(true);
    }

    function handleReset() {
        setSelected({});
        setSubmitted(false);
        setAnimStates({});
    }

    /* ── Derive option state ───────────────────────────────────── */
    function getOptionState(qIdx: number, option: string): OptionState {
        if (!submitted) {
            return selected[qIdx] === option ? "selected" : "idle";
        }
        if (option === questions[qIdx].answer) return "correct";
        if (selected[qIdx] === option) return "wrong";
        return "idle";
    }

    /* ── Render ────────────────────────────────────────────────── */
    return (
        <section
            aria-label={`Quiz: ${title}`}
            style={{
                marginTop: "4rem",
                borderRadius: "1.25rem",
                border: "1px solid var(--border)",
                background: "var(--bg-raised)",
                overflow: "hidden",
            }}
        >
            {/* ── Header ─────────────────────────────────────────────── */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "1.4rem 1.75rem",
                    borderBottom: "1px solid var(--border)",
                }}
            >
                <div>
                    <p
                        style={{
                            margin: "0 0 0.2rem",
                            fontSize: "0.65rem",
                            fontWeight: 800,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "var(--text-muted)",
                        }}
                    >
                        Knowledge check
                    </p>
                    <h2
                        style={{
                            margin: 0,
                            fontSize: "1.2rem",
                            fontWeight: 700,
                            fontFamily: "var(--font-display)",
                            color: "var(--text-primary)",
                            lineHeight: 1.25,
                        }}
                    >
                        {title}
                    </h2>
                </div>

                {/* Question counter pill */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "0.2rem",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.75rem",
                        background: "var(--bg-overlay)",
                        border: "1px solid var(--border)",
                        flexShrink: 0,
                    }}
                >
                    <span
                        style={{
                            fontSize: "1.3rem",
                            fontWeight: 900,
                            color: submitted ? scoreColor : "var(--accent)",
                            lineHeight: 1,
                            transition: "color 0.4s",
                        }}
                    >
                        {submitted ? score : answered}
                    </span>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                        / {total}
                    </span>
                </div>
            </div>

            {/* ── Progress strip ─────────────────────────────────────── */}
            <div style={{ height: "2px", background: "var(--bg-overlay)", width: "100%" }}>
                <div
                    style={{
                        height: "100%",
                        width: submitted ? "100%" : `${(answered / total) * 100}%`,
                        background: submitted
                            ? `linear-gradient(90deg, ${scoreColor}, ${scoreColor}88)`
                            : "linear-gradient(90deg, #3b82f6, #2dd4bf)",
                        transition: "width 0.4s ease, background 0.4s ease",
                    }}
                />
            </div>

            {/* ── Questions ──────────────────────────────────────────── */}
            <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "2.25rem" }}>
                {questions.map((q, qIdx) => {
                    const animState = animStates[qIdx];
                    const isWrong = animState === "wrong";
                    const isCorrect = animState === "correct";

                    return (
                        <div
                            key={qIdx}
                            className={isCorrect ? "answer-correct" : isWrong ? "answer-wrong" : ""}
                        >
                            {/* Question text */}
                            <p
                                style={{
                                    margin: "0 0 1rem",
                                    fontSize: "0.975rem",
                                    fontWeight: 600,
                                    lineHeight: 1.6,
                                    color: "var(--text-primary)",
                                }}
                            >
                                <span
                                    style={{
                                        marginRight: "0.5rem",
                                        fontSize: "0.72rem",
                                        fontWeight: 800,
                                        color: "var(--text-muted)",
                                        fontVariantNumeric: "tabular-nums",
                                    }}
                                >
                                    {String(qIdx + 1).padStart(2, "0")}.
                                </span>
                                {q.question}
                            </p>

                            {/* Options grid */}
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                                    gap: "0.5rem",
                                }}
                            >
                                {q.options.map((option) => {
                                    const state = getOptionState(qIdx, option);
                                    const styles = optionStyles[state];

                                    return (
                                        <button
                                            key={option}
                                            onClick={() => handleSelect(qIdx, option)}
                                            disabled={submitted}
                                            aria-pressed={selected[qIdx] === option}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.75rem",
                                                width: "100%",
                                                textAlign: "left",
                                                padding: "0.875rem 1.1rem",
                                                borderRadius: "0.75rem",
                                                border: `1px solid ${styles.borderColor}`,
                                                background: styles.background,
                                                color: styles.color,
                                                fontSize: "0.9rem",
                                                lineHeight: 1.5,
                                                cursor: submitted ? "default" : "pointer",
                                                transition: "background 0.2s, border-color 0.2s, color 0.2s",
                                            }}
                                            onMouseEnter={(e) => {
                                                if (submitted || selected[qIdx] === option) return;
                                                (e.currentTarget as HTMLButtonElement).style.borderColor =
                                                    "rgba(255,255,255,0.18)";
                                            }}
                                            onMouseLeave={(e) => {
                                                if (submitted || selected[qIdx] === option) return;
                                                (e.currentTarget as HTMLButtonElement).style.borderColor =
                                                    "rgba(255,255,255,0.08)";
                                            }}
                                        >
                                            <OptionIcon state={state} />
                                            <span>{option}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Correct answer disclosure — shown only when wrong */}
                            {submitted && selected[qIdx] !== q.answer && (
                                <div
                                    role="alert"
                                    style={{
                                        marginTop: "0.75rem",
                                        padding: "0.6rem 1rem",
                                        borderRadius: "0.6rem",
                                        background: "rgba(59,130,246,0.07)",
                                        border: "1px solid rgba(59,130,246,0.15)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        fontSize: "0.83rem",
                                        color: "#93c5fd",
                                    }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                                        <circle cx="7" cy="7" r="6.5" stroke="#3b82f6" />
                                        <path d="M4.5 7l2 2 3-3" stroke="#3b82f6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>
                                        Correct answer:{" "}
                                        <strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                                            {q.answer}
                                        </strong>
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* ── Footer: submit or result ────────────────────────────── */}
            <div
                style={{
                    padding: "1.4rem 1.75rem",
                    borderTop: "1px solid var(--border)",
                }}
            >
                {!submitted ? (
                    /* Submit button */
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                        <button
                            onClick={handleSubmit}
                            disabled={answered < total}
                            style={{
                                padding: "0.7rem 1.5rem",
                                borderRadius: "0.75rem",
                                border: "none",
                                fontSize: "0.9rem",
                                fontWeight: 700,
                                cursor: answered < total ? "not-allowed" : "pointer",
                                background: answered < total ? "var(--bg-overlay)" : "var(--accent)",
                                color: answered < total ? "var(--text-muted)" : "#fff",
                                boxShadow: answered >= total ? "0 4px 20px rgba(59,130,246,0.25)" : "none",
                                transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
                            }}
                        >
                            {answered < total
                                ? `Answer ${total - answered} more question${total - answered !== 1 ? "s" : ""} to submit`
                                : "Submit Quiz →"}
                        </button>

                        {/* Subtle progress hint */}
                        {answered > 0 && answered < total && (
                            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                                {answered} of {total} answered
                            </span>
                        )}
                    </div>
                ) : (
                    /* Score result card */
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "1.25rem",
                            flexWrap: "wrap",
                        }}
                    >
                        {/* Left: ring + message */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1.25rem",
                                padding: "1.1rem 1.4rem",
                                borderRadius: "1rem",
                                background: "var(--bg-overlay)",
                                border: `1px solid ${scoreColor}28`,
                                flex: 1,
                                minWidth: "240px",
                            }}
                        >
                            <ScoreRing pct={pct} color={scoreColor} />
                            <div>
                                <p
                                    style={{
                                        margin: "0 0 0.25rem",
                                        fontSize: "1.2rem",
                                        fontWeight: 900,
                                        color: scoreColor,
                                        lineHeight: 1,
                                    }}
                                >
                                    {score}/{total} correct
                                </p>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: "0.82rem",
                                        color: "var(--text-muted)",
                                        lineHeight: 1.5,
                                        maxWidth: "220px",
                                    }}
                                >
                                    {scoreMessage}
                                </p>
                            </div>
                        </div>

                        {/* Right: retry button */}
                        <button
                            onClick={handleReset}
                            style={{
                                padding: "0.7rem 1.25rem",
                                borderRadius: "0.75rem",
                                border: "1px solid var(--border)",
                                background: "var(--bg-overlay)",
                                color: "var(--text-muted)",
                                fontSize: "0.875rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "color 0.2s, border-color 0.2s",
                                flexShrink: 0,
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
                                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
                                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                            }}
                        >
                            ↩ Try again
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}