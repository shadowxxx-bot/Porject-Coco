import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { useTheme } from '../context/ThemeContext';

const conversations = [
  {
    id: 1,
    name: 'Sarah Chen',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    lastMessage: 'Would love to chat more about your climate tech idea!',
    timestamp: '2m ago',
    unread: true,
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    lastMessage: 'Thanks for connecting! When are you free for a call?',
    timestamp: '1h ago',
    unread: true,
  },
  {
    id: 3,
    name: 'Priya Sharma',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    lastMessage: 'That sounds amazing! Let me know if you want to grab coffee',
    timestamp: '3h ago',
    unread: false,
  },
  {
    id: 4,
    name: 'Alex Rivera',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    lastMessage: 'Really impressed by your background at Stripe',
    timestamp: '1d ago',
    unread: false,
  },
  {
    id: 5,
    name: 'Emily Zhang',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    lastMessage: 'Would you be interested in joining our early stage team?',
    timestamp: '2d ago',
    unread: false,
  },
];

export function MessagesScreen() {
  const navigate = useNavigate();
  const { colors } = useTheme();

  return (
    <div className="min-h-screen flex flex-col max-w-[375px] mx-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-[#FFF8F2] z-10 px-6 py-4 border-b border-[rgba(61,35,20,0.1)]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/discover')}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-[#3D2314]" />
          </button>
          <h1 className="text-[28px] leading-[1] tracking-[-0.03em] text-[#3D2314]">
            Messages
          </h1>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-8 py-20">
            <div className="text-[64px] mb-4">💬</div>
            <h2 className="text-[24px] tracking-[-0.02em] text-[#3D2314] mb-2 text-center">
              No messages yet
            </h2>
            <p className="text-[15px] text-[#6B5B52] text-center mb-6">
              Start connecting with co-founders to begin conversations
            </p>
            <button
              onClick={() => navigate('/discover')}
              className="text-white px-6 py-3 rounded-full transition-all"
              style={{ backgroundColor: colors.primary }}
            >
              Start browsing
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[rgba(61,35,20,0.1)]">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                className="w-full px-6 py-4 flex items-center gap-4 hover:bg-white/50 transition-colors text-left"
              >
                {/* Profile Photo */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={conversation.photo}
                      alt={conversation.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {conversation.unread && (
                    <div className="absolute top-0 right-0 w-3 h-3 rounded-full border-2 border-[#FFF8F2]" style={{ backgroundColor: colors.primary }} />
                  )}
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-[16px] text-[#3D2314] font-medium">
                      {conversation.name}
                    </h3>
                    <span className="text-[12px] text-[#6B5B52]">
                      {conversation.timestamp}
                    </span>
                  </div>
                  <p
                    className={`text-[14px] truncate ${
                      conversation.unread
                        ? 'text-[#3D2314] font-medium'
                        : 'text-[#6B5B52]'
                    }`}
                  >
                    {conversation.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
