"use client";

import Link from "next/link";
import { useState, useEffect, use } from "react";

type AssessmentData = {
  id: string;
  candidateName: string;
  candidateEmail: string;
  roleTitle: string;
  roleType: string;
  companyName: string;
  hrEmail: string;
  createdAt: string;
  status: string;
};

type QuestionResult = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  givenAnswer: number;
};

type ExerciseResult = {
  id: string;
  type: string;
  title: string;
  scenario: string;
  instructions: string;
  response: string;
  rubric: { criterion: string; points: number; description: string }[];
  maxScore: number;
};

type Results = {
  assessmentId: string;
  completedAt: string;
  durationMinutes: number;
  knowledge: {
    correct: number;
    total: number;
    percentage: number;
    byCategory: Record<string, { correct: number; total: number }>;
    questions: QuestionResult[];
  };
  practical: {
    exercises: ExerciseResult[];
  };
};

type PracticalScores = Record<string, Record<string, number>>;

function getRecommendation(overallScore: number): { text: string; color: string } {
  if (overallScore >= 85) {
    return { text: "Strong Hire", color: "text-terminal-green" };
  } else if (overallScore >= 70) {
    return { text: "Hire with AI onboarding", color: "text-yellow-400" };
  } else if (overallScore >= 50) {
    return { text: "Borderline - Consider role fit", color: "text-orange-400" };
  } else {
    return { text: "Does not meet baseline", color: "text-red-400" };
  }
}

function getScoreColor(percentage: number): string {
  if (percentage >= 80) return "text-terminal-green";
  if (percentage >= 60) return "text-yellow-400";
  return "text-red-400";
}

