import {
  DEFAULT_ANIMATION_DAMPING,
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_ANIMATION_EASE,
  DEFAULT_ANIMATION_STIFFNESS,
} from '@/src/constants/ui';
import type { TorontoTimeType } from '@/src/types/dates';
import { getCurrentTorontoTime } from '@/src/utils/dates';
import { usePageTransitionComplete } from '@/src/utils/usePageTransitionComplete';
import { useWindowScroll } from '@/src/utils/useWindowScroll';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import i18n from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const TorontoTime = () => {
  const { t } = useTranslation();
  const { isScrolled, currentScrollPosition } = useWindowScroll();
  const { hasCompleted } = usePageTransitionComplete();
  const [torontoTime, setTorontoTime] = useState<TorontoTimeType>(
    getCurrentTorontoTime(i18n.language),
  );
  const [viewportHeight, setViewportHeight] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setTorontoTime(getCurrentTorontoTime(i18n.language));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateViewportHeight = () =>
      setViewportHeight(window.innerHeight || 1);
    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
    return () => window.removeEventListener('resize', updateViewportHeight);
  }, []);

  const scrollOpacity = Math.max(0, 1 - currentScrollPosition / viewportHeight);

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={
        hasCompleted ? { opacity: scrollOpacity, y: 0 } : { opacity: 0, y: -5 }
      }
      transition={{
        duration: DEFAULT_ANIMATION_DURATION,
        ease: DEFAULT_ANIMATION_EASE,
        type: 'spring',
        stiffness: DEFAULT_ANIMATION_STIFFNESS,
        damping: DEFAULT_ANIMATION_DAMPING * 2.5,
      }}
      className={clsx(
        'fixed top-0 left-0 z-[5] mt-4 ml-4 hidden transition-colors duration-200 select-none sm:block',
        isScrolled && 'text-tertiary-text hover:text-primary-text',
      )}
    >
      <div className="flex flex-col">
        <small className="text-xs">
          {t('hero.torontoCityCode')}&nbsp;&bull;&nbsp;{torontoTime.time}
        </small>
        <small className="text-xs">{torontoTime.date}</small>
      </div>
    </motion.div>
  );
};

export default TorontoTime;
