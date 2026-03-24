import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Lock } from 'lucide-react';
import { getFounderSummary, type DimensionScore } from '../../utils/scoring';
import { bigFiveTest } from '../../data/assessmentQuestions';
import { useTheme } from '../../context/ThemeContext';

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

export function FounderDnaResults() {
  const navigate = useNavigate();
  const { colors } = useTheme();

  const scores = useMemo(() => {
    const stored = localStorage.getItem('assessmentScores');
    if (stored) return JSON.parse(stored) as DimensionScore[];
    return fallbackScores;
  }, []);

  const bigFiveDimensions = bigFiveTest.dimensions;
  const bigFiveScores = scores.filter((s) => bigFiveDimensions.includes(s.dimension));
  const workingStyleScores = scores.filter((s) => !bigFiveDimensions.includes(s.dimension));
  const summary = getFounderSummary([...scores]);

  return (
    <div className="min-h-screen flex flex-col max-w-[375px] mx-auto bg-[#FFF8F2]">
      {/* Header */}
      <div className="sticky top-0 bg-[#FFF8F2] z-10 px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate('/my-profile')}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-[#3D2314]" />
        </button>
        <h1 className="text-[22px] leading-[1] tracking-[-0.03em] text-[#3D2314]">
          Founder DNA
        </h1>
      </div>

      <div className="px-6 pb-10">
        {/* DNA emoji */}
        <div className="text-center mb-6">
          <div className="text-[48px] mb-2">&#x1F9EC;</div>
          <p className="text-[16px] text-[#6B5B52]">Your unique personality profile</p>
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
                    className="h-full rounded-full"
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
                    className="h-full bg-[#3D2314] rounded-full"
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

        {/* Locked notice */}
        <div className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-[rgba(61,35,20,0.08)]">
          <div className="w-9 h-9 rounded-full bg-[#FFF8F2] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Lock className="w-4 h-4 text-[#6B5B52]" />
          </div>
          <p className="text-[13px] text-[#6B5B52] leading-[1.5]">
            Your Founder DNA was captured during onboarding and cannot be modified. This ensures authentic matching.
          </p>
        </div>
      </div>
    </div>
  );
}
