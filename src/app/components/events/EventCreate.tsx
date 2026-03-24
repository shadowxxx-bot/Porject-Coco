import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Camera } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const tagOptions = ['Networking', 'Pitch Practice', 'Industry-specific', 'Speed Dating', 'Workshop', 'Casual Meetup'];

export function EventCreate() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const [form, setForm] = useState({
    title: '',
    type: 'in-person' as 'in-person' | 'online',
    date: '',
    time: '',
    location: '',
    meetingLink: '',
    description: '',
    maxAttendees: '',
    tags: [] as string[],
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState('');

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const toggleTag = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/events');
  };

  const inputClass =
    'w-full px-4 py-3.5 rounded-2xl bg-white border-2 border-[rgba(61,35,20,0.15)] focus:border-[#E8894A] focus:outline-none transition-colors text-[#3D2314] placeholder:text-[#6B5B52]';

  return (
    <div className="min-h-screen flex flex-col max-w-[375px] mx-auto bg-[#FFF8F2]">
      {/* Header */}
      <div className="sticky top-0 bg-[#FFF8F2] z-10 px-6 py-4 flex items-center gap-4 border-b border-[rgba(61,35,20,0.08)]">
        <button
          onClick={() => navigate('/events')}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-[#3D2314]" />
        </button>
        <h1 className="text-[22px] leading-[1] tracking-[-0.03em] text-[#3D2314]">
          Create Event
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col px-6 py-6 pb-10">
        <div className="flex-1 space-y-5">
          {/* Cover image upload */}
          <div>
            <label className="block text-[14px] text-[#3D2314] mb-2 font-medium">Cover image</label>
            <label
              htmlFor="cover-upload"
              className="block w-full aspect-[16/9] bg-white border-2 border-dashed border-[rgba(61,35,20,0.2)] rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden"
            >
              {coverPreview ? (
                <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center">
                  <Camera className="w-8 h-8 mb-2" style={{ color: colors.primary }} />
                  <p className="text-[14px] text-[#6B5B52]">Upload cover image</p>
                </div>
              )}
            </label>
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="hidden"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-[14px] text-[#3D2314] mb-2 font-medium">Event title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Founder Speed Dating"
              className={inputClass}
              required
            />
          </div>

          {/* Event type toggle */}
          <div>
            <label className="block text-[14px] text-[#3D2314] mb-2 font-medium">Event type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setForm({ ...form, type: 'in-person' })}
                className="px-4 py-3.5 rounded-2xl border-2 text-[14px] font-medium transition-all"
                style={{
                  backgroundColor: form.type === 'in-person' ? colors.primary : 'white',
                  borderColor: form.type === 'in-person' ? colors.primary : 'rgba(61,35,20,0.15)',
                  color: form.type === 'in-person' ? 'white' : '#3D2314',
                }}
              >
                In Person
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, type: 'online' })}
                className={`px-4 py-3.5 rounded-2xl border-2 text-[14px] font-medium transition-all ${
                  form.type === 'online'
                    ? 'bg-[#3B82F6] border-[#3B82F6] text-white'
                    : 'bg-white border-[rgba(61,35,20,0.15)] text-[#3D2314] hover:border-[#3B82F6]'
                }`}
              >
                Online
              </button>
            </div>
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[14px] text-[#3D2314] mb-2 font-medium">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block text-[14px] text-[#3D2314] mb-2 font-medium">Time</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Location or Meeting Link */}
          <div>
            <label className="block text-[14px] text-[#3D2314] mb-2 font-medium">
              {form.type === 'in-person' ? 'Location' : 'Meeting link'}
            </label>
            {form.type === 'in-person' ? (
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Impact Hub Zurich"
                className={inputClass}
                required
              />
            ) : (
              <input
                type="url"
                value={form.meetingLink}
                onChange={(e) => setForm({ ...form, meetingLink: e.target.value })}
                placeholder="e.g. https://zoom.us/j/..."
                className={inputClass}
                required
              />
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-[14px] text-[#3D2314] mb-2 font-medium">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Tell attendees what to expect..."
              className={`${inputClass} resize-none h-28`}
              required
            />
          </div>

          {/* Max attendees */}
          <div>
            <label className="block text-[14px] text-[#3D2314] mb-2 font-medium">Max attendees</label>
            <input
              type="number"
              value={form.maxAttendees}
              onChange={(e) => setForm({ ...form, maxAttendees: e.target.value })}
              placeholder="e.g. 30"
              className={inputClass}
              min="2"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-[14px] text-[#3D2314] mb-2 font-medium">Tags</label>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className="px-4 py-2.5 rounded-full text-[13px] font-medium transition-all"
                  style={{
                    backgroundColor: form.tags.includes(tag) ? colors.primary : 'white',
                    borderWidth: form.tags.includes(tag) ? 0 : 1,
                    borderColor: form.tags.includes(tag) ? undefined : 'rgba(61,35,20,0.15)',
                    color: form.tags.includes(tag) ? 'white' : '#3D2314',
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full text-white py-4 rounded-full transition-all active:scale-[0.98] text-[16px] font-medium"
            style={{ backgroundColor: colors.primary }}
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}
