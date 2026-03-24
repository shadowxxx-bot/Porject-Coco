import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTheme } from '../../context/ThemeContext';

const roleOptions = ['Technical', 'Business', 'Product', 'Design', 'Marketing', 'Operations', 'Sales', 'Finance'];
const projectTypes = ['Early-stage startup', 'Growth-stage', 'Deep tech', 'Social impact', 'Marketplace', 'SaaS', 'Hardware', 'Any exciting project'];

export function TellUsAboutYou() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [projectPrefs, setProjectPrefs] = useState<string[]>([]);

  const toggleItem = (arr: string[], setArr: (v: string[]) => void, item: string) => {
    setArr(arr.includes(item) ? arr.filter((r) => r !== item) : [...arr, item]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/upload-video');
  };

  return (
    <div className="min-h-screen flex flex-col px-8 py-12 max-w-[375px] mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: colors.primary }} />
          <div className="h-1.5 flex-1 bg-[rgba(61,35,20,0.15)] rounded-full" />
          <div className="h-1.5 flex-1 bg-[rgba(61,35,20,0.15)] rounded-full" />
          <div className="h-1.5 flex-1 bg-[rgba(61,35,20,0.15)] rounded-full" />
        </div>
        <p className="text-[12px] text-[#6B5B52]">Step 1 of 4</p>
      </div>

      <div className="mb-8">
        <h1 className="text-[42px] leading-[0.95] tracking-[-0.04em] text-[#3D2314] mb-2">
          Tell us about you
        </h1>
        <p className="text-[14px] text-[#6B5B52]">What role can you bring to a startup?</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="flex-1 space-y-8">
          <div>
            <label className="block text-[16px] text-[#3D2314] mb-4 font-medium">
              Your expertise
            </label>
            <p className="text-[13px] text-[#6B5B52] mb-3">Select the roles you can fill in a startup</p>
            <div className="flex flex-wrap gap-2.5">
              {roleOptions.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleItem(selectedRoles, setSelectedRoles, role)}
                  className="px-5 py-3 rounded-full border-2 transition-all"
                  style={{
                    backgroundColor: selectedRoles.includes(role) ? colors.primary : 'white',
                    borderColor: selectedRoles.includes(role) ? colors.primary : 'rgba(61,35,20,0.15)',
                    color: selectedRoles.includes(role) ? 'white' : '#3D2314',
                  }}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[16px] text-[#3D2314] mb-4 font-medium">
              What type of project interests you?
            </label>
            <p className="text-[13px] text-[#6B5B52] mb-3">Select all that apply</p>
            <div className="flex flex-wrap gap-2.5">
              {projectTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleItem(projectPrefs, setProjectPrefs, type)}
                  className="px-5 py-3 rounded-full border-2 transition-all"
                  style={{
                    backgroundColor: projectPrefs.includes(type) ? colors.primary : 'white',
                    borderColor: projectPrefs.includes(type) ? colors.primary : 'rgba(61,35,20,0.15)',
                    color: projectPrefs.includes(type) ? 'white' : '#3D2314',
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={selectedRoles.length === 0}
            className="w-full text-white py-4 rounded-full transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: colors.primary }}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
