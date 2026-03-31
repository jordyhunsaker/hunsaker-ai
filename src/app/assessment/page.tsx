"use client";

import { useState } from "react";

type Question = {
  id: string;
  question: string;
  options: { label: string; value: number }[];
};

type Section = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};

const sections: Section[] = [
  {
    id: "data",
    title: "Data Infrastructure",
    description: "Understanding your current data landscape",
    questions: [
      {
        id: "data_centralized",
        question: "How centralized is your business data?",
        options: [
          { label: "Scattered across spreadsheets and tools", value: 1 },
          { label: "Partially organized in a few systems", value: 2 },
          { label: "Mostly centralized in databases or a data warehouse", value: 3 },
          { label: "Fully centralized with clear data governance", value: 4 },
        ],
      },
      {
        id: "data_quality",
        question: "How would you rate your data quality?",
        options: [
          { label: "Inconsistent, lots of gaps and duplicates", value: 1 },
          { label: "Usable but requires significant cleanup", value: 2 },
          { label: "Generally clean with some known issues", value: 3 },
          { label: "High quality, regularly maintained and validated", value: 4 },
        ],
      },
      {
        id: "data_access",
        question: "How accessible is your data to your team?",
        options: [
          { label: "Difficult, requires technical help to access", value: 1 },
          { label: "Some self-service tools but limited", value: 2 },
          { label: "Good access with dashboards and reports", value: 3 },
          { label: "Excellent, with APIs and self-service analytics", value: 4 },
        ],
      },
    ],
  },
  {
    id: "ai_usage",
    title: "Current AI Usage",
    description: "Where you are on the AI adoption curve",
    questions: [
      {
        id: "ai_experience",
        question: "What is your current experience with AI tools?",
        options: [
          { label: "No AI tools in use", value: 1 },
          { label: "Experimenting with ChatGPT or similar", value: 2 },
          { label: "Using AI tools in specific workflows", value: 3 },
          { label: "AI integrated into multiple business processes", value: 4 },
        ],
      },
      {
        id: "ai_goals",
        question: "How clear are your AI goals?",
        options: [
          { label: "Not sure where AI could help us", value: 1 },
          { label: "General interest but no specific use cases", value: 2 },
          { label: "Identified 1-2 potential use cases", value: 3 },
          { label: "Clear roadmap with prioritized use cases", value: 4 },
        ],
      },
      {
        id: "ai_budget",
        question: "Do you have budget allocated for AI initiatives?",
        options: [
          { label: "No dedicated budget", value: 1 },
          { label: "Could reallocate from other projects", value: 2 },
          { label: "Some budget set aside for exploration", value: 3 },
          { label: "Dedicated budget with executive sponsorship", value: 4 },
        ],
      },
    ],
  },
  {
    id: "team",
    title: "Team & Culture",
    description: "Your organization's capacity for AI adoption",
    questions: [
      {
        id: "team_technical",
        question: "What technical talent do you have in-house?",
        options: [
          { label: "No technical team", value: 1 },
          { label: "IT support but no developers", value: 2 },
          { label: "Developers but no ML/AI experience", value: 3 },
          { label: "Team with data science or ML experience", value: 4 },
        ],
      },
      {
        id: "team_adoption",
        question: "How does your team typically adopt new technology?",
        options: [
          { label: "Resistant to change, prefer existing tools", value: 1 },
          { label: "Cautious, need lots of training and support", value: 2 },
          { label: "Open to new tools with proper rollout", value: 3 },
          { label: "Early adopters, eager to try new technology", value: 4 },
        ],
      },
      {
        id: "team_leadership",
        question: "Is there executive support for AI initiatives?",
        options: [
          { label: "No awareness or interest at leadership level", value: 1 },
          { label: "Some curiosity but not a priority", value: 2 },
          { label: "Active interest with time allocated to explore", value: 3 },
          { label: "Strong champion driving AI strategy", value: 4 },
        ],
      },
    ],
  },
  {
    id: "operations",
    title: "Operations & Scale",
    description: "Identifying where AI can have the most impact",
    questions: [
      {
        id: "ops_repetitive",
        question: "How much time does your team spend on repetitive tasks?",
        options: [
          { label: "Minimal, most work is unique", value: 1 },
          { label: "Some repetitive work, maybe 10-20%", value: 2 },
          { label: "Significant, around 30-50% is repetitive", value: 3 },
          { label: "Most work follows repeatable patterns", value: 4 },
        ],
      },
      {
        id: "ops_scale",
        question: "Are you facing scaling challenges?",
        options: [
          { label: "No, current capacity meets demand", value: 1 },
          { label: "Starting to feel growing pains", value: 2 },
          { label: "Actively struggling to keep up", value: 3 },
          { label: "Growth is limited by operational capacity", value: 4 },
        ],
      },
      {
        id: "ops_decisions",
        question: "How data-driven are your business decisions?",
        options: [
          { label: "Mostly intuition and experience", value: 1 },
          { label: "Some data, but often unavailable when needed", value: 2 },
          { label: "Regular reporting informs key decisions", value: 3 },
          { label: "Data is central to all major decisions", value: 4 },
        ],
      },
    ],
  },
];

