import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { allQuestions, likertOptions, bigFiveTest } from '../../data/assessmentQuestions';
import { computeScores } from '../../utils/scoring';
import { useTheme } from '../../context/ThemeContext';

export function TestQuestions() {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const { colors } = useTheme();

  const currentIndex = parseInt(questionId || '1') - 1;
  const totalQuestions = allQuestions.length;
  const currentQuestion = allQuestions[currentIndex];
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [showTransition, setShowTransition] = useState(false);

  const isTransitionPoint = currentIndex === bigFiveTest.questions.length;
  const isBigFiveSection = currentIndex < bigFiveTest.questions.length;

  useEffect(() => {
    setSelected(answers[currentQuestion?.id] ?? null);
  }, [questionId]);

  useEffect(() => {
    if (isTransitionPoint && !answers[-1]) {
      setShowTransition(true);
    }
  }, [currentIndex]);

  const handleSelect = (value: number) => {
    setSelected(value);
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        navigate(`/test/${currentIndex + 2}`);
      } else {
        const scores = computeScores(newAnswers);
        localStorage.setItem('assessmentAnswers', JSON.stringify(newAnswers));
        localStorage.setItem('assessmentScores', JSON.stringify(scores));
        localStorage.setItem('assessmentCompleted', 'true');
        sessionStorage.setItem('assessmentAnswers', JSON.stringify(newAnswers));
        navigate('/test-complete');
      }
    }, 300);
  };

  if (showTransition) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8 max-w-[375px] mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: colors.primary }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-[36px] leading-[1] tracking-[-0.04em] text-[#3D2314] mb-3">
            Part 1 complete!
          </h1>
          <p className="text-[16px] text-[#6B5B52] mb-2">Big Five Personality done.</p>
          <p className="text-[14px] text-[#6B5B52]">Now let's discover your Working Style.</p>
        </div>
        <button
          onClick={() => {
            setShowTransition(false);
            setAnswers({ ...answers, [-1]: 1 });
          }}
          className="w-full text-white py-4 rounded-full transition-all active:scale-[0.98]"
          style={{ backgroundColor: colors.primary }}
        >
          Continue
        </button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const sectionLabel = isBigFiveSection ? 'Big Five Personality' : 'Working Style';
  const sectionProgress = isBigFiveSection
    ? `${currentIndex + 1}/${bigFiveTest.questions.length}`
    : `${currentIndex - bigFiveTest.questions.length + 1}/${totalQuestions - bigFiveTest.questions.length}`;

  return (
    <div className="min-h-screen flex flex-col px-8 py-12 max-w-[375px] mx-auto">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="h-1.5 bg-[rgba(61,35,20,0.1)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%`, backgroundColor: colors.primary }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-[12px] text-[#6B5B52]">{sectionLabel}</p>
          <p className="text-[12px] text-[#6B5B52]">{currentIndex + 1}/{totalQuestions}</p>
        </div>
      </div>

      {/* Section badge */}
      <div className="mb-8">
        <span
          className="inline-block px-3 py-1 bg-white rounded-full text-[12px] border"
          style={{ color: colors.primary, borderColor: `${colors.primary}33` }}
        >
          {sectionLabel} &middot; {sectionProgress}
        </span>
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
