"use client";

import { ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────
   AI FOUNDATIONS — MDX COMPONENT LIBRARY
   These are the building blocks of the educational design
   language. Import them in the lesson page and pass as the
   `components` prop to <MDXRemote />.

   Usage in any .mdx file:
     <Callout type="warning">Watch out for overfitting.</Callout>
     <InsightCard>Neural nets learn by adjusting weights.</InsightCard>
     <ConceptGrid>
       <ConceptPill icon="🧠">Backpropagation</ConceptPill>
       <ConceptPill icon="📉">Loss Function</ConceptPill>
     </ConceptGrid>
     <KeyTerm term="gradient descent">An optimisation algorithm...</KeyTerm>
     <Divider label="deep dive" />
   ───────────────────────────────────────────────────────────── */

/* ── Callout ───────────────────────────────────────────────── */
type CalloutType = "info" | "tip" | "warning" | "danger";

const calloutMeta: Record<
    CalloutType,
    { icon: string; label: string; bg: string; border: string; iconColor: string }
> = {
    info: {
        icon: "💡",
        label: "Note",
        bg: "rgba(59,130,246,0.07)",
        border: "#3b82f6",
        iconColor: "#93c5fd",
    },
    tip: {
        icon: "✦",
        label: "Tip",
        bg: "rgba(45,212,191,0.07)",
        border: "#2dd4bf",
        iconColor: "#5eead4",
    },
    warning: {
        icon: "⚠️",
        label: "Warning",
        bg: "rgba(251,191,36,0.07)",
        border: "#fbbf24",
        iconColor: "#fcd34d",
    },
    danger: {
        icon: "🚨",
        label: "Important",
        bg: "rgba(239,68,68,0.07)",
        border: "#ef4444",
        iconColor: "#fca5a5",
    },
};

export function Callout({
    type = "info",
    title,
    children,
}: {
    type?: CalloutType;
    title?: string;
    children: ReactNode;
}) {
    const meta = calloutMeta[type];

    return (
        <div
            style={{
                display: "flex",
                gap: "0.875rem",
                padding: "1.1rem 1.4rem",
                borderRadius: "0.875rem",
                margin: "2rem 0",
                borderLeft: `3px solid ${meta.border}`,
                background: meta.bg,
            }}
            role="note"
        >
            {/* Icon */}
            <span
                aria-hidden="true"
                style={{
                    fontSize: "1.05rem",
                    flexShrink: 0,
                    marginTop: "0.1rem",
                    lineHeight: 1,
                }}
            >
                {meta.icon}
            </span>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <p
                    style={{
                        margin: "0 0 0.35rem",
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.09em",
                        color: meta.iconColor,
                    }}
                >
                    {title ?? meta.label}
                </p>
                <div
                    style={{
                        fontSize: "0.9375rem",
                        lineHeight: 1.7,
                        color: "var(--text-secondary)",
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

/* ── Key Insight Card ──────────────────────────────────────── */
export function InsightCard({ children }: { children: ReactNode }) {
    return (
        <div
            style={{
                position: "relative",
                background:
                    "linear-gradient(135deg, rgba(59,130,246,0.09) 0%, rgba(167,139,250,0.05) 100%)",
                border: "1px solid rgba(59,130,246,0.18)",
                borderRadius: "1.25rem",
                padding: "1.5rem 1.75rem",
                margin: "2.25rem 0",
                overflow: "hidden",
            }}
        >
            {/* Decorative corner glow */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    top: "-2rem",
                    right: "-2rem",
                    width: "8rem",
                    height: "8rem",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            {/* "KEY INSIGHT" eyebrow */}
            <p
                style={{
                    margin: "0 0 0.75rem",
                    fontSize: "0.63rem",
                    fontWeight: 800,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                }}
            >
                Key Insight
            </p>

            {/* Content */}
            <div
                style={{
                    position: "relative",
                    fontSize: "1.02rem",
                    lineHeight: 1.8,
                    color: "var(--text-primary)",
                    fontWeight: 400,
                }}
            >
                {children}
            </div>
        </div>
    );
}

/* ── Concept Grid ──────────────────────────────────────────── */
export function ConceptGrid({ children }: { children: ReactNode }) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(165px, 1fr))",
                gap: "0.6rem",
                margin: "1.75rem 0",
            }}
        >
            {children}
        </div>
    );
}

/* ── Concept Pill ──────────────────────────────────────────── */
export function ConceptPill({
    icon,
    children,
}: {
    icon?: string;
    children: ReactNode;
}) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.875rem 1.1rem",
                borderRadius: "0.75rem",
                background: "var(--bg-overlay)",
                border: "1px solid var(--border)",
                transition: "border-color 0.2s, transform 0.18s",
                cursor: "default",
            }}
            onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(59,130,246,0.3)";
                el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "var(--border)";
                el.style.transform = "translateY(0)";
            }}
        >
            {icon && (
                <span
                    aria-hidden="true"
                    style={{ fontSize: "1.15rem", lineHeight: 1, flexShrink: 0 }}
                >
                    {icon}
                </span>
            )}
            <span
                style={{
                    fontSize: "0.855rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    lineHeight: 1.4,
                }}
            >
                {children}
            </span>
        </div>
    );
}

