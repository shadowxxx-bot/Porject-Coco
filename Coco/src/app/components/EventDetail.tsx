import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Share2, Clock, MapPin, Video, Users, CheckCircle2 } from 'lucide-react';
import { mockEvents } from '../data/mockEvents';
import { useTheme } from '../context/ThemeContext';

const attendeeMocks = [
  { name: 'Sarah Chen', headline: 'Ex-Google PM', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop' },
  { name: 'Marcus Johnson', headline: 'Serial founder', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
  { name: 'Priya Sharma', headline: 'Ex-Stripe engineer', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop' },
  { name: 'Alex Rivera', headline: 'Full-stack dev', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
  { name: 'Emily Zhang', headline: 'Product designer', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
  { name: 'Amira Okafor', headline: 'HealthTech founder', photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop' },
];

export function EventDetail() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { id } = useParams();
  const event = mockEvents.find((e) => e.id === parseInt(id || '1'));
  const [isAttending, setIsAttending] = useState(event?.isAttending ?? false);

  if (!event) {
    navigate('/events');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col max-w-[375px] mx-auto bg-[#FFF8F2] pb-28">
      {/* Cover image */}
      <div className="relative aspect-[16/9]">
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate('/events')}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-[#3D2314]" />
        </button>

        {/* Share button */}
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
          <Share2 className="w-5 h-5 text-[#3D2314]" />
        </button>

        {/* Type badge */}
        <span
          className={`absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-[13px] font-medium text-white ${
            event.type === 'in-person' ? '' : 'bg-[#3B82F6]'
          }`}
          style={event.type === 'in-person' ? { backgroundColor: colors.primary } : undefined}
        >
          {event.type === 'in-person' ? 'In Person' : 'Online'}
        </span>
      </div>

      {/* Content */}
      <div className="px-6 pt-5 space-y-6">
        {/* Title */}
        <h1 className="text-[28px] leading-[1.1] tracking-[-0.03em] text-[#3D2314]">
          {event.title}
        </h1>

        {/* Date + Location */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Clock className="w-5 h-5" style={{ color: colors.primary }} />
            </div>
            <div>
              <p className="text-[15px] text-[#3D2314] font-medium">{event.date}</p>
              <p className="text-[13px] text-[#6B5B52]">{event.time}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              {event.type === 'in-person' ? (
                <MapPin className="w-5 h-5" style={{ color: colors.primary }} />
              ) : (
                <Video className="w-5 h-5 text-[#3B82F6]" />
              )}
            </div>
            <div>
              <p className="text-[15px] text-[#3D2314] font-medium">{event.location}</p>
              <p className="text-[13px] text-[#6B5B52]">
                {event.type === 'in-person' ? 'Venue' : 'Virtual meeting'}
              </p>
            </div>
          </div>
        </div>

        {/* Spots remaining */}
        <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3">
          <Users className="w-4 h-4" style={{ color: colors.primary }} />
          <span className="text-[14px] text-[#3D2314]">
            <span className="font-medium">{event.attendeeCount}</span> attending &middot;{' '}
            <span className="text-[#6B5B52]">{event.maxAttendees - event.attendeeCount} spots left</span>
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-white text-[#3D2314] text-[13px] rounded-full border border-[rgba(61,35,20,0.12)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <div>
          <h3 className="text-[13px] text-[#6B5B52] uppercase tracking-wide mb-2">About this event</h3>
          <div className="bg-white rounded-2xl p-5">
            <p className="text-[15px] text-[#3D2314] leading-[1.6]">{event.description}</p>
          </div>
        </div>

        {/* What to expect */}
        <div>
          <h3 className="text-[13px] text-[#6B5B52] uppercase tracking-wide mb-2">What to expect</h3>
          <div className="bg-white rounded-2xl p-5 space-y-3">
            {event.whatToExpect.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: colors.primary }} />
                <span className="text-[15px] text-[#3D2314]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Attendees */}
        <div>
          <h3 className="text-[13px] text-[#6B5B52] uppercase tracking-wide mb-2">
            Attendees ({event.attendeeCount})
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {attendeeMocks.map((attendee, i) => (
              <div key={i} className="bg-white rounded-2xl p-3 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full overflow-hidden mb-2">
                  <img src={attendee.photo} alt={attendee.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-[13px] text-[#3D2314] font-medium leading-tight">{attendee.name}</p>
                <p className="text-[11px] text-[#6B5B52] leading-tight mt-0.5">{attendee.headline}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hosted by */}
        <div>
          <h3 className="text-[13px] text-[#6B5B52] uppercase tracking-wide mb-2">Hosted by</h3>
          <div className="bg-white rounded-2xl p-5 flex items-start gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
              <img src={event.hostPhoto} alt={event.hostName} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[16px] text-[#3D2314] font-medium mb-1">{event.hostName}</p>
              <p className="text-[14px] text-[#6B5B52] leading-[1.5]">{event.hostBio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Attend Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#FFF8F2] via-[#FFF8F2] to-transparent max-w-[375px] mx-auto px-6 py-5">
        <button
          onClick={() => setIsAttending((prev) => !prev)}
          className="w-full py-4 rounded-full transition-all active:scale-[0.98] shadow-lg text-[16px] font-medium"
          style={{
            backgroundColor: isAttending ? 'white' : colors.primary,
            color: isAttending ? colors.primary : 'white',
            borderWidth: isAttending ? 2 : 0,
            borderColor: isAttending ? colors.primary : undefined,
          }}
        >
          {isAttending ? 'Attending \u2713' : 'Attend this event'}
        </button>
      </div>
    </div>
  );
}
