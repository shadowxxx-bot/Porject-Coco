import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Heart, Play, X, SlidersHorizontal } from 'lucide-react';
import { mockProfiles } from '../../data/mockProfiles';
import { mockEntrepreneurProfiles } from '../../data/mockEntrepreneurProfiles';
import { BottomNav } from '../layout/BottomNav';
import { useTheme } from '../../context/ThemeContext';

export function DiscoveryFeed() {
  const navigate = useNavigate();
  const { role, colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Entrepreneurs see co-founder profiles, co-founders see entrepreneur profiles
  const isEntrepreneur = role === 'entrepreneur';
  const profiles = isEntrepreneur ? mockProfiles : mockProfiles;
  const entrepreneurProfiles = mockEntrepreneurProfiles;

  const profile = isEntrepreneur ? profiles[currentIndex % profiles.length] : profiles[currentIndex % profiles.length];
  const entProfile = !isEntrepreneur ? entrepreneurProfiles[currentIndex % entrepreneurProfiles.length] : null;

  const handleLike = () => {
    if (isEntrepreneur) {
      navigate(`/match/${profile.id}`);
    } else {
      navigate(`/match/${entProfile?.id || profile.id}`);
    }
  };

  const handleSkip = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  // Entrepreneur viewing co-founder profiles (same as before, with themed colors)
  if (isEntrepreneur) {
    return (
      <div className="min-h-screen flex flex-col max-w-[375px] mx-auto bg-[#FFF8F2] pb-20">
        <div className="sticky top-0 bg-[#FFF8F2] z-10 px-6 py-5 flex items-center justify-between">
          <h1 className="text-[32px] leading-[0.9] tracking-[-0.04em] text-[#3D2314]">Discover</h1>
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <SlidersHorizontal className="w-5 h-5 text-[#6B5B52]" />
          </button>
        </div>

        <div className="flex-1 px-4 space-y-4">
          {/* Video Section */}
          <div className="relative rounded-3xl overflow-hidden">
            <div className="aspect-[4/3] bg-gray-200">
              <img src={profile.videoThumbnail} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
              <Play className="w-7 h-7 text-[#3D2314] ml-1" fill="#3D2314" />
            </button>
            <button onClick={handleSkip} className="absolute top-4 right-4 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center">
              <X className="w-4 h-4 text-white" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-[28px] leading-[1] tracking-[-0.02em] text-white font-medium mb-1">{profile.name}</h2>
                  <p className="text-[14px] text-white/80">{profile.location}</p>
                </div>
                <div className="px-3 py-1.5 rounded-full" style={{ backgroundColor: colors.primary }}>
                  <span className="text-[14px] text-white font-medium">{profile.compatibility}% match</span>
                </div>
              </div>
            </div>
          </div>

          <ThemedProfileCard title="About me" onLike={handleLike} colors={colors}>
            <p className="text-[16px] text-[#3D2314] font-medium mb-2">{profile.headline}</p>
            <p className="text-[15px] text-[#6B5B52] leading-[1.6]">{profile.bio}</p>
          </ThemedProfileCard>

          <ThemedProfileCard title="My pitch" onLike={handleLike} colors={colors}>
            <p className="text-[15px] text-[#3D2314] leading-[1.6]">{profile.pitch}</p>
          </ThemedProfileCard>

          <ThemedProfileCard title="Looking for" onLike={handleLike} colors={colors}>
            <div className="flex flex-wrap gap-2">
              {profile.lookingFor.map((r) => (
                <span key={r} className="px-4 py-2 bg-[#FFF8F2] text-[#3D2314] text-[14px] rounded-full font-medium">{r}</span>
              ))}
            </div>
          </ThemedProfileCard>

          <ThemedProfileCard title="Founder DNA" onLike={handleLike} colors={colors}>
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.matchingTraits.map((trait) => (
                <span key={trait} className="px-3 py-1.5 bg-[#FFF8F2] text-[13px] rounded-full border" style={{ color: colors.primary, borderColor: `${colors.primary}33` }}>
                  {trait}
                </span>
              ))}
            </div>
            <div className="space-y-3">
              {profile.personalityTraits.slice(0, 5).map((trait) => (
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
          </ThemedProfileCard>

          <button onClick={handleSkip} className="w-full text-center py-6 text-[14px] text-[#6B5B52] hover:text-[#3D2314] transition-colors">
            Skip this profile
          </button>
        </div>

        <BottomNav />
      </div>
    );
  }

  // Co-founder viewing entrepreneur profiles
  const ep = entrepreneurProfiles[currentIndex % entrepreneurProfiles.length];

  return (
    <div className="min-h-screen flex flex-col max-w-[375px] mx-auto bg-[#FFF8F2] pb-20">
      <div className="sticky top-0 bg-[#FFF8F2] z-10 px-6 py-5 flex items-center justify-between">
        <h1 className="text-[32px] leading-[0.9] tracking-[-0.04em] text-[#3D2314]">Discover</h1>
        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
          <SlidersHorizontal className="w-5 h-5 text-[#6B5B52]" />
        </button>
      </div>

      <div className="flex-1 px-4 space-y-4">
        {/* Project gradient card (replaces video for entrepreneurs) */}
        <div className="relative rounded-3xl overflow-hidden">
          <div className="aspect-[4/3] bg-gradient-to-br from-[#3D2314] to-[#6B5B52] flex items-center justify-center p-8">
            <p className="text-[18px] text-white/90 leading-[1.5] text-center italic">
              "{ep.projectOneLiner}"
            </p>
          </div>
          <button onClick={handleSkip} className="absolute top-4 right-4 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center">
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-[28px] leading-[1] tracking-[-0.02em] text-white font-medium mb-1">{ep.name}</h2>
                <p className="text-[14px] text-white/80">{ep.location}</p>
              </div>
              <div className="px-3 py-1.5 rounded-full" style={{ backgroundColor: colors.primary }}>
                <span className="text-[14px] text-white font-medium">{ep.compatibility}% match</span>
              </div>
            </div>
          </div>
        </div>

        {/* Industry + Stage badges */}
        <ThemedProfileCard title="Project" onLike={() => navigate(`/match/${ep.id}`)} colors={colors}>
          <p className="text-[16px] text-[#3D2314] font-medium mb-3">{ep.headline}</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-full text-[13px] text-white" style={{ backgroundColor: colors.primary }}>
              {ep.projectIndustry}
            </span>
            <span className="px-3 py-1.5 bg-[#3D2314] text-white text-[13px] rounded-full">
              {ep.projectStage}
            </span>
            <span className="px-3 py-1.5 bg-[#FFF8F2] text-[#3D2314] text-[13px] rounded-full">
              {ep.ambition}
            </span>
          </div>
        </ThemedProfileCard>

        {/* Looking for */}
        <ThemedProfileCard title="Looking for" onLike={() => navigate(`/match/${ep.id}`)} colors={colors}>
          <div className="flex flex-wrap gap-2">
            {ep.lookingFor.map((r) => (
              <span key={r} className="px-4 py-2 bg-[#FFF8F2] text-[#3D2314] text-[14px] rounded-full font-medium">{r}</span>
            ))}
          </div>
        </ThemedProfileCard>

        {/* Working Style */}
        <ThemedProfileCard title="Working Style" onLike={() => navigate(`/match/${ep.id}`)} colors={colors}>
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
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[13px] text-[#6B5B52]">Compatibility</span>
            <span className="text-[14px] font-medium" style={{ color: colors.primary }}>{ep.compatibility}%</span>
          </div>
        </ThemedProfileCard>

        {/* Skills */}
        <ThemedProfileCard title="Skills & Commitment" onLike={() => navigate(`/match/${ep.id}`)} colors={colors}>
          <div className="space-y-3">
            <div>
              <span className="text-[13px] text-[#6B5B52] block mb-2">Skills</span>
              <div className="flex flex-wrap gap-2">
                {ep.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-[#FFF8F2] text-[#3D2314] text-[13px] rounded-full">{skill}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#6B5B52]">Availability</span>
              <span className="text-[14px] text-[#3D2314] font-medium">{ep.hoursPerWeek}</span>
            </div>
          </div>
        </ThemedProfileCard>

        <button onClick={handleSkip} className="w-full text-center py-6 text-[14px] text-[#6B5B52] hover:text-[#3D2314] transition-colors">
          Skip this profile
        </button>
      </div>

      <BottomNav />
    </div>
  );
}

function ThemedProfileCard({
  title,
  children,
  onLike,
  colors,
}: {
  title: string;
  children: React.ReactNode;
  onLike: () => void;
  colors: { primary: string };
}) {
  return (
    <div className="bg-white rounded-2xl p-5 relative">
      <h3 className="text-[13px] text-[#6B5B52] uppercase tracking-wide mb-3">{title}</h3>
      {children}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onLike();
        }}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#FFF8F2] flex items-center justify-center hover:text-white transition-all group"
        style={{ ['--hover-bg' as string]: colors.primary }}
      >
        <Heart className="w-5 h-5 group-hover:text-white" style={{ color: colors.primary }} />
      </button>
    </div>
  );
}
