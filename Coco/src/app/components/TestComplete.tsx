import { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { computeScores, getFounderSummary, type DimensionScore } from '../utils/scoring';
import { bigFiveTest } from '../data/assessmentQuestions';
import { useTheme } from '../context/ThemeContext';

const fallbackScores: DimensionScore[] = [
  { dimension: 'Openness', score: 75, label: 'Explorer' },
  { dimension: 'Conscientiousness', score: 68, label: 'Flexible' },
  { dimension: 'Extraversion', score: 70, label: 'Outgoing' },
  { dimension: 'Agreeableness', score: 62, label: 'Balanced' },
  { dimension: 'Emotional Stability', score: 78, label: 'Steady' },
  { dimension: 'Decision-making', score: 80, label: 'Decisive' },
  { dimension: 'Execution', score: 72, label: 'Action-oriented' },
  { dimension: 'Structure', score: 55, label: 'Adaptable' },
  { dimension: 'Collaboration', score: 65, label: 'Flexible' },
  { dimension: 'Risk', score: 82, label: 'Bold' },
  { dimension: 'Time Horizon', score: 70, label: 'Visionary' },
];

export function TestComplete() {
  const navigate = useNavigate();
  const { colors } = useTheme();

  const scores = useMemo(() => {
    // Try localStorage first (persisted), then sessionStorage (just computed)
    const stored = localStorage.getItem('assessmentScores');
    if (stored) {
      return JSON.parse(stored) as DimensionScore[];
    }
    const raw = sessionStorage.getItem('assessmentAnswers') || localStorage.getItem('assessmentAnswers');
    if (raw) {
      const computed = computeScores(JSON.parse(raw));
      // Persist scores
      localStorage.setItem('assessmentScores', JSON.stringify(computed));
      localStorage.setItem('assessmentCompleted', 'true');
      return computed;
    }
    return fallbackScores;
  }, []);

  // Ensure flag is set
  useEffect(() => {
    localStorage.setItem('assessmentCompleted', 'true');
    localStorage.setItem('assessmentScores', JSON.stringify(scores));
  }, [scores]);

  const bigFiveDimensions = bigFiveTest.dimensions;
  const bigFiveScores = scores.filter((s) => bigFiveDimensions.includes(s.dimension));
  const workingStyleScores = scores.filter((s) => !bigFiveDimensions.includes(s.dimension));
  const summary = getFounderSummary([...scores]);

  return (
    <div className="min-h-screen flex flex-col px-8 py-12 max-w-[375px] mx-auto">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-[48px] mb-4">&#x1F9EC;</div>
          <h1 className="text-[42px] leading-[0.95] tracking-[-0.04em] text-[#3D2314] mb-3">
            Your Founder DNA
          </h1>
          <p className="text-[16px] text-[#6B5B52]">
            Here's your unique personality profile
          </p>
        </div>

        {/* Big Five Results */}
        <div className="mb-6">
          <h3 className="text-[16px] text-[#3D2314] font-medium mb-3">Big Five Personality</h3>
          <div className="bg-white rounded-3xl p-5 space-y-4">
            {bigFiveScores.map((trait, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[14px] text-[#3D2314] font-medium">{trait.dimension}</span>
                  <span className="text-[12px] font-medium" style={{ color: colors.primary }}>
                    {trait.label} &middot; {trait.score}%
                  </span>
                </div>
                <div className="h-2 bg-[#FFF8F2] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${trait.score}%`, backgroundColor: colors.primary }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Working Style Results */}
        <div className="mb-6">
          <h3 className="text-[16px] text-[#3D2314] font-medium mb-3">Working Style</h3>
          <div className="bg-white rounded-3xl p-5 space-y-4">
            {workingStyleScores.map((trait, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[14px] text-[#3D2314] font-medium">{trait.dimension}</span>
                  <span className="text-[12px] font-medium" style={{ color: colors.primary }}>
                    {trait.label} &middot; {trait.score}%
                  </span>
                </div>
                <div className="h-2 bg-[#FFF8F2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#3D2314] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${trait.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary card */}
        <div className="bg-[#FFF8F2] border-2 border-[rgba(61,35,20,0.1)] rounded-2xl p-5 mb-6">
          <p className="text-[14px] text-[#3D2314] leading-[1.5]">
            <span className="font-medium">Your profile:</span> {summary}
          </p>
        </div>

        {/* Fun stat */}
        <div className="text-center mb-6">
          <p className="text-[14px] text-[#6B5B52]">
            <span className="font-medium" style={{ color: colors.primary }}>127 co-founders</span> with complementary traits are waiting
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="pb-4">
        <button
          onClick={() => navigate('/discover')}
          className="w-full text-white py-4 rounded-full transition-all active:scale-[0.98]"
          style={{ backgroundColor: colors.primary }}
        >
          See my matches
        </button>
      </div>
    </div>
  );
}
