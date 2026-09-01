import MediaPopup from '@/src/components/MediaPopup';
import ProjectRow from '@/src/components/projects/ProjectRow';
import ScrollLockPanel from '@/src/components/ScrollLockPanel';
import Section from '@/src/components/Section';
import TextLink from '@/src/components/TextLink';
import { DEFAULT_QUERY_STALE_TIME, QueryKeys } from '@/src/constants/query';
import { SectionRoutes } from '@/src/constants/routes';
import { SocialLinks } from '@/src/constants/socials';
import type { GithubProject } from '@/src/types/projects';
import { getGithubProjects } from '@/src/utils/getGithubProjects';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ProjectsProps {
  isActive?: boolean;
}

const Projects = ({ isActive }: ProjectsProps) => {
  const { t } = useTranslation();
  const { data: projects = [], isLoading } = useQuery<GithubProject[]>({
    queryKey: [QueryKeys.GithubProjects],
    queryFn: getGithubProjects,
    staleTime: DEFAULT_QUERY_STALE_TIME,
  });
  const [hoveredProjectUrl, setHoveredProjectUrl] = useState<string | null>(
    null,
  );
  useEffect(() => {
    const hideOnScroll = (): void => {
      setHoveredProjectUrl(null);
    };
    window.addEventListener('scroll', hideOnScroll, true);
    return () => {
      window.removeEventListener('scroll', hideOnScroll, true);
    };
  }, []);

  const CtaButton = (
    <TextLink
      linkText={t('projects.sectionCta')}
      linkType="external"
      path={SocialLinks.GitHub}
      className="font-semibold"
    />
  );

  if (isLoading) {
    return (
      <Section
        id={SectionRoutes.Projects}
        className="h-screen-safe overflow-hidden"
      >
        <div className="flex w-full flex-1 items-center justify-center">
          <div className="border-secondary-text h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 md:h-10 md:w-10"></div>
        </div>
      </Section>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <Section
        id={SectionRoutes.Projects}
        className="h-screen-safe overflow-hidden"
      >
        <div className="flex w-full flex-1 items-center justify-center">
          {CtaButton}
        </div>
      </Section>
    );
  }

  return (
    <Section
      id={SectionRoutes.Projects}
      className="h-screen-safe overflow-hidden"
    >
      <ScrollLockPanel
        className="min-h-0 w-full flex-1 self-center text-sm"
        isActive={isActive}
        sectionCta={{
          content: CtaButton,
          className: 'pl-4 pb-1 pt-4',
        }}
      >
        <div
          className="divide-tertiary-bg flex flex-col divide-y"
          onMouseLeave={() => setHoveredProjectUrl(null)}
        >
          {projects.map((project) => (
            <ProjectRow
              key={project.url}
              project={project}
              hoveredProjectUrl={hoveredProjectUrl}
              setHoveredProjectUrl={setHoveredProjectUrl}
            />
          ))}
        </div>
      </ScrollLockPanel>
      <AnimatePresence>
        {hoveredProjectUrl !== null && (
          <MediaPopup
            key={hoveredProjectUrl}
            media={projects.find((p) => p.url === hoveredProjectUrl)?.media}
          />
        )}
      </AnimatePresence>
    </Section>
  );
};

export default Projects;
