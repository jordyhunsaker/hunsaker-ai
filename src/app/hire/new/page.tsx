"use client";

import Link from "next/link";
import { useState } from "react";

type RoleType = "technical" | "product" | "leadership" | "general";

interface FormData {
  candidateName: string;
  candidateEmail: string;
  roleTitle: string;
  roleType: RoleType;
  companyName: string;
  hrEmail: string;
}

interface FormErrors {
  candidateName?: string;
  candidateEmail?: string;
  roleTitle?: string;
  companyName?: string;
  hrEmail?: string;
}

function generateAssessmentId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function CreateAssessment() {
  const [formData, setFormData] = useState<FormData>({
    candidateName: "",
    candidateEmail: "",
    roleTitle: "",
    roleType: "general",
    companyName: "",
    hrEmail: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [assessmentLink, setAssessmentLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const roleDescriptions: Record<RoleType, string> = {
    technical: "Engineers, Data Scientists, Developers - Advanced implementation questions",
    product: "PMs, Designers, Analysts - Focus on application and judgment",
    leadership: "Directors, VPs, Executives - Strategy and risk-focused",
    general: "Any AI-adjacent role - Balanced baseline assessment",
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.candidateName.trim()) {
      newErrors.candidateName = "Candidate name is required";
    }

    if (!formData.candidateEmail.trim()) {
      newErrors.candidateEmail = "Candidate email is required";
    } else if (!validateEmail(formData.candidateEmail)) {
      newErrors.candidateEmail = "Please enter a valid email";
    }

    if (!formData.roleTitle.trim()) {
      newErrors.roleTitle = "Role title is required";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.hrEmail.trim()) {
      newErrors.hrEmail = "Your email is required";
    } else if (!validateEmail(formData.hrEmail)) {
      newErrors.hrEmail = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      candidateName: true,
      candidateEmail: true,
      roleTitle: true,
      companyName: true,
      hrEmail: true,
    });

    if (validateForm()) {
      const assessmentId = generateAssessmentId();

      // Store assessment data in localStorage
      const assessmentData = {
        id: assessmentId,
        ...formData,
        createdAt: new Date().toISOString(),
        status: "pending",
      };

      const existingAssessments = JSON.parse(localStorage.getItem("assessments") || "[]");
      existingAssessments.push(assessmentData);
      localStorage.setItem("assessments", JSON.stringify(existingAssessments));

      const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
      setAssessmentLink(`${baseUrl}/hire/test/${assessmentId}`);
    }
  };

  const copyToClipboard = async () => {
    if (assessmentLink) {
      await navigator.clipboard.writeText(assessmentLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (assessmentLink) {
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

        {/* Success */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-terminal-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-terminal-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Assessment Created</h1>
              <p className="text-gray-400">
                Send this link to <span className="text-terminal-green">{formData.candidateName}</span> to begin their assessment.
              </p>
            </div>

            <div className="gradient-border rounded-lg bg-dark-800 p-6 mb-8">
              <p className="font-mono text-sm text-gray-500 mb-2">ASSESSMENT LINK</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={assessmentLink}
                  className="flex-1 px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-gray-200 font-mono text-sm"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-3 bg-terminal-green text-dark-900 font-semibold rounded-lg hover:bg-terminal-green/90 transition-colors"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            <div className="gradient-border rounded-lg bg-dark-800 p-6 mb-8">
              <p className="font-mono text-sm text-gray-500 mb-4">ASSESSMENT DETAILS</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Candidate</span>
                  <span className="text-gray-200">{formData.candidateName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email</span>
                  <span className="text-gray-200">{formData.candidateEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Role</span>
                  <span className="text-gray-200">{formData.roleTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Assessment Type</span>
                  <span className="text-terminal-green capitalize">{formData.roleType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Results sent to</span>
                  <span className="text-gray-200">{formData.hrEmail}</span>
                </div>
              </div>
            </div>

            <div className="bg-dark-700/50 rounded-lg p-4 mb-8">
              <p className="text-gray-400 text-sm">
                <span className="text-terminal-cyan font-semibold">Next steps:</span> Once the candidate completes the assessment, you can view their results at{" "}
                <span className="font-mono text-terminal-green">/hire/report/{assessmentLink.split("/").pop()}</span>
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Link
                href="/hire/new"
                onClick={() => {
                  setAssessmentLink(null);
                  setFormData({
                    candidateName: "",
                    candidateEmail: "",
                    roleTitle: "",
                    roleType: "general",
                    companyName: "",
                    hrEmail: "",
                  });
                  setTouched({});
                }}
                className="px-6 py-3 border border-terminal-green text-terminal-green font-semibold rounded-lg hover:bg-terminal-green/10 transition-colors"
              >
                Create Another
              </Link>
              <Link
                href="/hire"
                className="px-6 py-3 text-gray-400 hover:text-gray-200 transition-colors"
              >
                Back to Overview
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

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

      {/* Form */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/hire"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-terminal-green transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          <div className="mb-8">
            <p className="font-mono text-terminal-cyan mb-2">// Step 1 of 1</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Create Assessment</h1>
            <p className="text-gray-400">
              Enter the candidate details below. You'll receive a unique link to share with them.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Candidate Info */}
            <div className="gradient-border rounded-lg bg-dark-800 p-6">
              <h2 className="font-mono text-lg font-semibold text-terminal-green mb-4">Candidate Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Candidate Name *</label>
                  <input
                    type="text"
                    value={formData.candidateName}
                    onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                    onBlur={() => handleBlur("candidateName")}
                    className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none transition-colors ${
                      touched.candidateName && errors.candidateName
                        ? "border-red-500 focus:border-red-500"
                        : "border-dark-600 focus:border-terminal-green"
                    }`}
                    placeholder="Jane Smith"
                  />
                  {touched.candidateName && errors.candidateName && (
                    <p className="mt-1 text-sm text-red-500">{errors.candidateName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Candidate Email *</label>
                  <input
                    type="email"
                    value={formData.candidateEmail}
                    onChange={(e) => setFormData({ ...formData, candidateEmail: e.target.value })}
                    onBlur={() => handleBlur("candidateEmail")}
                    className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none transition-colors ${
                      touched.candidateEmail && errors.candidateEmail
                        ? "border-red-500 focus:border-red-500"
                        : "border-dark-600 focus:border-terminal-green"
                    }`}
                    placeholder="jane@company.com"
                  />
                  {touched.candidateEmail && errors.candidateEmail && (
                    <p className="mt-1 text-sm text-red-500">{errors.candidateEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Role Being Hired For *</label>
                  <input
                    type="text"
                    value={formData.roleTitle}
                    onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                    onBlur={() => handleBlur("roleTitle")}
                    className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none transition-colors ${
                      touched.roleTitle && errors.roleTitle
                        ? "border-red-500 focus:border-red-500"
                        : "border-dark-600 focus:border-terminal-green"
                    }`}
                    placeholder="Product Manager"
                  />
                  {touched.roleTitle && errors.roleTitle && (
                    <p className="mt-1 text-sm text-red-500">{errors.roleTitle}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Assessment Type */}
            <div className="gradient-border rounded-lg bg-dark-800 p-6">
              <h2 className="font-mono text-lg font-semibold text-terminal-green mb-4">Assessment Type</h2>

              <div className="space-y-3">
                {(["technical", "product", "leadership", "general"] as RoleType[]).map((type) => (
                  <label
                    key={type}
                    className={`block p-4 rounded-lg border cursor-pointer transition-colors ${
                      formData.roleType === type
                        ? "border-terminal-green bg-terminal-green/10"
                        : "border-dark-600 bg-dark-700 hover:border-dark-500"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="roleType"
                        value={type}
                        checked={formData.roleType === type}
                        onChange={(e) => setFormData({ ...formData, roleType: e.target.value as RoleType })}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-semibold text-gray-200 capitalize">{type}</p>
                        <p className="text-sm text-gray-400">{roleDescriptions[type]}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Your Info */}
            <div className="gradient-border rounded-lg bg-dark-800 p-6">
              <h2 className="font-mono text-lg font-semibold text-terminal-green mb-4">Your Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Company Name *</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    onBlur={() => handleBlur("companyName")}
                    className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none transition-colors ${
                      touched.companyName && errors.companyName
                        ? "border-red-500 focus:border-red-500"
                        : "border-dark-600 focus:border-terminal-green"
                    }`}
                    placeholder="Acme Corp"
                  />
                  {touched.companyName && errors.companyName && (
                    <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Your Email *</label>
                  <input
                    type="email"
                    value={formData.hrEmail}
                    onChange={(e) => setFormData({ ...formData, hrEmail: e.target.value })}
                    onBlur={() => handleBlur("hrEmail")}
                    className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none transition-colors ${
                      touched.hrEmail && errors.hrEmail
                        ? "border-red-500 focus:border-red-500"
                        : "border-dark-600 focus:border-terminal-green"
                    }`}
                    placeholder="hr@acme.com"
                  />
                  {touched.hrEmail && errors.hrEmail && (
                    <p className="mt-1 text-sm text-red-500">{errors.hrEmail}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">Results will be sent to this email</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-terminal-green text-dark-900 font-bold text-lg rounded-lg hover:bg-terminal-green/90 transition-colors"
            >
              Generate Assessment Link
            </button>
          </form>
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
