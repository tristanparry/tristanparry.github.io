import { EXTRA_SMALL_SCREEN_BREAKPOINT } from '@/src/constants/ui';
import { useWindowSize } from '@/src/utils/useWindowSize';
import { useEffect, useState } from 'react';

export const useNavbarHeight = () => {
  const { width } = useWindowSize();
  const [navbarHeight, setNavbarHeight] = useState<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined')
      return;

    const handleResize = () => {
      setNavbarHeight(document.querySelector('nav')?.clientHeight || 0);
    };

    handleResize(); // initial mount calculation
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width < EXTRA_SMALL_SCREEN_BREAKPOINT ? navbarHeight : 0;
};
