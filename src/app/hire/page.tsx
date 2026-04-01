"use client";

import Link from "next/link";

export default function HireLanding() {
  return (
    <main className="min-h-screen bg-dark-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-mono text-xl font-bold text-terminal-green glow-green">
            hunsaker.ai
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#services" className="text-gray-400 hover:text-terminal-green transition-colors">
              Services
            </Link>
            <Link href="/hire" className="text-terminal-green">
              Hiring Tool
            </Link>
            <Link
              href="/book"
              className="px-4 py-2 bg-terminal-green text-dark-900 font-semibold rounded hover:bg-terminal-green/90 transition-colors"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-terminal-cyan mb-4">// For HR & Hiring Managers</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            AI Fluency Test for <span className="text-terminal-green glow-green">Hiring</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Verify candidates have baseline AI literacy before you hire. A 25-minute assessment that separates real knowledge from interview buzzwords.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/hire/new"
              className="px-8 py-4 bg-terminal-green text-dark-900 font-bold text-lg rounded-lg hover:bg-terminal-green/90 transition-colors"
            >
              Create Assessment
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-4 border border-terminal-green text-terminal-green font-bold text-lg rounded-lg hover:bg-terminal-green/10 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-6 bg-dark-800">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-terminal-cyan mb-4 text-center">// The Problem</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everyone Claims AI Experience Now
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                stat: "78%",
                label: "of resumes mention AI/ML skills",
              },
              {
                stat: "43%",
                label: "overstate their actual proficiency",
              },
              {
                stat: "2.5x",
                label: "more AI-related interview claims vs 2023",
              },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-dark-700 rounded-lg">
                <div className="font-mono text-4xl font-bold text-terminal-green mb-2">{item.stat}</div>
                <p className="text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 mt-8 max-w-2xl mx-auto">
            It's hard to evaluate AI skills in a traditional interview. Buzzword fluency isn't the same as practical competence.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-terminal-cyan mb-4 text-center">// How It Works</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Simple 3-Step Process
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Assessment",
                desc: "Enter candidate details and select role type. Get a unique assessment link in seconds.",
              },
              {
                step: "02",
                title: "Candidate Completes Test",
                desc: "25-minute assessment covering knowledge questions and practical prompting exercises.",
              },
              {
                step: "03",
                title: "Review Report",
                desc: "Get a detailed breakdown with scores, responses, and hiring recommendations.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="font-mono text-5xl font-bold text-terminal-green mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-gray-200 mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's tested */}
      <section className="py-20 px-6 bg-dark-800">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-terminal-cyan mb-4 text-center">// Assessment Content</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What We Test
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Knowledge */}
            <div className="gradient-border rounded-lg bg-dark-800 p-6">
              <h3 className="font-mono text-xl font-semibold text-terminal-green mb-4">
                Part 1: Knowledge Assessment
              </h3>
              <p className="text-gray-400 mb-4">20 multiple choice questions covering:</p>
              <ul className="space-y-2">
                {[
                  "Core AI/ML concepts and terminology",
                  "LLM literacy and prompting basics",
                  "Practical judgment (when to use AI)",
                  "Risk awareness (privacy, limitations, bias)",
                  "Tools and ecosystem familiarity",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <span className="text-terminal-green mt-1">▹</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Practical */}
            <div className="gradient-border rounded-lg bg-dark-800 p-6">
              <h3 className="font-mono text-xl font-semibold text-terminal-cyan mb-4">
                Part 2: Practical Exercises
              </h3>
              <p className="text-gray-400 mb-4">4 hands-on exercises testing:</p>
              <ul className="space-y-2">
                {[
                  "Prompt writing - can they communicate with AI?",
                  "Prompt critique - can they spot problems?",
                  "Output evaluation - can they quality-check AI?",
                  "Prompt improvement - can they iterate?",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <span className="text-terminal-cyan mt-1">▹</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Report */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-terminal-cyan mb-4 text-center">// Sample Output</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What You'll Receive
          </h2>
          <div className="gradient-border rounded-lg bg-dark-800 p-6 font-mono text-sm">
            <div className="border-b border-dark-600 pb-4 mb-4">
              <p className="text-gray-500">CANDIDATE REPORT</p>
              <p className="text-gray-300">Jane Smith | Product Manager | March 31, 2026</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-gray-500 mb-2">OVERALL SCORE</p>
                <p className="text-3xl font-bold text-terminal-green">74% - COMPETENT</p>
              </div>
              <div>
                <p className="text-gray-500 mb-2">RECOMMENDATION</p>
                <p className="text-yellow-400">Hire with AI onboarding</p>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-gray-500 mb-2">KNOWLEDGE BREAKDOWN</p>
              <div className="space-y-1 text-gray-300">
                <p>Core Concepts: <span className="text-terminal-green">80%</span></p>
                <p>LLM Literacy: <span className="text-terminal-green">85%</span></p>
                <p>Practical Judgment: <span className="text-yellow-400">70%</span></p>
                <p>Risk Awareness: <span className="text-yellow-400">65%</span></p>
              </div>
            </div>
            <div>
              <p className="text-gray-500 mb-2">PRACTICAL EXERCISES</p>
              <div className="space-y-1 text-gray-300">
                <p>Prompt Writing: <span className="text-terminal-green">Strong</span></p>
                <p>Prompt Critique: <span className="text-terminal-green">Strong</span></p>
                <p>Output Evaluation: <span className="text-yellow-400">Adequate</span></p>
                <p className="text-gray-500 mt-2">[Full responses available for review]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role types */}
      <section className="py-20 px-6 bg-dark-800">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-terminal-cyan mb-4 text-center">// Role-Specific Testing</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Tailored to the Role
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { role: "Technical", desc: "Engineers, Data Scientists, Developers", level: "Advanced questions on implementation" },
              { role: "Product", desc: "PMs, Designers, Analysts", level: "Focus on application and judgment" },
              { role: "Leadership", desc: "Directors, VPs, Executives", level: "Strategy and risk-focused" },
              { role: "General", desc: "Any AI-adjacent role", level: "Balanced baseline assessment" },
            ].map((item, i) => (
              <div key={i} className="bg-dark-700 rounded-lg p-4">
                <h3 className="font-semibold text-terminal-green mb-1">{item.role}</h3>
                <p className="text-gray-400 text-sm mb-2">{item.desc}</p>
                <p className="text-gray-500 text-xs">{item.level}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Screen Smarter?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Create your first assessment in under a minute. Free to use.
          </p>
          <Link
            href="/hire/new"
            className="inline-block px-8 py-4 bg-terminal-green text-dark-900 font-bold text-lg rounded-lg hover:bg-terminal-green/90 transition-colors"
          >
            Create Assessment
          </Link>
          <p className="mt-6 text-gray-500">
            Need custom assessments for your organization?{" "}
            <Link href="/book" className="text-terminal-green hover:underline">
              Let's talk
            </Link>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-dark-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-mono text-terminal-green">hunsaker.ai</Link>
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Jordy Hunsaker. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
