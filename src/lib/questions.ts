export interface Question {
  id: string;
  category: "core" | "llm" | "judgment" | "risk" | "tools";
  question: string;
  options: string[];
  correctAnswer: number;
  roleWeight?: {
    technical?: number;
    product?: number;
    leadership?: number;
    general?: number;
  };
}

export interface PracticalExercise {
  id: string;
  type: "write" | "critique" | "evaluate" | "improve";
  title: string;
  scenario: string;
  instructions: string;
  context?: string;
  rubric: {
    criterion: string;
    points: number;
    description: string;
  }[];
  maxScore: number;
}

export const knowledgeQuestions: Question[] = [
  // Core AI/ML Concepts (4 questions)
  {
    id: "core-1",
    category: "core",
    question: "What does 'training' an AI model primarily involve?",
    options: [
      "Writing code that tells the AI exactly what to do",
      "Exposing the model to data so it can learn patterns",
      "Installing the AI software on a computer",
      "Connecting the AI to the internet"
    ],
    correctAnswer: 1,
  },
  {
    id: "core-2",
    category: "core",
    question: "What is the main difference between supervised and unsupervised learning?",
    options: [
      "Supervised learning requires human oversight during use",
      "Unsupervised learning is faster to train",
      "Supervised learning uses labeled data; unsupervised finds patterns without labels",
      "Unsupervised learning is more accurate"
    ],
    correctAnswer: 2,
  },
  {
    id: "core-3",
    category: "core",
    question: "What does 'overfitting' mean in machine learning?",
    options: [
      "The model is too large to run efficiently",
      "The model performs well on training data but poorly on new data",
      "The model requires too much computing power",
      "The model has learned too few patterns"
    ],
    correctAnswer: 1,
  },
  {
    id: "core-4",
    category: "core",
    question: "What is a 'neural network' modeled after?",
    options: [
      "Computer circuits",
      "The human brain's structure",
      "The internet's architecture",
      "Mathematical equations"
    ],
    correctAnswer: 1,
  },

  // LLM Literacy (5 questions)
  {
    id: "llm-1",
    category: "llm",
    question: "What does 'LLM' stand for?",
    options: [
      "Linear Logic Model",
      "Large Language Model",
      "Learning Language Machine",
      "Linguistic Logic Module"
    ],
    correctAnswer: 1,
  },
  {
    id: "llm-2",
    category: "llm",
    question: "What is a 'token' in the context of LLMs?",
    options: [
      "A security credential for API access",
      "A unit of text (roughly a word or word piece) that the model processes",
      "A type of cryptocurrency",
      "A placeholder for missing data"
    ],
    correctAnswer: 1,
  },
  {
    id: "llm-3",
    category: "llm",
    question: "What is 'prompt engineering'?",
    options: [
      "Building AI hardware",
      "Designing effective inputs to get better AI outputs",
      "Programming AI from scratch",
      "Creating AI training datasets"
    ],
    correctAnswer: 1,
  },
  {
    id: "llm-4",
    category: "llm",
    question: "What is 'hallucination' in AI?",
    options: [
      "When AI generates visual artifacts",
      "When AI creates confident but false or fabricated information",
      "When AI becomes self-aware",
      "When AI misunderstands the prompt language"
    ],
    correctAnswer: 1,
  },
  {
    id: "llm-5",
    category: "llm",
    question: "What is a 'context window' in LLMs?",
    options: [
      "The visual interface for the AI",
      "The maximum amount of text the model can consider at once",
      "The time limit for each query",
      "The settings panel for adjusting output"
    ],
    correctAnswer: 1,
  },

  // Practical Judgment (5 questions)
  {
    id: "judgment-1",
    category: "judgment",
    question: "Which task is AI currently LEAST suited for?",
    options: [
      "Summarizing long documents",
      "Making final decisions with legal or ethical implications",
      "Generating first drafts of content",
      "Answering factual questions from a knowledge base"
    ],
    correctAnswer: 1,
  },
  {
    id: "judgment-2",
    category: "judgment",
    question: "When should you NOT rely solely on AI-generated code?",
    options: [
      "For quick prototypes",
      "For security-critical systems handling sensitive data",
      "For learning new programming concepts",
      "For generating boilerplate code"
    ],
    correctAnswer: 1,
  },
  {
    id: "judgment-3",
    category: "judgment",
    question: "What's the best approach when AI gives you an answer you're unsure about?",
    options: [
      "Trust it because AI is more accurate than humans",
      "Reject it completely and do the work manually",
      "Verify the key claims through independent sources",
      "Ask the same question again to get a different answer"
    ],
    correctAnswer: 2,
  },
  {
    id: "judgment-4",
    category: "judgment",
    question: "AI is generally MOST useful for:",
    options: [
      "Tasks requiring creativity with no constraints",
      "Repetitive tasks with clear patterns and criteria",
      "One-time decisions with incomplete information",
      "Tasks requiring real-time physical interaction"
    ],
    correctAnswer: 1,
  },
  {
    id: "judgment-5",
    category: "judgment",
    question: "When integrating AI into a workflow, what should you do first?",
    options: [
      "Replace all manual steps immediately",
      "Start with a small pilot to understand capabilities and limitations",
      "Train all employees comprehensively before any use",
      "Wait until the AI is perfect"
    ],
    correctAnswer: 1,
  },

  // Risk Awareness (4 questions)
  {
    id: "risk-1",
    category: "risk",
    question: "What is a major privacy risk when using third-party AI services?",
    options: [
      "AI might refuse to answer questions",
      "Data sent to the AI may be used for training or stored externally",
      "AI responses are always slower than local processing",
      "AI cannot process private data at all"
    ],
    correctAnswer: 1,
  },
  {
    id: "risk-2",
    category: "risk",
    question: "What is 'AI bias'?",
    options: [
      "When AI prefers certain programming languages",
      "When AI outputs reflect unfair patterns from training data",
      "When AI takes too long to respond",
      "When AI gives inconsistent answers"
    ],
    correctAnswer: 1,
  },
  {
    id: "risk-3",
    category: "risk",
    question: "Which of these is a real concern with AI-generated content?",
    options: [
      "It's always factually accurate",
      "It may infringe on copyrighted material or contain misinformation",
      "It's always clearly distinguishable from human-written content",
      "It cannot be used commercially"
    ],
    correctAnswer: 1,
  },
  {
    id: "risk-4",
    category: "risk",
    question: "What should you do before pasting confidential company data into an AI chat?",
    options: [
      "Nothing special - AI chats are always private",
      "Check if the AI service has appropriate data handling policies",
      "Encrypt the data yourself",
      "Share only with AI services from large companies"
    ],
    correctAnswer: 1,
  },

  // Tools and Ecosystem (2 questions)
  {
    id: "tools-1",
    category: "tools",
    question: "What is an 'API' in the context of AI services?",
    options: [
      "A type of AI model",
      "An interface that allows applications to communicate with AI services programmatically",
      "A visual editor for creating prompts",
      "A database for storing AI responses"
    ],
    correctAnswer: 1,
  },
  {
    id: "tools-2",
    category: "tools",
    question: "What distinguishes 'fine-tuning' from using an AI model out of the box?",
    options: [
      "Fine-tuning makes the model faster",
      "Fine-tuning customizes the model with additional domain-specific training",
      "Fine-tuning removes all previous training",
      "Fine-tuning is required for all AI use"
    ],
    correctAnswer: 1,
  },
];

