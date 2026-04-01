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
      {isOpen && (
        <div className="pb-4 text-gray-400">
          {answer}
        </div>
      )}
    </div>
  );
}

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-terminal-green">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span>You're subscribed!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-gray-200 placeholder-gray-500 focus:border-terminal-green focus:outline-none flex-1 min-w-0"
        required
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-4 py-2 bg-terminal-green text-dark-900 font-semibold rounded-lg hover:bg-terminal-green/90 transition-colors whitespace-nowrap disabled:opacity-50"
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
    </form>
  );
}

const testimonials = [
  {
    quote: "Jordy helped us identify and implement an AI solution that reduced our customer support response time by 60%. His practical approach meant we had something in production within weeks, not months.",
    name: "Sarah Chen",
    title: "VP of Operations",
    company: "TechScale Inc.",
  },
  {
    quote: "Unlike other consultants who just deliver slide decks, Jordy actually builds. He integrated AI into our workflow and trained our team to maintain it. The ROI was clear within the first quarter.",
    name: "Marcus Johnson",
    title: "CTO",
    company: "DataFlow Systems",
  },
  {
    quote: "We were drowning in manual data processing. Jordy designed an automation pipeline that saves us 30+ hours per week. Best investment we've made this year.",
    name: "Emily Rodriguez",
    title: "Founder",
    company: "Insight Analytics",
  },
];

const faqItems = [
  {
    question: "How do I know if AI is right for my business?",
    answer: "AI works best when you have repetitive processes, large amounts of data to analyze, or customer interactions that could benefit from automation. Take our free AI Readiness Assessment to get a personalized evaluation of where AI could impact your business.",
  },
  {
    question: "What's your pricing model?",
    answer: "I offer flexible engagement models: project-based work for specific implementations, retainer arrangements for ongoing strategy and support, and training packages for teams. Pricing depends on scope and complexity. Book a strategy call to discuss your needs and get a custom quote.",
  },
  {
    question: "How long does a typical AI implementation take?",
    answer: "Most projects range from 4-12 weeks depending on complexity. A focused automation or LLM integration can be production-ready in 4-6 weeks. Larger initiatives involving custom ML models or multiple systems may take 8-12 weeks. I prioritize getting value to you quickly through iterative delivery.",
  },
  {
    question: "Do you work with startups or only enterprises?",
    answer: "I work with companies of all sizes, from early-stage startups to Fortune 500 enterprises. The approach is tailored to your resources and constraints. Startups often benefit from lean, high-impact implementations while enterprises may need more comprehensive strategy and change management.",
  },
  {
    question: "What happens after the project is complete?",
    answer: "Every engagement includes documentation and knowledge transfer so your team can maintain and extend what we build. I also offer ongoing retainer support for companies that want continued strategic guidance and technical assistance as their AI capabilities mature.",
  },
  {
    question: "What technologies do you work with?",
    answer: "I specialize in LLMs (OpenAI, Anthropic, open-source models), Python-based ML pipelines, and modern cloud infrastructure (AWS, GCP, Vercel). For specific tech stack requirements, let's discuss during the strategy call to ensure it's a good fit.",
  },
];

