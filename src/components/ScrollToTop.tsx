import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document
        .querySelector<HTMLElement>('[data-scroll-container]')
        ?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 500);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
