import { SCROLL_THRESHOLD } from '@/src/constants/ui';
import { useEffect, useState } from 'react';

export const useWindowScroll = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [currentScrollPosition, setCurrentScrollPosition] = useState<number>(0);

  useEffect(() => {
    const scrollContainer = document.querySelector<HTMLElement>(
      '[data-scroll-container]',
    );
    const handleScroll = () => {
      const scrollPosition = scrollContainer?.scrollTop ?? window.scrollY;
      setIsScrolled(scrollPosition > SCROLL_THRESHOLD);
      setCurrentScrollPosition(scrollPosition);
    };
    handleScroll();
    const target = scrollContainer ?? window;
    target.addEventListener('scroll', handleScroll);
    return () => target.removeEventListener('scroll', handleScroll);
  }, []);

  return { isScrolled, currentScrollPosition };
};
