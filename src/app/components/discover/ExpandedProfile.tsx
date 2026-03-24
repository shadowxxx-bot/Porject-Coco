import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Play, FileText } from 'lucide-react';
import { mockProfiles } from '../../data/mockProfiles';
import { useTheme } from '../../context/ThemeContext';

export function ExpandedProfile() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { profileId } = useParams();
  const profile = mockProfiles.find((p) => p.id === parseInt(profileId || '1'));

  if (!profile) {
    navigate('/discover');
    return null;
  }

  const myTraits = [
    { label: 'Openness', value: 75 },
    { label: 'Conscientiousness', value: 68 },
    { label: 'Extraversion', value: 70 },
    { label: 'Agreeableness', value: 62 },
    { label: 'Emotional Stability', value: 78 },
    { label: 'Decision-making', value: 80 },
    { label: 'Execution', value: 72 },
    { label: 'Structure', value: 55 },
    { label: 'Collaboration', value: 65 },
    { label: 'Risk', value: 82 },
    { label: 'Time Horizon', value: 70 },
  ];

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

      {/* Video Section */}
      <div className="px-6 mb-6">
        <div className="relative aspect-[4/3] bg-gray-200 rounded-3xl overflow-hidden">
          <img
            src={profile.videoThumbnail}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all">
            <Play className="w-7 h-7 text-[#3D2314] ml-1" fill="#3D2314" />
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="px-6 mb-6">
        <h1 className="text-[32px] leading-[1] tracking-[-0.03em] text-[#3D2314] mb-2">
          {profile.name}
        </h1>
        <p className="text-[15px] text-[#6B5B52] mb-1">{profile.location}</p>
        <p className="text-[16px] text-[#3D2314] mb-4">{profile.headline}</p>

        {/* Compatibility */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[15px] font-medium text-[#3D2314]">Compatibility Score</span>
            <span className="text-[18px] font-medium" style={{ color: colors.primary }}>{profile.compatibility}%</span>
          </div>
          <div className="h-2.5 bg-[#FFF8F2] rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${profile.compatibility}%`, backgroundColor: colors.primary }} />
          </div>
        </div>

        {/* Matching Traits */}
        <div className="flex flex-wrap gap-2">
          {profile.matchingTraits.map((trait) => (
            <span key={trait} className="px-3 py-2 bg-white text-[14px] rounded-full" style={{ color: colors.primary, borderWidth: 1, borderColor: `${colors.primary}33` }}>
              {trait}
            </span>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="px-6 mb-6">
        <h3 className="text-[20px] tracking-[-0.02em] text-[#3D2314] mb-3">About</h3>
        <div className="bg-white rounded-2xl p-5">
          <p className="text-[15px] text-[#3D2314] leading-[1.6]">{profile.bio}</p>
        </div>
      </div>

      {/* Pitch Section */}
      <div className="px-6 mb-6">
        <h3 className="text-[20px] tracking-[-0.02em] text-[#3D2314] mb-3">My Pitch</h3>
        <div className="bg-white rounded-2xl p-5">
          <p className="text-[15px] text-[#3D2314] leading-[1.6]">{profile.pitch}</p>
        </div>
      </div>

      {/* Experience Section */}
      <div className="px-6 mb-6">
        <h3 className="text-[20px] tracking-[-0.02em] text-[#3D2314] mb-3">Experience</h3>
        <div className="bg-white rounded-2xl p-5 space-y-4">
          <div>
            <p className="text-[13px] text-[#6B5B52] mb-2">Years of experience</p>
            <p className="text-[15px] text-[#3D2314] font-medium">{profile.yearsExperience} years</p>
          </div>
          <div>
            <p className="text-[13px] text-[#6B5B52] mb-2">Previous startups</p>
            <p className="text-[15px] text-[#3D2314] font-medium">{profile.previousStartups}</p>
          </div>
          <div>
            <p className="text-[13px] text-[#6B5B52] mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-[#FFF8F2] text-[#3D2314] text-[13px] rounded-full">{skill}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[13px] text-[#6B5B52] mb-2">Industries</p>
            <div className="flex flex-wrap gap-2">
              {profile.industries.map((industry) => (
                <span key={industry} className="px-3 py-1.5 bg-[#FFF8F2] text-[#3D2314] text-[13px] rounded-full">{industry}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[13px] text-[#6B5B52] mb-2">Current stage</p>
            <p className="text-[15px] text-[#3D2314] font-medium">{profile.stage}</p>
          </div>
        </div>
      </div>

      {/* Founder DNA Section */}
      <div className="px-6 mb-6">
        <h3 className="text-[20px] tracking-[-0.02em] text-[#3D2314] mb-3">Founder DNA</h3>
        <div className="bg-white rounded-2xl p-5">
          <p className="text-[13px] text-[#6B5B52] mb-4">Their profile vs. yours</p>
          <div className="space-y-3">
            {profile.personalityTraits.map((trait) => {
              const myTrait = myTraits.find((t) => t.label === trait.label);
              return (
                <div key={trait.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[13px] text-[#3D2314]">{trait.label}</span>
                    <div className="flex gap-2 text-[12px]">
                      <span style={{ color: colors.primary }}>{trait.value}%</span>
                      <span className="text-[#6B5B52]">vs {myTrait?.value}%</span>
                    </div>
                  </div>
                  <div className="relative h-2 bg-[#FFF8F2] rounded-full overflow-hidden">
                    <div className="absolute h-full rounded-full opacity-30" style={{ width: `${trait.value}%`, backgroundColor: colors.primary }} />
                    <div className="absolute h-full bg-[#3D2314] rounded-full opacity-40" style={{ width: `${myTrait?.value}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex gap-4 text-[12px]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full opacity-50" style={{ backgroundColor: colors.primary }} />
              <span className="text-[#6B5B52]">Them</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#3D2314] rounded-full opacity-50" />
              <span className="text-[#6B5B52]">You</span>
            </div>
          </div>
        </div>
      </div>

      {/* Looking For Section */}
      <div className="px-6 mb-6">
        <h3 className="text-[20px] tracking-[-0.02em] text-[#3D2314] mb-3">Looking for</h3>
        <div className="bg-white rounded-2xl p-5">
          <div className="flex flex-wrap gap-2">
            {profile.lookingFor.map((role) => (
              <span key={role} className="px-4 py-2 bg-[#FFF8F2] text-[#3D2314] text-[14px] rounded-full font-medium">{role}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Resume Link */}
      <div className="px-6 mb-6">
        <button className="w-full bg-white rounded-2xl p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFF8F2] rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5" style={{ color: colors.primary }} />
            </div>
            <span className="text-[15px] text-[#3D2314] font-medium">View Resume</span>
          </div>
          <span className="text-[#6B5B52]">&rarr;</span>
        </button>
      </div>

      {/* Floating Connect Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#FFF8F2] to-transparent max-w-[375px] mx-auto px-6 py-6">
        <button
          onClick={() => navigate(`/match/${profile.id}`)}
          className="w-full text-white py-4 rounded-full transition-all active:scale-[0.98] shadow-lg"
          style={{ backgroundColor: colors.primary }}
        >
          Connect
        </button>
      </div>
    </div>
  );
}
