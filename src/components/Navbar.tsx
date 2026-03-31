import TextLink from '@/src/components/TextLink';
import { AppRoutes, SectionRoutes } from '@/src/constants/routes';
import { useWindowScroll } from '@/src/utils/useWindowScroll';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  DEFAULT_ANIMATION_STAGGER_CHILDREN,
  DEFAULT_ANIMATION_DELAY_CHILDREN,
  DEFAULT_ANIMATION_DAMPING,
  DEFAULT_ANIMATION_STIFFNESS,
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_ANIMATION_EASE,
} from '../constants/ui';
import { usePageTransitionComplete } from '../utils/usePageTransitionComplete';

const Navbar = () => {
  const { t } = useTranslation();
  const { isScrolled } = useWindowScroll();
  const { hasCompleted } = usePageTransitionComplete();

  return (
    <div className="fixed top-0 right-0 z-20 w-full sm:w-min">
      <nav
        className={clsx(
          'flex justify-center p-4 select-none',
          'transition-all duration-200',
          isScrolled &&
            '[&_small]:text-tertiary-text hover:[&_small]:text-primary-text/80 hover:bg-primary-bg/50 [border-bottom-left-radius:var(--radius-xl)] bg-transparent hover:shadow-sm hover:backdrop-blur-sm [&_small]:mix-blend-difference hover:[&_small]:mix-blend-normal',
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
                duration: DEFAULT_ANIMATION_DURATION,
                ease: DEFAULT_ANIMATION_EASE,
                staggerChildren: DEFAULT_ANIMATION_STAGGER_CHILDREN / 2,
                delayChildren: DEFAULT_ANIMATION_DELAY_CHILDREN / 2,
              },
            },
          }}
          className="flex w-full items-center justify-between sm:w-auto sm:gap-4"
        >
          {Object.entries(SectionRoutes).map(([section, route]) => (
            <motion.div
              key={section}
              variants={{
                hidden: { opacity: 0, y: -5 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: DEFAULT_ANIMATION_DURATION,
                    ease: DEFAULT_ANIMATION_EASE,
                    type: 'spring',
                    stiffness: DEFAULT_ANIMATION_STIFFNESS,
                    damping: DEFAULT_ANIMATION_DAMPING,
                  },
                },
              }}
            >
              <TextLink
                key={section}
                linkText={t(`sections.${route}`)}
                linkType="section"
                path={route}
                className="transition-all duration-200"
              />
            </motion.div>
          ))}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -5 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: DEFAULT_ANIMATION_DURATION,
                  ease: DEFAULT_ANIMATION_EASE,
                  type: 'spring',
                  stiffness: DEFAULT_ANIMATION_STIFFNESS,
                  damping: DEFAULT_ANIMATION_DAMPING,
                },
              },
            }}
          >
            <TextLink
              linkText={t('sections.resume')}
              linkType="internal"
              path={AppRoutes.Resume}
              className="font-semibold transition-all duration-200"
            />
          </motion.div>
        </motion.div>
      </nav>
    </div>
  );
};

export default Navbar;