export const practicalExercises: PracticalExercise[] = [
  {
    id: "practical-write",
    type: "write",
    title: "Prompt Writing",
    scenario: "You need to use AI to help draft a professional email declining a vendor proposal while maintaining the relationship for future opportunities.",
    instructions: "Write a prompt that would generate an appropriate email. Consider what context and constraints the AI needs to produce a good result.",
    rubric: [
      { criterion: "Clear objective", points: 2, description: "States the goal clearly (decline proposal, maintain relationship)" },
      { criterion: "Relevant context", points: 2, description: "Provides necessary background (professional setting, future relationship matters)" },
      { criterion: "Appropriate constraints", points: 2, description: "Specifies tone, length, or format requirements" },
      { criterion: "Actionable", points: 2, description: "AI could produce a usable result from this prompt" },
    ],
    maxScore: 8,
  },
  {
    id: "practical-critique",
    type: "critique",
    title: "Prompt Critique",
    scenario: "A colleague wrote this prompt to help with customer support:\n\n\"Answer customer questions about our product. Be helpful.\"",
    instructions: "Identify at least 3 problems with this prompt and explain why each is an issue.",
    context: "The company sells project management software with multiple pricing tiers and integrations.",
    rubric: [
      { criterion: "Identifies vagueness", points: 2, description: "Notes the prompt lacks specifics about the product" },
      { criterion: "Identifies missing context", points: 2, description: "Points out no product information is provided" },
      { criterion: "Identifies scope issues", points: 2, description: "Notes no boundaries on what questions to answer or how" },
      { criterion: "Suggests improvements", points: 2, description: "Provides actionable suggestions for each problem" },
    ],
    maxScore: 8,
  },
  {
    id: "practical-evaluate",
    type: "evaluate",
    title: "Output Evaluation",
    scenario: "You asked AI to summarize key findings from a quarterly report. Here's what it returned:\n\n\"Revenue increased 23% YoY to $4.2M. Customer acquisition cost decreased by 15%. The company expanded into 3 new markets. Employee satisfaction scores improved. The board approved a new strategic initiative for Q2.\"",
    instructions: "Evaluate this AI output. What would you verify before using it? What might be missing or potentially incorrect?",
    context: "This will be shared with leadership and needs to be accurate.",
    rubric: [
      { criterion: "Questions numbers", points: 2, description: "Identifies that specific figures need verification against source" },
      { criterion: "Notes gaps", points: 2, description: "Points out missing context (what markets? what initiative?)" },
      { criterion: "Considers completeness", points: 2, description: "Questions if this captures all key findings" },
      { criterion: "Appropriate skepticism", points: 2, description: "Shows healthy skepticism without dismissing entirely" },
    ],
    maxScore: 8,
  },
  {
    id: "practical-improve",
    type: "improve",
    title: "Prompt Improvement",
    scenario: "This prompt was used but produced inconsistent, overly long results:\n\n\"Write a product description for our new feature that lets users automate their workflows.\"",
    instructions: "Rewrite this prompt to produce more consistent, appropriately-sized results. Explain your changes.",
    rubric: [
      { criterion: "Adds specificity", points: 2, description: "Includes details about the feature or product context" },
      { criterion: "Constrains length", points: 2, description: "Specifies word count, paragraphs, or format" },
      { criterion: "Defines audience", points: 2, description: "Specifies who the description is for" },
      { criterion: "Explains reasoning", points: 2, description: "Articulates why changes would help" },
    ],
    maxScore: 8,
  },
];

export function getQuestionsForRole(roleType: string): Question[] {
  // Shuffle and return 20 questions, weighted by role type
  const shuffled = [...knowledgeQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 20);
}

export function calculateKnowledgeScore(answers: Record<string, number>): {
  total: number;
  percentage: number;
  byCategory: Record<string, { correct: number; total: number }>;
} {
  const byCategory: Record<string, { correct: number; total: number }> = {
    core: { correct: 0, total: 0 },
    llm: { correct: 0, total: 0 },
    judgment: { correct: 0, total: 0 },
    risk: { correct: 0, total: 0 },
    tools: { correct: 0, total: 0 },
  };

  let total = 0;
  let correct = 0;

  for (const question of knowledgeQuestions) {
    if (answers[question.id] !== undefined) {
      total++;
      byCategory[question.category].total++;
      if (answers[question.id] === question.correctAnswer) {
        correct++;
        byCategory[question.category].correct++;
      }
    }
  }

  return {
    total: correct,
    percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
    byCategory,
  };
}
