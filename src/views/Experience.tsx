import ExperienceRow from '@/src/components/ExperienceRow';
import ScrollLockPanel from '@/src/components/ScrollLockPanel';
import Section from '@/src/components/Section';
import TextLink from '@/src/components/TextLink';
import { SectionRoutes } from '@/src/constants/routes';
import { DEFAULT_BOTTOM_SLOT_MIN_SPACE } from '@/src/constants/ui';
import { type ExperienceEntry } from '@/src/types/experience';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ExperienceProps {
  isActive?: boolean;
}

const Experience = ({ isActive }: ExperienceProps) => {
  const { t } = useTranslation();
  const [hoveredExperienceIndex, setHoveredExperienceIndex] = useState<
    number | null
  >(null);

  const experiences = t('experience.timeline', {
    returnObjects: true,
  }) as ExperienceEntry[];

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
        <div
          className="divide-tertiary-bg grid grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)] divide-y"
          onMouseLeave={() => setHoveredExperienceIndex(null)}
        >
          {experiences.map((experience, i) => (
            <ExperienceRow
              key={experience.id}
              experience={experience}
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
