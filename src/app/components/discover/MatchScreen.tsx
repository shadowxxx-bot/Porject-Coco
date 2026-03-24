import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Heart, MessageCircle, ArrowRight } from 'lucide-react';
import { mockEntrepreneurProfiles } from '../../data/mockEntrepreneurProfiles';
import { mockProfiles } from '../../data/mockProfiles';
import { useTheme } from '../../context/ThemeContext';

export function MatchScreen() {
  const navigate = useNavigate();
  const { role, colors } = useTheme();
  const { profileId } = useParams();
  const [phase, setPhase] = useState<'enter' | 'reveal' | 'content'>('enter');

  const isEntrepreneur = role === 'entrepreneur';
  const profile = isEntrepreneur
    ? mockProfiles.find((p) => p.id === parseInt(profileId || '1'))
    : mockEntrepreneurProfiles.find((p) => p.id === parseInt(profileId || '101'));

  const myPhoto = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 600);
    const t2 = setTimeout(() => setPhase('content'), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!profile) {
    navigate('/discover');
    return null;
  }

  const matchedName = profile.name;
  const matchedPhoto = profile.photo;
  const projectInfo = !isEntrepreneur && 'projectName' in profile
    ? (profile as typeof mockEntrepreneurProfiles[0]).projectName
    : null;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center max-w-[375px] mx-auto relative overflow-hidden"
      style={{ backgroundColor: colors.primary }}
    >
      <style>{`
        @keyframes match-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes match-heart {
          0% { transform: scale(0) rotate(-15deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(0deg); opacity: 1; }
          70% { transform: scale(0.9) rotate(0deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes match-photos {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes match-text {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes match-particle {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        .match-pulse-ring {
          animation: match-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .match-heart {
          animation: match-heart 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s forwards;
          opacity: 0;
        }
        .match-photos {
          animation: match-photos 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .match-text-1 { animation: match-text 0.5s ease-out 1.2s forwards; opacity: 0; }
        .match-text-2 { animation: match-text 0.5s ease-out 1.4s forwards; opacity: 0; }
        .match-text-3 { animation: match-text 0.5s ease-out 1.6s forwards; opacity: 0; }
        .match-buttons { animation: match-text 0.5s ease-out 1.8s forwards; opacity: 0; }
      `}</style>

      {/* Pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full border-2 border-white/20 match-pulse-ring" />
        <div className="absolute w-80 h-80 rounded-full border border-white/10 match-pulse-ring" style={{ animationDelay: '0.5s' }} />
        <div className="absolute w-96 h-96 rounded-full border border-white/5 match-pulse-ring" style={{ animationDelay: '1s' }} />
      </div>

      {/* Particles */}
      {phase !== 'enter' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) * (Math.PI / 180);
            const distance = 80 + Math.random() * 60;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-white/60"
                style={{
                  ['--tx' as string]: `${Math.cos(angle) * distance}px`,
                  ['--ty' as string]: `${Math.sin(angle) * distance}px`,
                  animation: `match-particle 1s cubic-bezier(0.4, 0, 0.2, 1) ${0.6 + i * 0.05}s forwards`,
                }}
              />
            );
          })}
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center px-8 w-full">
        {/* Photos + Heart */}
        <div className="relative mb-8 match-photos">
          <div className="flex items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl z-10">
              <img src={myPhoto} alt="You" className="w-full h-full object-cover" />
            </div>
            <div className="-ml-4 w-28 h-28 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl z-10">
              <img src={matchedPhoto} alt={matchedName} className="w-full h-full object-cover" />
            </div>
          </div>
          {/* Heart badge */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 match-heart">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6" style={{ color: colors.primary }} fill={colors.primary} />
            </div>
          </div>
        </div>

        {/* Text */}
        <h1 className="match-text-1 text-[40px] leading-[1] tracking-[-0.04em] text-white font-bold mb-2 text-center">
          It's a Match!
        </h1>
        <p className="match-text-2 text-[16px] text-white/80 text-center mb-2">
          You and {matchedName} want to connect
        </p>
        {projectInfo && (
          <p className="match-text-3 text-[14px] text-white/60 text-center">
            Project: {projectInfo}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="w-full px-8 pb-10 space-y-3 match-buttons">
        <button
          onClick={() => navigate('/messages')}
          className="w-full flex items-center justify-center gap-2 bg-white py-4 rounded-full font-medium transition-all active:scale-[0.98] shadow-lg"
          style={{ color: colors.primary }}
        >
          <MessageCircle className="w-5 h-5" />
          Send a message
        </button>
        <button
          onClick={() => navigate('/discover')}
          className="w-full flex items-center justify-center gap-2 text-white/80 py-3 hover:text-white transition-colors"
        >
          Keep browsing
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
