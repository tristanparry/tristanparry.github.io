import {
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_ANIMATION_EASE,
} from '@/src/constants/ui';
import type { ExperienceDetailsProps } from '@/src/types/experience';
import { AnimatePresence, motion } from 'framer-motion';
import { memo } from 'react';

const ExperienceDetails = memo(
  ({ experience, hoveredExperienceId }: ExperienceDetailsProps) => (
    <AnimatePresence initial={false}>
      {hoveredExperienceId === experience.id && experience.details && (
        <motion.div
          initial={{ height: 0, opacity: 0, y: 0 }}
          animate={{ height: 'auto', opacity: 1, y: 0 }}
          exit={{ height: 0, opacity: 0, y: 0 }}
          transition={{
            duration: DEFAULT_ANIMATION_DURATION / 2,
            ease: DEFAULT_ANIMATION_EASE,
          }}
          className="text-tertiary-text col-span-3 overflow-hidden"
        >
          <div className="flex flex-col gap-2 pt-4 sm:pl-8">
            {experience.details?.map((detail, i) => (
              <small key={i}>
                {'> '}
                {detail}
              </small>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  ),
);

export default ExperienceDetails;
