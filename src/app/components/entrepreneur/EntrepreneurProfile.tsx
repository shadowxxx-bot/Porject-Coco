import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const soughtRolesOptions = ['Business', 'Tech', 'Product', 'Ops', 'Sales', 'Finance'];
const pastExpOptions = ['Startup', 'Corporate', 'Freelance', 'Student project', 'Side project', 'Club/Association'];
const industryOptions = ['Tech', 'Finance', 'Health', 'Food', 'Education', 'Energy', 'Retail', 'Media', 'Real Estate', 'Logistics', 'Other'];
const educationOptions = ['Self-taught', 'Bachelor', 'Master', 'MBA', 'PhD', 'Bootcamp'];

export function EntrepreneurProfile() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const [soughtRoles, setSoughtRoles] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [pastExperience, setPastExperience] = useState<string[]>([]);
  const [mainIndustry, setMainIndustry] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [location, setLocation] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [langInput, setLangInput] = useState('');

  const toggleItem = (arr: string[], setArr: (v: string[]) => void, item: string) => {
    setArr(arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
  };

  const addTag = (value: string, arr: string[], setArr: (v: string[]) => void, setInput: (v: string) => void) => {
    const trimmed = value.trim();
    if (trimmed && !arr.includes(trimmed)) {
      setArr([...arr, trimmed]);
    }
    setInput('');
  };

  const handleSubmit = () => {
    localStorage.setItem('entrepreneur_profile', JSON.stringify({
      soughtRoles, skills, pastExperience, mainIndustry, educationLevel, location, languages,
    }));
    navigate('/onboarding/entrepreneur/motivation');
  };

  const isValid = soughtRoles.length > 0 && mainIndustry && educationLevel && location;

  return (
    <div className="min-h-screen flex flex-col px-8 py-12 max-w-[375px] mx-auto bg-[#FFF8F2]">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div
              key={step}
              className="h-1.5 flex-1 rounded-full"
              style={{ backgroundColor: step <= 1 ? colors.primary : 'rgba(61,35,20,0.15)' }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-[#6B5B52]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <p className="text-[12px] text-[#6B5B52]">Step 1 of 6</p>
        </div>
      </div>

      <h1 className="text-[36px] leading-[1] tracking-[-0.04em] text-[#3D2314] mb-2">
        Tell us about you
      </h1>
      <p className="text-[14px] text-[#6B5B52] mb-8">Build your founder profile</p>

      <div className="flex-1 space-y-7 overflow-y-auto">
        {/* Role sought */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Role sought</label>
          <div className="flex flex-wrap gap-2">
            {soughtRolesOptions.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => toggleItem(soughtRoles, setSoughtRoles, role)}
                className="px-4 py-2.5 rounded-full border-2 transition-all text-[14px]"
                style={{
                  backgroundColor: soughtRoles.includes(role) ? colors.primary : 'white',
                  borderColor: soughtRoles.includes(role) ? colors.primary : 'rgba(61,35,20,0.15)',
                  color: soughtRoles.includes(role) ? 'white' : '#3D2314',
                }}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Current skills */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Current skills</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-full text-[13px] flex items-center gap-1.5 text-white"
                style={{ backgroundColor: colors.primary }}
              >
                {skill}
                <button onClick={() => setSkills(skills.filter((s) => s !== skill))}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag(skillInput, skills, setSkills, setSkillInput);
              }
            }}
            placeholder="Type a skill and press Enter"
            className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-[rgba(61,35,20,0.15)] focus:outline-none text-[14px] text-[#3D2314]"
          />
        </div>

        {/* Past experience */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Past experience</label>
          <div className="flex flex-wrap gap-2">
            {pastExpOptions.map((exp) => (
              <button
                key={exp}
                type="button"
                onClick={() => toggleItem(pastExperience, setPastExperience, exp)}
                className="px-4 py-2.5 rounded-full border-2 transition-all text-[14px]"
                style={{
                  backgroundColor: pastExperience.includes(exp) ? colors.primary : 'white',
                  borderColor: pastExperience.includes(exp) ? colors.primary : 'rgba(61,35,20,0.15)',
                  color: pastExperience.includes(exp) ? 'white' : '#3D2314',
                }}
              >
                {exp}
              </button>
            ))}
          </div>
        </div>

        {/* Main industry */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Main industry expertise</label>
          <select
            value={mainIndustry}
            onChange={(e) => setMainIndustry(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-[rgba(61,35,20,0.15)] focus:outline-none text-[14px] text-[#3D2314]"
          >
            <option value="">Select an industry</option>
            {industryOptions.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        {/* Education level */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Education level</label>
          <div className="flex flex-wrap gap-2">
            {educationOptions.map((edu) => (
              <button
                key={edu}
                type="button"
                onClick={() => setEducationLevel(edu)}
                className="px-4 py-2.5 rounded-full border-2 transition-all text-[14px]"
                style={{
                  backgroundColor: educationLevel === edu ? colors.primary : 'white',
                  borderColor: educationLevel === edu ? colors.primary : 'rgba(61,35,20,0.15)',
                  color: educationLevel === edu ? 'white' : '#3D2314',
                }}
              >
                {edu}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Paris, France"
            className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-[rgba(61,35,20,0.15)] focus:outline-none text-[14px] text-[#3D2314]"
          />
        </div>

        {/* Languages */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Languages spoken</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {languages.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1.5 rounded-full text-[13px] flex items-center gap-1.5 text-white"
                style={{ backgroundColor: colors.primary }}
              >
                {lang}
                <button onClick={() => setLanguages(languages.filter((l) => l !== lang))}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={langInput}
            onChange={(e) => setLangInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag(langInput, languages, setLanguages, setLangInput);
              }
            }}
            placeholder="Type a language and press Enter"
            className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-[rgba(61,35,20,0.15)] focus:outline-none text-[14px] text-[#3D2314]"
          />
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
