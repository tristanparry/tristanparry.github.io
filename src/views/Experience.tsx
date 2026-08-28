import ExperienceRow from '@/src/components/ExperienceRow';
import ScrollLockPanel from '@/src/components/ScrollLockPanel';
import Section from '@/src/components/Section';
import TextLink from '@/src/components/TextLink';
import { SectionRoutes } from '@/src/constants/routes';
import { type ExperienceEntry } from '@/src/types/experience';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ExperienceProps {
  isActive?: boolean;
}

const Experience = ({ isActive }: ExperienceProps) => {
  const { t } = useTranslation();
  const [hoveredExperienceId, setHoveredExperienceId] = useState<string | null>(
    null,
  );

  const experiences = t('experience.timeline', {
    returnObjects: true,
  }) as ExperienceEntry[];

  return (
    <Section
      id={SectionRoutes.Experience}
      className="h-screen-safe overflow-hidden"
    >
      <ScrollLockPanel
        className="min-h-0 w-full flex-1 self-center text-sm"
        isActive={isActive}
        sectionCta={{
          content: (
            <TextLink
              linkText={t('experience.sectionCta')}
              linkType="section"
              path={SectionRoutes.Contact}
              className="font-semibold"
            />
          ),
          className: 'pl-4 pb-1 pt-4',
        }}
      >
        <div
          className="divide-tertiary-bg grid grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)] divide-y"
          onMouseLeave={() => setHoveredExperienceId(null)}
        >
          {experiences.map((experience) => (
            <ExperienceRow
              key={experience.id}
              experience={experience}
              hoveredExperienceId={hoveredExperienceId}
              setHoveredExperienceId={setHoveredExperienceId}
            />
          ))}
        </div>
      </ScrollLockPanel>
    </Section>
  );
};

export default Experience;
