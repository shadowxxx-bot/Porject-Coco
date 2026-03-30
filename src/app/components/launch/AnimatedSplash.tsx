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
        {/* Logo */}
        <div className="splash-logo mb-6">
          <img src="/Porject-Coco/coco-logo.png" alt="Coco Match" className="w-24 h-24 object-contain" />
        </div>

        {/* COCO MATCH text */}
        <h1
          className="splash-title text-white text-[44px] leading-[0.9] tracking-[-0.04em]"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          COCO MATCH
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
