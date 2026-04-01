"use client";

import Link from "next/link";
import { useState, useEffect, use } from "react";
import { knowledgeQuestions, practicalExercises, Question, PracticalExercise } from "@/lib/questions";

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

type TestPhase = "intro" | "knowledge" | "practical" | "complete";

export default function TakeTest({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [assessment, setAssessment] = useState<AssessmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<TestPhase>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Record<string, number>>({});
  const [practicalAnswers, setPracticalAnswers] = useState<Record<string, string>>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    // Load assessment from localStorage
    const assessments = JSON.parse(localStorage.getItem("assessments") || "[]");
    const found = assessments.find((a: AssessmentData) => a.id === id);

    if (found) {
      setAssessment(found);
      // Shuffle questions for this test
      const shuffled = [...knowledgeQuestions].sort(() => Math.random() - 0.5).slice(0, 20);
      setQuestions(shuffled);
    }
    setLoading(false);
  }, [id]);

  const handleStartTest = () => {
    setPhase("knowledge");
    setStartTime(new Date());
  };

  const handleKnowledgeAnswer = (questionId: string, answerIndex: number) => {
    setKnowledgeAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setPhase("practical");
      setCurrentExercise(0);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handlePracticalAnswer = (exerciseId: string, answer: string) => {
    setPracticalAnswers((prev) => ({ ...prev, [exerciseId]: answer }));
  };

  const handleNextExercise = () => {
    if (currentExercise < practicalExercises.length - 1) {
      setCurrentExercise((prev) => prev + 1);
    } else {
      handleSubmitTest();
    }
  };

  const handlePrevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise((prev) => prev - 1);
    } else {
      setPhase("knowledge");
      setCurrentQuestion(questions.length - 1);
    }
  };

  const handleSubmitTest = () => {
    // Calculate scores
    let knowledgeCorrect = 0;
    const categoryScores: Record<string, { correct: number; total: number }> = {
      core: { correct: 0, total: 0 },
      llm: { correct: 0, total: 0 },
      judgment: { correct: 0, total: 0 },
      risk: { correct: 0, total: 0 },
      tools: { correct: 0, total: 0 },
    };

    questions.forEach((q) => {
      categoryScores[q.category].total++;
      if (knowledgeAnswers[q.id] === q.correctAnswer) {
        knowledgeCorrect++;
        categoryScores[q.category].correct++;
      }
    });

    const endTime = new Date();
    const durationMinutes = startTime
      ? Math.round((endTime.getTime() - startTime.getTime()) / 1000 / 60)
      : 0;

    // Save results
    const results = {
      assessmentId: id,
      completedAt: endTime.toISOString(),
      durationMinutes,
      knowledge: {
        correct: knowledgeCorrect,
        total: questions.length,
        percentage: Math.round((knowledgeCorrect / questions.length) * 100),
        byCategory: categoryScores,
        answers: knowledgeAnswers,
        questions: questions.map((q) => ({
          id: q.id,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          givenAnswer: knowledgeAnswers[q.id],
        })),
      },
      practical: {
        exercises: practicalExercises.map((ex) => ({
          id: ex.id,
          type: ex.type,
          title: ex.title,
          scenario: ex.scenario,
          instructions: ex.instructions,
          response: practicalAnswers[ex.id] || "",
          rubric: ex.rubric,
          maxScore: ex.maxScore,
        })),
      },
    };

    // Update assessment status
    const assessments = JSON.parse(localStorage.getItem("assessments") || "[]");
    const updatedAssessments = assessments.map((a: AssessmentData) =>
      a.id === id ? { ...a, status: "completed" } : a
    );
    localStorage.setItem("assessments", JSON.stringify(updatedAssessments));
    localStorage.setItem(`results-${id}`, JSON.stringify(results));

    setPhase("complete");
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
          <p className="text-gray-400 mb-6">This assessment link may be invalid or expired.</p>
          <Link href="/" className="text-terminal-green hover:underline">
            Return home
          </Link>
        </div>
      </main>
    );
  }

  // Intro Phase
  if (phase === "intro") {
    return (
      <main className="min-h-screen bg-dark-900">
        <div className="max-w-2xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="font-mono text-terminal-cyan mb-4">// AI Fluency Assessment</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome, {assessment.candidateName}</h1>
            <p className="text-gray-400">
              {assessment.companyName} has invited you to complete this AI literacy assessment for the{" "}
              <span className="text-terminal-green">{assessment.roleTitle}</span> position.
            </p>
          </div>

          <div className="gradient-border rounded-lg bg-dark-800 p-6 mb-8">
            <h2 className="font-mono text-lg font-semibold text-terminal-green mb-4">What to Expect</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-dark-700 rounded-lg flex items-center justify-center font-mono text-terminal-green shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-200">Knowledge Assessment</h3>
                  <p className="text-gray-400 text-sm">20 multiple choice questions covering AI concepts, LLMs, and practical judgment. About 15 minutes.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-dark-700 rounded-lg flex items-center justify-center font-mono text-terminal-cyan shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-200">Practical Exercises</h3>
                  <p className="text-gray-400 text-sm">4 hands-on exercises testing your ability to work with AI effectively. About 10-15 minutes.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-dark-700/50 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-gray-300 mb-2">Before you begin:</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-terminal-green">&#10003;</span>
                Set aside about 25 minutes of uninterrupted time
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terminal-green">&#10003;</span>
                You cannot pause and resume - complete in one session
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terminal-green">&#10003;</span>
                Answer honestly - this helps match you with the right role
              </li>
            </ul>
          </div>

          <button
            onClick={handleStartTest}
            className="w-full px-8 py-4 bg-terminal-green text-dark-900 font-bold text-lg rounded-lg hover:bg-terminal-green/90 transition-colors"
          >
            Start Assessment
          </button>
        </div>
      </main>
    );
  }

  // Knowledge Phase
  if (phase === "knowledge") {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <main className="min-h-screen bg-dark-900">
        {/* Progress bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-dark-700">
          <div
            className="h-full bg-terminal-green transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="max-w-2xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="font-mono text-terminal-green text-sm">Part 1: Knowledge</p>
              <p className="text-gray-400 text-sm">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-xs font-mono uppercase">{question.category}</p>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-100 mb-6">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className={`block p-4 rounded-lg border cursor-pointer transition-colors ${
                    knowledgeAnswers[question.id] === index
                      ? "border-terminal-green bg-terminal-green/10"
                      : "border-dark-600 bg-dark-800 hover:border-dark-500"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        knowledgeAnswers[question.id] === index
                          ? "border-terminal-green"
                          : "border-dark-500"
                      }`}
                    >
                      {knowledgeAnswers[question.id] === index && (
                        <div className="w-3 h-3 rounded-full bg-terminal-green" />
                      )}
                    </div>
                    <span className="text-gray-200">{option}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-3 border border-dark-600 text-gray-400 rounded-lg hover:border-dark-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={knowledgeAnswers[question.id] === undefined}
              className="px-6 py-3 bg-terminal-green text-dark-900 font-semibold rounded-lg hover:bg-terminal-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === questions.length - 1 ? "Continue to Part 2" : "Next"}
            </button>
          </div>

          {/* Question navigator */}
          <div className="mt-12 pt-8 border-t border-dark-700">
            <p className="text-gray-500 text-sm mb-3">Jump to question:</p>
            <div className="flex flex-wrap gap-2">
              {questions.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestion(i)}
                  className={`w-8 h-8 rounded text-sm font-mono transition-colors ${
                    i === currentQuestion
                      ? "bg-terminal-green text-dark-900"
                      : knowledgeAnswers[q.id] !== undefined
                      ? "bg-dark-600 text-gray-300"
                      : "bg-dark-800 text-gray-500 hover:bg-dark-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Practical Phase
  if (phase === "practical") {
    const exercise = practicalExercises[currentExercise];
    const progress = ((currentExercise + 1) / practicalExercises.length) * 100;

    return (
      <main className="min-h-screen bg-dark-900">
        {/* Progress bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-dark-700">
          <div
            className="h-full bg-terminal-cyan transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="max-w-2xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="font-mono text-terminal-cyan text-sm">Part 2: Practical</p>
              <p className="text-gray-400 text-sm">
                Exercise {currentExercise + 1} of {practicalExercises.length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-xs font-mono uppercase">{exercise.type}</p>
            </div>
          </div>

          {/* Exercise */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-100 mb-4">
              {exercise.title}
            </h2>

            <div className="gradient-border rounded-lg bg-dark-800 p-4 mb-6">
              <p className="text-gray-500 text-xs font-mono uppercase mb-2">Scenario</p>
              <p className="text-gray-300 whitespace-pre-line">{exercise.scenario}</p>
              {exercise.context && (
                <p className="text-gray-400 text-sm mt-3 pt-3 border-t border-dark-600">
                  <span className="text-terminal-cyan">Context:</span> {exercise.context}
                </p>
              )}
            </div>

            <div className="mb-4">
              <p className="text-gray-400 mb-3">{exercise.instructions}</p>
              <textarea
                value={practicalAnswers[exercise.id] || ""}
                onChange={(e) => handlePracticalAnswer(exercise.id, e.target.value)}
                rows={8}
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-gray-200 placeholder-gray-500 focus:border-terminal-cyan focus:outline-none resize-none"
                placeholder="Type your response here..."
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevExercise}
              className="px-6 py-3 border border-dark-600 text-gray-400 rounded-lg hover:border-dark-500 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={handleNextExercise}
              disabled={!practicalAnswers[exercise.id]?.trim()}
              className="px-6 py-3 bg-terminal-cyan text-dark-900 font-semibold rounded-lg hover:bg-terminal-cyan/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentExercise === practicalExercises.length - 1 ? "Submit Assessment" : "Next Exercise"}
            </button>
          </div>

          {/* Exercise navigator */}
          <div className="mt-12 pt-8 border-t border-dark-700">
            <p className="text-gray-500 text-sm mb-3">Exercises:</p>
            <div className="flex gap-2">
              {practicalExercises.map((ex, i) => (
                <button
                  key={ex.id}
                  onClick={() => setCurrentExercise(i)}
                  className={`px-3 py-2 rounded text-sm transition-colors ${
                    i === currentExercise
                      ? "bg-terminal-cyan text-dark-900"
                      : practicalAnswers[ex.id]
                      ? "bg-dark-600 text-gray-300"
                      : "bg-dark-800 text-gray-500 hover:bg-dark-700"
                  }`}
                >
                  {ex.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Complete Phase
  return (
    <main className="min-h-screen bg-dark-900 flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <div className="w-20 h-20 bg-terminal-green/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-terminal-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Assessment Complete</h1>
        <p className="text-gray-400 mb-8">
          Thank you, {assessment.candidateName}. Your responses have been recorded and {assessment.companyName} will review your results.
        </p>
        <div className="gradient-border rounded-lg bg-dark-800 p-6 mb-8 text-left">
          <p className="text-gray-500 text-sm font-mono mb-3">SUMMARY</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Role</span>
              <span className="text-gray-200">{assessment.roleTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Company</span>
              <span className="text-gray-200">{assessment.companyName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Questions Answered</span>
              <span className="text-gray-200">{Object.keys(knowledgeAnswers).length} / 20</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Exercises Completed</span>
              <span className="text-gray-200">{Object.keys(practicalAnswers).length} / 4</span>
            </div>
          </div>
        </div>
        <p className="text-gray-500 text-sm">You can close this window now.</p>
      </div>
    </main>
  );
}
