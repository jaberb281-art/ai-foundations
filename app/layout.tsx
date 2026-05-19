import type { Metadata } from "next";
import "./globals.css";
import "highlight.js/styles/github-dark.css";

export const metadata: Metadata = {
  title: "Theory Of You Academy | AI Foundations",
  description:
    "Learn AI foundations through a practical 5-week course with lessons, self-checks, and portfolio-ready projects.",
  openGraph: {
    title: "Theory Of You Academy | AI Foundations",
    description:
      "A practical AI Foundations course for learners who want to use AI clearly, build workflows, and finish real projects.",
    url: "https://ai-foundations-amber.vercel.app",
    siteName: "Theory Of You Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Theory Of You Academy | AI Foundations",
    description:
      "Learn AI foundations through a practical 5-week course with lessons, self-checks, and portfolio-ready projects.",
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
