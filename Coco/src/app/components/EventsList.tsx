import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MapPin, Video, Clock, Users, Plus } from 'lucide-react';
import { mockEvents } from '../data/mockEvents';
import { BottomNav } from './BottomNav';
import { useTheme } from '../context/ThemeContext';

const filters = ['All', 'This Week', 'Online', 'In Person', 'My City'];

export function EventsList() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');
  const [attending, setAttending] = useState<Record<number, boolean>>(
    Object.fromEntries(mockEvents.map((e) => [e.id, e.isAttending]))
  );

  const filteredEvents = mockEvents.filter((event) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Online') return event.type === 'online';
    if (activeFilter === 'In Person') return event.type === 'in-person';
    return true;
  });

  const toggleAttend = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setAttending((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen flex flex-col max-w-[375px] mx-auto bg-[#FFF8F2] pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-[#FFF8F2] z-10 px-6 pt-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[32px] leading-[0.9] tracking-[-0.04em] text-[#3D2314]">
            Events
          </h1>
          <button
            onClick={() => navigate('/events/create')}
            className="flex items-center gap-1.5 text-white px-4 py-2.5 rounded-full text-[14px] font-medium transition-all active:scale-[0.98]"
            style={{ backgroundColor: colors.primary }}
          >
            <Plus className="w-4 h-4" />
            Create
          </button>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? 'bg-[#3D2314] text-white'
                  : 'bg-white text-[#3D2314] border border-[rgba(61,35,20,0.15)]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Event cards */}
      <div className="px-4 space-y-4 mt-2">
        {filteredEvents.map((event) => (
          <button
            key={event.id}
            onClick={() => navigate(`/events/${event.id}`)}
            className="w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow text-left"
          >
            {/* Cover image */}
            <div className="relative aspect-[16/9]">
              <img
                src={event.coverImage}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[12px] font-medium text-white ${
                  event.type === 'in-person' ? '' : 'bg-[#3B82F6]'
                }`}
                style={event.type === 'in-person' ? { backgroundColor: colors.primary } : undefined}
              >
                {event.type === 'in-person' ? 'In Person' : 'Online'}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-[17px] text-[#3D2314] font-medium leading-snug mb-2">
                {event.title}
              </h3>

              <div className="space-y-1.5 mb-3">
                <div className="flex items-center gap-2 text-[13px] text-[#6B5B52]">
                  <Clock className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                  {event.date} &middot; {event.time}
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#6B5B52]">
                  {event.type === 'in-person' ? (
                    <MapPin className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                  ) : (
                    <Video className="w-3.5 h-3.5 text-[#3B82F6]" />
                  )}
                  {event.location}
                </div>
              </div>

              {/* Attendees + Attend button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Avatar stack */}
                  <div className="flex -space-x-2">
                    {event.attendeePhotos.map((photo, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full border-2 border-white overflow-hidden"
                      >
                        <img src={photo} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[12px] text-[#6B5B52]">
                    <Users className="w-3 h-3 inline mr-0.5" />
                    {event.attendeeCount}
                  </span>
                </div>

                <div
                  onClick={(e) => toggleAttend(event.id, e)}
                  className="px-4 py-2 rounded-full text-[13px] font-medium transition-all"
                  style={{
                    backgroundColor: attending[event.id] ? '#FFF8F2' : colors.primary,
                    color: attending[event.id] ? colors.primary : 'white',
                    borderWidth: attending[event.id] ? 1 : 0,
                    borderColor: attending[event.id] ? `${colors.primary}4D` : undefined,
                  }}
                >
                  {attending[event.id] ? 'Attending \u2713' : 'Attend'}
                </div>
              </div>

              {/* Host */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[rgba(61,35,20,0.08)]">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <img src={event.hostPhoto} alt={event.hostName} className="w-full h-full object-cover" />
                </div>
                <span className="text-[12px] text-[#6B5B52]">
                  Hosted by <span className="text-[#3D2314] font-medium">{event.hostName}</span>
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