type Answers = Record<string, number>;

function getReadinessLevel(score: number): { level: string; color: string; description: string } {
  const percentage = (score / 48) * 100;
  if (percentage >= 75) {
    return {
      level: "AI Ready",
      color: "text-terminal-green",
      description:
        "Your organization has strong foundations for AI adoption. You have the data infrastructure, team capabilities, and organizational support to move quickly on AI initiatives.",
    };
  } else if (percentage >= 50) {
    return {
      level: "Building Momentum",
      color: "text-terminal-cyan",
      description:
        "You have solid building blocks in place. With targeted improvements in a few key areas, you can accelerate your AI readiness and start capturing value from AI implementations.",
    };
  } else if (percentage >= 25) {
    return {
      level: "Early Stage",
      color: "text-yellow-400",
      description:
        "You are in the early stages of AI readiness. The good news: there is significant opportunity to build competitive advantage. Focus on foundational improvements before major AI investments.",
    };
  } else {
    return {
      level: "Foundation Building",
      color: "text-orange-400",
      description:
        "Your organization needs to strengthen core foundations before AI adoption. Start with data infrastructure and building internal capabilities. Small pilot projects can help build momentum.",
    };
  }
}

function getRecommendations(answers: Answers): string[] {
  const recommendations: string[] = [];

  if (answers.data_centralized <= 2) {
    recommendations.push("Prioritize consolidating your data into a central system or data warehouse");
  }
  if (answers.data_quality <= 2) {
    recommendations.push("Invest in data cleaning and establish data quality processes");
  }
  if (answers.ai_goals <= 2) {
    recommendations.push("Run a discovery workshop to identify and prioritize AI use cases");
  }
  if (answers.team_technical <= 2) {
    recommendations.push("Consider partnering with external AI expertise for initial projects");
  }
  if (answers.team_leadership <= 2) {
    recommendations.push("Build an executive business case showing AI ROI in your industry");
  }
  if (answers.ops_repetitive >= 3) {
    recommendations.push("High potential for automation: map your repetitive workflows for AI opportunities");
  }
  if (answers.ops_scale >= 3) {
    recommendations.push("AI can help you scale: focus on use cases that multiply team capacity");
  }
  if (answers.ai_experience >= 3) {
    recommendations.push("Build on your AI momentum with more integrated, production-grade solutions");
  }

  return recommendations.slice(0, 4);
}

function getSectionScore(sectionId: string, answers: Answers): number {
  const section = sections.find((s) => s.id === sectionId);
  if (!section) return 0;
  return section.questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
}

