import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hunsaker.ai | AI Strategy & Implementation Consulting",
  description:
    "Expert AI consulting to help your business leverage artificial intelligence. Strategy, implementation, and training from an experienced AI practitioner.",
  keywords: ["AI consulting", "artificial intelligence", "machine learning", "AI strategy", "AI implementation"],
  openGraph: {
    title: "Hunsaker.ai | AI Consulting",
    description: "Transform your business with strategic AI implementation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
