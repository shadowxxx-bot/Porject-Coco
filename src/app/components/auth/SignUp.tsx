import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useTheme } from '../../context/ThemeContext';

export function SignUp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { colors } = useTheme();
  const role = searchParams.get('role') || 'cofounder';
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'entrepreneur') {
      navigate('/onboarding/entrepreneur/profile');
    } else {
      navigate('/about-you');
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-8 py-12 max-w-[375px] mx-auto">
      <div className="mb-12">
        <h1 className="text-[48px] leading-[0.9] tracking-[-0.04em] text-[#3D2314] mb-2">
          Sign Up
        </h1>
        <p className="text-[16px] text-[#6B5B52]">
          Let's get you started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="flex-1 space-y-5">
          <div>
            <label className="block text-[14px] text-[#3D2314] mb-2 font-medium">
              First name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full px-4 py-3.5 rounded-2xl bg-white border-2 border-[rgba(61,35,20,0.15)] focus:outline-none transition-colors text-[#3D2314]"
              style={{ borderColor: formData.firstName ? colors.primary : undefined }}
              required
            />
          </div>

          <div>
            <label className="block text-[14px] text-[#3D2314] mb-2 font-medium">
              Last name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-4 py-3.5 rounded-2xl bg-white border-2 border-[rgba(61,35,20,0.15)] focus:outline-none transition-colors text-[#3D2314]"
              style={{ borderColor: formData.lastName ? colors.primary : undefined }}
              required
            />
          </div>

          <div>
            <label className="block text-[14px] text-[#3D2314] mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3.5 rounded-2xl bg-white border-2 border-[rgba(61,35,20,0.15)] focus:outline-none transition-colors text-[#3D2314]"
              style={{ borderColor: formData.email ? colors.primary : undefined }}
              required
            />
          </div>

          <div>
            <label className="block text-[14px] text-[#3D2314] mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3.5 rounded-2xl bg-white border-2 border-[rgba(61,35,20,0.15)] focus:outline-none transition-colors text-[#3D2314]"
              style={{ borderColor: formData.password ? colors.primary : undefined }}
              required
            />
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <button
            type="submit"
            className="w-full text-white py-4 rounded-full transition-all active:scale-[0.98]"
            style={{ backgroundColor: colors.primary }}
          >
            Continue
          </button>

          <p className="text-center text-[14px] text-[#6B5B52]">
            Already have an account?{' '}
            <button
              type="button"
              className="font-medium hover:underline"
              style={{ color: colors.primary }}
            >
              Log in
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
