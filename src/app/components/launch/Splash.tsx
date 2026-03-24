import { useNavigate } from 'react-router';

export function Splash() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 max-w-[375px] mx-auto bg-[#E8894A]">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {/* Interlocked C logo */}
        <div className="mb-6">
          <svg width="80" height="64" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M38 8C22.536 8 10 20.536 10 36C10 51.464 22.536 64 38 64C45.2 64 51.7 61.2 56.5 56.6"
              stroke="white"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M62 16C77.464 16 90 28.536 90 44C90 59.464 77.464 72 62 72C54.8 72 48.3 69.2 43.5 64.6"
              stroke="white"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1
          className="text-[72px] leading-[0.9] tracking-[-0.04em] text-white mb-4"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          COCO MATCH
        </h1>
        <p className="text-[18px] leading-[1.4] text-center text-white/90 max-w-[280px]">
          The easiest way to find your startup co-founder.
        </p>
      </div>

      <div className="w-full pb-12 space-y-4">
        <button
          onClick={() => navigate('/choose-role')}
          className="w-full bg-white text-[#E8894A] py-4 rounded-full font-medium transition-all hover:bg-white/90 active:scale-[0.98]"
        >
          Get Started
        </button>
        <p className="text-center text-[14px] text-white/70">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/choose-role')}
            className="text-white font-medium hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
