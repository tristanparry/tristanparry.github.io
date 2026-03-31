import ScrollLockPanel from '@/src/components/ScrollLockPanel';
import Section from '@/src/components/Section';
import SvgCursor from '@/src/components/SvgCursor';
import TextLink from '@/src/components/TextLink';
import {
  COMPANY_LOGOS,
  COMPANY_LOGOS_SVGS,
  EXPERIENCES,
} from '@/src/constants/experience';
import { SectionRoutes } from '@/src/constants/routes';
import {
  DEFAULT_ANIMATION_STIFFNESS,
  DEFAULT_ANIMATION_DAMPING,
  DEFAULT_ANIMATION_ROW_VIEWPORT_AMOUNT,
  DEFAULT_BOTTOM_SLOT_MIN_SPACE,
} from '@/src/constants/ui';
import {
  formatPositionDateRange,
  getLatestPositionStartDate,
} from '@/src/utils/dates';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import {
  memo,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { useTranslation } from 'react-i18next';

const ROW_VARIANTS = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: DEFAULT_ANIMATION_STIFFNESS,
      damping: DEFAULT_ANIMATION_DAMPING,
    },
  },
} as const;

const ROW_VIEWPORT = {
  amount: DEFAULT_ANIMATION_ROW_VIEWPORT_AMOUNT,
  once: false,
} as const;

type LogoIconComponent =
  | (typeof COMPANY_LOGOS)[keyof typeof COMPANY_LOGOS]
  | undefined;

interface ExperienceProps {
  isActive?: boolean;
}

interface ExperiencePositionDisplay {
  key: string;
  title: string;
  dateRange: string;
}

interface ExperienceRowData {
  company: string;
  url: string;
  cursorSvg?: string;
  LogoIcon?: LogoIconComponent;
  positions: ExperiencePositionDisplay[];
}

interface ExperienceDesktopRowContentProps {
  company: string;
  LogoIcon?: LogoIconComponent;
  positions: ExperiencePositionDisplay[];
}

const ExperienceDesktopRowContent = memo(
  ({ company, LogoIcon, positions }: ExperienceDesktopRowContentProps) => (
    <>
      <div className="flex items-center gap-2">
        <div className="flex h-4 w-8 shrink-0 items-center justify-center">
          {LogoIcon && <LogoIcon aria-hidden className="h-full w-auto" />}
        </div>
        <p className="text-primary-text after:bg-primary-text group-hover:text-primary-text relative truncate after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-200 group-hover:after:scale-x-100">
          {company}
        </p>
      </div>
      <div className="text-secondary-text truncate">
        <div className="flex flex-col gap-0.5">
          {positions.map((position) => (
            <small key={position.key}>{position.title}</small>
          ))}
        </div>
      </div>
      <div className="text-secondary-text text-right whitespace-nowrap">
        <div className="flex flex-col gap-0.5">
          {positions.map((position) => (
            <small key={position.key}>{position.dateRange}</small>
          ))}
        </div>
      </div>
    </>
  ),
);

interface ExperienceMobileRowContentProps {
  company: string;
  LogoIcon?: LogoIconComponent;
  positions: ExperiencePositionDisplay[];
}

const ExperienceMobileRowContent = memo(
  ({ company, LogoIcon, positions }: ExperienceMobileRowContentProps) => (
    <>
      <div className="flex items-center justify-between gap-2">
        <p className="text-primary-text after:bg-primary-text group-hover:text-primary-text relative truncate after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-200 group-hover:after:scale-x-100">
          {company}
        </p>
        <div className="flex h-4 w-8 shrink-0 items-center justify-end">
          {LogoIcon && <LogoIcon aria-hidden className="h-full w-auto" />}
        </div>
      </div>

      <div className="mt-1 flex flex-col gap-0.5">
        {positions.map((position) => (
          <div
            key={position.key}
            className="text-secondary-text flex justify-between"
          >
            <div>{position.title}</div>
            <div>{position.dateRange}</div>
          </div>
        ))}
      </div>
    </>
  ),
);

interface ExperienceDesktopRowProps {
  row: ExperienceRowData;
  index: number;
  hoveredExperienceIndex: number | null;
  setHoveredExperienceIndex: Dispatch<SetStateAction<number | null>>;
}

const ExperienceDesktopRow = memo(
  ({
    row,
    index,
    hoveredExperienceIndex,
    setHoveredExperienceIndex,
  }: ExperienceDesktopRowProps) => (
    <SvgCursor svg={row.cursorSvg}>
      <motion.a
        href={row.url}
        target="_blank"
        rel="noreferrer"
        className="group col-span-3 grid grid-cols-[subgrid] items-baseline p-4 transition-colors duration-200 hover:backdrop-blur-xl"
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
            'col-span-3 grid grid-cols-[subgrid] items-baseline transition-opacity duration-200',
            hoveredExperienceIndex !== null &&
              hoveredExperienceIndex !== index &&
              'opacity-25',
          )}
        >
          <ExperienceDesktopRowContent
            company={row.company}
            LogoIcon={row.LogoIcon}
            positions={row.positions}
          />
        </div>
      </motion.a>
    </SvgCursor>
  ),
);

