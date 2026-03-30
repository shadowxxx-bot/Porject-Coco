import { useNavigate } from 'react-router';

export function Splash() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 max-w-[375px] mx-auto bg-[#E8894A]">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {/* Logo */}
        <div className="mb-6">
          <img src="/Porject-Coco/coco-logo.png" alt="Coco Match" className="w-20 h-20 object-contain" />
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
