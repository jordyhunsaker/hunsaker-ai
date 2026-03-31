"use client";

import { useState, useMemo } from "react";

type CalculatorInputs = {
  teamSize: number;
  hoursPerWeek: number;
  hourlyRate: number;
  automationPercent: number;
};

export default function Calculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    teamSize: 5,
    hoursPerWeek: 10,
    hourlyRate: 75,
    automationPercent: 50,
  });

  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");

  const calculations = useMemo(() => {
    const weeklyHoursTotal = inputs.teamSize * inputs.hoursPerWeek;
    const hoursSaved = weeklyHoursTotal * (inputs.automationPercent / 100);
    const weeklySavings = hoursSaved * inputs.hourlyRate;
    const monthlySavings = weeklySavings * 4.33;
    const annualSavings = weeklySavings * 52;

    // Assuming average implementation cost and timeline
    const estimatedCost = 15000 + inputs.teamSize * 2000;
    const paybackMonths = estimatedCost / monthlySavings;
    const yearOneROI = ((annualSavings - estimatedCost) / estimatedCost) * 100;

    return {
      weeklyHoursTotal,
      hoursSaved,
      weeklySavings,
      monthlySavings,
      annualSavings,
      estimatedCost,
      paybackMonths,
      yearOneROI,
    };
  }, [inputs]);

  const handleCalculate = () => {
    setShowResults(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

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
            <a href="/case-studies" className="text-gray-400 hover:text-terminal-green transition-colors">
              Case Studies
            </a>
            <a href="/assessment" className="text-gray-400 hover:text-terminal-green transition-colors">
              Assessment
            </a>
            <a href="/calculator" className="text-terminal-green">
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
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-terminal-cyan mb-4">// Calculate Your Potential</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI <span className="text-terminal-green glow-green">ROI</span> Calculator
          </h1>
          <p className="text-xl text-gray-400">
            See how much time and money AI automation could save your team.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="gradient-border rounded-lg bg-dark-800 p-6">
              <h2 className="font-mono text-xl font-semibold text-terminal-cyan mb-6">
                // Your Inputs
              </h2>

              <div className="space-y-6">
                {/* Team Size */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-gray-300">Team size</label>
                    <span className="font-mono text-terminal-green">{inputs.teamSize} people</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={inputs.teamSize}
                    onChange={(e) => setInputs({ ...inputs, teamSize: parseInt(e.target.value) })}
                    className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-terminal-green"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>50</span>
                  </div>
                </div>

                {/* Hours per week */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-gray-300">Hours spent on repetitive tasks (per person/week)</label>
                    <span className="font-mono text-terminal-green">{inputs.hoursPerWeek} hrs</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    value={inputs.hoursPerWeek}
                    onChange={(e) => setInputs({ ...inputs, hoursPerWeek: parseInt(e.target.value) })}
                    className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-terminal-green"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>40</span>
                  </div>
                </div>

                {/* Hourly rate */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-gray-300">Average hourly rate (fully loaded)</label>
                    <span className="font-mono text-terminal-green">${inputs.hourlyRate}/hr</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="250"
                    step="5"
                    value={inputs.hourlyRate}
                    onChange={(e) => setInputs({ ...inputs, hourlyRate: parseInt(e.target.value) })}
                    className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-terminal-green"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$25</span>
                    <span>$250</span>
                  </div>
                </div>

                {/* Automation percent */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-gray-300">Expected automation rate</label>
                    <span className="font-mono text-terminal-green">{inputs.automationPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={inputs.automationPercent}
                    onChange={(e) => setInputs({ ...inputs, automationPercent: parseInt(e.target.value) })}
                    className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-terminal-green"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10%</span>
                    <span>90%</span>
                  </div>
                </div>
              </div>

              {!showResults && (
                <button
                  onClick={handleCalculate}
                  className="w-full mt-8 py-4 bg-terminal-green text-dark-900 font-bold rounded-lg hover:bg-terminal-green/90 transition-colors"
                >
                  Calculate ROI
                </button>
              )}
            </div>

            {/* Results */}
            <div className="gradient-border rounded-lg bg-dark-800 p-6">
              <h2 className="font-mono text-xl font-semibold text-terminal-cyan mb-6">
                // Your Results
              </h2>

              {!showResults ? (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <p>Adjust the sliders and click Calculate to see your potential ROI</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Time Savings */}
                  <div className="bg-dark-700 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Hours saved per week</p>
                    <p className="font-mono text-3xl font-bold text-terminal-green">
                      {calculations.hoursSaved.toFixed(1)} hours
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Out of {calculations.weeklyHoursTotal} total hours on repetitive tasks
                    </p>
                  </div>

                  {/* Cost Savings */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-dark-700 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">Monthly savings</p>
                      <p className="font-mono text-2xl font-bold text-terminal-cyan">
                        {formatCurrency(calculations.monthlySavings)}
                      </p>
                    </div>
                    <div className="bg-dark-700 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">Annual savings</p>
                      <p className="font-mono text-2xl font-bold text-terminal-cyan">
                        {formatCurrency(calculations.annualSavings)}
                      </p>
                    </div>
                  </div>

                  {/* ROI Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-dark-700 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">Est. implementation cost</p>
                      <p className="font-mono text-xl font-bold text-gray-200">
                        {formatCurrency(calculations.estimatedCost)}
                      </p>
                    </div>
                    <div className="bg-dark-700 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">Payback period</p>
                      <p className="font-mono text-xl font-bold text-gray-200">
                        {calculations.paybackMonths.toFixed(1)} months
                      </p>
                    </div>
                  </div>

                  {/* Year One ROI */}
                  <div className="bg-terminal-green/10 border border-terminal-green rounded-lg p-4">
                    <p className="text-terminal-green text-sm mb-1">Year One ROI</p>
                    <p className="font-mono text-4xl font-bold text-terminal-green">
                      {calculations.yearOneROI > 0 ? "+" : ""}
                      {calculations.yearOneROI.toFixed(0)}%
                    </p>
                  </div>

                  <p className="text-gray-500 text-xs">
                    *Estimates based on typical AI automation projects. Actual results vary based on
                    complexity, data quality, and implementation scope.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CTA after results */}
          {showResults && (
            <div className="mt-12 gradient-border rounded-lg bg-dark-800 p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Ready to realize these savings?
              </h3>
              <p className="text-gray-400 mb-6">
                Book a strategy call to discuss how AI can transform your specific workflows.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/book"
                  className="px-8 py-4 bg-terminal-green text-dark-900 font-bold rounded-lg hover:bg-terminal-green/90 transition-colors"
                >
                  Book Strategy Call
                </a>
                <a
                  href="/assessment"
                  className="px-8 py-4 border border-terminal-green text-terminal-green font-bold rounded-lg hover:bg-terminal-green/10 transition-colors"
                >
                  Take AI Assessment
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-dark-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How This Calculator Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-terminal-green/20 flex items-center justify-center mx-auto mb-4">
                <span className="font-mono text-terminal-green font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-200 mb-2">Time Investment</h3>
              <p className="text-gray-400 text-sm">
                We calculate total hours spent on repetitive tasks across your team.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-terminal-green/20 flex items-center justify-center mx-auto mb-4">
                <span className="font-mono text-terminal-green font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-200 mb-2">Automation Potential</h3>
              <p className="text-gray-400 text-sm">
                Based on typical AI automation rates, we estimate time savings.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-terminal-green/20 flex items-center justify-center mx-auto mb-4">
                <span className="font-mono text-terminal-green font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-200 mb-2">ROI Projection</h3>
              <p className="text-gray-400 text-sm">
                We factor in implementation costs to show your expected return.
              </p>
            </div>
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
