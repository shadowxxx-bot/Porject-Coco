import { useState, useCallback } from 'react';
import { AnimatedSplash } from './AnimatedSplash';
import { OnboardingSlides } from './OnboardingSlides';
import { Splash } from './Splash';

type Phase = 'splash' | 'onboarding' | 'app';

export function LaunchExperience() {
  const [phase, setPhase] = useState<Phase>('splash');

  const handleSplashComplete = useCallback(() => {
    setPhase('onboarding');
  }, []);

  if (phase === 'app') {
    return <Splash />;
  }

  return (
    <>
      {phase === 'splash' && (
        <AnimatedSplash onComplete={handleSplashComplete} />
      )}
      {phase === 'onboarding' && <OnboardingSlides onComplete={() => setPhase('app')} />}
    </>
  );
}
