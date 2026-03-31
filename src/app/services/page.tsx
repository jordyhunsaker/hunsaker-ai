"use client";

import { useState } from "react";

const packages = [
  {
    name: "Strategy",
    description: "For teams exploring AI opportunities",
    price: "Starting at $5,000",
    duration: "2-3 weeks",
    features: [
      "AI opportunity assessment",
      "Technical feasibility analysis",
      "ROI projections and business case",
      "Implementation roadmap",
      "Technology stack recommendations",
      "2 strategy sessions (90 min each)",
      "Detailed written report",
    ],
    cta: "Book Strategy Package",
    highlight: false,
  },
  {
    name: "Implementation",
    description: "End-to-end AI solution development",
    price: "Starting at $15,000",
    duration: "4-12 weeks",
    features: [
      "Everything in Strategy, plus:",
      "Custom AI/ML solution development",
      "LLM integration and fine-tuning",
      "Production deployment",
      "Testing and quality assurance",
      "Documentation and training",
      "30 days post-launch support",
      "Weekly progress updates",
    ],
    cta: "Book Implementation Package",
    highlight: true,
  },
  {
    name: "Retainer",
    description: "Ongoing AI partnership",
    price: "Starting at $5,000/month",
    duration: "Ongoing",
    features: [
      "Dedicated AI advisor access",
      "Monthly strategy sessions",
      "Priority support and consultation",
      "Continuous optimization",
      "New feature development",
      "Team training and upskilling",
      "Quarterly business reviews",
      "Slack/email support",
    ],
    cta: "Book Retainer Package",
    highlight: false,
  },
];

const addOns = [
  { name: "Additional training sessions", price: "$1,500/session" },
  { name: "Extended post-launch support", price: "$2,500/month" },
  { name: "Custom ML model development", price: "Custom quote" },
  { name: "Data infrastructure setup", price: "Custom quote" },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-dark-600">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left hover:text-terminal-green transition-colors"
      >
        <span className="font-medium text-gray-200">{question}</span>
        <svg
          className={`w-5 h-5 text-terminal-green transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="pb-4 text-gray-400">{answer}</div>}
    </div>
  );
}

const pricingFAQ = [
  {
    question: "What's included in the initial strategy session?",
    answer:
      "The strategy package includes two 90-minute sessions. The first focuses on understanding your business, current tech stack, and goals. The second presents findings, opportunities, and a recommended roadmap. You'll receive a detailed written report with actionable next steps.",
  },
  {
    question: "Can I start with Strategy and upgrade to Implementation?",
    answer:
      "Absolutely. Many clients start with the Strategy package to validate opportunities before committing to full implementation. The strategy fee can be credited toward an Implementation package if you proceed within 30 days.",
  },
  {
    question: "What if my project scope changes during implementation?",
    answer:
      "Scope changes are handled through a transparent change request process. We'll discuss the impact on timeline and budget before proceeding. The goal is always to deliver value without surprises.",
  },
  {
    question: "Do you offer equity arrangements for startups?",
    answer:
      "In select cases, I consider equity or hybrid arrangements for early-stage startups with compelling AI use cases. This is evaluated on a case-by-case basis during the initial consultation.",
  },
  {
    question: "What's your payment structure?",
    answer:
      "Strategy packages are paid upfront. Implementation projects are typically 50% upfront and 50% on completion, though milestone-based payments can be arranged for larger projects. Retainers are billed monthly.",
  },
];

export default function Services() {
  return (
    <main className="min-h-screen bg-dark-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="font-mono text-xl font-bold text-terminal-green glow-green">
            hunsaker.ai
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="/services" className="text-terminal-green">
              Services
            </a>
            <a href="/case-studies" className="text-gray-400 hover:text-terminal-green transition-colors">
              Case Studies
            </a>
            <a href="/assessment" className="text-gray-400 hover:text-terminal-green transition-colors">
              Assessment
            </a>
            <a href="/calculator" className="text-gray-400 hover:text-terminal-green transition-colors">
              ROI Calculator
            </a>
            <a
              href="/book"
              className="px-4 py-2 bg-terminal-green text-dark-900 font-semibold rounded hover:bg-terminal-green/90 transition-colors"
            >
              Book a Call
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-mono text-terminal-cyan mb-4">// Services & Pricing</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="text-terminal-green glow-green">Engagement</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Flexible packages designed to meet you where you are in your AI journey.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`rounded-lg overflow-hidden ${
                  pkg.highlight
                    ? "gradient-border bg-dark-800 scale-105"
                    : "border border-dark-600 bg-dark-800"
                }`}
              >
                {pkg.highlight && (
                  <div className="bg-terminal-green text-dark-900 text-center py-2 font-semibold text-sm">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-mono text-2xl font-bold text-terminal-green mb-2">{pkg.name}</h3>
                  <p className="text-gray-400 mb-4">{pkg.description}</p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-100">{pkg.price}</span>
                    <span className="text-gray-500 ml-2">/ {pkg.duration}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-300">
                        <span className="text-terminal-green mt-1">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/book"
                    className={`block text-center py-3 rounded-lg font-semibold transition-colors ${
                      pkg.highlight
                        ? "bg-terminal-green text-dark-900 hover:bg-terminal-green/90"
                        : "border border-terminal-green text-terminal-green hover:bg-terminal-green/10"
                    }`}
                  >
                    {pkg.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 px-6 bg-dark-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Add-Ons & Extras</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {addOns.map((addon, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-dark-700 rounded-lg">
                <span className="text-gray-300">{addon.name}</span>
                <span className="font-mono text-terminal-cyan">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How We Work Together</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Book a Call",
                desc: "Free 30-minute consultation to discuss your needs and see if we're a fit",
              },
              {
                step: "02",
                title: "Choose Package",
                desc: "Select the engagement model that matches your goals and budget",
              },
              {
                step: "03",
                title: "Kick Off",
                desc: "We align on scope, timeline, and success metrics before starting",
              },
              {
                step: "04",
                title: "Execute & Deliver",
                desc: "Regular updates and collaboration until your AI solution is live",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="font-mono text-4xl font-bold text-terminal-green mb-2">{item.step}</div>
                <h3 className="font-mono text-lg font-semibold text-terminal-cyan mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-dark-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Pricing FAQ</h2>
          <div className="gradient-border rounded-lg bg-dark-800 p-6">
            {pricingFAQ.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Not Sure Which Package?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Book a free consultation and I'll help you find the right fit for your needs and budget.
          </p>
          <a
            href="/book"
            className="inline-block px-8 py-4 bg-terminal-green text-dark-900 font-bold rounded-lg hover:bg-terminal-green/90 transition-colors"
          >
            Book Free Consultation
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-dark-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <a href="/" className="font-mono text-terminal-green">hunsaker.ai</a>
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Jordy Hunsaker. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
