"use client";

import { useState, useEffect } from "react";

function TypewriterText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowCursor(false), 2000);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && <span className="animate-pulse">_</span>}
    </span>
  );
}

function Terminal({ children }: { children: React.ReactNode }) {
  return (
    <div className="gradient-border rounded-lg overflow-hidden">
      <div className="bg-dark-800 px-4 py-2 flex items-center gap-2 border-b border-dark-600">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 font-mono text-sm text-gray-500">hunsaker.ai</span>
      </div>
      <div className="p-6 font-mono text-sm">{children}</div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="font-mono text-xl font-bold text-terminal-green glow-green">
            hunsaker.ai
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-gray-400 hover:text-terminal-green transition-colors">
              Services
            </a>
            <a href="#about" className="text-gray-400 hover:text-terminal-green transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-400 hover:text-terminal-green transition-colors">
              Contact
            </a>
            <a
              href="#contact"
              className="px-4 py-2 bg-terminal-green text-dark-900 font-semibold rounded hover:bg-terminal-green/90 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono text-terminal-cyan mb-4">// AI Strategy & Implementation</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Build <span className="text-terminal-green glow-green">AI-Powered</span> Systems That Actually Work
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Cut through the hype. Get practical AI solutions tailored to your business—from strategy to
                production-ready implementation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="px-6 py-3 bg-terminal-green text-dark-900 font-semibold rounded-lg hover:bg-terminal-green/90 transition-colors text-center"
                >
                  Book a Strategy Call
                </a>
                <a
                  href="#services"
                  className="px-6 py-3 border border-terminal-green text-terminal-green font-semibold rounded-lg hover:bg-terminal-green/10 transition-colors text-center"
                >
                  View Services
                </a>
              </div>
            </div>
            <div className="lg:pl-8">
              <Terminal>
                <div className="space-y-2 text-gray-300">
                  <p>
                    <span className="text-terminal-cyan">$</span> hunsaker-ai --analyze your-business
                  </p>
                  <p className="text-gray-500">Analyzing opportunities...</p>
                  <p>
                    <span className="text-terminal-green">✓</span> Found 3 high-impact AI use cases
                  </p>
                  <p>
                    <span className="text-terminal-green">✓</span> ROI projection: 340% in 12 months
                  </p>
                  <p>
                    <span className="text-terminal-green">✓</span> Implementation timeline: 8 weeks
                  </p>
                  <p className="pt-2">
                    <span className="text-terminal-cyan">$</span>{" "}
                    <TypewriterText text="Ready to transform your business_" className="text-gray-300" />
                  </p>
                </div>
              </Terminal>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-dark-800">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-terminal-cyan mb-4 text-center">// What I Do</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="font-mono text-terminal-green">$</span> Services
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            End-to-end AI consulting—from identifying opportunities to deploying production systems.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "AI Strategy",
                description:
                  "Identify high-impact AI opportunities specific to your business. Get a clear roadmap with realistic timelines and ROI projections.",
              },
              {
                icon: "⚡",
                title: "Implementation",
                description:
                  "Hands-on development of AI systems—LLM integrations, automation pipelines, and custom ML solutions built for production.",
              },
              {
                icon: "🧠",
                title: "Team Training",
                description:
                  "Upskill your team on AI best practices. Learn to build, deploy, and maintain AI systems with confidence.",
              },
            ].map((service, i) => (
              <div key={i} className="gradient-border rounded-lg p-6 bg-dark-800 hover:bg-dark-700 transition-colors">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-mono text-xl font-semibold text-terminal-green mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-terminal-cyan mb-4 text-center">// How It Works</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="font-mono text-terminal-green">$</span> Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "Understand your business, goals, and current tech stack" },
              { step: "02", title: "Strategy", desc: "Identify AI opportunities and create an actionable roadmap" },
              { step: "03", title: "Build", desc: "Implement solutions with iterative feedback loops" },
              { step: "04", title: "Launch", desc: "Deploy to production and measure real-world impact" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="font-mono text-5xl font-bold text-terminal-green/20 mb-2">{item.step}</div>
                <h3 className="font-mono text-lg font-semibold text-terminal-cyan mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-dark-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono text-terminal-cyan mb-4">// About</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="font-mono text-terminal-green">$</span> whoami
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  I&apos;m Jordy Hunsaker—an AI practitioner who builds systems that ship. Not slide decks. Not POCs
                  that never leave the lab. Production-ready AI that delivers measurable business value.
                </p>
                <p>
                  With experience spanning startups to enterprise, I&apos;ve helped teams navigate the AI landscape and
                  implement solutions that actually work. My approach: cut through the hype, focus on impact, and build
                  for the long term.
                </p>
                <p>
                  Whether you&apos;re exploring your first AI use case or scaling existing systems, I bring hands-on
                  expertise in LLMs, automation, and ML engineering to get you from idea to production.
                </p>
              </div>
            </div>
            <div className="lg:pl-8">
              <Terminal>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-500"># Experience</p>
                  <p>
                    <span className="text-terminal-cyan">focus:</span> LLMs, Automation, ML Engineering
                  </p>
                  <p>
                    <span className="text-terminal-cyan">approach:</span> Practical, Production-First
                  </p>
                  <p>
                    <span className="text-terminal-cyan">clients:</span> Startups to Enterprise
                  </p>
                  <p className="pt-2 text-gray-500"># Stack</p>
                  <p>
                    <span className="text-terminal-cyan">languages:</span> Python, TypeScript
                  </p>
                  <p>
                    <span className="text-terminal-cyan">ml:</span> PyTorch, HuggingFace, OpenAI, Anthropic
                  </p>
                  <p>
                    <span className="text-terminal-cyan">infra:</span> AWS, GCP, Vercel
                  </p>
                </div>
              </Terminal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-terminal-cyan mb-4">// Let&apos;s Talk</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to <span className="text-terminal-green glow-green">Build Something</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Book a free strategy call to discuss your AI goals and explore how we can work together.
          </p>
          <a
            href="mailto:jordy@hunsaker.ai"
            className="inline-block px-8 py-4 bg-terminal-green text-dark-900 font-bold text-lg rounded-lg hover:bg-terminal-green/90 transition-colors"
          >
            Book Strategy Call
          </a>
          <p className="mt-4 font-mono text-gray-500">jordy@hunsaker.ai</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-dark-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-terminal-green">hunsaker.ai</p>
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Jordy Hunsaker. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
