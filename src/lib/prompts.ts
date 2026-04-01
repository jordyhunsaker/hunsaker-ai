export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  prompt: string;
  tips?: string;
  placeholders?: { key: string; description: string }[];
}

export const categories = [
  { id: "email", name: "Email & Communication", icon: "mail" },
  { id: "content", name: "Content Creation", icon: "edit" },
  { id: "analysis", name: "Data & Analysis", icon: "chart" },
  { id: "research", name: "Research & Summarization", icon: "search" },
  { id: "sales", name: "Sales & Marketing", icon: "target" },
  { id: "hr", name: "HR & People", icon: "users" },
  { id: "support", name: "Customer Support", icon: "headset" },
  { id: "strategy", name: "Strategy & Planning", icon: "compass" },
  { id: "technical", name: "Technical & Development", icon: "code" },
];

export const prompts: Prompt[] = [
  // Email & Communication
  {
    id: "email-decline-politely",
    title: "Decline Request Politely",
    description: "Professionally decline a request while maintaining the relationship",
    category: "email",
    tags: ["email", "professional", "relationship"],
    prompt: `Write a professional email declining [REQUEST TYPE] from [PERSON/COMPANY].

Context:
- My relationship with them: [RELATIONSHIP CONTEXT]
- Reason for declining (internal, don't state directly): [REAL REASON]
- I want to leave the door open for: [FUTURE OPPORTUNITY]

Requirements:
- Warm but clear tone
- Don't over-explain or apologize excessively
- Suggest an alternative if appropriate
- Keep under 150 words`,
    tips: "Be honest about your constraints without oversharing. A vague 'not the right fit at this time' is often better than detailed excuses.",
    placeholders: [
      { key: "REQUEST TYPE", description: "What they asked for (meeting, partnership, proposal)" },
      { key: "PERSON/COMPANY", description: "Who you're responding to" },
      { key: "RELATIONSHIP CONTEXT", description: "How you know them, history" },
      { key: "REAL REASON", description: "Why you're actually declining" },
      { key: "FUTURE OPPORTUNITY", description: "What you might work on later" },
    ],
  },
  {
    id: "email-follow-up",
    title: "Follow-Up Without Being Pushy",
    description: "Send a follow-up email that prompts action without annoying the recipient",
    category: "email",
    tags: ["email", "follow-up", "sales"],
    prompt: `Write a follow-up email for [SITUATION].

Context:
- Original email/meeting was about: [TOPIC]
- It's been [TIME PERIOD] since last contact
- What I need from them: [DESIRED ACTION]
- Our relationship: [RELATIONSHIP]

Requirements:
- Add new value (insight, resource, or update) rather than just "checking in"
- Make the ask clear and easy to respond to
- Keep it under 100 words
- Friendly but professional tone`,
    tips: "Always lead with value, not the ask. Give them a reason to engage beyond guilt.",
  },
  {
    id: "email-bad-news",
    title: "Deliver Bad News",
    description: "Communicate negative news clearly while maintaining trust",
    category: "email",
    tags: ["email", "difficult conversations", "leadership"],
    prompt: `Write an email delivering this bad news: [BAD NEWS]

Recipient: [WHO]
Context: [BACKGROUND]
What we're doing about it: [MITIGATION/NEXT STEPS]

Requirements:
- Lead with the news directly (no burying it)
- Take appropriate responsibility
- Focus on what happens next
- Offer to discuss further
- Professional, empathetic tone
- Keep under 200 words`,
    tips: "Don't soften bad news so much that it gets lost. Clarity is kindness.",
  },

  // Content Creation
  {
    id: "content-blog-outline",
    title: "Blog Post Outline",
    description: "Create a structured outline for a blog post",
    category: "content",
    tags: ["blog", "content", "writing"],
    prompt: `Create a detailed outline for a blog post about [TOPIC].

Target audience: [AUDIENCE]
Goal of the post: [GOAL - educate, persuade, entertain]
Desired length: [WORD COUNT] words
Key points to cover: [KEY POINTS]

Requirements:
- Compelling headline options (give 3)
- Hook/intro approach
- 4-6 main sections with subpoints
- Suggested examples or data to include
- Call to action ideas
- SEO keywords to incorporate: [KEYWORDS]`,
    tips: "The outline should make actually writing the post straightforward. Each section should have a clear purpose.",
  },
  {
    id: "content-linkedin-post",
    title: "LinkedIn Post",
    description: "Create an engaging LinkedIn post that drives engagement",
    category: "content",
    tags: ["social media", "linkedin", "professional"],
    prompt: `Write a LinkedIn post about [TOPIC/INSIGHT].

Context:
- My role/expertise: [YOUR BACKGROUND]
- The insight or lesson: [KEY TAKEAWAY]
- Target audience: [WHO SHOULD CARE]

Requirements:
- Strong hook in first line (this shows in preview)
- Personal angle or story if relevant
- Actionable takeaway
- End with engagement prompt (question or call to comment)
- Use line breaks for readability
- No hashtag spam (max 3, at the end)
- 150-250 words`,
    tips: "Posts that share genuine lessons from experience outperform generic advice. Be specific.",
  },
  {
    id: "content-case-study",
    title: "Case Study Draft",
    description: "Structure a compelling case study",
    category: "content",
    tags: ["case study", "marketing", "storytelling"],
    prompt: `Create a case study draft based on this information:

Client/Project: [CLIENT NAME]
Industry: [INDUSTRY]
Challenge they faced: [PROBLEM]
What we did: [SOLUTION]
Results: [OUTCOMES/METRICS]
Timeline: [DURATION]

Requirements:
- Compelling title that hints at results
- Executive summary (2-3 sentences)
- Challenge section (make it relatable)
- Solution section (focus on approach, not just deliverables)
- Results section (quantify everything possible)
- Client quote placeholder
- Key takeaways (what others can learn)`,
  },

  // Data & Analysis
  {
    id: "analysis-data-insights",
    title: "Extract Insights from Data",
    description: "Analyze data and surface meaningful insights",
    category: "analysis",
    tags: ["data", "analysis", "insights"],
    prompt: `Analyze this data and provide insights:

[PASTE DATA OR DESCRIBE DATASET]

Context:
- This data represents: [WHAT THE DATA SHOWS]
- Time period: [TIMEFRAME]
- I'm trying to understand: [KEY QUESTIONS]

Provide:
1. Top 3-5 insights (most significant findings)
2. Anomalies or unexpected patterns
3. Trends over time (if applicable)
4. Comparisons that matter
5. Recommended actions based on findings
6. What additional data would strengthen the analysis`,
    tips: "Be specific about what decisions this analysis should inform. That focuses the insights on what matters.",
  },
  {
    id: "analysis-explain-technical",
    title: "Explain Technical Concept Simply",
    description: "Translate complex technical topics for non-technical audiences",
    category: "analysis",
    tags: ["communication", "technical", "simplification"],
    prompt: `Explain [TECHNICAL CONCEPT] for [AUDIENCE].

Their background: [WHAT THEY KNOW]
Why they need to understand this: [CONTEXT/DECISION]
Level of detail needed: [HIGH LEVEL / MODERATE / DETAILED]

Requirements:
- Start with why it matters to them
- Use analogies from their domain
- Avoid jargon (or define it immediately when unavoidable)
- Include a concrete example
- End with the key takeaway or implication`,
    tips: "Start with 'what it means for you' not 'what it is'. Relevance before explanation.",
  },
  {
    id: "analysis-compare-options",
    title: "Compare Options Objectively",
    description: "Create a structured comparison of multiple options",
    category: "analysis",
    tags: ["decision making", "comparison", "analysis"],
    prompt: `Help me compare these options: [LIST OPTIONS]

Decision context: [WHAT I'M DECIDING]
Key criteria (in priority order):
1. [CRITERION 1]
2. [CRITERION 2]
3. [CRITERION 3]

Constraints: [BUDGET/TIME/RESOURCES]
Risk tolerance: [LOW/MEDIUM/HIGH]

Provide:
- Comparison matrix rating each option on each criterion
- Pros and cons for each option
- Hidden considerations I might be missing
- Recommendation with reasoning
- What would change the recommendation`,
  },

  // Research & Summarization
  {
    id: "research-summarize-doc",
    title: "Summarize Document",
    description: "Create a clear summary of a long document",
    category: "research",
    tags: ["summary", "research", "reading"],
    prompt: `Summarize this document:

[PASTE DOCUMENT OR KEY SECTIONS]

I need to understand:
- Main argument or purpose
- Key findings or recommendations
- Supporting evidence
- Implications for [MY CONTEXT]

Output format:
- One-paragraph executive summary
- Bullet points of key takeaways (5-7)
- Notable quotes or data points
- Questions this raises
- What's missing or unclear`,
    tips: "If the document is very long, paste the introduction, conclusion, and any sections most relevant to your needs.",
  },
  {
    id: "research-meeting-prep",
    title: "Meeting Preparation Brief",
    description: "Prepare for an important meeting with key context",
    category: "research",
    tags: ["meetings", "preparation", "research"],
    prompt: `Help me prepare for a meeting with [PERSON/COMPANY].

Meeting purpose: [GOAL]
Their background: [WHAT I KNOW ABOUT THEM]
My goals: [WHAT I WANT TO ACHIEVE]
Potential concerns: [WHAT MIGHT COME UP]

Prepare:
1. Key talking points for me
2. Questions I should ask
3. Questions they might ask (with suggested responses)
4. Potential objections and how to address them
5. Desired outcome and how to steer toward it
6. Follow-up actions to propose`,
  },
  {
    id: "research-competitive-analysis",
    title: "Quick Competitive Analysis",
    description: "Structure a competitive analysis framework",
    category: "research",
    tags: ["competitive analysis", "strategy", "research"],
    prompt: `Help me analyze competitor [COMPETITOR NAME] in the [INDUSTRY] space.

My company/product: [YOUR OFFERING]
What I know about them: [EXISTING KNOWLEDGE]

Analyze (based on your knowledge, note any gaps):
1. Their positioning and target market
2. Key strengths and differentiators
3. Apparent weaknesses or gaps
4. Pricing strategy (if known)
5. How they compare to us on [KEY DIMENSIONS]
6. What we can learn from them
7. How to position against them`,
    tips: "AI knowledge may be dated. Use this as a framework, then verify with current sources.",
  },

  // Sales & Marketing
  {
    id: "sales-cold-outreach",
    title: "Cold Outreach Email",
    description: "Write a cold email that gets responses",
    category: "sales",
    tags: ["sales", "email", "outreach"],
    prompt: `Write a cold outreach email to [TARGET PERSONA] at [COMPANY TYPE].

What I offer: [PRODUCT/SERVICE]
The problem I solve: [PAIN POINT]
Why reach out now: [TRIGGER/RELEVANCE]
Desired response: [WHAT I WANT THEM TO DO]

Requirements:
- Subject line that earns the open (not clickbait)
- First line that shows I did research (personalization hook)
- Clear value proposition in one sentence
- Specific, low-friction CTA
- Under 100 words total
- No buzzwords or hype`,
    tips: "The best cold emails feel like they were written for one person. Generic templates get deleted.",
  },
  {
    id: "sales-objection-response",
    title: "Handle Sales Objection",
    description: "Craft a response to a common sales objection",
    category: "sales",
    tags: ["sales", "objections", "negotiation"],
    prompt: `Help me respond to this objection: "[OBJECTION]"

Context:
- Product/service: [WHAT I'M SELLING]
- Prospect: [WHO THEY ARE]
- Stage in process: [WHERE WE ARE IN SALES CYCLE]
- What's true about their concern: [VALID ASPECTS]

Provide:
1. Acknowledge the concern genuinely
2. Reframe or provide context
3. Offer proof point or example
4. Bridge to next step
5. Alternative approaches if this doesn't land`,
    tips: "Never dismiss objections. There's usually truth in them that you need to address honestly.",
  },
  {
    id: "sales-value-prop",
    title: "Sharpen Value Proposition",
    description: "Refine your value proposition for a specific audience",
    category: "sales",
    tags: ["positioning", "messaging", "marketing"],
    prompt: `Help me sharpen my value proposition.

What I offer: [PRODUCT/SERVICE]
Target audience: [WHO IT'S FOR]
Problem I solve: [PAIN POINT]
How I solve it: [APPROACH]
Key differentiator: [WHAT'S UNIQUE]
Current messaging: [WHAT I SAY NOW]

Create:
1. One-sentence value prop (under 15 words)
2. Elevator pitch (30 seconds)
3. Three supporting proof points
4. What to emphasize for different buyer personas
5. What NOT to lead with (common mistakes)`,
  },

  // HR & People
  {
    id: "hr-job-description",
    title: "Job Description",
    description: "Write a clear, compelling job description",
    category: "hr",
    tags: ["hiring", "job posting", "recruiting"],
    prompt: `Write a job description for [JOB TITLE].

Company context: [ABOUT THE COMPANY]
Team: [TEAM STRUCTURE]
Level: [SENIORITY]
Key responsibilities: [MAIN DUTIES]
Must-have requirements: [NON-NEGOTIABLES]
Nice-to-have: [BONUS SKILLS]
Compensation range: [SALARY/BENEFITS]

Requirements:
- Lead with what makes this role compelling
- Be specific about day-to-day work
- Distinguish must-haves from nice-to-haves clearly
- Avoid unnecessary requirements that limit diversity
- Include growth opportunity
- Clear, jargon-free language`,
    tips: "Every requirement you add shrinks your candidate pool. Only include what's truly necessary.",
  },
  {
    id: "hr-feedback",
    title: "Constructive Feedback",
    description: "Deliver feedback that's clear and actionable",
    category: "hr",
    tags: ["feedback", "management", "performance"],
    prompt: `Help me give feedback about [SITUATION/BEHAVIOR].

Who: [PERSON AND ROLE]
What happened: [SPECIFIC SITUATION]
Impact: [WHY IT MATTERS]
What I want to change: [DESIRED BEHAVIOR]
Our relationship: [CONTEXT]

Requirements:
- Specific and behavioral (not personal)
- Clear about impact
- Forward-looking (focus on future, not just past)
- Actionable next steps
- Preserves dignity and relationship
- Conversation opener, not a script`,
    tips: "Good feedback is about behavior and impact, not character. 'You did X, which caused Y' not 'You are Z'.",
  },
  {
    id: "hr-interview-questions",
    title: "Interview Questions",
    description: "Generate relevant interview questions for a role",
    category: "hr",
    tags: ["hiring", "interviews", "recruiting"],
    prompt: `Generate interview questions for [JOB TITLE].

Key competencies to assess:
1. [COMPETENCY 1]
2. [COMPETENCY 2]
3. [COMPETENCY 3]

Role-specific skills: [TECHNICAL/DOMAIN SKILLS]
Team culture: [WHAT MATTERS FOR FIT]
Red flags to probe for: [CONCERNS]

Provide:
- 3-4 behavioral questions per competency (with what good answers look like)
- 2-3 situational/hypothetical questions
- Questions to assess culture fit
- Questions to let candidate assess us
- Red flag indicators in responses`,
  },

  // Customer Support
  {
    id: "support-complaint-response",
    title: "Respond to Complaint",
    description: "Handle a customer complaint professionally",
    category: "support",
    tags: ["customer service", "complaints", "de-escalation"],
    prompt: `Help me respond to this customer complaint:

"[CUSTOMER MESSAGE]"

Context:
- Product/service involved: [WHAT THEY BOUGHT]
- What actually happened: [THE FACTS]
- What we can do: [AVAILABLE REMEDIES]
- Policy constraints: [LIMITATIONS]

Requirements:
- Acknowledge their frustration genuinely
- Don't be defensive
- Explain what happened (briefly, no excuses)
- Offer specific resolution
- Prevent future occurrence
- Professional but human tone`,
    tips: "An upset customer wants to be heard first, helped second. Acknowledge before solving.",
  },
  {
    id: "support-feature-request-decline",
    title: "Decline Feature Request",
    description: "Say no to a feature request while keeping the customer engaged",
    category: "support",
    tags: ["product", "customer service", "communication"],
    prompt: `Help me respond to this feature request we won't build:

Request: "[FEATURE REQUEST]"
Customer: [CUSTOMER CONTEXT]
Why we won't build it: [INTERNAL REASON - don't share directly]
Alternative solutions: [WORKAROUNDS OR EXISTING FEATURES]

Requirements:
- Thank them for the feedback
- Explain our reasoning (user-focused, not company-focused)
- Offer alternatives if they exist
- Don't promise future consideration unless true
- Keep the door open for their input
- Under 150 words`,
  },

  // Strategy & Planning
  {
    id: "strategy-project-brief",
    title: "Project Brief",
    description: "Create a clear project brief for stakeholder alignment",
    category: "strategy",
    tags: ["project management", "planning", "communication"],
    prompt: `Create a project brief for [PROJECT NAME].

Background: [WHY THIS PROJECT EXISTS]
Objectives: [WHAT SUCCESS LOOKS LIKE]
Scope: [WHAT'S INCLUDED AND EXCLUDED]
Stakeholders: [WHO'S INVOLVED]
Timeline: [KEY DATES]
Budget/resources: [CONSTRAINTS]
Risks: [WHAT COULD GO WRONG]

Include:
- Executive summary (3 sentences)
- Problem statement
- Proposed solution
- Success metrics
- Key milestones
- Roles and responsibilities
- Open questions to resolve`,
  },
  {
    id: "strategy-decision-doc",
    title: "Decision Document",
    description: "Structure a decision for stakeholder buy-in",
    category: "strategy",
    tags: ["decision making", "leadership", "communication"],
    prompt: `Help me document this decision for stakeholder alignment:

Decision needed: [WHAT WE'RE DECIDING]
Context: [BACKGROUND AND WHY NOW]
Options considered: [ALTERNATIVES]
Recommendation: [WHAT I THINK WE SHOULD DO]
Key tradeoffs: [WHAT WE'RE GIVING UP]
Stakeholders affected: [WHO CARES]

Create a decision document with:
- Decision statement (one sentence)
- Context and constraints
- Options evaluated (with pros/cons)
- Recommendation with rationale
- Implementation implications
- Reversibility assessment
- Sign-off needed from whom`,
  },
  {
    id: "strategy-okrs",
    title: "Draft OKRs",
    description: "Create well-structured OKRs for a team or initiative",
    category: "strategy",
    tags: ["goals", "okrs", "planning"],
    prompt: `Help me create OKRs for [TEAM/INITIATIVE].

Time period: [QUARTER/YEAR]
Context: [WHAT WE'RE TRYING TO ACHIEVE]
Company priorities: [HOW THIS CONNECTS TO COMPANY GOALS]
Current state: [WHERE WE ARE NOW]
Constraints: [LIMITATIONS]

Create 2-3 Objectives with 3-4 Key Results each:
- Objectives should be qualitative and inspiring
- Key Results should be quantitative and measurable
- Include a mix of output and outcome metrics
- Stretch but achievable (70% confidence)
- Flag any that need baseline data`,
    tips: "Key Results should answer 'how would we know if we achieved the objective?' not 'what will we do?'",
  },

  // Technical & Development
  {
    id: "technical-code-review",
    title: "Code Review Feedback",
    description: "Provide constructive code review feedback",
    category: "technical",
    tags: ["code review", "development", "feedback"],
    prompt: `Review this code and provide feedback:

\`\`\`[LANGUAGE]
[PASTE CODE]
\`\`\`

Context: [WHAT THIS CODE DOES]
My concerns: [SPECIFIC AREAS TO FOCUS ON]

Provide feedback on:
1. Correctness (bugs or logic errors)
2. Readability and maintainability
3. Performance considerations
4. Security concerns
5. Edge cases not handled
6. Testing recommendations
7. Suggested improvements (with examples)

Be specific and constructive. Explain why, not just what.`,
  },
  {
    id: "technical-architecture-review",
    title: "Architecture Review",
    description: "Evaluate a technical architecture decision",
    category: "technical",
    tags: ["architecture", "technical design", "review"],
    prompt: `Review this architecture approach:

System/feature: [WHAT WE'RE BUILDING]
Proposed approach: [TECHNICAL APPROACH]
Alternatives considered: [OTHER OPTIONS]
Constraints: [LIMITATIONS - time, team, budget]
Scale requirements: [EXPECTED LOAD/GROWTH]

Evaluate:
1. Does this approach fit the requirements?
2. Scalability concerns
3. Operational complexity
4. Security implications
5. Hidden costs or risks
6. What we'd need to change if requirements evolve
7. Recommendation and key considerations`,
  },
  {
    id: "technical-bug-report",
    title: "Bug Report",
    description: "Write a clear, actionable bug report",
    category: "technical",
    tags: ["bugs", "qa", "development"],
    prompt: `Help me write a clear bug report:

What happened: [DESCRIPTION]
Expected behavior: [WHAT SHOULD HAPPEN]
Steps to reproduce: [HOW TO RECREATE]
Environment: [BROWSER, OS, VERSION, ETC]
Frequency: [ALWAYS/SOMETIMES/ONCE]
Impact: [WHO'S AFFECTED, HOW BADLY]
Screenshots/logs: [REFERENCE ANY ATTACHMENTS]

Format as:
- Title (specific and searchable)
- Summary (one sentence)
- Steps to reproduce (numbered)
- Expected vs actual behavior
- Environment details
- Severity assessment
- Any workarounds found`,
  },
];

export function searchPrompts(query: string, category?: string): Prompt[] {
  let filtered = prompts;

  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (query.trim()) {
    const searchTerms = query.toLowerCase().split(" ");
    filtered = filtered.filter((p) => {
      const searchText = `${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase();
      return searchTerms.every((term) => searchText.includes(term));
    });
  }

  return filtered;
}
