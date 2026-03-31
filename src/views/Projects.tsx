import MediaPopup from '@/src/components/MediaPopup';
import ScrollLockPanel from '@/src/components/ScrollLockPanel';
import Section from '@/src/components/Section';
import TextChip from '@/src/components/TextChip';
import TextLink from '@/src/components/TextLink';
import { SectionRoutes } from '@/src/constants/routes';
import { SocialLinks } from '@/src/constants/socials';
import {
  DEFAULT_ICON_SIZE,
  DEFAULT_ANIMATION_ROW_VIEWPORT_AMOUNT,
  DEFAULT_ANIMATION_DAMPING,
  DEFAULT_ANIMATION_STIFFNESS,
  DEFAULT_BOTTOM_SLOT_MIN_SPACE,
  Icons,
} from '@/src/constants/ui';
import {
  getGithubProjects,
  type GithubProject,
} from '@/src/utils/getGithubProjects';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const POPUP_FADE_DURATION_MS = 200;

interface ProjectLanguagesProps {
  languages: string[];
  isSelected: boolean;
}

const ProjectLanguages = memo(
  ({ languages, isSelected }: ProjectLanguagesProps) => (
    <div className="flex flex-wrap items-center gap-1">
      {languages.map((language, index) => (
        <TextChip
          key={`${language}-${index}`}
          text={language}
          className={clsx(
            isSelected && 'border-primary-text text-primary-text',
          )}
        />
      ))}
    </div>
  ),
);

interface ProjectForkChipProps {
  forks: number;
  isSelected: boolean;
}

const ProjectForkChip = memo(({ forks, isSelected }: ProjectForkChipProps) => (
  <div className="text-secondary-text flex items-center gap-1">
    <Icon icon={Icons.Fork} height={DEFAULT_ICON_SIZE / 2} />
    <small className={clsx(isSelected && 'text-primary-text')}>{forks}</small>
  </div>
));

interface ProjectRowContentProps {
  name: string;
  description: string;
  forks: number;
  languages: string[];
  isSelected: boolean;
}

const ProjectRowContent = memo(
  ({
    name,
    description,
    forks,
    languages,
    isSelected,
  }: ProjectRowContentProps) => (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <p className="text-primary-text after:bg-primary-text group-hover:text-primary-text relative inline-block w-fit after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-200 group-hover:after:scale-x-100">
          {name}
        </p>
        <div className="flex justify-end sm:hidden">
          <ProjectForkChip forks={forks} isSelected={isSelected} />
        </div>
        <div className="hidden sm:flex sm:justify-end">
          <ProjectLanguages languages={languages} isSelected={isSelected} />
        </div>
      </div>
      <div className="flex items-end justify-between gap-1">
        <small className="text-secondary-text text-balance">
          {description}
        </small>
        <div className="hidden sm:flex">
          <ProjectForkChip forks={forks} isSelected={isSelected} />
        </div>
      </div>
      <div className="flex justify-start sm:hidden">
        <ProjectLanguages languages={languages} isSelected={isSelected} />
      </div>
    </div>
  ),
);

const Projects = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<GithubProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<
    number | null
  >(null);
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

  const showPopup = useCallback((i: number): void => {
    if (hidePopupTimeoutRef.current != null) {
      window.clearTimeout(hidePopupTimeoutRef.current);
      hidePopupTimeoutRef.current = null;
    }
    setSelectedProjectIndex(i);
    window.requestAnimationFrame(() => setIsPopupVisible(true));
  }, []);

  const hidePopup = useCallback((): void => {
    if (selectedProjectIndex === null && !isPopupVisible) return;
    setIsPopupVisible(false);
    if (hidePopupTimeoutRef.current != null) {
      window.clearTimeout(hidePopupTimeoutRef.current);
    }
    hidePopupTimeoutRef.current = window.setTimeout(() => {
      setSelectedProjectIndex(null);
      hidePopupTimeoutRef.current = null;
    }, POPUP_FADE_DURATION_MS);
  }, [isPopupVisible, selectedProjectIndex]);

  useEffect(() => {
    const hideOnScroll = (): void => {
      hidePopup();
    };
    window.addEventListener('scroll', hideOnScroll, true);
    return () => {
      window.removeEventListener('scroll', hideOnScroll, true);
    };
  }, [hidePopup]);

  const bottomSlot = (
    <div className="flex max-w-xl flex-col gap-2">
      <h4 className="font-heading text-primary-text font-semibold">
        {t('projects.bottomSlot.header')}
      </h4>
      <small className="text-secondary-text text-balance">
        {t('projects.bottomSlot.description')}
      </small>
      <TextLink
        linkText={t('projects.bottomSlot.cta')}
        linkType="external"
        path={SocialLinks.GitHub}
        className="font-semibold"
      />
    </div>
  );

  if (isLoading) {
    return (
      <Section id={SectionRoutes.Projects} className="h-screen overflow-hidden">
        <div className="flex w-full flex-1 items-center justify-center">
          <div className="border-secondary-text h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 md:h-10 md:w-10"></div>
        </div>
      </Section>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <Section id={SectionRoutes.Projects} className="h-screen overflow-hidden">
        <div className="flex w-full flex-1 items-center justify-center">
          <TextLink
            linkText="GitHub"
            linkType="external"
            path={SocialLinks.GitHub}
          />
        </div>
      </Section>
    );
  }

  return (
    <Section id={SectionRoutes.Projects} className="h-screen overflow-hidden">
      <ScrollLockPanel
        className="min-h-0 w-full flex-1 self-center text-sm"
        bottomSlot={bottomSlot}
        bottomSlotClassName="p-4 rounded-r-md backdrop-blur-sm"
        bottomSlotMinSpace={DEFAULT_BOTTOM_SLOT_MIN_SPACE}
      >
        <div
          className="divide-tertiary-bg flex flex-col divide-y"
          onMouseLeave={() => setSelectedProjectIndex(null)}
        >
          {projects.map((project, i) => {
            const isSelected = selectedProjectIndex === i;

            return (
              <motion.a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="group relative p-4 transition-colors duration-200 hover:backdrop-blur-lg"
                onMouseEnter={() => showPopup(i)}
                onMouseOver={() =>
                  selectedProjectIndex === null &&
                  !isPopupVisible &&
                  showPopup(i)
                }
                onMouseLeave={hidePopup}
                initial="hidden"
                whileInView="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      type: 'spring',
                      stiffness: DEFAULT_ANIMATION_STIFFNESS,
                      damping: DEFAULT_ANIMATION_DAMPING,
                    },
                  },
                }}
                viewport={{
                  amount: DEFAULT_ANIMATION_ROW_VIEWPORT_AMOUNT,
                  once: false,
                }}
              >
                <div
                  className={clsx(
                    'transition-opacity duration-200',
                    selectedProjectIndex !== null &&
                      selectedProjectIndex !== i &&
                      'opacity-25',
                  )}
                >
                  <ProjectRowContent
                    name={project.name}
                    description={t(project.description)}
                    forks={project.forks}
                    languages={project.languages}
                    isSelected={isSelected}
                  />
                </div>
              </motion.a>
            );
          })}
        </div>
      </ScrollLockPanel>
      {selectedProjectIndex !== null && (
        <MediaPopup
          media={projects[selectedProjectIndex].media}
          mediaUrl={mediaUrlsByProjectUrl[projects[selectedProjectIndex].url]}
          isVisible={isPopupVisible}
        />
      )}
    </Section>
  );
};

export default Projects;