interface ExperienceMobileRowProps {
  row: ExperienceRowData;
  index: number;
  hoveredExperienceIndex: number | null;
  setHoveredExperienceIndex: Dispatch<SetStateAction<number | null>>;
}

const ExperienceMobileRow = memo(
  ({
    row,
    index,
    hoveredExperienceIndex,
    setHoveredExperienceIndex,
  }: ExperienceMobileRowProps) => (
    <SvgCursor svg={row.cursorSvg}>
      <motion.a
        href={row.url}
        target="_blank"
        rel="noreferrer"
        className="group relative p-4 transition-colors duration-200 hover:backdrop-blur-xl"
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
            'transition-opacity duration-200',
            hoveredExperienceIndex !== null &&
              hoveredExperienceIndex !== index &&
              'opacity-25',
          )}
        >
          <ExperienceMobileRowContent
            company={row.company}
            LogoIcon={row.LogoIcon}
            positions={row.positions}
          />
        </div>
      </motion.a>
    </SvgCursor>
  ),
);

const Experience = ({ isActive }: ExperienceProps) => {
  const { i18n, t } = useTranslation();
  const [hoveredExperienceIndex, setHoveredExperienceIndex] = useState<
    number | null
  >(null);

  const experienceRows = useMemo(
    () =>
      [...EXPERIENCES]
        .sort(
          (a, b) =>
            getLatestPositionStartDate(b).getTime() -
            getLatestPositionStartDate(a).getTime(),
        )
        .map((experience) => {
          const sortedPositions = [...experience.positions].sort((a, b) =>
            a.start < b.start ? 1 : -1,
          );

          return {
            company: experience.company,
            url: experience.url,
            LogoIcon:
              COMPANY_LOGOS[experience.company as keyof typeof COMPANY_LOGOS],
            cursorSvg:
              COMPANY_LOGOS_SVGS[
                experience.company as keyof typeof COMPANY_LOGOS_SVGS
              ],
            positions: sortedPositions.map((position) => ({
              key: `${position.title}-${position.start}-${position.end ?? 'present'}`,
              title: t(position.title),
              dateRange: formatPositionDateRange(
                position,
                i18n.language,
                t('experience.present'),
              ),
            })),
          };
        }),
    [i18n.language, t],
  );

  const bottomSlot = (
    <div className="flex max-w-xl flex-col gap-2">
      <h4 className="font-heading text-primary-text font-semibold">
        {t('experience.bottomSlot.header')}
      </h4>
      <small className="text-secondary-text text-balance">
        {t('experience.bottomSlot.description')}
      </small>
      <TextLink
        linkText={t('experience.bottomSlot.cta')}
        linkType="section"
        path={SectionRoutes.Contact}
        className="font-semibold"
      />
    </div>
  );

  return (
    <Section
      id={SectionRoutes.Experience}
      className="h-screen-safe overflow-hidden"
    >
      <ScrollLockPanel
        className="min-h-0 w-full flex-1 self-center text-sm"
        isActive={isActive}
        bottomSlot={bottomSlot}
        bottomSlotClassName="p-4"
        bottomSlotMinSpace={DEFAULT_BOTTOM_SLOT_MIN_SPACE}
      >
        {/* Desktop */}
        <div
          className="divide-tertiary-bg hidden grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)] gap-x-6 divide-y sm:grid"
          onMouseLeave={() => setHoveredExperienceIndex(null)}
        >
          {experienceRows.map((row, i) => (
            <ExperienceDesktopRow
              key={row.company}
              row={row}
              index={i}
              hoveredExperienceIndex={hoveredExperienceIndex}
              setHoveredExperienceIndex={setHoveredExperienceIndex}
            />
          ))}
        </div>

        {/* Mobile */}
        <div
          className="divide-tertiary-bg flex flex-col divide-y sm:hidden"
          onMouseLeave={() => setHoveredExperienceIndex(null)}
        >
          {experienceRows.map((row, i) => (
            <ExperienceMobileRow
              key={row.company}
              row={row}
              index={i}
              hoveredExperienceIndex={hoveredExperienceIndex}
              setHoveredExperienceIndex={setHoveredExperienceIndex}
            />
          ))}
        </div>
      </ScrollLockPanel>
    </Section>
  );
};

export default Experience;
