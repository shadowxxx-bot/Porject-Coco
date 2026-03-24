import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Building, Lightbulb, Compass } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const attractionOptions = ['Freedom', 'Impact', 'Money', 'Innovation', 'Learning', 'Solving a real problem'];
const focusOptions = ['Yes, 100% focused', 'Main project but I have a job', 'Side project for now'];

const ambitionCards = [
  { value: 'long-term', label: 'Build a long-term company', icon: Building },
  { value: 'test-idea', label: 'Test an idea first', icon: Lightbulb },
  { value: 'exploring', label: "Not sure yet, exploring", icon: Compass },
];

export function EntrepreneurMotivation() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const [whyStartup, setWhyStartup] = useState('');
  const [attractions, setAttractions] = useState<string[]>([]);
  const [ambition, setAmbition] = useState('');
  const [riskReadiness, setRiskReadiness] = useState(3);
  const [mainFocus, setMainFocus] = useState('');

  const toggleAttraction = (item: string) => {
    if (attractions.includes(item)) {
      setAttractions(attractions.filter((a) => a !== item));
    } else if (attractions.length < 3) {
      setAttractions([...attractions, item]);
    }
  };

  const handleSubmit = () => {
    localStorage.setItem('entrepreneur_motivation', JSON.stringify({
      whyStartup, attractions, ambition, riskReadiness, mainFocus,
    }));
    navigate('/onboarding/entrepreneur/engagement');
  };

  const isValid = whyStartup.trim() && attractions.length > 0 && ambition && mainFocus;

  return (
    <div className="min-h-screen flex flex-col px-8 py-12 max-w-[375px] mx-auto bg-[#FFF8F2]">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div
              key={step}
              className="h-1.5 flex-1 rounded-full"
              style={{ backgroundColor: step <= 2 ? colors.primary : 'rgba(61,35,20,0.15)' }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-[#6B5B52]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <p className="text-[12px] text-[#6B5B52]">Step 2 of 6</p>
        </div>
      </div>

      <h1 className="text-[36px] leading-[1] tracking-[-0.04em] text-[#3D2314] mb-2">
        What drives you?
      </h1>
      <p className="text-[14px] text-[#6B5B52] mb-8">Your entrepreneurial motivation</p>

      <div className="flex-1 space-y-7 overflow-y-auto">
        {/* Why startup */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">
            Why do you want to launch a startup?
          </label>
          <textarea
            value={whyStartup}
            onChange={(e) => setWhyStartup(e.target.value.slice(0, 300))}
            placeholder="What's your real motivation? Be honest — it helps us match you better."
            rows={3}
            className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-[rgba(61,35,20,0.15)] focus:outline-none text-[14px] text-[#3D2314] resize-none"
          />
          <p className="text-[12px] text-[#6B5B52] mt-1 text-right">{whyStartup.length}/300</p>
        </div>

        {/* What attracts you */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-1 font-medium">
            What attracts you most?
          </label>
          <p className="text-[12px] text-[#6B5B52] mb-3">Pick up to 3</p>
          <div className="flex flex-wrap gap-2">
            {attractionOptions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => toggleAttraction(item)}
                className="px-4 py-2.5 rounded-full border-2 transition-all text-[14px]"
                style={{
                  backgroundColor: attractions.includes(item) ? colors.primary : 'white',
                  borderColor: attractions.includes(item) ? colors.primary : 'rgba(61,35,20,0.15)',
                  color: attractions.includes(item) ? 'white' : '#3D2314',
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Ambition */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">
            What's your ambition?
          </label>
          <div className="space-y-3">
            {ambitionCards.map((card) => {
              const Icon = card.icon;
              const selected = ambition === card.value;
              return (
                <button
                  key={card.value}
                  type="button"
                  onClick={() => setAmbition(card.value)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left"
                  style={{
                    backgroundColor: selected ? colors.primary : 'white',
                    borderColor: selected ? colors.primary : 'rgba(61,35,20,0.15)',
                  }}
                >
                  <Icon className="w-6 h-6 flex-shrink-0" style={{ color: selected ? 'white' : colors.primary }} />
                  <span className="text-[14px] font-medium" style={{ color: selected ? 'white' : '#3D2314' }}>
                    {card.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Risk readiness */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">
            Are you ready to take risks?
          </label>
          <div className="px-2">
            <input
              type="range"
              min={1}
              max={5}
              value={riskReadiness}
              onChange={(e) => setRiskReadiness(Number(e.target.value))}
              className="w-full accent-[var(--color-primary)]"
            />
            <div className="flex justify-between mt-1">
              <span className="text-[12px] text-[#6B5B52]">I prefer safety</span>
              <span className="text-[12px] text-[#6B5B52]">I'm all in</span>
            </div>
          </div>
        </div>

        {/* Main focus */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">
            Is this your main focus?
          </label>
          <div className="flex flex-wrap gap-2">
            {focusOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setMainFocus(opt)}
                className="px-4 py-2.5 rounded-full border-2 transition-all text-[14px]"
                style={{
                  backgroundColor: mainFocus === opt ? colors.primary : 'white',
                  borderColor: mainFocus === opt ? colors.primary : 'rgba(61,35,20,0.15)',
                  color: mainFocus === opt ? 'white' : '#3D2314',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full text-white py-4 rounded-full transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: colors.primary }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
