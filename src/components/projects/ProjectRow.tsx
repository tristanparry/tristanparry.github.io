import ProjectForks from '@/src/components/projects/ProjectForks';
import ProjectLanguages from '@/src/components/projects/ProjectLanguages';
import { ROW_VARIANTS, ROW_VIEWPORT } from '@/src/constants/ui';
import { type Project, type ProjectRowProps } from '@/src/types/projects';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import i18n from 'i18next';
import { memo } from 'react';

const ProjectRowContent = memo(
  ({ name, description, forks, languages }: Project) => (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <p className="text-primary-text after:bg-primary-text group-hover:text-primary-text relative inline-block w-fit after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-200 group-hover:after:scale-x-100">
          {name}
        </p>
        <div className="flex justify-end sm:hidden">
          <ProjectForks forks={forks} />
        </div>
        <div className="hidden sm:flex sm:justify-end">
          <ProjectLanguages languages={languages} />
        </div>
      </div>
      <div className="flex items-end justify-between gap-1">
        <small className="text-secondary-text text-balance">
          {i18n.t(description)}
        </small>
        <div className="hidden sm:flex">
          <ProjectForks forks={forks} />
        </div>
      </div>
      <div className="flex justify-start sm:hidden">
        <ProjectLanguages languages={languages} />
      </div>
    </div>
  ),
);

const ProjectRow = ({
  project,
  hoveredProjectUrl,
  setHoveredProjectUrl,
}: ProjectRowProps) => (
  <motion.a
    href={project.url}
    target="_blank"
    rel="noreferrer"
    className="group relative p-4 transition-colors duration-200 hover:backdrop-blur-xl"
    onMouseEnter={() => setHoveredProjectUrl(project.url)}
    onMouseMove={() => setHoveredProjectUrl(project.url)}
    onMouseLeave={() => setHoveredProjectUrl(null)}
    initial="hidden"
    whileInView="show"
    variants={ROW_VARIANTS}
    viewport={ROW_VIEWPORT}
  >
    <div
      className={clsx(
        'transition-opacity duration-200',
        hoveredProjectUrl !== null &&
          hoveredProjectUrl !== project.url &&
          'opacity-25',
      )}
    >
      <ProjectRowContent {...project} />
    </div>
  </motion.a>
);

export default ProjectRow;
