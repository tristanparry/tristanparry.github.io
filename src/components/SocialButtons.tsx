import Button from '@/src/components/Button';
import { SocialLinks } from '@/src/constants/socials';
import {
  DEFAULT_ANIMATION_DELAY_CHILDREN,
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_ANIMATION_EASE,
  DEFAULT_ANIMATION_ROW_VIEWPORT_AMOUNT,
  DEFAULT_ANIMATION_STAGGER_CHILDREN,
  Icons,
} from '@/src/constants/ui';
import { TooltipPlacement } from '@/src/types/tooltip';
import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface SocialButtonsProps {
  toolTipPlacement?: TooltipPlacement | null;
  className?: string;
  setHoveredLink?: (url: string | null) => void;
}

const SocialButtons = ({
  toolTipPlacement = TooltipPlacement.Top,
  className,
  setHoveredLink,
}: SocialButtonsProps) => {
  const { t } = useTranslation();

  const openLink = useCallback((url: string) => window.open(url, '_blank'), []);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            duration: DEFAULT_ANIMATION_DURATION * 2,
            ease: DEFAULT_ANIMATION_EASE,
            staggerChildren: DEFAULT_ANIMATION_STAGGER_CHILDREN / 2,
            delayChildren: DEFAULT_ANIMATION_DELAY_CHILDREN / 2,
          },
        },
      }}
      viewport={{
        amount: DEFAULT_ANIMATION_ROW_VIEWPORT_AMOUNT,
        once: false,
      }}
      className={className}
    >
      {Object.entries(SocialLinks).map(([name, url]) => (
        <Button
          key={name}
          hideTooltip={toolTipPlacement === null}
          tooltipPlacement={toolTipPlacement ?? undefined}
          iconName={Icons[name as keyof typeof Icons]}
          altText={t(`footer.links.${name.toLowerCase()}`)}
          onClick={() => openLink(url)}
          onMouseEnter={() => setHoveredLink?.(url)}
          onMouseLeave={() => setHoveredLink?.(null)}
        />
      ))}
    </motion.div>
  );
};

export default SocialButtons;
