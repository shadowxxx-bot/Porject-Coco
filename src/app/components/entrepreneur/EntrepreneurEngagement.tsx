import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Zap, Calendar, Clock, Coffee, Users, Globe, FlaskConical } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const hoursOptions = ['<10h', '10-20h', '20-35h', '35h+ (full-time)'];
const workModeOptions = ['Full-time', 'Part-time', 'Evenings & weekends'];
const quitOptions = ['Yes absolutely', 'Maybe, depends', 'No, I want to keep both'];
const investOptions = ['Yes, I have a budget', 'A little bit', 'No, bootstrapping only'];

const launchCards = [
  { value: 'now', label: "Now — I'm ready", icon: Zap },
  { value: '3months', label: 'In 3 months', icon: Calendar },
  { value: '6months', label: 'In 6 months', icon: Clock },
  { value: 'later', label: 'Later / no rush', icon: Coffee },
];

const lookingForCards = [
  { value: 'real-cofounder', label: 'A real co-founder to build with', icon: Users },
  { value: 'networking', label: 'Exploring & networking', icon: Globe },
  { value: 'testing', label: 'Just testing the idea first', icon: FlaskConical },
];

export function EntrepreneurEngagement() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [launchTimeline, setLaunchTimeline] = useState('');
  const [wouldQuitJob, setWouldQuitJob] = useState('');
  const [investMoney, setInvestMoney] = useState('');
  const [lookingFor, setLookingFor] = useState('');

  const handleSubmit = () => {
    localStorage.setItem('entrepreneur_engagement', JSON.stringify({
      hoursPerWeek, workMode, launchTimeline, wouldQuitJob, investMoney, lookingFor,
    }));
    navigate('/onboarding/entrepreneur/preferences');
  };

  const isValid = hoursPerWeek && workMode && launchTimeline && wouldQuitJob && investMoney && lookingFor;

  return (
    <div className="min-h-screen flex flex-col px-8 py-12 max-w-[375px] mx-auto bg-[#FFF8F2]">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className="h-1.5 flex-1 rounded-full"
              style={{ backgroundColor: step <= 3 ? colors.primary : 'rgba(61,35,20,0.15)' }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-[#6B5B52]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <p className="text-[12px] text-[#6B5B52]">Step 3 of 5</p>
        </div>
      </div>

      <h1 className="text-[36px] leading-[1] tracking-[-0.04em] text-[#3D2314] mb-2">
        Your commitment
      </h1>
      <p className="text-[14px] text-[#6B5B52] mb-8">How engaged are you?</p>

      <div className="flex-1 space-y-7 overflow-y-auto">
        {/* Hours per week */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Hours available per week</label>
          <div className="flex flex-wrap gap-2">
            {hoursOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setHoursPerWeek(opt)}
                className="px-4 py-2.5 rounded-full border-2 transition-all text-[14px]"
                style={{
                  backgroundColor: hoursPerWeek === opt ? colors.primary : 'white',
                  borderColor: hoursPerWeek === opt ? colors.primary : 'rgba(61,35,20,0.15)',
                  color: hoursPerWeek === opt ? 'white' : '#3D2314',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Work mode */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Work mode</label>
          <div className="flex flex-wrap gap-2">
            {workModeOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setWorkMode(opt)}
                className="px-4 py-2.5 rounded-full border-2 transition-all text-[14px]"
                style={{
                  backgroundColor: workMode === opt ? colors.primary : 'white',
                  borderColor: workMode === opt ? colors.primary : 'rgba(61,35,20,0.15)',
                  color: workMode === opt ? 'white' : '#3D2314',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Launch timeline */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">When do you want to launch?</label>
          <div className="space-y-3">
            {launchCards.map((card) => {
              const Icon = card.icon;
              const selected = launchTimeline === card.value;
              return (
                <button
                  key={card.value}
                  type="button"
                  onClick={() => setLaunchTimeline(card.value)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left"
                  style={{
                    backgroundColor: selected ? colors.primary : 'white',
                    borderColor: selected ? colors.primary : 'rgba(61,35,20,0.15)',
                  }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" style={{ color: selected ? 'white' : colors.primary }} />
                  <span className="text-[14px]" style={{ color: selected ? 'white' : '#3D2314' }}>{card.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Would quit job */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Would you quit your job/studies if there's traction?</label>
          <div className="flex flex-wrap gap-2">
            {quitOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setWouldQuitJob(opt)}
                className="px-4 py-2.5 rounded-full border-2 transition-all text-[14px]"
                style={{
                  backgroundColor: wouldQuitJob === opt ? colors.primary : 'white',
                  borderColor: wouldQuitJob === opt ? colors.primary : 'rgba(61,35,20,0.15)',
                  color: wouldQuitJob === opt ? 'white' : '#3D2314',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Invest money */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">Ready to invest personal money?</label>
          <div className="flex flex-wrap gap-2">
            {investOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setInvestMoney(opt)}
                className="px-4 py-2.5 rounded-full border-2 transition-all text-[14px]"
                style={{
                  backgroundColor: investMoney === opt ? colors.primary : 'white',
                  borderColor: investMoney === opt ? colors.primary : 'rgba(61,35,20,0.15)',
                  color: investMoney === opt ? 'white' : '#3D2314',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Looking for */}
        <div>
          <label className="block text-[15px] text-[#3D2314] mb-3 font-medium">What are you really looking for?</label>
          <div className="space-y-3">
            {lookingForCards.map((card) => {
              const Icon = card.icon;
              const selected = lookingFor === card.value;
              return (
                <button
                  key={card.value}
                  type="button"
                  onClick={() => setLookingFor(card.value)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left"
                  style={{
                    backgroundColor: selected ? colors.primary : 'white',
                    borderColor: selected ? colors.primary : 'rgba(61,35,20,0.15)',
                  }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" style={{ color: selected ? 'white' : colors.primary }} />
                  <span className="text-[14px]" style={{ color: selected ? 'white' : '#3D2314' }}>{card.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full text-white py-4 rounded-full transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: colors.primary }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
