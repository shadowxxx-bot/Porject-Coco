import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Target, Shuffle, Minus, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const cofounderTypes = ['Technical', 'Business', 'Product', 'Design', 'Marketing', 'Sales', 'Operations', 'Finance'];
const personalityOptions = ['Challenger', 'Complementary', 'Similar to me', 'Natural leader', 'Operator/executor', 'Builder/maker'];
const experienceOptions = ['No preference', '1-2 years', '3-5 years', '5+ years'];
const locationOptions = ['Must be same city', 'Same country is fine', 'Remote OK'];

const industryCards = [
  { value: 'same', label: 'Same industry — deep domain knowledge', icon: Target },
  { value: 'different', label: 'Different industry — fresh perspective', icon: Shuffle },
  { value: 'no-preference', label: 'No preference', icon: Minus },
];

export function EntrepreneurPreferences() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const [cofounderType, setCofounderType] = useState<string[]>([]);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [personalityPref, setPersonalityPref] = useState<string[]>([]);
  const [minExperience, setMinExperience] = useState('');
  const [locationPref, setLocationPref] = useState('');
  const [industryPref, setIndustryPref] = useState('');

  const toggleItem = (arr: string[], setArr: (v: string[]) => void, item: string, max?: number) => {
    if (arr.includes(item)) {
      setArr(arr.filter((i) => i !== item));
    } else if (!max || arr.length < max) {
      setArr([...arr, item]);
    }
  };

  const addSkillTag = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !missingSkills.includes(trimmed)) {
      setMissingSkills([...missingSkills, trimmed]);
    }
    setSkillInput('');
  };

  const handleSubmit = () => {
    localStorage.setItem('entrepreneur_preferences', JSON.stringify({
      cofounderType, missingSkills, personalityPref, minExperience, locationPref, industryPref,
    }));
    navigate('/onboarding/entrepreneur/project');
  };

  const isValid = cofounderType.length > 0 && minExperience && locationPref;

  return (
    <div className="min-h-screen flex flex-col px-8 py-12 max-w-[375px] mx-auto bg-[#FFF8F2]">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3, 4, 5, 6].map((step) => (
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
          <p className="text-[12px] text-[#6B5B52]">Step 5 of 6</p>
        </div>
      </div>

      <h1 className="text-[36px] leading-[1] tracking-[-0.04em] text-[#3D2314] mb-2">
        Your ideal co-founder
      </h1>
      <p className="text-[14px] text-[#6B5B52] mb-8">Help us find your perfect match</p>

      <div className="flex-1 space-y-7 overflow-y-auto">
        {/* Co-founder type */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">
            What type of co-founder are you looking for?
          </label>
          <div className="flex flex-wrap gap-2">
            {cofounderTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => toggleItem(cofounderType, setCofounderType, type)}
                className="px-4 py-2.5 rounded-full border-2 transition-all text-[14px]"
                style={{
                  backgroundColor: cofounderType.includes(type) ? colors.primary : 'white',
                  borderColor: cofounderType.includes(type) ? colors.primary : 'rgba(61,35,20,0.15)',
                  color: cofounderType.includes(type) ? 'white' : '#3D2314',
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Missing skills */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">What skills are you missing?</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {missingSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-full text-[13px] flex items-center gap-1.5 text-white"
                style={{ backgroundColor: colors.primary }}
              >
                {skill}
                <button onClick={() => setMissingSkills(missingSkills.filter((s) => s !== skill))}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkillTag(); } }}
            placeholder="Type a skill and press Enter"
            className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-[rgba(61,35,20,0.15)] focus:outline-none text-[14px] text-[#3D2314]"
          />
        </div>

        {/* Personality preference */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-1 font-medium">Personality you're looking for</label>
          <p className="text-[12px] text-[#6B5B52] mb-3">Pick up to 3</p>
          <div className="flex flex-wrap gap-2">
            {personalityOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => toggleItem(personalityPref, setPersonalityPref, opt, 3)}
                className="px-4 py-2.5 rounded-full border-2 transition-all text-[14px]"
                style={{
                  backgroundColor: personalityPref.includes(opt) ? colors.primary : 'white',
                  borderColor: personalityPref.includes(opt) ? colors.primary : 'rgba(61,35,20,0.15)',
                  color: personalityPref.includes(opt) ? 'white' : '#3D2314',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Min experience */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Minimum experience expected</label>
          <div className="flex flex-wrap gap-2">
            {experienceOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setMinExperience(opt)}
                className="px-4 py-2.5 rounded-full border-2 transition-all text-[14px]"
                style={{
                  backgroundColor: minExperience === opt ? colors.primary : 'white',
                  borderColor: minExperience === opt ? colors.primary : 'rgba(61,35,20,0.15)',
                  color: minExperience === opt ? 'white' : '#3D2314',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Location preference */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Location matters?</label>
          <div className="flex flex-wrap gap-2">
            {locationOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setLocationPref(opt)}
                className="px-4 py-2.5 rounded-full border-2 transition-all text-[14px]"
                style={{
                  backgroundColor: locationPref === opt ? colors.primary : 'white',
                  borderColor: locationPref === opt ? colors.primary : 'rgba(61,35,20,0.15)',
                  color: locationPref === opt ? 'white' : '#3D2314',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Industry preference */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Same industry or complementary?</label>
          <div className="space-y-3">
            {industryCards.map((card) => {
              const Icon = card.icon;
              const selected = industryPref === card.value;
              return (
                <button
                  key={card.value}
                  type="button"
                  onClick={() => setIndustryPref(card.value)}
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
