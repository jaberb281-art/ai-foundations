import type { Metadata } from "next";
import "./globals.css";
import "highlight.js/styles/github-dark.css";

export const metadata: Metadata = {
  title: "AI Foundations — Free AI Course for Developers",
  description:
    "Join the founding waitlist for AI Foundations, a free practical AI course for developers and beginner builders.",
  openGraph: {
    title: "AI Foundations — Free AI Course for Developers",
    description:
      "Learn AI fundamentals through practical projects, Python, machine learning, and modern developer workflows.",
    url: "https://jaberb281-art.github.io/ai-foundations/",
    siteName: "AI Foundations",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Foundations — Free AI Course for Developers",
    description:
      "Join the founding waitlist for a free, practical AI course built for beginner developers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Preconnect eliminates the DNS + TLS handshake from the critical path.
            Without these, Google Fonts blocks rendering for 300–600ms on cold loads,
            causing a flash of unstyled/fallback text (FOUT) before DM Sans loads. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}