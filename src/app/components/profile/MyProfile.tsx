import { useNavigate } from 'react-router';
import { ChevronRight, User, Dna, Settings, HelpCircle } from 'lucide-react';
import { BottomNav } from '../layout/BottomNav';
import { useTheme } from '../../context/ThemeContext';

const menuItems = [
  { label: 'Edit Profile', icon: User, path: '/profile' },
  { label: 'Founder DNA Results', icon: Dna, path: '/founder-dna' },
  { label: 'Settings', icon: Settings, path: '' },
  { label: 'Help & Support', icon: HelpCircle, path: '' },
];

export function MyProfile() {
  const navigate = useNavigate();
  const { colors } = useTheme();

  return (
    <div className="min-h-screen flex flex-col max-w-[375px] mx-auto bg-[#FFF8F2] pb-20">
      {/* Header */}
      <div className="px-6 py-6">
        <h1 className="text-[32px] leading-[0.9] tracking-[-0.04em] text-[#3D2314]">
          Profile
        </h1>
      </div>

      {/* Avatar and info */}
      <div className="px-6 mb-8">
        <div className="bg-white rounded-3xl p-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4 text-[40px] text-white overflow-hidden" style={{ backgroundColor: colors.primary }}>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
              alt="You"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-[22px] leading-[1.1] tracking-[-0.02em] text-[#3D2314] mb-1">
            Alex Rivera
          </h2>
          <p className="text-[14px] text-[#6B5B52] text-center">
            Full-stack developer building the future of work
          </p>
        </div>
      </div>

      {/* Menu items */}
      <div className="px-6">
        <div className="bg-white rounded-2xl overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => item.path && navigate(item.path)}
                className={`w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left ${
                  index < menuItems.length - 1 ? 'border-b border-[rgba(61,35,20,0.08)]' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFF8F2] flex items-center justify-center">
                    <Icon className="w-5 h-5" style={{ color: colors.primary }} />
                  </div>
                  <span className="text-[15px] text-[#3D2314] font-medium">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#6B5B52]" />
              </button>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
