import LanguageMenu from '@/src/components/settings/LanguageMenu';
import ThemeButton from '@/src/components/settings/ThemeButton';
import {
  DEFAULT_ANIMATION_DELAY_CHILDREN,
  DEFAULT_ANIMATION_DAMPING,
  DEFAULT_ANIMATION_STAGGER_CHILDREN,
  DEFAULT_ANIMATION_STIFFNESS,
} from '@/src/constants/ui';
import { usePageTransitionComplete } from '@/src/utils/usePageTransitionComplete';
import { useWindowScroll } from '@/src/utils/useWindowScroll';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const SettingsMenu = () => {
  const { isScrolled } = useWindowScroll();
  const { hasCompleted } = usePageTransitionComplete();

  return (
    <div
      className={clsx(
        'fixed right-0 bottom-0 z-[15] p-2',
        isScrolled &&
          '[&_button]:text-tertiary-text hover:[&_button]:text-primary-text [&_button]:mix-blend-difference [&_button]:hover:mix-blend-normal',
      )}
    >
      <motion.div
        initial="hidden"
        animate={hasCompleted ? 'show' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: DEFAULT_ANIMATION_STAGGER_CHILDREN,
              delayChildren: DEFAULT_ANIMATION_DELAY_CHILDREN,
            },
          },
        }}
        className="flex flex-col sm:flex-row"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                stiffness: DEFAULT_ANIMATION_STIFFNESS,
                damping: DEFAULT_ANIMATION_DAMPING,
              },
            },
          }}
        >
          <ThemeButton />
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                stiffness: DEFAULT_ANIMATION_STIFFNESS,
                damping: DEFAULT_ANIMATION_DAMPING,
              },
            },
          }}
        >
          <LanguageMenu />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SettingsMenu;
