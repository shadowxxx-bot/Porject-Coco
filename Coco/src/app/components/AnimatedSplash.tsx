import { useEffect, useState } from 'react';

interface AnimatedSplashProps {
  onComplete: () => void;
}

export function AnimatedSplash({ onComplete }: AnimatedSplashProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
    const completeTimer = setTimeout(onComplete, 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#E8894A] flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <style>{`
        @keyframes splash-logo-in {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          60% {
            opacity: 1;
            transform: scale(1.08);
          }
          80% {
            transform: scale(0.96);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes splash-fade-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes splash-line-expand {
          0% {
            width: 0;
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            width: 120px;
            opacity: 1;
          }
        }

        @keyframes splash-tagline-in {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 0.9;
            transform: translateY(0);
          }
        }

        .splash-logo {
          opacity: 0;
          animation: splash-logo-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards;
        }

        .splash-title {
          opacity: 0;
          animation: splash-fade-up 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.0s forwards;
        }

        .splash-line {
          width: 0;
          opacity: 0;
          animation: splash-line-expand 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.5s forwards;
        }

        .splash-tagline {
          opacity: 0;
          animation: splash-tagline-in 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.8s forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .splash-logo,
          .splash-title,
          .splash-line,
          .splash-tagline {
            animation: none;
            opacity: 1;
            transform: none;
            width: 120px;
          }
        }
      `}</style>

      <div className="flex flex-col items-center">
        {/* Interlocked C logo */}
        <div className="splash-logo mb-6">
          <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Left C */}
            <path
              d="M38 8C22.536 8 10 20.536 10 36C10 51.464 22.536 64 38 64C45.2 64 51.7 61.2 56.5 56.6"
              stroke="white"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right C (mirrored, interlocked) */}
            <path
              d="M62 16C77.464 16 90 28.536 90 44C90 59.464 77.464 72 62 72C54.8 72 48.3 69.2 43.5 64.6"
              stroke="white"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* COCO text */}
        <h1
          className="splash-title text-white text-[56px] leading-[0.9] tracking-[-0.04em]"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          COCO
        </h1>

        {/* Expanding line */}
        <div className="splash-line h-[1px] bg-white/60 mt-5 mb-4" />

        {/* Tagline */}
        <p className="splash-tagline text-white/80 text-[16px] tracking-wide">
          Find your co-founder
        </p>
      </div>
    </div>
  );
}
