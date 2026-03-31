import Section from '@/src/components/Section';
import SocialButtons from '@/src/components/SocialButtons';
import { TextCarousel } from '@/src/components/TextCarousel';
import { SectionRoutes } from '@/src/constants/routes';
import { prettifyUrl } from '@/src/utils/urls';
import Footer from '@/src/views/Footer';
import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';

const Contact = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [carouselText, setCarouselText] = useState<string>('');
  const fadeTimeoutRef = useRef<number | null>(null);

  const handleHoveredLinkChange = useCallback((url: string | null) => {
    if (fadeTimeoutRef.current) {
      window.clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
    if (url) {
      setHoveredLink(url);
      setCarouselText(prettifyUrl(url));
      return;
    }
    setHoveredLink(null);
    fadeTimeoutRef.current = window.setTimeout(() => {
      setCarouselText('');
      fadeTimeoutRef.current = null;
    }, 200);
  }, []);

  return (
    <Section
      id={SectionRoutes.Contact}
      overlayChildren={
        <Footer
          className="absolute inset-x-0 bottom-0 items-start border-none pl-4 !backdrop-blur-none sm:justify-start"
          showSocialLinks={false}
        />
      }
    >
      <div className="relative flex w-full flex-1 flex-col px-4 pb-4">
        <TextCarousel
          text={carouselText}
          direction="left"
          background
          className={clsx(
            'inset-x-0 top-1/4 -translate-y-1/2 transition-opacity duration-200',
            hoveredLink ? 'opacity-100' : 'opacity-0',
          )}
        />
        <TextCarousel
          text={carouselText}
          direction="right"
          background
          className={clsx(
            'inset-x-0 top-3/4 -translate-y-1/2 transition-opacity duration-200',
            hoveredLink ? 'opacity-100' : 'opacity-0',
          )}
        />
        <SocialButtons
          toolTipPlacement={null}
          className="flex w-full flex-1 items-center justify-evenly"
          setHoveredLink={handleHoveredLinkChange}
        />
      </div>
    </Section>
  );
};

export default Contact;
