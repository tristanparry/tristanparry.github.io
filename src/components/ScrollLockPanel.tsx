import {
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_ANIMATION_EASE,
} from '@/src/constants/ui';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface ScrollLockPanelProps {
  children: ReactNode;
  className?: string;
  wheelLock?: boolean;
  isActive?: boolean;
  sectionCta?: {
    content?: ReactNode;
    className?: string;
  };
}

const ScrollLockPanel = ({
  children,
  className,
  sectionCta,
}: ScrollLockPanelProps) => (
  <div
    data-section-scroll
    className={clsx('no-scrollbar min-h-0 overflow-y-auto', className)}
  >
    <div className="flex min-h-full flex-col">
      <div>{children}</div>
      {sectionCta && sectionCta.content && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: DEFAULT_ANIMATION_DURATION,
            ease: DEFAULT_ANIMATION_EASE,
          }}
          viewport={{ amount: 'all', once: false }}
          className={clsx('mt-auto', sectionCta.className)}
        >
          {sectionCta.content}
        </motion.div>
      )}
    </div>
  </div>
);

export default ScrollLockPanel;
