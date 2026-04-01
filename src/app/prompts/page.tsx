"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { prompts, categories, searchPrompts, Prompt } from "@/lib/prompts";

function CategoryIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    mail: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    edit: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    chart: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    search: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    target: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    users: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    headset: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    compass: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    code: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  };
  return icons[icon] || icons.edit;
}

function PromptCard({ prompt, onSelect }: { prompt: Prompt; onSelect: (p: Prompt) => void }) {
  const category = categories.find((c) => c.id === prompt.category);

  return (
    <button
      onClick={() => onSelect(prompt)}
      className="text-left gradient-border rounded-lg bg-dark-800 p-5 hover:bg-dark-700 transition-colors group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 text-gray-500">
          <CategoryIcon icon={category?.icon || "edit"} />
          <span className="text-xs font-mono uppercase">{category?.name}</span>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-100 mb-2 group-hover:text-terminal-green transition-colors">
        {prompt.title}
      </h3>
      <p className="text-gray-400 text-sm line-clamp-2">{prompt.description}</p>
      <div className="flex flex-wrap gap-1 mt-3">
        {prompt.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="px-2 py-0.5 bg-dark-700 text-terminal-cyan text-xs rounded font-mono">
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}

function PromptModal({ prompt, onClose }: { prompt: Prompt; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const [customizedPrompt, setCustomizedPrompt] = useState(prompt.prompt);
  const category = categories.find((c) => c.id === prompt.category);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(customizedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark-900/90" onClick={onClose} />
      <div className="relative bg-dark-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-dark-700">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <CategoryIcon icon={category?.icon || "edit"} />
                <span className="text-xs font-mono uppercase">{category?.name}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-100">{prompt.title}</h2>
              <p className="text-gray-400 mt-1">{prompt.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-300 transition-colors p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Prompt */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-300">Prompt Template</label>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1.5 bg-terminal-green text-dark-900 text-sm font-semibold rounded hover:bg-terminal-green/90 transition-colors"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <textarea
              value={customizedPrompt}
              onChange={(e) => setCustomizedPrompt(e.target.value)}
              rows={12}
              className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-gray-200 font-mono text-sm focus:border-terminal-green focus:outline-none resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              Edit the placeholders in [BRACKETS] before copying
            </p>
          </div>

          {/* Placeholders */}
          {prompt.placeholders && prompt.placeholders.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Placeholders to Fill</h3>
              <div className="space-y-2">
                {prompt.placeholders.map((p) => (
                  <div key={p.key} className="flex items-start gap-3 text-sm">
                    <code className="px-2 py-0.5 bg-dark-700 text-terminal-cyan rounded font-mono shrink-0">
                      [{p.key}]
                    </code>
                    <span className="text-gray-400">{p.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          {prompt.tips && (
            <div className="bg-dark-700/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-terminal-green mb-2">Tips</h3>
              <p className="text-gray-400 text-sm">{prompt.tips}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PromptLibrary() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  const filteredPrompts = useMemo(() => {
    return searchPrompts(search, selectedCategory);
  }, [search, selectedCategory]);

  const promptCounts = useMemo(() => {
    const counts: Record<string, number> = { all: prompts.length };
    categories.forEach((c) => {
      counts[c.id] = prompts.filter((p) => p.category === c.id).length;
    });
    return counts;
  }, []);

  return (
    <main className="min-h-screen bg-dark-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-mono text-xl font-bold text-terminal-green glow-green">
            hunsaker.ai
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#services" className="text-gray-400 hover:text-terminal-green transition-colors">
              Services
            </Link>
            <Link href="/prompts" className="text-terminal-green">
              Prompt Library
            </Link>
            <Link href="/hire" className="text-gray-400 hover:text-terminal-green transition-colors">
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

      {/* Header */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-terminal-cyan mb-4">// Free Resource</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Prompt Library</h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Battle-tested prompts for common business tasks. Copy, customize, and use.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="pb-8 px-6 sticky top-[73px] z-30 bg-dark-900/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search prompts..."
                className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-gray-200 placeholder-gray-500 focus:border-terminal-green focus:outline-none"
              />
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-terminal-green text-dark-900"
                  : "bg-dark-800 text-gray-400 hover:text-gray-200"
              }`}
            >
              All ({promptCounts.all})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-terminal-green text-dark-900"
                    : "bg-dark-800 text-gray-400 hover:text-gray-200"
                }`}
              >
                {cat.name} ({promptCounts[cat.id]})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Prompts Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {filteredPrompts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">No prompts found matching your search.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                }}
                className="text-terminal-green hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} onSelect={setSelectedPrompt} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-dark-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Custom Prompts?</h2>
          <p className="text-gray-400 mb-8">
            I help teams build prompt libraries tailored to their specific workflows and use cases.
          </p>
          <Link
            href="/book"
            className="inline-block px-8 py-4 bg-terminal-green text-dark-900 font-bold text-lg rounded-lg hover:bg-terminal-green/90 transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-dark-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-mono text-terminal-green">hunsaker.ai</Link>
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Jordy Hunsaker. All rights reserved.</p>
        </div>
      </footer>

      {/* Modal */}
      {selectedPrompt && (
        <PromptModal prompt={selectedPrompt} onClose={() => setSelectedPrompt(null)} />
      )}
    </main>
  );
}
