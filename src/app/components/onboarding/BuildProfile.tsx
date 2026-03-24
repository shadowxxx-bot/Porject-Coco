import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Camera, Upload, Lock, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function BuildProfile() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>('');
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>([]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePhoto(file);
      setProfilePhotoUrl(URL.createObjectURL(file));
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/experience');
  };

  return (
    <div className="min-h-screen flex flex-col px-8 py-12 max-w-[375px] mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: colors.primary }} />
          <div className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: colors.primary }} />
          <div className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: colors.primary }} />
          <div className="h-1.5 flex-1 bg-[rgba(61,35,20,0.15)] rounded-full" />
        </div>
        <p className="text-[12px] text-[#6B5B52]">Step 3 of 4</p>
      </div>

      <div className="mb-8">
        <h1 className="text-[42px] leading-[0.95] tracking-[-0.04em] text-[#3D2314] mb-2">
          Build your profile
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col pb-4">
        <div className="flex-1 space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center mb-2">
            <label
              htmlFor="profile-photo"
              className="relative w-28 h-28 rounded-full bg-white border-2 border-dashed border-[rgba(61,35,20,0.2)] flex items-center justify-center cursor-pointer transition-colors overflow-hidden"
            >
              {profilePhotoUrl ? (
                <img src={profilePhotoUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-8 h-8" style={{ color: colors.primary }} />
              )}
            </label>
            <input
              id="profile-photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <p className="text-[12px] text-[#6B5B52] mt-2">Upload profile photo</p>
          </div>

          {/* Headline */}
          <div>
            <label className="block text-[14px] text-[#3D2314] mb-2 font-medium">
              Headline
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Ex-Google PM building in climate tech"
              className="w-full px-4 py-3.5 rounded-2xl bg-white border-2 border-[rgba(61,35,20,0.15)] focus:border-[#E8894A] focus:outline-none transition-colors text-[#3D2314] placeholder:text-[#6B5B52]"
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-[14px] text-[#3D2314] mb-2 font-medium">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 200))}
              placeholder="What drives you? What's your superpower?"
              className="w-full px-4 py-3.5 rounded-2xl bg-white border-2 border-[rgba(61,35,20,0.15)] focus:border-[#E8894A] focus:outline-none transition-colors text-[#3D2314] placeholder:text-[#6B5B52] resize-none h-24"
              maxLength={200}
              required
            />
            <p className="text-[12px] text-[#6B5B52] mt-1 text-right">
              {bio.length}/200
            </p>
          </div>

          {/* Location */}
          <div>
            <label className="block text-[14px] text-[#3D2314] mb-2 font-medium">
              Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-white border-2 border-[rgba(61,35,20,0.15)] focus:border-[#E8894A] focus:outline-none transition-colors text-[#3D2314]"
              required
            >
              <option value="">Select location</option>
              <option value="San Francisco">San Francisco</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Austin">Austin</option>
              <option value="Seattle">Seattle</option>
              <option value="Boston">Boston</option>
              <option value="London">London</option>
              <option value="Berlin">Berlin</option>
              <option value="Singapore">Singapore</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          {/* LinkedIn URL */}
          <div>
            <label className="block text-[14px] text-[#3D2314] mb-2 font-medium">
              LinkedIn URL <span className="text-[#6B5B52] font-normal">(optional)</span>
            </label>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full px-4 py-3.5 rounded-2xl bg-white border-2 border-[rgba(61,35,20,0.15)] focus:border-[#E8894A] focus:outline-none transition-colors text-[#3D2314] placeholder:text-[#6B5B52]"
            />
          </div>

          {/* CV/Resume Upload */}
          <div>
            <label className="block text-[14px] text-[#3D2314] mb-2 font-medium">
              CV/Resume
            </label>
            <label
              htmlFor="resume-upload"
              className="flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-2xl bg-white border-2 border-[rgba(61,35,20,0.15)] transition-colors cursor-pointer"
            >
              <Upload className="w-5 h-5" style={{ color: colors.primary }} />
              <span className="text-[14px] text-[#3D2314]">
                {resume ? resume.name : 'Upload CV/Resume (PDF)'}
              </span>
            </label>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf"
              onChange={handleResumeChange}
              className="hidden"
            />
          </div>

          {/* Skills Tags */}
          <div>
            <label className="block text-[14px] text-[#3D2314] mb-2 font-medium">
              Skills
            </label>
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder="Type and press Enter to add skills"
              className="w-full px-4 py-3.5 rounded-2xl bg-white border-2 border-[rgba(61,35,20,0.15)] focus:border-[#E8894A] focus:outline-none transition-colors text-[#3D2314] placeholder:text-[#6B5B52]"
            />
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-1.5 px-4 py-2 text-white rounded-full"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <span className="text-[14px]">{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-white hover:text-[#3D2314] transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Locked Founder DNA card (shown when assessment is completed) */}
        {localStorage.getItem('assessmentCompleted') === 'true' && (
          <div className="mt-6 flex items-start gap-3 bg-[#FFF8F2] rounded-2xl p-4 border border-[rgba(61,35,20,0.08)]">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <Lock className="w-4 h-4 text-[#6B5B52]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[15px] text-[#3D2314] font-medium">Founder DNA</span>
                <span className="flex items-center gap-1 text-[12px] font-medium" style={{ color: colors.primary }}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Completed
                </span>
              </div>
              <p className="text-[13px] text-[#6B5B52] leading-[1.5]">
                Your personality and working style results are locked to ensure authentic matching.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8">
          <button
            type="submit"
            className="w-full text-white py-4 rounded-full transition-all active:scale-[0.98]"
            style={{ backgroundColor: colors.primary }}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
