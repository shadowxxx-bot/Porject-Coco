import { useNavigate } from 'react-router';
import { bigFiveTest, workingStyleTest } from '../../data/assessmentQuestions';
import { useTheme } from '../../context/ThemeContext';

export function PersonalityTestIntro() {
  const navigate = useNavigate();
  const { role, colors } = useTheme();
  const isEntrepreneur = role === 'entrepreneur';

  return (
    <div className="min-h-screen flex flex-col px-8 py-12 max-w-[375px] mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        {!isEntrepreneur ? (
          <>
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: colors.primary }} />
              ))}
            </div>
            <p className="text-[12px] text-[#6B5B52]">Step 4 of 4</p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: colors.primary }} />
              <div className="h-1.5 flex-1 bg-[rgba(61,35,20,0.15)] rounded-full" />
            </div>
            <p className="text-[12px] text-[#6B5B52]">Final step — Personality Assessment</p>
          </>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center transform -rotate-6" style={{ backgroundColor: colors.primary }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 5 L35 20 L20 35 L5 20 Z" fill="white" opacity="0.9" />
              </svg>
            </div>
            <div className="w-20 h-20 bg-[#3D2314] rounded-2xl flex items-center justify-center transform rotate-6">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 5 L35 20 L20 35 L5 20 Z" fill="white" opacity="0.9" />
              </svg>
            </div>
          </div>

          <h1 className="text-[42px] leading-[0.95] tracking-[-0.04em] text-[#3D2314] mb-4 text-center">
            Founder DNA Assessment
          </h1>
          <p className="text-[16px] text-[#6B5B52] text-center max-w-[300px] mx-auto mb-2">
            Complete two short tests so we can match you with compatible co-founders.
          </p>
          <p className="text-[14px] text-[#6B5B52] text-center">
            Takes ~5 minutes
          </p>
        </div>

        {/* Test descriptions */}
        <div className="space-y-4 mb-8">
          <div className="bg-white rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#FFF8F2] flex items-center justify-center text-[20px]">
                1
              </div>
              <div>
                <h3 className="text-[16px] text-[#3D2314] font-medium">{bigFiveTest.name}</h3>
                <p className="text-[13px] text-[#6B5B52]">{bigFiveTest.questions.length} questions</p>
              </div>
            </div>
            <p className="text-[14px] text-[#6B5B52] leading-[1.5]">
              {bigFiveTest.description}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#FFF8F2] flex items-center justify-center text-[20px]">
                2
              </div>
              <div>
                <h3 className="text-[16px] text-[#3D2314] font-medium">{workingStyleTest.name}</h3>
                <p className="text-[13px] text-[#6B5B52]">{workingStyleTest.questions.length} questions</p>
              </div>
            </div>
            <p className="text-[14px] text-[#6B5B52] leading-[1.5]">
              {workingStyleTest.description}
            </p>
          </div>
        </div>
      </div>

      <div className="pb-4">
        <button
          onClick={() => navigate('/test/1')}
          className="w-full text-white py-4 rounded-full transition-all active:scale-[0.98]"
          style={{ backgroundColor: colors.primary }}
        >
          Start Assessment
        </button>
      </div>
    </div>
  );
}
