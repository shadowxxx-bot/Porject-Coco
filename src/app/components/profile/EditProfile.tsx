import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Camera, Check, Pencil, X, MapPin, Briefcase, Clock, Target, Lightbulb } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ProfileData {
  name: string;
  headline: string;
  photo: string;
  location: string;
  bio: string;
  skills: string[];
  industries: string[];
  lookingFor: string[];
  availability: string;
  experience: string;
  workStyle: string;
  vision: string;
}

const defaultProfile: ProfileData = {
  name: 'Alex Rivera',
  headline: 'Full-stack developer building the future of work',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  location: 'San Francisco, CA',
  bio: 'Passionate full-stack developer with 7 years of experience building scalable products. Previously at Stripe and a YC startup. Looking for a mission-driven co-founder with strong business skills.',
  skills: ['React', 'Node.js', 'Python', 'System Design', 'Cloud Infrastructure', 'APIs'],
  industries: ['FinTech', 'Future of Work', 'Climate Tech'],
  lookingFor: ['Business Co-founder', 'CEO-type', 'Sales & Marketing'],
  availability: 'Full-time (35h+/week)',
  experience: '6-10 years',
  workStyle: 'Structured & data-driven, but flexible on process. Prefer async communication with weekly syncs.',
  vision: 'Build a venture-backed startup that solves a real problem. Willing to commit 2-3 years minimum. Open to relocating for the right opportunity.',
};

type EditingSection = string | null;

