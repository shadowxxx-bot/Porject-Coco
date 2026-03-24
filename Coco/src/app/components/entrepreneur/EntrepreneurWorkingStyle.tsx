import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { workingStyleTest, likertOptions } from '../../data/assessmentQuestions';
import { useTheme } from '../../context/ThemeContext';

export function EntrepreneurWorkingStyle() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const questions = workingStyleTest.questions;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selected, setSelected] = useState<number | null>(null);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleSelect = (value: number) => {
    setSelected(value);
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelected(null);
      } else {
        // Compute working style scores only
        const dimensionValues: Record<string, number[]> = {};
        for (const q of questions) {
          const raw = newAnswers[q.id];
          if (raw == null) continue;
          if (!dimensionValues[q.dimension]) dimensionValues[q.dimension] = [];
          const score = q.reverse ? 6 - raw : raw;
          dimensionValues[q.dimension].push(score);
        }

        const dimensionLabels: Record<string, (s: number) => string> = {
          'Decision-making': (s) => s >= 70 ? 'Decisive' : s >= 40 ? 'Balanced' : 'Analytical',
          'Execution': (s) => s >= 70 ? 'Action-oriented' : s >= 40 ? 'Balanced' : 'Perfectionist',
          'Structure': (s) => s >= 70 ? 'Structured' : s >= 40 ? 'Adaptable' : 'Free-flowing',
          'Collaboration': (s) => s >= 70 ? 'Team player' : s >= 40 ? 'Flexible' : 'Independent',
          'Risk': (s) => s >= 70 ? 'Bold' : s >= 40 ? 'Calculated' : 'Conservative',
          'Time Horizon': (s) => s >= 70 ? 'Visionary' : s >= 40 ? 'Balanced' : 'Tactical',
        };

        const scores = Object.entries(dimensionValues).map(([dimension, values]) => {
          const avg = values.reduce((a, b) => a + b, 0) / values.length;
          const score = Math.round(((avg - 1) / 4) * 100);
          const labelFn = dimensionLabels[dimension];
          return { dimension, score, label: labelFn ? labelFn(score) : '' };
        });

        localStorage.setItem('entrepreneur_workingstyle', JSON.stringify(scores));
        localStorage.setItem('assessmentCompleted', 'true');
        localStorage.setItem('assessmentScores', JSON.stringify(scores));
        navigate('/onboarding/entrepreneur/preferences');
      }
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col px-8 py-12 max-w-[375px] mx-auto bg-[#FFF8F2]">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div
              key={step}
              className="h-1.5 flex-1 rounded-full"
              style={{ backgroundColor: step <= 4 ? colors.primary : 'rgba(61,35,20,0.15)' }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-[#6B5B52]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <p className="text-[12px] text-[#6B5B52]">Step 4 of 6</p>
        </div>
      </div>

      {/* Section badge */}
      <div className="mb-4">
        <span
          className="inline-block px-3 py-1 rounded-full text-[12px] border"
          style={{ color: colors.primary, borderColor: `${colors.primary}33` }}
        >
          Working Style &middot; {currentIndex + 1}/{totalQuestions}
        </span>
      </div>

      {/* Question progress */}
      <div className="mb-4">
        <div className="h-1.5 bg-[rgba(61,35,20,0.1)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
              backgroundColor: colors.primary,
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col">
        <h2 className="text-[28px] leading-[1.15] tracking-[-0.03em] text-[#3D2314] mb-10">
          "{currentQuestion.text}"
        </h2>

        <div className="space-y-3">
          {likertOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="w-full px-5 py-4 rounded-2xl border-2 transition-all text-left"
              style={{
                backgroundColor: selected === option.value ? colors.primary : 'white',
                borderColor: selected === option.value ? colors.primary : 'rgba(61,35,20,0.15)',
                color: selected === option.value ? 'white' : '#3D2314',
              }}
            >
              <span className="text-[15px]">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
