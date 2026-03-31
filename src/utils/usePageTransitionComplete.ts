import { useEffect, useState } from 'react';

export const usePageTransitionComplete = () => {
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  useEffect(() => {
    const handleComplete = () => {
      setHasCompleted(true);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('page-transition-complete', handleComplete);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('page-transition-complete', handleComplete);
      }
    };
  }, []);

  return { hasCompleted };
};