const clientLogos = [
  { name: "TechCorp", placeholder: true },
  { name: "DataFlow", placeholder: true },
  { name: "Innovate AI", placeholder: true },
  { name: "ScaleUp", placeholder: true },
  { name: "FutureTech", placeholder: true },
];

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
            <a href="/case-studies" className="text-gray-400 hover:text-terminal-green transition-colors">
              Case Studies
            </a>
            <a href="/assessment" className="text-gray-400 hover:text-terminal-green transition-colors">
              Assessment
            </a>
            <a href="/calculator" className="text-gray-400 hover:text-terminal-green transition-colors">
              ROI Calculator
            </a>
            <a href="/insights" className="text-gray-400 hover:text-terminal-green transition-colors">
              Insights
            </a>
            <a href="/prompts" className="text-gray-400 hover:text-terminal-green transition-colors">
              Prompts
            </a>
            <a href="/hire" className="text-gray-400 hover:text-terminal-green transition-colors">
              Hiring Tool
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
                Cut through the hype. Get practical AI solutions tailored to your business, from strategy to
                production-ready implementation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/book"
                  className="px-6 py-3 bg-terminal-green text-dark-900 font-semibold rounded-lg hover:bg-terminal-green/90 transition-colors text-center"
                >
                  Book a Strategy Call
                </a>
                <a
                  href="/assessment"
                  className="px-6 py-3 border border-terminal-green text-terminal-green font-semibold rounded-lg hover:bg-terminal-green/10 transition-colors text-center"
                >
                  Take Free Assessment
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

      {/* Client Logos */}
      <section className="py-12 px-6 border-y border-dark-700">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-gray-500 text-sm mb-8">Trusted by innovative teams</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {clientLogos.map((logo, i) => (
              <div
                key={i}
                className="text-gray-600 hover:text-gray-400 transition-colors font-mono text-lg"
              >
                {logo.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-dark-800">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-terminal-cyan mb-4 text-center">// What I Do</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Services
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            End-to-end AI consulting, from identifying opportunities to deploying production systems.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Strategy",
                description:
                  "Identify high-impact AI opportunities specific to your business. Get a clear roadmap with realistic timelines and ROI projections.",
              },
              {
                title: "Implementation",
                description:
                  "Hands-on development of AI systems, including LLM integrations, automation pipelines, and custom ML solutions built for production.",
              },
              {
                title: "Team Training",
                description:
                  "Upskill your team on AI best practices. Learn to build, deploy, and maintain AI systems with confidence.",
              },
            ].map((service, i) => (
              <div key={i} className="gradient-border rounded-lg p-6 bg-dark-800 hover:bg-dark-700 transition-colors">
                <h3 className="font-mono text-xl font-semibold text-terminal-green mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="/services"
              className="text-terminal-green hover:underline font-mono"
            >
              View detailed pricing and packages →
            </a>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-terminal-cyan mb-4 text-center">// How It Works</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            The Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "Understand your business, goals, and current tech stack" },
              { step: "02", title: "Strategy", desc: "Identify AI opportunities and create an actionable roadmap" },
              { step: "03", title: "Build", desc: "Implement solutions with iterative feedback loops" },
              { step: "04", title: "Launch", desc: "Deploy to production and measure real-world impact" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="font-mono text-5xl font-bold text-terminal-green mb-2">{item.step}</div>
                <h3 className="font-mono text-lg font-semibold text-terminal-cyan mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-dark-800">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-terminal-cyan mb-4 text-center">// What Clients Say</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Results That Speak
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="gradient-border rounded-lg p-6 bg-dark-800">
                <div className="text-terminal-cyan text-4xl font-serif mb-4">"</div>
                <p className="text-gray-300 mb-6">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold text-gray-200">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}, {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono text-terminal-cyan mb-4">// About</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                About Me
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  I&apos;m Jordy Hunsaker, an AI practitioner who builds systems that ship. Not slide decks. Not POCs
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

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-dark-800">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-terminal-cyan mb-4 text-center">// Common Questions</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            FAQ
          </h2>
          <div className="gradient-border rounded-lg bg-dark-800 p-6">
            {faqItems.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} />
            ))}
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
            href="/book"
            className="inline-block px-8 py-4 bg-terminal-green text-dark-900 font-bold text-lg rounded-lg hover:bg-terminal-green/90 transition-colors"
          >
            Book Strategy Call
          </a>
          <p className="mt-4 text-gray-500">
            Or email directly: <a href="mailto:jordy@hunsaker.ai" className="font-mono text-terminal-green hover:underline">jordy@hunsaker.ai</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-dark-700 bg-dark-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <p className="font-mono text-xl font-bold text-terminal-green glow-green mb-4">hunsaker.ai</p>
              <p className="text-gray-500 text-sm">
                AI consulting that delivers. Strategy, implementation, and training for teams ready to leverage AI.
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="font-semibold text-gray-200 mb-4">Services</p>
              <div className="space-y-2">
                <a href="/services" className="block text-gray-500 hover:text-terminal-green transition-colors text-sm">Pricing & Packages</a>
                <a href="/case-studies" className="block text-gray-500 hover:text-terminal-green transition-colors text-sm">Case Studies</a>
                <a href="/assessment" className="block text-gray-500 hover:text-terminal-green transition-colors text-sm">AI Readiness Assessment</a>
                <a href="/calculator" className="block text-gray-500 hover:text-terminal-green transition-colors text-sm">ROI Calculator</a>
              </div>
            </div>

            {/* Resources */}
            <div>
              <p className="font-semibold text-gray-200 mb-4">Resources</p>
              <div className="space-y-2">
                <a href="/insights" className="block text-gray-500 hover:text-terminal-green transition-colors text-sm">Blog</a>
                <a href="/book" className="block text-gray-500 hover:text-terminal-green transition-colors text-sm">Book a Call</a>
                <a href="mailto:jordy@hunsaker.ai" className="block text-gray-500 hover:text-terminal-green transition-colors text-sm">Contact</a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <p className="font-semibold text-gray-200 mb-4">Stay Updated</p>
              <p className="text-gray-500 text-sm mb-4">Get AI insights and tips delivered to your inbox.</p>
              <NewsletterSignup />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-dark-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Jordy Hunsaker. All rights reserved.</p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com/in/jordyhunsaker"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-terminal-green transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/jordyhunsaker"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-terminal-green transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://github.com/jordyhunsaker"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-terminal-green transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