/* ── Key Term (inline glossary) ────────────────────────────── */
export function KeyTerm({
    term,
    children,
}: {
    term: string;
    children: ReactNode;
}) {
    return (
        <abbr
            title={typeof children === "string" ? children : undefined}
            style={{
                textDecoration: "none",
                borderBottom: "1.5px dashed rgba(59,130,246,0.45)",
                color: "#93c5fd",
                fontWeight: 500,
                fontStyle: "normal",
                cursor: "help",
                transition: "color 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#bfdbfe";
                (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(59,130,246,0.8)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#93c5fd";
                (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(59,130,246,0.45)";
            }}
        >
            {term}
        </abbr>
    );
}

/* ── Step List ─────────────────────────────────────────────── */
export function Steps({ children }: { children: ReactNode }) {
    return (
        <div style={{ margin: "2rem 0" }}>
            {children}
        </div>
    );
}

export function Step({
    number,
    title,
    children,
}: {
    number: number;
    title: string;
    children: ReactNode;
}) {
    return (
        <div
            style={{
                display: "flex",
                gap: "1.125rem",
                paddingBottom: "1.75rem",
                position: "relative",
            }}
        >
            {/* Connector line */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    left: "1.0625rem",
                    top: "2.375rem",
                    bottom: 0,
                    width: "1px",
                    background:
                        "linear-gradient(180deg, rgba(59,130,246,0.25) 0%, transparent 100%)",
                }}
            />

            {/* Step number bubble */}
            <div
                style={{
                    width: "2.125rem",
                    height: "2.125rem",
                    borderRadius: "50%",
                    background: "rgba(59,130,246,0.1)",
                    border: "1px solid rgba(59,130,246,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.78rem",
                    fontWeight: 800,
                    color: "var(--accent)",
                    flexShrink: 0,
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {number}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0, paddingTop: "0.25rem" }}>
                <p
                    style={{
                        margin: "0 0 0.4rem",
                        fontSize: "0.9375rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                    }}
                >
                    {title}
                </p>
                <div
                    style={{
                        fontSize: "0.9rem",
                        lineHeight: 1.7,
                        color: "var(--text-secondary)",
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

/* ── Compare Block ─────────────────────────────────────────── */
export function CompareBlock({
    leftLabel = "Before",
    rightLabel = "After",
    children,
}: {
    leftLabel?: string;
    rightLabel?: string;
    children: ReactNode[];
}) {
    const [left, right] = Array.isArray(children) ? children : [children, null];

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1px",
                borderRadius: "1rem",
                overflow: "hidden",
                border: "1px solid var(--border)",
                margin: "2rem 0",
                background: "var(--border)",
            }}
        >
            {/* Left */}
            <div style={{ background: "var(--bg-overlay)", padding: "1.25rem 1.4rem" }}>
                <p
                    style={{
                        margin: "0 0 0.875rem",
                        fontSize: "0.68rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#f87171",
                    }}
                >
                    {leftLabel}
                </p>
                <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    {left}
                </div>
            </div>

            {/* Right */}
            <div style={{ background: "var(--bg-overlay)", padding: "1.25rem 1.4rem" }}>
                <p
                    style={{
                        margin: "0 0 0.875rem",
                        fontSize: "0.68rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#34d399",
                    }}
                >
                    {rightLabel}
                </p>
                <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    {right}
                </div>
            </div>
        </div>
    );
}

/* ── Visual Divider ────────────────────────────────────────── */
export function Divider({ label }: { label?: string }) {
    return (
        <div
            role="separator"
            style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                margin: "3rem 0",
            }}
        >
            <div
                style={{
                    flex: 1,
                    height: "1px",
                    background:
                        "linear-gradient(90deg, transparent, var(--border) 60%)",
                }}
            />
            {label && (
                <span
                    style={{
                        fontSize: "0.65rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        padding: "0.25rem 0.875rem",
                        borderRadius: "999px",
                        background: "var(--bg-overlay)",
                        border: "1px solid var(--border)",
                        color: "var(--text-muted)",
                        whiteSpace: "nowrap",
                    }}
                >
                    {label}
                </span>
            )}
            <div
                style={{
                    flex: 1,
                    height: "1px",
                    background:
                        "linear-gradient(90deg, var(--border) 40%, transparent)",
                }}
            />
        </div>
    );
}

/* ── Stat Card Row ─────────────────────────────────────────── */
export function StatRow({ children }: { children: ReactNode }) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "0.75rem",
                margin: "2rem 0",
            }}
        >
            {children}
        </div>
    );
}

export function StatCard({
    value,
    label,
    accent = false,
}: {
    value: string;
    label: string;
    accent?: boolean;
}) {
    return (
        <div
            style={{
                padding: "1.25rem",
                borderRadius: "0.875rem",
                background: accent ? "rgba(59,130,246,0.08)" : "var(--bg-overlay)",
                border: `1px solid ${accent ? "rgba(59,130,246,0.2)" : "var(--border)"}`,
                textAlign: "center",
            }}
        >
            <p
                style={{
                    margin: "0 0 0.3rem",
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    color: accent ? "var(--accent)" : "var(--text-primary)",
                    fontFamily: "var(--font-display)",
                    lineHeight: 1,
                }}
            >
                {value}
            </p>
            <p
                style={{
                    margin: 0,
                    fontSize: "0.78rem",
                    color: "var(--text-muted)",
                }}
            >
                {label}
            </p>
        </div>
    );
}