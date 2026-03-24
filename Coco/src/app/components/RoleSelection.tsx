import { useNavigate } from 'react-router';
import { Users, Rocket } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function RoleSelection() {
  const navigate = useNavigate();
  const { setRole } = useTheme();

  const handleSelect = (role: 'cofounder' | 'entrepreneur') => {
    setRole(role);
    navigate(`/signup?role=${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col px-8 py-12 max-w-[375px] mx-auto bg-[#FFF8F2]">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1
          className="text-[40px] leading-[1] tracking-[-0.04em] text-[#3D2314] text-center mb-3"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          How do you want to use COCO?
        </h1>
        <p className="text-[16px] text-[#6B5B52] text-center mb-10">
          Choose your path
        </p>

        <div className="w-full space-y-4">
          {/* Co-founder Card */}
          <button
            onClick={() => handleSelect('cofounder')}
            className="w-full bg-[#E8894A] rounded-3xl p-6 text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-[22px] leading-[1.1] text-white font-medium mb-2">
              I'm looking for a co-founder
            </h2>
            <p className="text-[15px] text-white/80">
              Find someone to build with
            </p>
          </button>

          {/* Entrepreneur Card */}
          <button
            onClick={() => handleSelect('entrepreneur')}
            className="w-full bg-white border-2 border-[#3D2314] rounded-3xl p-6 text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#3D2314]/10 flex items-center justify-center mb-4">
              <Rocket className="w-7 h-7 text-[#3D2314]" />
            </div>
            <h2 className="text-[22px] leading-[1.1] text-[#3D2314] font-medium mb-2">
              I'm an entrepreneur
            </h2>
            <p className="text-[15px] text-[#6B5B52]">
              Find the right partner for my project
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