export function EditProfile() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [editing, setEditing] = useState<EditingSection>(null);
  const [draft, setDraft] = useState<Partial<ProfileData>>({});
  const [saved, setSaved] = useState(false);

  const startEdit = (section: string) => {
    setEditing(section);
    setDraft({});
    setSaved(false);
  };

  const cancelEdit = () => {
    setEditing(null);
    setDraft({});
  };

  const saveEdit = () => {
    setProfile((prev) => ({ ...prev, ...draft }));
    setEditing(null);
    setDraft({});
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const isEditing = (section: string) => editing === section;

  return (
    <div className="min-h-screen flex flex-col max-w-[375px] mx-auto bg-[#FFF8F2] pb-10">
      {/* Header */}
      <div className="sticky top-0 bg-[#FFF8F2] z-10 px-5 py-4 flex items-center justify-between border-b border-[rgba(61,35,20,0.08)]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/my-profile')}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-[#3D2314]" />
          </button>
          <h1 className="text-[22px] leading-[1] tracking-[-0.02em] text-[#3D2314]">Edit Profile</h1>
        </div>
        {saved && (
          <span className="flex items-center gap-1 text-[13px] text-green-600 font-medium">
            <Check className="w-4 h-4" /> Saved
          </span>
        )}
      </div>

      <div className="px-5 py-6 space-y-5">
        {/* Photo + Name Section */}
        <div className="bg-white rounded-2xl p-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <button
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center border border-gray-100"
              >
                <Camera className="w-3.5 h-3.5 text-[#6B5B52]" />
              </button>
            </div>
            <div className="flex-1">
              {isEditing('name') ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    defaultValue={profile.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    className="w-full text-[18px] text-[#3D2314] font-medium bg-[#FFF8F2] rounded-lg px-3 py-2 outline-none border border-[rgba(61,35,20,0.1)] focus:border-[rgba(61,35,20,0.3)]"
                  />
                  <input
                    type="text"
                    defaultValue={profile.headline}
                    onChange={(e) => setDraft({ ...draft, headline: e.target.value })}
                    className="w-full text-[13px] text-[#6B5B52] bg-[#FFF8F2] rounded-lg px-3 py-2 outline-none border border-[rgba(61,35,20,0.1)] focus:border-[rgba(61,35,20,0.3)]"
                  />
                  <EditActions onSave={saveEdit} onCancel={cancelEdit} colors={colors} />
                </div>
              ) : (
                <div onClick={() => startEdit('name')} className="cursor-pointer group">
                  <div className="flex items-center gap-2">
                    <h2 className="text-[18px] text-[#3D2314] font-medium">{profile.name}</h2>
                    <Pencil className="w-3.5 h-3.5 text-[#6B5B52] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[13px] text-[#6B5B52] mt-0.5">{profile.headline}</p>
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          {isEditing('location') ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#6B5B52]" />
                <input
                  type="text"
                  defaultValue={profile.location}
                  onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                  className="flex-1 text-[14px] text-[#3D2314] bg-[#FFF8F2] rounded-lg px-3 py-2 outline-none border border-[rgba(61,35,20,0.1)]"
                />
              </div>
              <EditActions onSave={saveEdit} onCancel={cancelEdit} colors={colors} />
            </div>
          ) : (
            <div onClick={() => startEdit('location')} className="flex items-center gap-2 cursor-pointer group">
              <MapPin className="w-4 h-4 text-[#6B5B52]" />
              <span className="text-[14px] text-[#6B5B52]">{profile.location}</span>
              <Pencil className="w-3 h-3 text-[#6B5B52] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </div>

        {/* About / Bio */}
        <EditableSection
          title="About me"
          icon={<Lightbulb className="w-4 h-4" />}
          isEditing={isEditing('bio')}
          onEdit={() => startEdit('bio')}
          colors={colors}
        >
          {isEditing('bio') ? (
            <div className="space-y-2">
              <textarea
                defaultValue={profile.bio}
                onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                rows={4}
                className="w-full text-[14px] text-[#3D2314] bg-[#FFF8F2] rounded-lg px-3 py-2.5 outline-none border border-[rgba(61,35,20,0.1)] resize-none leading-[1.6]"
              />
              <EditActions onSave={saveEdit} onCancel={cancelEdit} colors={colors} />
            </div>
          ) : (
            <p className="text-[14px] text-[#3D2314] leading-[1.6]">{profile.bio}</p>
          )}
        </EditableSection>

        {/* Skills */}
        <EditableSection
          title="Skills"
          icon={<Briefcase className="w-4 h-4" />}
          isEditing={isEditing('skills')}
          onEdit={() => startEdit('skills')}
          colors={colors}
        >
          {isEditing('skills') ? (
            <div className="space-y-2">
              <textarea
                defaultValue={profile.skills.join(', ')}
                onChange={(e) => setDraft({ ...draft, skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                rows={2}
                placeholder="Comma-separated skills"
                className="w-full text-[14px] text-[#3D2314] bg-[#FFF8F2] rounded-lg px-3 py-2.5 outline-none border border-[rgba(61,35,20,0.1)] resize-none"
              />
              <EditActions onSave={saveEdit} onCancel={cancelEdit} colors={colors} />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-[#FFF8F2] text-[#3D2314] text-[13px] rounded-full">{skill}</span>
              ))}
            </div>
          )}
        </EditableSection>

        {/* Industries */}
        <EditableSection
          title="Industries of Interest"
          icon={<Target className="w-4 h-4" />}
          isEditing={isEditing('industries')}
          onEdit={() => startEdit('industries')}
          colors={colors}
        >
          {isEditing('industries') ? (
            <div className="space-y-2">
              <textarea
                defaultValue={profile.industries.join(', ')}
                onChange={(e) => setDraft({ ...draft, industries: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                rows={2}
                placeholder="Comma-separated industries"
                className="w-full text-[14px] text-[#3D2314] bg-[#FFF8F2] rounded-lg px-3 py-2.5 outline-none border border-[rgba(61,35,20,0.1)] resize-none"
              />
              <EditActions onSave={saveEdit} onCancel={cancelEdit} colors={colors} />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile.industries.map((industry) => (
                <span key={industry} className="px-3 py-1.5 bg-[#FFF8F2] text-[#3D2314] text-[13px] rounded-full">{industry}</span>
              ))}
            </div>
          )}
        </EditableSection>

        {/* Looking For */}
        <EditableSection
          title="Looking for"
          icon={<Target className="w-4 h-4" />}
          isEditing={isEditing('lookingFor')}
          onEdit={() => startEdit('lookingFor')}
          colors={colors}
        >
          {isEditing('lookingFor') ? (
            <div className="space-y-2">
              <textarea
                defaultValue={profile.lookingFor.join(', ')}
                onChange={(e) => setDraft({ ...draft, lookingFor: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                rows={2}
                placeholder="Comma-separated preferences"
                className="w-full text-[14px] text-[#3D2314] bg-[#FFF8F2] rounded-lg px-3 py-2.5 outline-none border border-[rgba(61,35,20,0.1)] resize-none"
              />
              <EditActions onSave={saveEdit} onCancel={cancelEdit} colors={colors} />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile.lookingFor.map((item) => (
                <span key={item} className="px-3 py-1.5 rounded-full text-[13px] text-white" style={{ backgroundColor: colors.primary }}>{item}</span>
              ))}
            </div>
          )}
        </EditableSection>

        {/* Availability & Experience */}
        <EditableSection
          title="Availability & Experience"
          icon={<Clock className="w-4 h-4" />}
          isEditing={isEditing('availability')}
          onEdit={() => startEdit('availability')}
          colors={colors}
        >
          {isEditing('availability') ? (
            <div className="space-y-3">
              <div>
                <label className="text-[12px] text-[#6B5B52] block mb-1">Availability</label>
                <input
                  type="text"
                  defaultValue={profile.availability}
                  onChange={(e) => setDraft({ ...draft, availability: e.target.value })}
                  className="w-full text-[14px] text-[#3D2314] bg-[#FFF8F2] rounded-lg px-3 py-2 outline-none border border-[rgba(61,35,20,0.1)]"
                />
              </div>
              <div>
                <label className="text-[12px] text-[#6B5B52] block mb-1">Experience</label>
                <input
                  type="text"
                  defaultValue={profile.experience}
                  onChange={(e) => setDraft({ ...draft, experience: e.target.value })}
                  className="w-full text-[14px] text-[#3D2314] bg-[#FFF8F2] rounded-lg px-3 py-2 outline-none border border-[rgba(61,35,20,0.1)]"
                />
              </div>
              <EditActions onSave={saveEdit} onCancel={cancelEdit} colors={colors} />
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[13px] text-[#6B5B52]">Availability</span>
                <span className="text-[13px] text-[#3D2314] font-medium">{profile.availability}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[13px] text-[#6B5B52]">Experience</span>
                <span className="text-[13px] text-[#3D2314] font-medium">{profile.experience}</span>
              </div>
            </div>
          )}
        </EditableSection>

        {/* Work Style */}
        <EditableSection
          title="Work Style"
          isEditing={isEditing('workStyle')}
          onEdit={() => startEdit('workStyle')}
          colors={colors}
        >
          {isEditing('workStyle') ? (
            <div className="space-y-2">
              <textarea
                defaultValue={profile.workStyle}
                onChange={(e) => setDraft({ ...draft, workStyle: e.target.value })}
                rows={3}
                className="w-full text-[14px] text-[#3D2314] bg-[#FFF8F2] rounded-lg px-3 py-2.5 outline-none border border-[rgba(61,35,20,0.1)] resize-none leading-[1.6]"
              />
              <EditActions onSave={saveEdit} onCancel={cancelEdit} colors={colors} />
            </div>
          ) : (
            <p className="text-[14px] text-[#3D2314] leading-[1.6]">{profile.workStyle}</p>
          )}
        </EditableSection>

        {/* Vision / Goals */}
        <EditableSection
          title="Vision & Goals"
          isEditing={isEditing('vision')}
          onEdit={() => startEdit('vision')}
          colors={colors}
        >
          {isEditing('vision') ? (
            <div className="space-y-2">
              <textarea
                defaultValue={profile.vision}
                onChange={(e) => setDraft({ ...draft, vision: e.target.value })}
                rows={3}
                className="w-full text-[14px] text-[#3D2314] bg-[#FFF8F2] rounded-lg px-3 py-2.5 outline-none border border-[rgba(61,35,20,0.1)] resize-none leading-[1.6]"
              />
              <EditActions onSave={saveEdit} onCancel={cancelEdit} colors={colors} />
            </div>
          ) : (
            <p className="text-[14px] text-[#3D2314] leading-[1.6]">{profile.vision}</p>
          )}
        </EditableSection>
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────

function EditableSection({
  title,
  icon,
  children,
  isEditing,
  onEdit,
  colors,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  isEditing: boolean;
  onEdit: () => void;
  colors: { primary: string };
}) {
  return (
    <div className="bg-white rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && <span className="text-[#6B5B52]">{icon}</span>}
          <h3 className="text-[13px] text-[#6B5B52] uppercase tracking-wide">{title}</h3>
        </div>
        {!isEditing && (
          <button
            onClick={onEdit}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-medium transition-colors hover:bg-[#FFF8F2]"
            style={{ color: colors.primary }}
          >
            <Pencil className="w-3 h-3" />
            Edit
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function EditActions({
  onSave,
  onCancel,
  colors,
}: {
  onSave: () => void;
  onCancel: () => void;
  colors: { primary: string };
}) {
  return (
    <div className="flex items-center gap-2 pt-1">
      <button
        onClick={onSave}
        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] text-white font-medium transition-all active:scale-[0.97]"
        style={{ backgroundColor: colors.primary }}
      >
        <Check className="w-3.5 h-3.5" />
        Save
      </button>
      <button
        onClick={onCancel}
        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] text-[#6B5B52] font-medium bg-[#FFF8F2] transition-all active:scale-[0.97]"
      >
        <X className="w-3.5 h-3.5" />
        Cancel
      </button>
    </div>
  );
}
