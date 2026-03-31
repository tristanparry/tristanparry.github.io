import { useCallback } from 'react';

export const useSectionScroll = () => {
  const scrollToSection = useCallback((id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    const scrollContainer = document.querySelector<HTMLElement>(
      '[data-scroll-container]',
    );
    if (!scrollContainer) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    scrollContainer.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth',
    });
  }, []);

  return { scrollToSection };
};