export default function Assessment() {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = sections.reduce((sum, s) => sum + s.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const currentSectionData = sections[currentSection];
  const isSectionComplete = currentSectionData.questions.every((q) => answers[q.id] !== undefined);
  const isLastSection = currentSection === sections.length - 1;
  const allQuestionsAnswered = answeredQuestions === totalQuestions;

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (isLastSection) {
      return;
    }
    setCurrentSection((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentSection((prev) => Math.max(0, prev - 1));
  };

  const handleSubmit = async () => {
    if (!email) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowResults(true);
    setIsSubmitting(false);
  };

  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const readiness = getReadinessLevel(totalScore);
  const recommendations = getRecommendations(answers);

  if (showResults) {
    return (
      <main className="min-h-screen bg-dark-900 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-terminal-cyan mb-4">// Assessment Complete</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Your AI Readiness Score</h1>
          </div>

          <div className="gradient-border rounded-lg p-8 bg-dark-800 mb-8">
            <div className="text-center mb-8">
              <div className="font-mono text-6xl font-bold text-terminal-green mb-2">{totalScore}/48</div>
              <div className={`text-2xl font-semibold ${readiness.color}`}>{readiness.level}</div>
            </div>

            <p className="text-gray-300 text-center mb-8">{readiness.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {sections.map((section) => {
                const sectionScore = getSectionScore(section.id, answers);
                const maxScore = section.questions.length * 4;
                return (
                  <div key={section.id} className="text-center">
                    <div className="font-mono text-2xl font-bold text-terminal-cyan">
                      {sectionScore}/{maxScore}
                    </div>
                    <div className="text-sm text-gray-400">{section.title}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {recommendations.length > 0 && (
            <div className="gradient-border rounded-lg p-8 bg-dark-800 mb-8">
              <h2 className="font-mono text-xl font-semibold text-terminal-green mb-4">Recommended Next Steps</h2>
              <ul className="space-y-3">
                {recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="text-terminal-green mt-1">&#9656;</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="text-center">
            <p className="text-gray-400 mb-6">
              Ready to turn these insights into action? Book a free strategy call to discuss your AI roadmap.
            </p>
            <a
              href="mailto:jordy@hunsaker.ai?subject=AI%20Readiness%20Assessment%20Follow-up"
              className="inline-block px-8 py-4 bg-terminal-green text-dark-900 font-bold text-lg rounded-lg hover:bg-terminal-green/90 transition-colors"
            >
              Book Strategy Call
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark-900 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <a href="/" className="font-mono text-xl font-bold text-terminal-green glow-green">
            hunsaker.ai
          </a>
          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4">AI Readiness Assessment</h1>
          <p className="text-gray-400">
            Answer 12 questions to get your personalized AI readiness score and recommendations.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-terminal-green transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Section tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {sections.map((section, i) => {
            const sectionAnswered = section.questions.filter((q) => answers[q.id] !== undefined).length;
            const sectionComplete = sectionAnswered === section.questions.length;
            return (
              <button
                key={section.id}
                onClick={() => setCurrentSection(i)}
                className={`px-4 py-2 rounded-lg font-mono text-sm whitespace-nowrap transition-colors ${
                  i === currentSection
                    ? "bg-terminal-green text-dark-900"
                    : sectionComplete
                    ? "bg-dark-700 text-terminal-green"
                    : "bg-dark-800 text-gray-400 hover:text-gray-200"
                }`}
              >
                {section.title}
              </button>
            );
          })}
        </div>

        {/* Current section */}
        <div className="gradient-border rounded-lg p-8 bg-dark-800 mb-8">
          <h2 className="font-mono text-xl font-semibold text-terminal-cyan mb-2">{currentSectionData.title}</h2>
          <p className="text-gray-400 mb-8">{currentSectionData.description}</p>

          <div className="space-y-8">
            {currentSectionData.questions.map((question, qIndex) => (
              <div key={question.id}>
                <p className="text-gray-200 mb-4">
                  <span className="text-terminal-green font-mono mr-2">{qIndex + 1}.</span>
                  {question.question}
                </p>
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(question.id, option.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        answers[question.id] === option.value
                          ? "bg-terminal-green/20 border border-terminal-green text-terminal-green"
                          : "bg-dark-700 border border-dark-600 text-gray-300 hover:border-gray-500"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentSection === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentSection === 0
                ? "text-gray-600 cursor-not-allowed"
                : "text-terminal-green hover:bg-terminal-green/10"
            }`}
          >
            Back
          </button>

          {isLastSection && allQuestionsAnswered ? (
            <div className="flex items-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-gray-200 placeholder-gray-500 focus:border-terminal-green focus:outline-none"
              />
              <button
                onClick={handleSubmit}
                disabled={!email || isSubmitting}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  email && !isSubmitting
                    ? "bg-terminal-green text-dark-900 hover:bg-terminal-green/90"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Analyzing..." : "Get Results"}
              </button>
            </div>
          ) : (
            <button
              onClick={handleNext}
              disabled={!isSectionComplete}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                isSectionComplete
                  ? "bg-terminal-green text-dark-900 hover:bg-terminal-green/90"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              Next Section
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
