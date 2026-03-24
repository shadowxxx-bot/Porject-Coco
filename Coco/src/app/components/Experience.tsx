import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTheme } from '../context/ThemeContext';

const industries = [
  'Fintech',
  'HealthTech',
  'EdTech',
  'Climate',
  'AI/ML',
  'SaaS',
  'E-commerce',
  'Marketplace',
  'Other',
];

const stages = [
  'Just an idea',
  'Building MVP',
  'Launched',
  'Looking to join',
];

export function Experience() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [previousStartups, setPreviousStartups] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [stage, setStage] = useState('');

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/personality-test');
  };

  return (
    <div className="min-h-screen flex flex-col px-8 py-12 max-w-[375px] mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: colors.primary }} />
          <div className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: colors.primary }} />
          <div className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: colors.primary }} />
          <div className="h-1.5 flex-1 bg-[rgba(61,35,20,0.15)] rounded-full" />
        </div>
        <p className="text-[12px] text-[#6B5B52]">Step 3 of 4</p>
      </div>

      <div className="mb-8">
        <h1 className="text-[42px] leading-[0.95] tracking-[-0.04em] text-[#3D2314] mb-2">
          Experience
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col pb-4">
        <div className="flex-1 space-y-8">
          {/* Years of Experience */}
          <div>
            <label className="block text-[16px] text-[#3D2314] mb-4 font-medium">
              Years of experience
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {['0-2', '3-5', '6-10', '10+'].map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setYearsOfExperience(range)}
                  className="px-5 py-4 rounded-2xl border-2 transition-all"
                  style={{
                    backgroundColor: yearsOfExperience === range ? colors.primary : 'white',
                    borderColor: yearsOfExperience === range ? colors.primary : 'rgba(61,35,20,0.15)',
                    color: yearsOfExperience === range ? 'white' : '#3D2314',
                  }}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Previous Startups */}
          <div>
            <label className="block text-[16px] text-[#3D2314] mb-4 font-medium">
              Previous startups
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {['0', '1', '2', '3+'].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setPreviousStartups(count)}
                  className="px-5 py-4 rounded-2xl border-2 transition-all"
                  style={{
                    backgroundColor: previousStartups === count ? colors.primary : 'white',
                    borderColor: previousStartups === count ? colors.primary : 'rgba(61,35,20,0.15)',
                    color: previousStartups === count ? 'white' : '#3D2314',
                  }}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div>
            <label className="block text-[16px] text-[#3D2314] mb-4 font-medium">
              Industries
            </label>
            <div className="flex flex-wrap gap-2.5">
              {industries.map((industry) => (
                <button
                  key={industry}
                  type="button"
                  onClick={() => toggleIndustry(industry)}
                  className="px-5 py-3 rounded-full border-2 transition-all"
                  style={{
                    backgroundColor: selectedIndustries.includes(industry) ? colors.primary : 'white',
                    borderColor: selectedIndustries.includes(industry) ? colors.primary : 'rgba(61,35,20,0.15)',
                    color: selectedIndustries.includes(industry) ? 'white' : '#3D2314',
                  }}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>

          {/* Stage */}
          <div>
            <label className="block text-[16px] text-[#3D2314] mb-4 font-medium">
              What stage are you at?
            </label>
            <div className="space-y-2.5">
              {stages.map((stageOption) => (
                <button
                  key={stageOption}
                  type="button"
                  onClick={() => setStage(stageOption)}
                  className="w-full px-5 py-4 rounded-2xl border-2 transition-all text-left"
                  style={{
                    backgroundColor: stage === stageOption ? colors.primary : 'white',
                    borderColor: stage === stageOption ? colors.primary : 'rgba(61,35,20,0.15)',
                    color: stage === stageOption ? 'white' : '#3D2314',
                  }}
                >
                  {stageOption}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={
              !yearsOfExperience ||
              !previousStartups ||
              selectedIndustries.length === 0 ||
              !stage
            }
            className="w-full text-white py-4 rounded-full transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: colors.primary }}
          >
            Complete Profile
          </button>
        </div>
      </form>
    </div>
  );
}
