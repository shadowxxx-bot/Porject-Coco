import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Heart, Play, X, SlidersHorizontal, MapPin, Clock, Briefcase, Target, Zap, Code } from 'lucide-react';
import { mockProfiles } from '../../data/mockProfiles';
import { mockEntrepreneurProfiles } from '../../data/mockEntrepreneurProfiles';
import { BottomNav } from '../layout/BottomNav';
import { useTheme } from '../../context/ThemeContext';

type SwipeDirection = 'left' | 'right' | null;

export function DiscoveryFeed() {
  const navigate = useNavigate();
  const { role, colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDir, setSwipeDir] = useState<SwipeDirection>(null);
  const [liked, setLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const isEntrepreneur = role === 'entrepreneur';
  const profiles = isEntrepreneur ? mockProfiles : mockEntrepreneurProfiles;
  const totalProfiles = profiles.length;

  const goNext = useCallback((direction: SwipeDirection) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSwipeDir(direction);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalProfiles);
      setSwipeDir(null);
      setLiked(false);
      setIsAnimating(false);
    }, 400);
  }, [isAnimating, totalProfiles]);

  const handleMatch = useCallback(() => {
    if (isAnimating) return;
    setLiked(true);

    const isMutualMatch = Math.random() > 0.5;

    setTimeout(() => {
      if (isMutualMatch) {
        const profile = profiles[currentIndex % totalProfiles];
        navigate(`/match/${profile.id}`);
      } else {
        goNext('right');
      }
    }, 600);
  }, [isAnimating, currentIndex, totalProfiles, profiles, navigate, goNext]);

  const handleSkip = useCallback(() => {
    goNext('left');
  }, [goNext]);

  const cardStyle = swipeDir
    ? {
        transform: swipeDir === 'left'
          ? 'translateX(-120%) rotate(-8deg)'
          : 'translateX(120%) rotate(8deg)',
        opacity: 0,
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
      }
    : {
        transform: 'translateX(0) rotate(0)',
        opacity: 1,
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
      };

  const headerTitle = isEntrepreneur ? 'Find a co-founder' : 'Find a project';

  // ─── Entrepreneur viewing co-founder profiles ──────────────────────
  if (isEntrepreneur) {
    const profile = mockProfiles[currentIndex % mockProfiles.length];
    return (
      <div className="min-h-screen flex flex-col max-w-[375px] mx-auto bg-[#FFF8F2]">
        <div className="sticky top-0 bg-[#FFF8F2] z-10 px-6 py-5 flex items-center justify-between">
          <h1 className="text-[32px] leading-[0.9] tracking-[-0.04em] text-[#3D2314]">{headerTitle}</h1>
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <SlidersHorizontal className="w-5 h-5 text-[#6B5B52]" />
          </button>
        </div>

        <div className="flex-1 px-4 space-y-4 pb-40 overflow-y-auto" style={cardStyle}>
          {/* Video Section */}
          <div className="relative rounded-3xl overflow-hidden">
            <div className="aspect-[4/3] bg-gray-200">
              <img src={profile.videoThumbnail} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
              <Play className="w-7 h-7 text-[#3D2314] ml-1" fill="#3D2314" />
            </button>

            {liked && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-like-pop">
                  <Heart className="w-24 h-24 text-white drop-shadow-lg" fill="white" />
                </div>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-[28px] leading-[1] tracking-[-0.02em] text-white font-medium mb-1">{profile.name}</h2>
                  <p className="text-[14px] text-white/80">{profile.role} · {profile.location}</p>
                </div>
                <div className="px-3 py-1.5 rounded-full" style={{ backgroundColor: colors.primary }}>
                  <span className="text-[14px] text-white font-medium">{profile.compatibility}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Tags */}
          <div className="flex flex-wrap gap-2">
            <QuickTag icon={<Code className="w-3.5 h-3.5" />} label={profile.role} />
            <QuickTag icon={<MapPin className="w-3.5 h-3.5" />} label={profile.location} />
            <QuickTag icon={<Clock className="w-3.5 h-3.5" />} label={profile.availability} />
          </div>

          <ProfileSection title="About">
            <p className="text-[16px] text-[#3D2314] font-medium mb-2">{profile.headline}</p>
            <p className="text-[15px] text-[#6B5B52] leading-[1.6]">{profile.bio}</p>
          </ProfileSection>

          <ProfileSection title="Key skills">
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s) => (
                <span key={s} className="px-3 py-1.5 bg-[#FFF8F2] text-[#3D2314] text-[13px] rounded-full">{s}</span>
              ))}
            </div>
          </ProfileSection>

          <ProfileSection title="Looking to join">
            <p className="text-[15px] text-[#3D2314] leading-[1.6] mb-3">{profile.projectTypePreference}</p>
            <div className="flex flex-wrap gap-2">
              {profile.lookingFor.map((r) => (
                <span key={r} className="px-3 py-1.5 rounded-full text-[13px] text-white font-medium" style={{ backgroundColor: colors.primary }}>{r}</span>
              ))}
            </div>
          </ProfileSection>

          <ProfileSection title="Motivation">
            <p className="text-[15px] text-[#3D2314] leading-[1.6] italic">"{profile.motivation}"</p>
          </ProfileSection>

          <ProfileSection title="Industries of interest">
            <div className="flex flex-wrap gap-2">
              {profile.industries.map((ind) => (
                <span key={ind} className="px-3 py-1.5 bg-[#FFF8F2] text-[#3D2314] text-[13px] rounded-full">{ind}</span>
              ))}
            </div>
          </ProfileSection>

          <ProfileSection title="Working style">
            <div className="flex flex-wrap gap-2 mb-3">
              {profile.matchingTraits.map((trait) => (
                <span key={trait} className="px-3 py-1.5 bg-[#FFF8F2] text-[13px] rounded-full border" style={{ color: colors.primary, borderColor: `${colors.primary}33` }}>
                  {trait}
                </span>
              ))}
            </div>
            <p className="text-[14px] text-[#6B5B52] leading-[1.5]">{profile.workStyle}</p>
          </ProfileSection>
        </div>

        <ActionButtons onSkip={handleSkip} onMatch={handleMatch} colors={colors} liked={liked} />
        <BottomNav />
        <SwipeStyles />
      </div>
    );
  }

  // ─── Co-founder viewing entrepreneur profiles ──────────────────────
  const ep = mockEntrepreneurProfiles[currentIndex % mockEntrepreneurProfiles.length];

  return (
    <div className="min-h-screen flex flex-col max-w-[375px] mx-auto bg-[#FFF8F2]">
      <div className="sticky top-0 bg-[#FFF8F2] z-10 px-6 py-5 flex items-center justify-between">
        <h1 className="text-[32px] leading-[0.9] tracking-[-0.04em] text-[#3D2314]">{headerTitle}</h1>
        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
          <SlidersHorizontal className="w-5 h-5 text-[#6B5B52]" />
        </button>
      </div>

      <div className="flex-1 px-4 space-y-4 pb-40 overflow-y-auto" style={cardStyle}>
        {/* Hero Card — Project Showcase */}
        <div className="relative rounded-3xl overflow-hidden">
          <div className="aspect-[4/3] bg-gradient-to-br from-[#3D2314] via-[#5A3A28] to-[#8B6B5A] flex flex-col items-center justify-center p-8 relative">
            <div className="absolute top-5 left-5">
              <span className="px-3 py-1.5 bg-white/15 backdrop-blur-sm text-white text-[13px] rounded-full font-medium">
                {ep.projectName}
              </span>
            </div>
            <p className="text-[20px] text-white/95 leading-[1.4] text-center font-medium max-w-[280px]">
              "{ep.projectOneLiner}"
            </p>
          </div>

          {liked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-3xl">
              <div className="animate-like-pop">
                <Heart className="w-24 h-24 text-white drop-shadow-lg" fill="white" />
              </div>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/40 to-transparent">
            <div className="flex items-end justify-between">
              <div className="flex items-center gap-3">
                <img src={ep.photo} alt={ep.name} className="w-12 h-12 rounded-full border-2 border-white/50 object-cover" />
                <div>
                  <h2 className="text-[22px] leading-[1] tracking-[-0.02em] text-white font-medium">{ep.name}</h2>
                  <p className="text-[13px] text-white/70 mt-0.5">{ep.role}</p>
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-full" style={{ backgroundColor: colors.primary }}>
                <span className="text-[13px] text-white font-medium">{ep.compatibility}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info Tags */}
        <div className="flex flex-wrap gap-2">
          <QuickTag icon={<Briefcase className="w-3.5 h-3.5" />} label={ep.projectIndustry} />
          <QuickTag icon={<Target className="w-3.5 h-3.5" />} label={ep.projectStage} />
          <QuickTag icon={<MapPin className="w-3.5 h-3.5" />} label={ep.location} />
          <QuickTag icon={<Clock className="w-3.5 h-3.5" />} label={ep.hoursPerWeek} />
        </div>

        {/* Project Details */}
        <ProfileSection title="The Project">
          <p className="text-[15px] text-[#3D2314] leading-[1.6] mb-4">{ep.projectDescription}</p>
          <div className="space-y-2.5">
            <InfoRow label="Customer" value={ep.customerType} />
            <InfoRow label="Traction" value={ep.traction} />
            <InfoRow label="Ambition" value={ep.ambition} />
          </div>
        </ProfileSection>

        {/* Looking for */}
        <ProfileSection title="Looking for a co-founder">
          <p className="text-[15px] text-[#3D2314] leading-[1.6] mb-3">{ep.cofounderDescription}</p>
          <div className="flex flex-wrap gap-2">
            {ep.lookingFor.map((r) => (
              <span key={r} className="px-3 py-1.5 rounded-full text-[13px] text-white font-medium" style={{ backgroundColor: colors.primary }}>
                {r}
              </span>
            ))}
          </div>
        </ProfileSection>

        {/* Skills Gap */}
        <ProfileSection title="Team & Skills">
          <div className="space-y-4">
            <div>
              <span className="text-[12px] text-[#6B5B52] uppercase tracking-wide block mb-2">Already in the team</span>
              <div className="flex flex-wrap gap-2">
                {ep.skillsInTeam.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-green-50 text-green-700 text-[13px] rounded-full">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[12px] text-[#6B5B52] uppercase tracking-wide block mb-2">Skills needed</span>
              <div className="flex flex-wrap gap-2">
                {ep.skillsMissing.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-orange-50 text-orange-700 text-[13px] rounded-full border border-orange-200">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </ProfileSection>

        {/* Motivation */}
        <ProfileSection title="Why this project">
          <p className="text-[15px] text-[#3D2314] leading-[1.6] italic">"{ep.motivation}"</p>
        </ProfileSection>

        {/* Working Style */}
        <ProfileSection title="Working Style">
          <div className="flex flex-wrap gap-2 mb-4">
            {ep.matchingTraits.map((trait) => (
              <span key={trait} className="px-3 py-1.5 bg-[#FFF8F2] text-[13px] rounded-full border" style={{ color: colors.primary, borderColor: `${colors.primary}33` }}>
                {trait}
              </span>
            ))}
          </div>
          <div className="space-y-3">
            {ep.personalityTraits.map((trait) => (
              <div key={trait.label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[13px] text-[#3D2314]">{trait.label}</span>
                  <span className="text-[12px] text-[#6B5B52]">{trait.value}%</span>
                </div>
                <div className="h-1.5 bg-[#FFF8F2] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${trait.value}%`, backgroundColor: colors.primary }} />
                </div>
              </div>
            ))}
          </div>
        </ProfileSection>

        {/* Short-term Goals */}
        <ProfileSection title="Short-term Goals">
          <div className="space-y-2.5">
            {ep.shortTermGoals.map((goal, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FFF8F2] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                </div>
                <p className="text-[14px] text-[#3D2314] leading-[1.5]">{goal}</p>
              </div>
            ))}
          </div>
        </ProfileSection>
      </div>

      <ActionButtons onSkip={handleSkip} onMatch={handleMatch} colors={colors} liked={liked} />
      <BottomNav />
      <SwipeStyles />
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────

function ProfileSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-5">
      <h3 className="text-[13px] text-[#6B5B52] uppercase tracking-wide mb-3">{title}</h3>
      {children}
    </div>
  );
}

function QuickTag({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#3D2314] text-[13px] rounded-full">
      <span className="text-[#6B5B52]">{icon}</span>
      {label}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-[13px] text-[#6B5B52] flex-shrink-0">{label}</span>
      <span className="text-[13px] text-[#3D2314] font-medium text-right">{value}</span>
    </div>
  );
}

function ActionButtons({
  onSkip,
  onMatch,
  colors,
  liked,
}: {
  onSkip: () => void;
  onMatch: () => void;
  colors: { primary: string };
  liked: boolean;
}) {
  return (
    <div className="fixed bottom-[72px] left-0 right-0 max-w-[375px] mx-auto px-6 pb-4 pt-3 bg-gradient-to-t from-[#FFF8F2] via-[#FFF8F2] to-transparent z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={onSkip}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-white border border-[rgba(61,35,20,0.12)] rounded-full text-[#6B5B52] font-medium transition-all active:scale-[0.97] hover:bg-gray-50"
        >
          <X className="w-5 h-5" />
          Skip
        </button>
        <button
          onClick={onMatch}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-full text-white font-medium transition-all active:scale-[0.97] shadow-lg"
          style={{
            backgroundColor: liked ? '#e74c6f' : colors.primary,
            boxShadow: `0 4px 14px ${colors.primary}40`,
          }}
        >
          <Heart className="w-5 h-5" fill={liked ? 'white' : 'none'} />
          {liked ? 'Liked!' : 'Match'}
        </button>
      </div>
    </div>
  );
}

function SwipeStyles() {
  return (
    <style>{`
      @keyframes like-pop {
        0% { transform: scale(0); opacity: 0; }
        50% { transform: scale(1.3); opacity: 1; }
        70% { transform: scale(0.9); }
        100% { transform: scale(1); opacity: 1; }
      }
      .animate-like-pop {
        animation: like-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      }
    `}</style>
  );
}
