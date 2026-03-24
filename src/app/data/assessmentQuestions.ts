export interface Question {
  id: number;
  text: string;
  dimension: string;
  reverse: boolean;
}

export interface TestSection {
  name: string;
  description: string;
  dimensions: string[];
  questions: Question[];
}

export const bigFiveTest: TestSection = {
  name: 'Big Five Personality',
  description: 'Measures 5 core personality dimensions that predict how you work with others.',
  dimensions: ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Emotional Stability'],
  questions: [
    // Openness
    { id: 1, text: 'I enjoy exploring new ideas.', dimension: 'Openness', reverse: false },
    { id: 2, text: 'I am comfortable with uncertainty.', dimension: 'Openness', reverse: false },
    { id: 3, text: 'I like trying unconventional solutions.', dimension: 'Openness', reverse: false },
    { id: 4, text: 'I prefer familiar methods over new approaches.', dimension: 'Openness', reverse: true },
    // Conscientiousness
    { id: 5, text: 'I follow through on commitments.', dimension: 'Conscientiousness', reverse: false },
    { id: 6, text: 'I work in a structured and disciplined way.', dimension: 'Conscientiousness', reverse: false },
    { id: 7, text: 'I pay attention to details.', dimension: 'Conscientiousness', reverse: false },
    { id: 8, text: 'I often leave tasks unfinished.', dimension: 'Conscientiousness', reverse: true },
    // Extraversion
    { id: 9, text: 'I enjoy meeting new people.', dimension: 'Extraversion', reverse: false },
    { id: 10, text: 'I am comfortable pitching ideas in public.', dimension: 'Extraversion', reverse: false },
    { id: 11, text: 'I naturally take the lead in conversations.', dimension: 'Extraversion', reverse: false },
    { id: 12, text: 'I prefer staying in the background in group situations.', dimension: 'Extraversion', reverse: true },
    // Agreeableness
    { id: 13, text: 'I try to maintain harmony in a team.', dimension: 'Agreeableness', reverse: false },
    { id: 14, text: 'I listen carefully before reacting.', dimension: 'Agreeableness', reverse: false },
    { id: 15, text: 'I adapt easily to others\' viewpoints.', dimension: 'Agreeableness', reverse: false },
    { id: 16, text: 'I can be unnecessarily confrontational in disagreements.', dimension: 'Agreeableness', reverse: true },
    // Emotional Stability
    { id: 17, text: 'I stay calm under pressure.', dimension: 'Emotional Stability', reverse: false },
    { id: 18, text: 'I recover quickly after setbacks.', dimension: 'Emotional Stability', reverse: false },
    { id: 19, text: 'I do not panic when things go wrong.', dimension: 'Emotional Stability', reverse: false },
    { id: 20, text: 'Stress affects my decisions too much.', dimension: 'Emotional Stability', reverse: true },
  ],
};

export const workingStyleTest: TestSection = {
  name: 'Working Style',
  description: 'Reveals how you make decisions, execute, and collaborate in a startup environment.',
  dimensions: ['Decision-making', 'Execution', 'Structure', 'Collaboration', 'Risk', 'Time Horizon'],
  questions: [
    // Decision-making
    { id: 21, text: 'I am comfortable making decisions with limited information.', dimension: 'Decision-making', reverse: false },
    { id: 22, text: 'I prefer to analyze thoroughly before deciding.', dimension: 'Decision-making', reverse: true },
    { id: 23, text: 'I can move forward even when all answers are not clear.', dimension: 'Decision-making', reverse: false },
    // Execution
    { id: 24, text: 'I prefer testing quickly rather than waiting for something perfect.', dimension: 'Execution', reverse: false },
    { id: 25, text: 'I learn best through action.', dimension: 'Execution', reverse: false },
    { id: 26, text: 'I usually refine things extensively before launching.', dimension: 'Execution', reverse: true },
    // Structure
    { id: 27, text: 'I work best with clear plans and deadlines.', dimension: 'Structure', reverse: false },
    { id: 28, text: 'I naturally create order in projects.', dimension: 'Structure', reverse: false },
    { id: 29, text: 'I am comfortable working in a highly flexible and changing way.', dimension: 'Structure', reverse: true },
    // Collaboration
    { id: 30, text: 'I like making important decisions together.', dimension: 'Collaboration', reverse: false },
    { id: 31, text: 'I communicate frequently when working with others.', dimension: 'Collaboration', reverse: false },
    { id: 32, text: 'I prefer owning my area independently.', dimension: 'Collaboration', reverse: true },
    // Risk
    { id: 33, text: 'I am comfortable taking bold bets.', dimension: 'Risk', reverse: false },
    { id: 34, text: 'I can act despite uncertainty.', dimension: 'Risk', reverse: false },
    { id: 35, text: 'I prefer reducing uncertainty before moving forward.', dimension: 'Risk', reverse: true },
    // Time Horizon
    { id: 36, text: 'I naturally think about long-term direction.', dimension: 'Time Horizon', reverse: false },
    { id: 37, text: 'I focus strongly on immediate traction and execution.', dimension: 'Time Horizon', reverse: true },
    { id: 38, text: 'I like balancing vision with practical next steps.', dimension: 'Time Horizon', reverse: false },
  ],
};

export const allQuestions = [...bigFiveTest.questions, ...workingStyleTest.questions];

export const likertOptions = [
  { value: 1, label: 'Strongly disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly agree' },
];
