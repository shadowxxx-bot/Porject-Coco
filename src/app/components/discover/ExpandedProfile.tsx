import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Play, MapPin, Clock, Briefcase, Target, Zap } from 'lucide-react';
import { mockProfiles } from '../../data/mockProfiles';
import { mockEntrepreneurProfiles } from '../../data/mockEntrepreneurProfiles';
import { useTheme } from '../../context/ThemeContext';

export function ExpandedProfile() {
  const navigate = useNavigate();
  const { role, colors } = useTheme();
  const { profileId } = useParams();
  const id = parseInt(profileId || '1');

  const isEntrepreneur = role === 'entrepreneur';

  // Entrepreneur sees cofounder profiles, cofounder sees entrepreneur profiles
  if (!isEntrepreneur) {
    const ep = mockEntrepreneurProfiles.find((p) => p.id === id);
    if (!ep) { navigate('/discover'); return null; }
    return <EntrepreneurExpandedProfile ep={ep} colors={colors} navigate={navigate} />;
  }

  const profile = mockProfiles.find((p) => p.id === id);
  if (!profile) { navigate('/discover'); return null; }
  return <CofounderExpandedProfile profile={profile} colors={colors} navigate={navigate} />;
}

// ─── Entrepreneur profile (seen by cofounders) ──────────────────────

