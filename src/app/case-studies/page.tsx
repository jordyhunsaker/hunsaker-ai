"use client";

const caseStudies = [
  {
    id: "techscale-support-automation",
    title: "60% Faster Support Response",
    client: "TechScale Inc.",
    industry: "B2B SaaS",
    challenge:
      "TechScale's support team was drowning in repetitive tickets, leading to slow response times and frustrated customers. They needed to scale support without proportionally scaling headcount.",
    approach: [
      "Analyzed 6 months of support tickets to identify patterns and common issues",
      "Built an AI-powered ticket triage system using LLMs to categorize and prioritize incoming requests",
      "Implemented automated responses for common questions with human handoff for complex issues",
      "Created a knowledge base integration that suggests relevant articles to support agents",
    ],
    results: [
      { metric: "60%", label: "Faster response time" },
      { metric: "45%", label: "Tickets auto-resolved" },
      { metric: "3x", label: "Ticket volume handled" },
      { metric: "8 weeks", label: "Time to production" },
    ],
    testimonial: {
      quote: "Jordy helped us identify and implement an AI solution that reduced our customer support response time by 60%. His practical approach meant we had something in production within weeks, not months.",
      name: "Sarah Chen",
      title: "VP of Operations",
    },
  },
  {
    id: "dataflow-workflow-automation",
    title: "30+ Hours Saved Weekly",
    client: "DataFlow Systems",
    industry: "Enterprise Software",
    challenge:
      "DataFlow's operations team spent significant time on manual data processing and report generation. The repetitive work was error-prone and prevented the team from focusing on strategic initiatives.",
    approach: [
      "Mapped existing workflows to identify automation opportunities",
      "Built custom automation pipelines using Python and modern ML techniques",
      "Integrated with existing tools (Salesforce, Slack, internal databases)",
      "Trained the team on maintaining and extending the automation system",
    ],
    results: [
      { metric: "30+", label: "Hours saved per week" },
      { metric: "95%", label: "Reduction in errors" },
      { metric: "340%", label: "ROI in first year" },
      { metric: "6 weeks", label: "Time to production" },
    ],
    testimonial: {
      quote: "Unlike other consultants who just deliver slide decks, Jordy actually builds. He integrated AI into our workflow and trained our team to maintain it. The ROI was clear within the first quarter.",
      name: "Marcus Johnson",
      title: "CTO",
    },
  },
  {
    id: "insight-analytics-data-processing",
    title: "Automated Data Pipeline",
    client: "Insight Analytics",
    industry: "Data Analytics",
    challenge:
      "As a growing analytics firm, Insight Analytics was spending too much time on data ingestion and preprocessing. Manual processes were limiting their ability to take on new clients.",
    approach: [
      "Designed an end-to-end automated data pipeline architecture",
      "Implemented intelligent data validation and cleaning using ML models",
      "Built a monitoring dashboard for pipeline health and data quality",
      "Created self-service tools for the team to onboard new data sources",
    ],
    results: [
      { metric: "80%", label: "Less manual processing" },
      { metric: "5x", label: "More clients capacity" },
      { metric: "99.5%", label: "Data accuracy" },
      { metric: "10 weeks", label: "Time to production" },
    ],
    testimonial: {
      quote: "We were drowning in manual data processing. Jordy designed an automation pipeline that saves us 30+ hours per week. Best investment we've made this year.",
      name: "Emily Rodriguez",
      title: "Founder",
    },
  },
];

export default function CaseStudies() {
  return (
    <main className="min-h-screen bg-dark-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="font-mono text-xl font-bold text-terminal-green glow-green">
            hunsaker.ai
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="/#services" className="text-gray-400 hover:text-terminal-green transition-colors">
              Services
            </a>
            <a href="/case-studies" className="text-terminal-green">
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
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-terminal-cyan mb-4">// Proof of Results</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Case Studies</h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Real projects. Measurable outcomes. See how AI implementation has transformed these businesses.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {caseStudies.map((study, index) => (
            <div key={study.id} className="gradient-border rounded-lg bg-dark-800 overflow-hidden">
              {/* Header */}
              <div className="p-8 border-b border-dark-600">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-terminal-green/10 text-terminal-green rounded-full text-sm font-mono">
                    {study.industry}
                  </span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-400">{study.client}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-100">{study.title}</h2>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  {/* Challenge */}
                  <div>
                    <h3 className="font-mono text-terminal-cyan mb-3">// The Challenge</h3>
                    <p className="text-gray-400">{study.challenge}</p>
                  </div>

                  {/* Approach */}
                  <div>
                    <h3 className="font-mono text-terminal-cyan mb-3">// The Approach</h3>
                    <ul className="space-y-2">
                      {study.approach.map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-400">
                          <span className="text-terminal-green mt-1">▹</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Results */}
                <div className="mb-8">
                  <h3 className="font-mono text-terminal-cyan mb-4">// The Results</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {study.results.map((result, i) => (
                      <div key={i} className="bg-dark-700 rounded-lg p-4 text-center">
                        <div className="font-mono text-3xl font-bold text-terminal-green mb-1">
                          {result.metric}
                        </div>
                        <div className="text-sm text-gray-400">{result.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-dark-700 rounded-lg p-6">
                  <div className="text-terminal-cyan text-2xl font-serif mb-2">"</div>
                  <p className="text-gray-300 mb-4">{study.testimonial.quote}</p>
                  <p className="text-sm">
                    <span className="text-gray-200 font-semibold">{study.testimonial.name}</span>
                    <span className="text-gray-500"> — {study.testimonial.title}, {study.client}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-dark-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want Results Like These?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Book a strategy call to discuss how AI can transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/book"
              className="px-8 py-4 bg-terminal-green text-dark-900 font-bold rounded-lg hover:bg-terminal-green/90 transition-colors"
            >
              Book Strategy Call
            </a>
            <a
              href="/calculator"
              className="px-8 py-4 border border-terminal-green text-terminal-green font-bold rounded-lg hover:bg-terminal-green/10 transition-colors"
            >
              Calculate Your ROI
            </a>
          </div>
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
