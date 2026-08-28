import SvgCursor from '@/src/components/SvgCursor';
import {
  COMPANY_ASSETS,
  ROW_VARIANTS,
  ROW_VIEWPORT,
} from '@/src/constants/experience';
import {
  type ExperienceRowContentProps,
  type ExperienceRowProps,
} from '@/src/types/experience';
import { formatPositionDateRange } from '@/src/utils/dates';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import i18n from 'i18next';
import { memo } from 'react';

const ExperienceRowContent = memo(
  ({ id, company, positions }: ExperienceRowContentProps) => {
    const CompanyIcon = COMPANY_ASSETS[id].icon;

    return (
      <>
        <div className="flex items-center gap-2 sm:col-start-1 sm:row-start-1">
          <div className="flex w-full flex-row-reverse items-center justify-between sm:w-auto sm:flex-row sm:justify-start sm:gap-2">
            <div className="flex h-4 w-8 shrink-0 items-center justify-end sm:justify-center">
              {id && <CompanyIcon aria-hidden className="h-full w-auto" />}
            </div>
            <p className="text-primary-text after:bg-primary-text group-hover:text-primary-text relative truncate after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-200 group-hover:after:scale-x-100">
              {company}
            </p>
          </div>
        </div>
        {positions.map((position, i) => (
          <div key={i} className="flex justify-between gap-2 sm:contents">
            <small className="text-secondary-text truncate sm:col-start-2">
              {position.title}
            </small>
            <small className="text-secondary-text whitespace-nowrap sm:col-start-3 sm:text-right">
              {formatPositionDateRange(
                position,
                i18n.language,
                i18n.t('experience.present'),
              )}
            </small>
          </div>
        ))}
      </>
    );
  },
);

const ExperienceRow = memo(
  ({
    experience,
    index,
    hoveredExperienceIndex,
    setHoveredExperienceIndex,
  }: ExperienceRowProps) => (
    <SvgCursor svg={COMPANY_ASSETS[experience.id].svg}>
      <motion.a
        href={experience.url}
        target="_blank"
        rel="noreferrer"
        className="group col-span-3 grid grid-cols-1 gap-1 p-4 transition-colors duration-200 hover:backdrop-blur-xl sm:grid-cols-[subgrid] sm:items-baseline sm:gap-x-6"
        onMouseEnter={() => setHoveredExperienceIndex(index)}
        onMouseOver={() =>
          hoveredExperienceIndex !== null && setHoveredExperienceIndex(index)
        }
        onMouseLeave={() => setHoveredExperienceIndex(null)}
        initial="hidden"
        whileInView="show"
        variants={ROW_VARIANTS}
        viewport={ROW_VIEWPORT}
      >
        <div
          className={clsx(
            'col-span-3 grid grid-cols-1 gap-1 transition-opacity duration-200 sm:grid-cols-[subgrid] sm:items-baseline sm:gap-x-6',
            hoveredExperienceIndex !== null &&
              hoveredExperienceIndex !== index &&
              'opacity-25',
          )}
        >
          <ExperienceRowContent {...experience} />
        </div>
      </motion.a>
    </SvgCursor>
  ),
);

export default ExperienceRow;
