import { useNavigate } from 'react-router';
import { Briefcase } from 'lucide-react';
import { mockConversations } from '../../data/mockMatches';
import { BottomNav } from '../layout/BottomNav';
import { useTheme } from '../../context/ThemeContext';

export function MessagesScreen() {
  const navigate = useNavigate();
  const { colors } = useTheme();

  const getLastMessage = (conv: typeof mockConversations[0]) => {
    const last = conv.messages[conv.messages.length - 1];
    const prefix = last.senderId === 'me' ? 'You: ' : '';
    return prefix + last.text;
  };

  const getTimestamp = (conv: typeof mockConversations[0]) => {
    return conv.messages[conv.messages.length - 1].timestamp;
  };

  return (
    <div className="min-h-screen flex flex-col max-w-[375px] mx-auto bg-[#FFF8F2] pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-[#FFF8F2] z-10 px-6 py-5 border-b border-[rgba(61,35,20,0.08)]">
        <h1 className="text-[32px] leading-[0.9] tracking-[-0.04em] text-[#3D2314]">Messages</h1>
      </div>

      {/* Conversations */}
      <div className="flex-1">
        {mockConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-8 py-20">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4">
              <span className="text-[32px]">💬</span>
            </div>
            <h2 className="text-[22px] tracking-[-0.02em] text-[#3D2314] mb-2 text-center">No messages yet</h2>
            <p className="text-[15px] text-[#6B5B52] text-center mb-6">Match with co-founders to start conversations</p>
            <button
              onClick={() => navigate('/discover')}
              className="text-white px-6 py-3 rounded-full"
              style={{ backgroundColor: colors.primary }}
            >
              Browse profiles
            </button>
          </div>
        ) : (
          <div>
            {mockConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => navigate(`/conversation/${conv.id}`)}
                className="w-full px-5 py-4 flex items-center gap-3.5 hover:bg-white/50 active:bg-white/70 transition-colors text-left border-b border-[rgba(61,35,20,0.06)]"
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={conv.photo}
                    alt={conv.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  {conv.unread > 0 && (
                    <div
                      className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full border-2 border-[#FFF8F2] flex items-center justify-center"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <span className="text-[10px] text-white font-bold">{conv.unread}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className={`text-[15px] text-[#3D2314] ${conv.unread > 0 ? 'font-semibold' : 'font-medium'}`}>
                      {conv.name}
                    </h3>
                    <span className="text-[11px] text-[#6B5B52] flex-shrink-0 ml-2">{getTimestamp(conv)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Briefcase className="w-3 h-3 text-[#6B5B52] flex-shrink-0" />
                    <span className="text-[12px] text-[#6B5B52] truncate">{conv.projectName}</span>
                  </div>
                  <p className={`text-[13px] truncate ${conv.unread > 0 ? 'text-[#3D2314] font-medium' : 'text-[#6B5B52]'}`}>
                    {getLastMessage(conv)}
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