export default function AssessmentReport({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [assessment, setAssessment] = useState<AssessmentData | null>(null);
  const [results, setResults] = useState<Results | null>(null);
  const [loading, setLoading] = useState(true);
  const [practicalScores, setPracticalScores] = useState<PracticalScores>({});
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    const assessments = JSON.parse(localStorage.getItem("assessments") || "[]");
    const found = assessments.find((a: AssessmentData) => a.id === id);
    const savedResults = localStorage.getItem(`results-${id}`);

    if (found) {
      setAssessment(found);
    }
    if (savedResults) {
      const parsed = JSON.parse(savedResults);
      setResults(parsed);

      // Initialize practical scores from localStorage or empty
      const savedScores = localStorage.getItem(`scores-${id}`);
      if (savedScores) {
        setPracticalScores(JSON.parse(savedScores));
      } else {
        const initialScores: PracticalScores = {};
        parsed.practical.exercises.forEach((ex: ExerciseResult) => {
          initialScores[ex.id] = {};
          ex.rubric.forEach((r) => {
            initialScores[ex.id][r.criterion] = 0;
          });
        });
        setPracticalScores(initialScores);
      }
    }
    setLoading(false);
  }, [id]);

  const handleScoreChange = (exerciseId: string, criterion: string, score: number) => {
    const newScores = {
      ...practicalScores,
      [exerciseId]: {
        ...practicalScores[exerciseId],
        [criterion]: score,
      },
    };
    setPracticalScores(newScores);
    localStorage.setItem(`scores-${id}`, JSON.stringify(newScores));
  };

  const calculatePracticalScore = (): number => {
    if (!results) return 0;
    let earned = 0;
    let total = 0;
    results.practical.exercises.forEach((ex) => {
      total += ex.maxScore;
      if (practicalScores[ex.id]) {
        Object.values(practicalScores[ex.id]).forEach((score) => {
          earned += score;
        });
      }
    });
    return total > 0 ? Math.round((earned / total) * 100) : 0;
  };

  const calculateOverallScore = (): number => {
    if (!results) return 0;
    const knowledgeWeight = 0.5;
    const practicalWeight = 0.5;
    return Math.round(
      results.knowledge.percentage * knowledgeWeight +
        calculatePracticalScore() * practicalWeight
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </main>
    );
  }

  if (!assessment) {
    return (
      <main className="min-h-screen bg-dark-900 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-200 mb-4">Assessment Not Found</h1>
          <p className="text-gray-400 mb-6">This assessment link may be invalid.</p>
          <Link href="/hire" className="text-terminal-green hover:underline">
            Back to Hiring Tool
          </Link>
        </div>
      </main>
    );
  }

  if (!results) {
    return (
      <main className="min-h-screen bg-dark-900">
        <nav className="fixed top-0 w-full z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="font-mono text-xl font-bold text-terminal-green glow-green">
              hunsaker.ai
            </Link>
          </div>
        </nav>

        <div className="pt-32 pb-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Awaiting Completion</h1>
            <p className="text-gray-400 mb-8">
              {assessment.candidateName} has not completed their assessment yet.
            </p>
            <div className="gradient-border rounded-lg bg-dark-800 p-6 text-left">
              <p className="font-mono text-sm text-gray-500 mb-4">ASSESSMENT DETAILS</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Candidate</span>
                  <span className="text-gray-200">{assessment.candidateName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Role</span>
                  <span className="text-gray-200">{assessment.roleTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Created</span>
                  <span className="text-gray-200">
                    {new Date(assessment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-yellow-400">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const overallScore = calculateOverallScore();
  const practicalScore = calculatePracticalScore();
  const recommendation = getRecommendation(overallScore);

  return (
    <main className="min-h-screen bg-dark-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-mono text-xl font-bold text-terminal-green glow-green">
            hunsaker.ai
          </Link>
          <Link href="/hire" className="text-gray-400 hover:text-terminal-green transition-colors">
            Back to Hiring Tool
          </Link>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <p className="font-mono text-terminal-cyan mb-2">// Candidate Report</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{assessment.candidateName}</h1>
            <p className="text-gray-400">
              {assessment.roleTitle} | {assessment.companyName} |{" "}
              {new Date(results.completedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="gradient-border rounded-lg bg-dark-800 p-6">
              <p className="text-gray-500 text-sm font-mono mb-2">OVERALL SCORE</p>
              <p className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}%</p>
            </div>
            <div className="gradient-border rounded-lg bg-dark-800 p-6">
              <p className="text-gray-500 text-sm font-mono mb-2">RECOMMENDATION</p>
              <p className={`text-xl font-semibold ${recommendation.color}`}>{recommendation.text}</p>
            </div>
            <div className="gradient-border rounded-lg bg-dark-800 p-6">
              <p className="text-gray-500 text-sm font-mono mb-2">TIME TAKEN</p>
              <p className="text-2xl font-bold text-gray-200">{results.durationMinutes} min</p>
            </div>
          </div>

          {/* Knowledge Section */}
          <div className="gradient-border rounded-lg bg-dark-800 p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="font-mono text-xl font-semibold text-terminal-green">
                  Part 1: Knowledge Assessment
                </h2>
                <p className="text-gray-400 text-sm">
                  {results.knowledge.correct} / {results.knowledge.total} correct
                </p>
              </div>
              <div className="text-right">
                <p className={`text-3xl font-bold ${getScoreColor(results.knowledge.percentage)}`}>
                  {results.knowledge.percentage}%
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {Object.entries(results.knowledge.byCategory).map(([category, scores]) => {
                const pct = scores.total > 0 ? Math.round((scores.correct / scores.total) * 100) : 0;
                return (
                  <div key={category} className="bg-dark-700 rounded-lg p-3">
                    <p className="text-gray-400 text-xs uppercase mb-1">{category}</p>
                    <p className={`font-semibold ${getScoreColor(pct)}`}>
                      {scores.correct}/{scores.total} ({pct}%)
                    </p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setShowQuestions(!showQuestions)}
              className="text-terminal-green hover:underline text-sm"
            >
              {showQuestions ? "Hide question details" : "Show question details"}
            </button>

            {showQuestions && (
              <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
                {results.knowledge.questions.map((q, i) => (
                  <div key={q.id} className="bg-dark-700 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          q.givenAnswer === q.correctAnswer ? "bg-terminal-green/20" : "bg-red-500/20"
                        }`}
                      >
                        {q.givenAnswer === q.correctAnswer ? (
                          <svg className="w-4 h-4 text-terminal-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-200 text-sm mb-2">
                          <span className="text-gray-500">Q{i + 1}:</span> {q.question}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Answer:</span>{" "}
                          <span className={q.givenAnswer === q.correctAnswer ? "text-terminal-green" : "text-red-400"}>
                            {q.options[q.givenAnswer]}
                          </span>
                        </p>
                        {q.givenAnswer !== q.correctAnswer && (
                          <p className="text-sm mt-1">
                            <span className="text-gray-500">Correct:</span>{" "}
                            <span className="text-terminal-green">{q.options[q.correctAnswer]}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Practical Section */}
          <div className="gradient-border rounded-lg bg-dark-800 p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="font-mono text-xl font-semibold text-terminal-cyan">
                  Part 2: Practical Exercises
                </h2>
                <p className="text-gray-400 text-sm">Manual scoring required</p>
              </div>
              <div className="text-right">
                <p className={`text-3xl font-bold ${getScoreColor(practicalScore)}`}>
                  {practicalScore}%
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {results.practical.exercises.map((ex) => {
                const exerciseScore = practicalScores[ex.id]
                  ? Object.values(practicalScores[ex.id]).reduce((a, b) => a + b, 0)
                  : 0;
                const isExpanded = expandedExercise === ex.id;

                return (
                  <div key={ex.id} className="bg-dark-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedExercise(isExpanded ? null : ex.id)}
                      className="w-full p-4 flex justify-between items-center text-left hover:bg-dark-600 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-gray-200">{ex.title}</p>
                        <p className="text-gray-500 text-sm capitalize">{ex.type}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`font-mono ${getScoreColor((exerciseScore / ex.maxScore) * 100)}`}>
                          {exerciseScore}/{ex.maxScore}
                        </span>
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-4 pt-0 border-t border-dark-600">
                        <div className="mb-4">
                          <p className="text-gray-500 text-xs uppercase mb-2">Scenario</p>
                          <p className="text-gray-300 text-sm whitespace-pre-line">{ex.scenario}</p>
                        </div>

                        <div className="mb-4">
                          <p className="text-gray-500 text-xs uppercase mb-2">Candidate Response</p>
                          <div className="bg-dark-800 rounded-lg p-4">
                            <p className="text-gray-200 text-sm whitespace-pre-line">
                              {ex.response || <span className="text-gray-500 italic">No response provided</span>}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-gray-500 text-xs uppercase mb-3">Scoring Rubric</p>
                          <div className="space-y-3">
                            {ex.rubric.map((r) => (
                              <div key={r.criterion} className="flex items-start gap-4">
                                <div className="flex-1">
                                  <p className="text-gray-200 text-sm font-medium">{r.criterion}</p>
                                  <p className="text-gray-500 text-xs">{r.description}</p>
                                </div>
                                <div className="flex gap-1">
                                  {Array.from({ length: r.points + 1 }, (_, i) => (
                                    <button
                                      key={i}
                                      onClick={() => handleScoreChange(ex.id, r.criterion, i)}
                                      className={`w-8 h-8 rounded text-sm font-mono transition-colors ${
                                        practicalScores[ex.id]?.[r.criterion] === i
                                          ? "bg-terminal-cyan text-dark-900"
                                          : "bg-dark-800 text-gray-400 hover:bg-dark-600"
                                      }`}
                                    >
                                      {i}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 border border-terminal-green text-terminal-green font-semibold rounded-lg hover:bg-terminal-green/10 transition-colors"
            >
              Print Report
            </button>
            <Link
              href="/hire/new"
              className="px-6 py-3 bg-terminal-green text-dark-900 font-semibold rounded-lg hover:bg-terminal-green/90 transition-colors text-center"
            >
              Create Another Assessment
            </Link>
          </div>
        </div>
      </div>

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
