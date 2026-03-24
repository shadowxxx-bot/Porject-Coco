import { allQuestions } from '../data/assessmentQuestions';

export interface DimensionScore {
  dimension: string;
  score: number;
  label: string;
}

function getScore(value: number, reverse: boolean): number {
  return reverse ? 6 - value : value;
}

function normalize(avg: number): number {
  return Math.round(((avg - 1) / 4) * 100);
}

export function computeScores(answers: Record<number, number>): DimensionScore[] {
  const dimensionValues: Record<string, number[]> = {};

  for (const q of allQuestions) {
    const raw = answers[q.id];
    if (raw == null) continue;
    if (!dimensionValues[q.dimension]) dimensionValues[q.dimension] = [];
    dimensionValues[q.dimension].push(getScore(raw, q.reverse));
  }

  const dimensionLabels: Record<string, (score: number) => string> = {
    'Openness': (s) => s >= 70 ? 'Explorer' : s >= 40 ? 'Balanced' : 'Pragmatist',
    'Conscientiousness': (s) => s >= 70 ? 'Disciplined' : s >= 40 ? 'Flexible' : 'Spontaneous',
    'Extraversion': (s) => s >= 70 ? 'Outgoing' : s >= 40 ? 'Ambivert' : 'Reserved',
    'Agreeableness': (s) => s >= 70 ? 'Harmonizer' : s >= 40 ? 'Balanced' : 'Challenger',
    'Emotional Stability': (s) => s >= 70 ? 'Steady' : s >= 40 ? 'Responsive' : 'Intense',
    'Decision-making': (s) => s >= 70 ? 'Decisive' : s >= 40 ? 'Balanced' : 'Analytical',
    'Execution': (s) => s >= 70 ? 'Action-oriented' : s >= 40 ? 'Balanced' : 'Perfectionist',
    'Structure': (s) => s >= 70 ? 'Structured' : s >= 40 ? 'Adaptable' : 'Free-flowing',
    'Collaboration': (s) => s >= 70 ? 'Team player' : s >= 40 ? 'Flexible' : 'Independent',
    'Risk': (s) => s >= 70 ? 'Bold' : s >= 40 ? 'Calculated' : 'Conservative',
    'Time Horizon': (s) => s >= 70 ? 'Visionary' : s >= 40 ? 'Balanced' : 'Tactical',
  };

  const orderedDimensions = [
    'Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Emotional Stability',
    'Decision-making', 'Execution', 'Structure', 'Collaboration', 'Risk', 'Time Horizon',
  ];

  return orderedDimensions
    .filter((d) => dimensionValues[d])
    .map((dimension) => {
      const values = dimensionValues[dimension];
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      const score = normalize(avg);
      const labelFn = dimensionLabels[dimension];
      return { dimension, score, label: labelFn ? labelFn(score) : '' };
    });
}

export function getFounderSummary(scores: DimensionScore[]): string {
  const topTraits = scores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.label);

  return `You're a ${topTraits[0]}, ${topTraits[1]}, and ${topTraits[2]} founder. Your unique combination of traits makes you well-suited for building ventures where your strengths complement your co-founder's.`;
}
