import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Camera } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function UploadVideo() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-8 py-12 max-w-[375px] mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: colors.primary }} />
          <div className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: colors.primary }} />
          <div className="h-1.5 flex-1 bg-[rgba(61,35,20,0.15)] rounded-full" />
          <div className="h-1.5 flex-1 bg-[rgba(61,35,20,0.15)] rounded-full" />
        </div>
        <p className="text-[12px] text-[#6B5B52]">Step 2 of 4</p>
      </div>

      <div className="mb-8">
        <h1 className="text-[42px] leading-[0.95] tracking-[-0.04em] text-[#3D2314] mb-2">
          Upload your 1-min video
        </h1>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          {/* Upload zone */}
          <label
            htmlFor="video-upload"
            className="block w-full aspect-[4/3] bg-white border-2 border-dashed border-[rgba(61,35,20,0.2)] rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-colors mb-6"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#FFF8F2] flex items-center justify-center mb-4">
                <Camera className="w-8 h-8" style={{ color: colors.primary }} />
              </div>
              {videoFile ? (
                <p className="text-[14px] text-[#3D2314] font-medium">
                  {videoFile.name}
                </p>
              ) : (
                <>
                  <p className="text-[16px] text-[#3D2314] font-medium mb-1">
                    Tap to upload
                  </p>
                  <p className="text-[14px] text-[#6B5B52] text-center px-8">
                    Record a 1-minute video pitch
                  </p>
                </>
              )}
            </div>
          </label>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Instructions */}
          <div className="bg-white rounded-2xl p-5 mb-4">
            <p className="text-[14px] text-[#3D2314] mb-3 font-medium">
              Tell future co-founders:
            </p>
            <ul className="space-y-2 text-[14px] text-[#6B5B52]">
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2 flex-shrink-0" style={{ backgroundColor: colors.primary }} />
                Who you are
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2 flex-shrink-0" style={{ backgroundColor: colors.primary }} />
                What you're building
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2 flex-shrink-0" style={{ backgroundColor: colors.primary }} />
                Why you
              </li>
            </ul>
          </div>

          {/* Tips */}
          <div className="flex items-center gap-3 px-1">
            <div className="flex items-center gap-2 text-[13px] text-[#6B5B52]">
              <span style={{ color: colors.primary }}>✓</span>
              Be authentic
            </div>
            <div className="flex items-center gap-2 text-[13px] text-[#6B5B52]">
              <span style={{ color: colors.primary }}>✓</span>
              Show energy
            </div>
            <div className="flex items-center gap-2 text-[13px] text-[#6B5B52]">
              <span style={{ color: colors.primary }}>✓</span>
              Talk about vision
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <button
            disabled={!videoFile}
            onClick={() => navigate('/profile')}
            className="w-full text-white py-4 rounded-full transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: colors.primary }}
          >
            Upload Video
          </button>

          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="w-full text-[#6B5B52] py-2 hover:text-[#3D2314] transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
