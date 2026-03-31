import Section from '@/src/components/Section';
import { SectionRoutes } from '@/src/constants/routes';
import {
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_ANIMATION_EASE,
  DEFAULT_ANIMATION_DAMPING,
  DEFAULT_ANIMATION_STIFFNESS,
} from '@/src/constants/ui';
import { usePageTransitionComplete } from '@/src/utils/usePageTransitionComplete';
import { useWindowScroll } from '@/src/utils/useWindowScroll';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const { hasCompleted } = usePageTransitionComplete();
  const { currentScrollPosition } = useWindowScroll();
  const descriptionOptions = t('hero.descriptionOptions', {
    returnObjects: true,
  }) as string[];
  const [optionIndex, setOptionIndex] = useState<number>(0);
  const [typedOption, setTypedOption] = useState<string>(
    descriptionOptions[0] ?? '',
  );
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [viewportHeight, setViewportHeight] = useState<number>(1);

  useEffect(() => {
    if (!hasCompleted || descriptionOptions.length === 0) return;
    const fullText = descriptionOptions[optionIndex] ?? '';
    const typingMs = 70;
    const deletingMs = 35;
    const pauseAfterTypedMs = 3000;
    const pauseAfterDeletedMs = 250;
    const timeout = window.setTimeout(
      () => {
        if (!isDeleting) {
          if (typedOption.length < fullText.length) {
            setTypedOption(fullText.slice(0, typedOption.length + 1));
            return;
          }
          setIsDeleting(true);
          return;
        }
        if (typedOption.length > 0) {
          setTypedOption(fullText.slice(0, typedOption.length - 1));
          return;
        }
        setIsDeleting(false);
        setOptionIndex((prev) => (prev + 1) % descriptionOptions.length);
      },
      isDeleting
        ? typedOption.length === 0
          ? pauseAfterDeletedMs
          : deletingMs
        : typedOption.length === fullText.length
          ? pauseAfterTypedMs
          : typingMs,
    );
    return () => window.clearTimeout(timeout);
  }, [descriptionOptions, optionIndex, typedOption, isDeleting, hasCompleted]);

  useEffect(() => {
    const updateViewportHeight = () =>
      setViewportHeight(window.innerHeight || 1);
    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
    return () => window.removeEventListener('resize', updateViewportHeight);
  }, []);

  const scrollOpacity = Math.max(0, 1 - currentScrollPosition / viewportHeight);

  return (
    <Section
      id={SectionRoutes.Hero}
      hero
      className="h-screen-safe grid [grid-template-areas:'stack']"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={hasCompleted ? { opacity: scrollOpacity } : { opacity: 0 }}
        transition={{
          duration: DEFAULT_ANIMATION_DURATION,
          ease: DEFAULT_ANIMATION_EASE,
        }}
        className="text-secondary-text relative z-10 inline-block max-w-1/3 place-self-center [grid-area:stack] md:max-w-1/2"
      >
        {t('hero.description', { option: '' })}{' '}
        <span className="text-primary-text relative inline font-semibold whitespace-nowrap">
          {typedOption}
        </span>
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={
          hasCompleted
            ? { opacity: scrollOpacity, y: 0 }
            : { opacity: 0, y: 50 }
        }
        transition={{
          duration: DEFAULT_ANIMATION_DURATION,
          ease: DEFAULT_ANIMATION_EASE,
          type: 'spring',
          stiffness: DEFAULT_ANIMATION_STIFFNESS,
          damping: DEFAULT_ANIMATION_DAMPING * 2.5,
        }}
        className="font-heading text-hero relative z-10 max-w-[85%] self-end justify-self-start leading-none font-bold [grid-area:stack]"
      >
        {t('hero.name')}
      </motion.h1>
    </Section>
  );
};

export default Hero;
