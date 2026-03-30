import { useState, useRef, useCallback } from 'react';
import { Play, Users, Brain, Zap, Heart, Handshake, MessageCircle } from 'lucide-react';

interface Slide {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface OnboardingSlidesProps {
  onComplete: () => void;
}

const slides: Slide[] = [
  {
    icon: (
      <div className="relative flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-[#E8894A] flex items-center justify-center shadow-lg">
          <Play className="w-10 h-10 text-white ml-1" fill="white" />
        </div>
        <div className="absolute -top-2 -left-4 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
          <Users className="w-6 h-6 text-[#E8894A]" />
        </div>
        <div className="absolute -bottom-1 -right-6 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
          <Zap className="w-5 h-5 text-[#E8894A]" />
        </div>
      </div>
    ),
    title: 'Meet through video',
    description: 'Record a 1-minute pitch. Show who you really are \u2014 not just a resume.',
  },
  {
    icon: (
      <div className="relative flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-[#E8894A] flex items-center justify-center shadow-lg">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <div className="absolute -top-3 right-0 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10C4 6.686 6.686 4 10 4M10 16C13.314 16 16 13.314 16 10" stroke="#E8894A" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="10" cy="10" r="2" fill="#E8894A" />
          </svg>
        </div>
        <div className="absolute -bottom-2 -left-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
          <Zap className="w-5 h-5 text-[#E8894A]" />
        </div>
        <div className="absolute top-1/2 -left-10 w-6 h-[2px] bg-[#E8894A]/30 rounded-full" />
        <div className="absolute top-1/2 -right-10 w-6 h-[2px] bg-[#E8894A]/30 rounded-full" />
      </div>
    ),
    title: 'Science-backed matching',
    description: 'Our personality and working style tests find co-founders you\u2019ll actually work well with.',
  },
  {
    icon: (
      <div className="relative flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-[#E8894A] flex items-center justify-center shadow-lg">
          <Handshake className="w-10 h-10 text-white" />
        </div>
        <div className="absolute -top-2 -right-5 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center">
          <Heart className="w-5 h-5 text-[#E8894A]" fill="#E8894A" />
        </div>
        <div className="absolute -bottom-2 -left-5 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-[#E8894A]" />
        </div>
      </div>
    ),
    title: 'Connect with intention',
    description: 'Like specific parts of a profile. Start conversations that matter. Build something together.',
  },
];

export function OnboardingSlides({ onComplete }: OnboardingSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const isDragging = useRef(false);

  const finish = useCallback(() => {
    onComplete();
  }, [onComplete]);

  const goToSlide = (index: number) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, index));
    setCurrentSlide(clamped);
    setTranslateX(0);
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    } else {
      finish();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    touchDeltaX.current = delta;
    if ((currentSlide === 0 && delta > 0) || (currentSlide === slides.length - 1 && delta < 0)) {
      setTranslateX(delta * 0.3);
    } else {
      setTranslateX(delta);
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    const threshold = 60;
    if (touchDeltaX.current < -threshold && currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    } else if (touchDeltaX.current > threshold && currentSlide > 0) {
      goToSlide(currentSlide - 1);
    } else {
      setTranslateX(0);
    }
    touchDeltaX.current = 0;
  };

  return (
    <div className="fixed inset-0 z-[90] bg-[#FFF8F2] flex flex-col max-w-[375px] mx-auto overflow-hidden">
      {/* Skip button */}
      <div className="flex justify-end px-6 pt-5">
        <button
          onClick={finish}
          className="text-[14px] text-[#6B5B52] hover:text-[#3D2314] transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Slides area */}
      <div
        className="flex-1 flex flex-col"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex-1 flex flex-col items-center justify-center px-10">
          <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-[#E8894A]/[0.06] to-transparent pointer-events-none" />

          <div
            className="w-full"
            style={{
              transform: `translateX(${translateX}px)`,
              transition: isDragging.current ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <div className="flex items-center justify-center h-[180px] mb-10">
              {slides[currentSlide].icon}
            </div>

            <h2
              className="text-[36px] leading-[1] tracking-[-0.04em] text-[#3D2314] text-center mb-4"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              {slides[currentSlide].title}
            </h2>

            <p className="text-[16px] leading-[1.5] text-[#6B5B52] text-center max-w-[280px] mx-auto">
              {slides[currentSlide].description}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom area: dots + button */}
      <div className="px-8 pb-10">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? 'w-7 h-2.5 bg-[#E8894A]'
                  : 'w-2.5 h-2.5 bg-[#3D2314]/20'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-[#E8894A] text-white py-4 rounded-full transition-all hover:bg-[#D67835] active:scale-[0.98] text-[16px] font-medium"
        >
          {currentSlide < slides.length - 1 ? 'Next' : 'Get Started'}
        </button>
      </div>
    </div>
  );
}
