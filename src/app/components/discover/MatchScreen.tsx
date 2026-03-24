import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { mockProfiles } from '../../data/mockProfiles';
import { useTheme } from '../../context/ThemeContext';

export function MatchScreen() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { profileId } = useParams();
  const [showConfetti, setShowConfetti] = useState(true);

  const profile = mockProfiles.find((p) => p.id === parseInt(profileId || '1'));
  const myPhoto = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!profile) {
    navigate('/discover');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 max-w-[375px] mx-auto relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {['🎉', '✨', '🎊', '⭐', '💫'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes confetti {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti linear forwards;
          font-size: 24px;
        }
      `}</style>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <div className="text-[56px] mb-4">🎉</div>
          <h1 className="text-[42px] leading-[1] tracking-[-0.04em] text-[#3D2314] mb-3">
            It's a Match!
          </h1>
          <p className="text-[16px] text-[#6B5B52]">
            You and {profile.name} are a match!
          </p>
        </div>

        {/* Photos */}
        <div className="relative mb-8">
          <div className="flex items-center gap-4">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img src={myPhoto} alt="You" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: colors.primary }}>
                <span className="text-[32px]">🤝</span>
              </div>
            </div>
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 mb-6 max-w-[300px]">
          <p className="text-[15px] text-[#3D2314] text-center leading-[1.5]">
            You both showed interest! Start a conversation and see if you're the perfect co-founder match.
          </p>
        </div>
      </div>

      <div className="w-full pb-8 space-y-3">
        <button
          onClick={() => navigate('/messages')}
          className="w-full text-white py-4 rounded-full transition-all active:scale-[0.98]"
          style={{ backgroundColor: colors.primary }}
        >
          Send a message
        </button>
        <button
          onClick={() => navigate('/discover')}
          className="w-full text-[#6B5B52] py-3 hover:text-[#3D2314] transition-colors"
        >
          Keep browsing
        </button>
      </div>
    </div>
  );
}
