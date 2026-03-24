import { useNavigate, useLocation } from 'react-router';
import { Compass, Heart, Calendar, MessageCircle, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const tabs = [
  { id: 'discover', label: 'Discover', icon: Compass, path: '/discover' },
  { id: 'matches', label: 'Matches', icon: Heart, path: '/discover' },
  { id: 'events', label: 'Events', icon: Calendar, path: '/events' },
  { id: 'messages', label: 'Messages', icon: MessageCircle, path: '/messages' },
  { id: 'profile', label: 'Profile', icon: User, path: '/my-profile' },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { colors } = useTheme();

  const activeTab = location.pathname.startsWith('/events')
    ? 'events'
    : location.pathname === '/messages'
    ? 'messages'
    : location.pathname === '/my-profile'
    ? 'profile'
    : 'discover';

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[rgba(61,35,20,0.1)] max-w-[375px] mx-auto z-50">
      <div className="flex items-center justify-around py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-1 px-3 py-1"
            >
              <Icon className="w-6 h-6" style={{ color: isActive ? colors.primary : '#6B5B52' }} />
              <span className="text-[10px]" style={{ color: isActive ? colors.primary : '#6B5B52' }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