function EntrepreneurExpandedProfile({
  ep,
  colors,
  navigate,
}: {
  ep: typeof mockEntrepreneurProfiles[0];
  colors: { primary: string };
  navigate: ReturnType<typeof useNavigate>;
}) {
  return (
    <div className="min-h-screen flex flex-col max-w-[375px] mx-auto bg-[#FFF8F2] pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-[#FFF8F2] z-10 px-6 py-4 flex items-center">
        <button
          onClick={() => navigate('/discover')}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-[#3D2314]" />
        </button>
      </div>

      {/* Hero */}
      <div className="px-6 mb-5">
        <div className="bg-gradient-to-br from-[#3D2314] via-[#5A3A28] to-[#8B6B5A] rounded-3xl p-6 relative">
          <span className="inline-block px-3 py-1 bg-white/15 text-white text-[12px] rounded-full font-medium mb-4">
            {ep.projectName}
          </span>
          <p className="text-[18px] text-white/95 leading-[1.4] font-medium mb-6">
            "{ep.projectOneLiner}"
          </p>
          <div className="flex items-center gap-3">
            <img src={ep.photo} alt={ep.name} className="w-11 h-11 rounded-full border-2 border-white/30 object-cover" />
            <div>
              <h2 className="text-[17px] text-white font-medium">{ep.name}</h2>
              <p className="text-[13px] text-white/60">{ep.role}</p>
            </div>
          </div>
          <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full" style={{ backgroundColor: colors.primary }}>
            <span className="text-[13px] text-white font-medium">{ep.compatibility}%</span>
          </div>
        </div>
      </div>

      {/* Quick tags */}
      <div className="px-6 mb-4">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#3D2314] text-[13px] rounded-full">
            <Briefcase className="w-3.5 h-3.5 text-[#6B5B52]" />{ep.projectIndustry}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#3D2314] text-[13px] rounded-full">
            <Target className="w-3.5 h-3.5 text-[#6B5B52]" />{ep.projectStage}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#3D2314] text-[13px] rounded-full">
            <MapPin className="w-3.5 h-3.5 text-[#6B5B52]" />{ep.location}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#3D2314] text-[13px] rounded-full">
            <Clock className="w-3.5 h-3.5 text-[#6B5B52]" />{ep.hoursPerWeek}
          </span>
        </div>
      </div>

      {/* About the project */}
      <Section title="The Project" className="px-6 mb-4">
        <p className="text-[15px] text-[#3D2314] leading-[1.6] mb-4">{ep.projectDescription}</p>
        <div className="space-y-2.5">
          <InfoRow label="Customer" value={ep.customerType} />
          <InfoRow label="Traction" value={ep.traction} />
          <InfoRow label="Ambition" value={ep.ambition} />
          <InfoRow label="Timeline" value={ep.timeline} />
        </div>
      </Section>

      {/* About the founder */}
      <Section title="About the Founder" className="px-6 mb-4">
        <p className="text-[15px] text-[#3D2314] leading-[1.6]">{ep.bio}</p>
      </Section>

      {/* Looking for */}
      <Section title="Looking for a co-founder" className="px-6 mb-4">
        <p className="text-[15px] text-[#3D2314] leading-[1.6] mb-3">{ep.cofounderDescription}</p>
        <div className="flex flex-wrap gap-2">
          {ep.lookingFor.map((r) => (
            <span key={r} className="px-3 py-1.5 rounded-full text-[13px] text-white font-medium" style={{ backgroundColor: colors.primary }}>
              {r}
            </span>
          ))}
        </div>
      </Section>

      {/* Skills gap */}
      <Section title="Team & Skills" className="px-6 mb-4">
        <div className="space-y-4">
          <div>
            <span className="text-[12px] text-[#6B5B52] uppercase tracking-wide block mb-2">In the team</span>
            <div className="flex flex-wrap gap-2">
              {ep.skillsInTeam.map((s) => (
                <span key={s} className="px-3 py-1.5 bg-green-50 text-green-700 text-[13px] rounded-full">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[12px] text-[#6B5B52] uppercase tracking-wide block mb-2">Skills needed</span>
            <div className="flex flex-wrap gap-2">
              {ep.skillsMissing.map((s) => (
                <span key={s} className="px-3 py-1.5 bg-orange-50 text-orange-700 text-[13px] rounded-full border border-orange-200">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Motivation */}
      <Section title="Why this project" className="px-6 mb-4">
        <p className="text-[15px] text-[#3D2314] leading-[1.6] italic">"{ep.motivation}"</p>
      </Section>

      {/* Short-term goals */}
      <Section title="Short-term Goals" className="px-6 mb-4">
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
      </Section>

      {/* Working Style */}
      <Section title="Working Style" className="px-6 mb-6">
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
      </Section>

      {/* Connect button */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#FFF8F2] to-transparent max-w-[375px] mx-auto px-6 py-6">
        <button
          onClick={() => navigate(`/match/${ep.id}`)}
          className="w-full text-white py-4 rounded-full transition-all active:scale-[0.98] shadow-lg font-medium"
          style={{ backgroundColor: colors.primary }}
        >
          Connect with {ep.name}
        </button>
      </div>
    </div>
  );
}

// ─── Co-founder profile (seen by entrepreneurs) ─────────────────────

function CofounderExpandedProfile({
  profile,
  colors,
  navigate,
}: {
  profile: typeof mockProfiles[0];
  colors: { primary: string };
  navigate: ReturnType<typeof useNavigate>;
}) {
  return (
    <div className="min-h-screen flex flex-col max-w-[375px] mx-auto bg-[#FFF8F2] pb-24">
      <div className="sticky top-0 bg-[#FFF8F2] z-10 px-6 py-4 flex items-center">
        <button
          onClick={() => navigate('/discover')}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-[#3D2314]" />
        </button>
      </div>

      {/* Video */}
      <div className="px-6 mb-6">
        <div className="relative aspect-[4/3] bg-gray-200 rounded-3xl overflow-hidden">
          <img src={profile.videoThumbnail} alt={profile.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
            <Play className="w-7 h-7 text-[#3D2314] ml-1" fill="#3D2314" />
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="px-6 mb-6">
        <h1 className="text-[32px] leading-[1] tracking-[-0.03em] text-[#3D2314] mb-2">{profile.name}</h1>
        <p className="text-[15px] text-[#6B5B52] mb-1">{profile.location}</p>
        <p className="text-[16px] text-[#3D2314] mb-4">{profile.headline}</p>

        <div className="bg-white rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[15px] font-medium text-[#3D2314]">Compatibility</span>
            <span className="text-[18px] font-medium" style={{ color: colors.primary }}>{profile.compatibility}%</span>
          </div>
          <div className="h-2.5 bg-[#FFF8F2] rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${profile.compatibility}%`, backgroundColor: colors.primary }} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {profile.matchingTraits.map((trait) => (
            <span key={trait} className="px-3 py-2 bg-white text-[14px] rounded-full" style={{ color: colors.primary, borderWidth: 1, borderColor: `${colors.primary}33` }}>
              {trait}
            </span>
          ))}
        </div>
      </div>

      <Section title="About" className="px-6 mb-4">
        <p className="text-[15px] text-[#3D2314] leading-[1.6]">{profile.bio}</p>
      </Section>

      <Section title="Motivation" className="px-6 mb-4">
        <p className="text-[15px] text-[#3D2314] leading-[1.6] italic">"{profile.motivation}"</p>
      </Section>

      <Section title="Experience" className="px-6 mb-4">
        <div className="space-y-3">
          <InfoRow label="Years" value={`${profile.yearsExperience} years`} />
          <InfoRow label="Previous startups" value={String(profile.previousStartups)} />
          <InfoRow label="Availability" value={profile.availability} />
          <InfoRow label="Work style" value={profile.workStyle} />
          <div>
            <span className="text-[13px] text-[#6B5B52] block mb-2">Skills</span>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s) => (
                <span key={s} className="px-3 py-1.5 bg-[#FFF8F2] text-[#3D2314] text-[13px] rounded-full">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[13px] text-[#6B5B52] block mb-2">Industries of interest</span>
            <div className="flex flex-wrap gap-2">
              {profile.industries.map((ind) => (
                <span key={ind} className="px-3 py-1.5 bg-[#FFF8F2] text-[#3D2314] text-[13px] rounded-full">{ind}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Project preferences" className="px-6 mb-4">
        <p className="text-[15px] text-[#3D2314] leading-[1.6] mb-3">{profile.projectTypePreference}</p>
        <div className="flex flex-wrap gap-2">
          {profile.lookingFor.map((r) => (
            <span key={r} className="px-4 py-2 bg-[#FFF8F2] text-[#3D2314] text-[14px] rounded-full font-medium">{r}</span>
          ))}
        </div>
      </Section>

      {/* Personality traits */}
      <Section title="Working Style" className="px-6 mb-6">
        <div className="space-y-3">
          {profile.personalityTraits.map((trait) => (
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
      </Section>

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#FFF8F2] to-transparent max-w-[375px] mx-auto px-6 py-6">
        <button
          onClick={() => navigate(`/match/${profile.id}`)}
          className="w-full text-white py-4 rounded-full transition-all active:scale-[0.98] shadow-lg font-medium"
          style={{ backgroundColor: colors.primary }}
        >
          Connect with {profile.name}
        </button>
      </div>
    </div>
  );
}

// ─── Shared sub-components ──────────────────────────────────────────

function Section({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <h3 className="text-[20px] tracking-[-0.02em] text-[#3D2314] mb-3">{title}</h3>
      <div className="bg-white rounded-2xl p-5">{children}</div>
    </div>
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
