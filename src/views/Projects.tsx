import MediaPopup from '@/src/components/MediaPopup';
import ProjectRow from '@/src/components/projects/ProjectRow';
import ScrollLockPanel from '@/src/components/ScrollLockPanel';
import Section from '@/src/components/Section';
import TextLink from '@/src/components/TextLink';
import { SectionRoutes } from '@/src/constants/routes';
import { SocialLinks } from '@/src/constants/socials';
import type { GithubProject } from '@/src/types/projects';
import { getGithubProjects } from '@/src/utils/getGithubProjects';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const POPUP_FADE_DURATION_MS = 200;

interface ProjectsProps {
  isActive?: boolean;
}

const Projects = ({ isActive }: ProjectsProps) => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<GithubProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hoveredProjectUrl, setHoveredProjectUrl] = useState<string | null>(
    null,
  );
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [mediaUrlsByProjectUrl, setMediaUrlsByProjectUrl] = useState<
    Record<string, string>
  >({});
  const hidePopupTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const projects = await getGithubProjects();
        setProjects(projects);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const createdUrls: string[] = [];
    const nextMediaUrlsByProjectUrl: Record<string, string> = {};
    for (const project of projects) {
      if (project.media?.video) {
        const objectUrl = URL.createObjectURL(project.media.video);
        createdUrls.push(objectUrl);
        nextMediaUrlsByProjectUrl[project.url] = objectUrl;
        continue;
      }
      if (project.media?.image) {
        const objectUrl = URL.createObjectURL(project.media.image);
        createdUrls.push(objectUrl);
        nextMediaUrlsByProjectUrl[project.url] = objectUrl;
      }
    }
    setMediaUrlsByProjectUrl(nextMediaUrlsByProjectUrl);
    return () => {
      createdUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [projects]);

  useEffect(() => {
    return () => {
      if (hidePopupTimeoutRef.current != null) {
        window.clearTimeout(hidePopupTimeoutRef.current);
      }
    };
  }, []);

  const showPopup = useCallback((projectUrl: string): void => {
    if (hidePopupTimeoutRef.current != null) {
      window.clearTimeout(hidePopupTimeoutRef.current);
      hidePopupTimeoutRef.current = null;
    }
    setHoveredProjectUrl(projectUrl);
    window.requestAnimationFrame(() => setIsPopupVisible(true));
  }, []);

  const hidePopup = useCallback((): void => {
    if (hoveredProjectUrl === null && !isPopupVisible) return;
    setIsPopupVisible(false);
    if (hidePopupTimeoutRef.current != null) {
      window.clearTimeout(hidePopupTimeoutRef.current);
    }
    hidePopupTimeoutRef.current = window.setTimeout(() => {
      setHoveredProjectUrl(null);
      hidePopupTimeoutRef.current = null;
    }, POPUP_FADE_DURATION_MS);
  }, [isPopupVisible, hoveredProjectUrl]);

  useEffect(() => {
    const hideOnScroll = (): void => {
      hidePopup();
    };
    window.addEventListener('scroll', hideOnScroll, true);
    return () => {
      window.removeEventListener('scroll', hideOnScroll, true);
    };
  }, [hidePopup]);

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
              showPopup={showPopup}
              hidePopup={hidePopup}
            />
          ))}
        </div>
      </ScrollLockPanel>
      {hoveredProjectUrl !== null && (
        <MediaPopup
          media={projects.find((p) => p.url === hoveredProjectUrl)?.media}
          mediaUrl={mediaUrlsByProjectUrl[hoveredProjectUrl]}
          isVisible={isPopupVisible}
        />
      )}
    </Section>
  );
};

export default Projects;
