import { useNavigate } from 'react-router';
import { MapPin, MessageCircle, Clock, Sparkles, Briefcase, Code } from 'lucide-react';
import { entrepreneurMatches, cofounderMatches } from '../../data/mockMatches';
import { BottomNav } from '../layout/BottomNav';
import { useTheme } from '../../context/ThemeContext';

export function MatchesList() {
  const navigate = useNavigate();
  const { role, colors } = useTheme();
  const isCofounder = role === 'cofounder';

  // Cofounders see entrepreneurs who liked them, entrepreneurs see cofounders who liked them
  const matches = [...(isCofounder ? entrepreneurMatches : cofounderMatches)]
    .sort((a, b) => b.compatibility - a.compatibility);

  const statusConfig = {
    new: { label: 'New match', color: '#10b981', bg: '#ecfdf5' },
    chatting: { label: 'In conversation', color: colors.primary, bg: `${colors.primary}15` },
    scheduled: { label: 'Call scheduled', color: '#6366f1', bg: '#eef2ff' },
  };

  return (
    <div className="min-h-screen flex flex-col max-w-[375px] mx-auto bg-[#FFF8F2] pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-[#FFF8F2] z-10 px-6 py-5">
        <h1 className="text-[32px] leading-[0.9] tracking-[-0.04em] text-[#3D2314]">My Matches</h1>
        <p className="text-[14px] text-[#6B5B52] mt-2">
          {matches.length} {isCofounder ? 'entrepreneurs interested in you' : 'cofounders interested in you'}
        </p>
      </div>

      {matches.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-5">
            <Sparkles className="w-10 h-10" style={{ color: colors.primary }} />
          </div>
          <h2 className="text-[22px] tracking-[-0.02em] text-[#3D2314] mb-2 text-center">No matches yet</h2>
          <p className="text-[15px] text-[#6B5B52] text-center mb-6">
            {isCofounder ? 'Keep browsing projects to get matched' : 'Keep browsing cofounders to get matched'}
          </p>
          <button
            onClick={() => navigate('/discover')}
            className="text-white px-6 py-3 rounded-full"
            style={{ backgroundColor: colors.primary }}
          >
            Browse {isCofounder ? 'projects' : 'profiles'}
          </button>
        </div>
      ) : (
        <div className="flex-1 px-4 space-y-3">
          {matches.map((match) => {
            const status = statusConfig[match.status];
            const isEntrepreneurMatch = match.type === 'entrepreneur';

            return (
              <div
                key={match.id}
                className="bg-white rounded-2xl p-4 active:scale-[0.99] transition-transform cursor-pointer"
                onClick={() => navigate('/messages')}
              >
                {/* Top row: photo + name + status */}
                <div className="flex items-start gap-3.5 mb-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={match.photo}
                      alt={match.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    {match.status === 'new' && (
                      <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="text-[16px] text-[#3D2314] font-medium">{match.name}</h3>
                      <span className="text-[12px] text-[#6B5B52]">{match.matchedAt}</span>
                    </div>
                    <p className="text-[13px] text-[#6B5B52] mb-1.5">{match.role}</p>
                    <span
                      className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium"
                      style={{ backgroundColor: status.bg, color: status.color }}
                    >
                      {status.label}
                    </span>
                  </div>
                </div>

                {/* Context: project info for entrepreneurs, skills for cofounders */}
                {isEntrepreneurMatch ? (
                  <div className="bg-[#FFF8F2] rounded-xl p-3 mb-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#6B5B52]" />
                      <span className="text-[13px] text-[#3D2314] font-medium">{match.projectName}</span>
                      <span className="text-[12px] text-[#6B5B52]">— {match.projectIndustry}</span>
                    </div>
                    {match.projectSummary && (
                      <p className="text-[12px] text-[#6B5B52] leading-[1.5] mb-2 line-clamp-2">{match.projectSummary}</p>
                    )}
                    <div className="flex items-center gap-3 text-[12px] text-[#6B5B52]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {match.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {match.availability}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#FFF8F2] rounded-xl p-3 mb-3">
                    {match.headline && (
                      <p className="text-[13px] text-[#3D2314] font-medium mb-2">{match.headline}</p>
                    )}
                    {match.skills && match.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {match.skills.map((skill) => (
                          <span key={skill} className="inline-flex items-center gap-1 px-2 py-0.5 bg-white text-[11px] text-[#3D2314] rounded-full">
                            <Code className="w-2.5 h-2.5 text-[#6B5B52]" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-[12px] text-[#6B5B52]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {match.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {match.availability}
                      </span>
                    </div>
                  </div>
                )}

                {/* Match reasons */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {match.matchReasons.map((reason) => (
                    <span
                      key={reason}
                      className="px-2.5 py-1 text-[12px] rounded-full border"
                      style={{ color: colors.primary, borderColor: `${colors.primary}30` }}
                    >
                      {reason}
                    </span>
                  ))}
                </div>

                {/* Compatibility + CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-[#FFF8F2] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${match.compatibility}%`, backgroundColor: colors.primary }}
                      />
                    </div>
                    <span className="text-[13px] font-medium" style={{ color: colors.primary }}>
                      {match.compatibility}%
                    </span>
                  </div>
                  <button
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] text-white font-medium"
                    style={{ backgroundColor: colors.primary }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/messages');
                    }}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Chat
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <BottomNav />
    </div>
  );
}
