import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Lightbulb, Search, Code, Users, TrendingUp, DollarSign, Sun, HelpCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const industryOptions = ['Tech', 'Finance', 'Health', 'Food', 'Education', 'Energy', 'Retail', 'Media', 'Real Estate', 'Logistics', 'Other'];
const customerOptions = ['B2C', 'B2B', 'B2B2C', 'Marketplace'];
const purposeOptions = ['Explore together', 'Execute and build', 'Both'];

const stageCards = [
  { value: 'idea', label: 'Just an idea', icon: Lightbulb },
  { value: 'validating', label: 'Validating the problem', icon: Search },
  { value: 'prototype', label: 'Building a prototype', icon: Code },
  { value: 'customers', label: 'First customers', icon: Users },
];

const ambitionCards = [
  { value: 'scalable', label: 'Scalable startup (VC path)', icon: TrendingUp },
  { value: 'bootstrapped', label: 'Profitable business (bootstrapped)', icon: DollarSign },
  { value: 'lifestyle', label: 'Lifestyle business', icon: Sun },
  { value: 'unsure', label: 'Not sure yet', icon: HelpCircle },
];

export function EntrepreneurProject() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const [projectIndustry, setProjectIndustry] = useState('');
  const [problemType, setProblemType] = useState('');
  const [projectStage, setProjectStage] = useState('');
  const [customerType, setCustomerType] = useState('');
  const [ambitionLevel, setAmbitionLevel] = useState('');
  const [cofounderPurpose, setCofounderPurpose] = useState('');
  const [projectOneLiner, setProjectOneLiner] = useState('');

  const handleSubmit = () => {
    localStorage.setItem('entrepreneur_project', JSON.stringify({
      projectIndustry, problemType, projectStage, customerType, ambitionLevel, cofounderPurpose, projectOneLiner,
    }));
    // Clear any previous assessment state so the guard doesn't skip the test
    localStorage.removeItem('assessmentCompleted');
    localStorage.removeItem('assessmentScores');
    localStorage.removeItem('assessmentAnswers');
    sessionStorage.removeItem('assessmentAnswers');
    navigate('/personality-test');
  };

  const isValid = projectIndustry && projectStage && customerType && ambitionLevel && cofounderPurpose;

  return (
    <div className="min-h-screen flex flex-col px-8 py-12 max-w-[375px] mx-auto bg-[#FFF8F2]">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className="h-1.5 flex-1 rounded-full"
              style={{ backgroundColor: step <= 5 ? colors.primary : 'rgba(61,35,20,0.15)' }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-[#6B5B52]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <p className="text-[12px] text-[#6B5B52]">Step 5 of 5</p>
        </div>
      </div>

      <h1 className="text-[36px] leading-[1] tracking-[-0.04em] text-[#3D2314] mb-2">
        Your project
      </h1>
      <p className="text-[14px] text-[#6B5B52] mb-1">Protected information</p>
      <p className="text-[12px] text-[#6B5B52] mb-8">
        We won't show sensitive details publicly. This helps our matching algorithm.
      </p>

      <div className="flex-1 space-y-7 overflow-y-auto">
        {/* Industry */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Industry / market</label>
          <select
            value={projectIndustry}
            onChange={(e) => setProjectIndustry(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-[rgba(61,35,20,0.15)] focus:outline-none text-[14px] text-[#3D2314]"
          >
            <option value="">Select an industry</option>
            {industryOptions.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        {/* Problem type */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Type of problem</label>
          <textarea
            value={problemType}
            onChange={(e) => setProblemType(e.target.value.slice(0, 200))}
            placeholder="Describe the problem you want to solve without revealing your secret sauce"
            rows={3}
            className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-[rgba(61,35,20,0.15)] focus:outline-none text-[14px] text-[#3D2314] resize-none"
          />
          <p className="text-[12px] text-[#6B5B52] mt-1 text-right">{problemType.length}/200</p>
        </div>

        {/* Stage */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Stage</label>
          <div className="grid grid-cols-2 gap-3">
            {stageCards.map((card) => {
              const Icon = card.icon;
              const selected = projectStage === card.value;
              return (
                <button
                  key={card.value}
                  type="button"
                  onClick={() => setProjectStage(card.value)}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all"
                  style={{
                    backgroundColor: selected ? colors.primary : 'white',
                    borderColor: selected ? colors.primary : 'rgba(61,35,20,0.15)',
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: selected ? 'white' : colors.primary }} />
                  <span className="text-[13px] text-center" style={{ color: selected ? 'white' : '#3D2314' }}>
                    {card.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Customer type */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Customer type</label>
          <div className="flex flex-wrap gap-2">
            {customerOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setCustomerType(opt)}
                className="px-4 py-2.5 rounded-full border-2 transition-all text-[14px]"
                style={{
                  backgroundColor: customerType === opt ? colors.primary : 'white',
                  borderColor: customerType === opt ? colors.primary : 'rgba(61,35,20,0.15)',
                  color: customerType === opt ? 'white' : '#3D2314',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Ambition level */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Ambition level</label>
          <div className="space-y-3">
            {ambitionCards.map((card) => {
              const Icon = card.icon;
              const selected = ambitionLevel === card.value;
              return (
                <button
                  key={card.value}
                  type="button"
                  onClick={() => setAmbitionLevel(card.value)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left"
                  style={{
                    backgroundColor: selected ? colors.primary : 'white',
                    borderColor: selected ? colors.primary : 'rgba(61,35,20,0.15)',
                  }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" style={{ color: selected ? 'white' : colors.primary }} />
                  <span className="text-[14px]" style={{ color: selected ? 'white' : '#3D2314' }}>{card.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Co-founder purpose */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Looking for a co-founder to...</label>
          <div className="flex flex-wrap gap-2">
            {purposeOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setCofounderPurpose(opt)}
                className="px-4 py-2.5 rounded-full border-2 transition-all text-[14px]"
                style={{
                  backgroundColor: cofounderPurpose === opt ? colors.primary : 'white',
                  borderColor: cofounderPurpose === opt ? colors.primary : 'rgba(61,35,20,0.15)',
                  color: cofounderPurpose === opt ? 'white' : '#3D2314',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* One-liner */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Describe your project in 1 sentence</label>
          <input
            type="text"
            value={projectOneLiner}
            onChange={(e) => setProjectOneLiner(e.target.value)}
            placeholder="e.g. B2C solution in food/health to simplify meal planning based on nutritional goals"
            className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-[rgba(61,35,20,0.15)] focus:outline-none text-[14px] text-[#3D2314]"
          />
          <p className="text-[12px] text-[#6B5B52] mt-1">Keep it high-level. No need to reveal your full idea.</p>
        </div>
      </div>

      <div className="mt-6 pt-4">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full text-white py-4 rounded-full transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: colors.primary }}
        >
          Start Discovering
        </button>
      </div>
    </div>
  );
}
