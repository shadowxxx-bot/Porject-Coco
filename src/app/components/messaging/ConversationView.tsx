import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Send, Briefcase, Sparkles } from 'lucide-react';
import { mockConversations } from '../../data/mockMatches';
import { useTheme } from '../../context/ThemeContext';
import type { Message } from '../../data/mockMatches';

export function ConversationView() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { conversationId } = useParams();
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = mockConversations.find((c) => c.id === parseInt(conversationId || '1'));

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages);
    }
  }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!conversation) {
    navigate('/messages');
    return null;
  }

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    const newMessage: Message = {
      id: messages.length + 1,
      senderId: 'me',
      text,
      timestamp: 'Just now',
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-[375px] mx-auto bg-[#FFF8F2]">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-[rgba(61,35,20,0.08)] shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/messages')}
            className="w-9 h-9 rounded-full bg-[#FFF8F2] flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-[#3D2314]" />
          </button>
          <img
            src={conversation.photo}
            alt={conversation.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-[15px] text-[#3D2314] font-medium leading-tight">{conversation.name}</h2>
            <p className="text-[12px] text-[#6B5B52] truncate">{conversation.projectName}</p>
          </div>
        </div>
      </div>

      {/* Match Context Banner */}
      <div className="mx-4 mt-3 mb-1">
        <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 border border-[rgba(61,35,20,0.06)]">
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${colors.primary}15` }}>
            <Sparkles className="w-4 h-4" style={{ color: colors.primary }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] text-[#6B5B52]">
              You matched on <span className="font-medium text-[#3D2314]">{conversation.projectName}</span>
              {' '}<span className="text-[11px]">({conversation.compatibility}% compatible)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.senderId === 'me';
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${isMe ? 'order-1' : 'order-1'}`}>
                <div
                  className={`px-4 py-2.5 rounded-2xl text-[14px] leading-[1.5] ${
                    isMe
                      ? 'rounded-br-md text-white'
                      : 'rounded-bl-md bg-white text-[#3D2314] border border-[rgba(61,35,20,0.06)]'
                  }`}
                  style={isMe ? { backgroundColor: colors.primary } : undefined}
                >
                  {msg.text}
                </div>
                <p className={`text-[10px] text-[#6B5B52] mt-1 ${isMe ? 'text-right' : 'text-left'} px-1`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-white border-t border-[rgba(61,35,20,0.08)] px-4 py-3">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-[#FFF8F2] rounded-2xl px-4 py-2.5 min-h-[44px] flex items-center">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full bg-transparent text-[14px] text-[#3D2314] placeholder-[#6B5B52]/50 resize-none outline-none max-h-[100px]"
              rows={1}
              style={{ lineHeight: '1.5' }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-30"
            style={{ backgroundColor: colors.primary }}
          >
            <Send className="w-4.5 h-4.5 text-white ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
