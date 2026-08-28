import { DEFAULT_ICON_SIZE, Icons } from '@/src/constants/ui';
import type { Project } from '@/src/types/projects';
import { Icon } from '@iconify/react';
import { memo } from 'react';

interface ProjectForksProps {
  forks: Project['forks'];
}

const ProjectForks = memo(({ forks }: ProjectForksProps) => (
  <div className="text-secondary-text flex items-center gap-1">
    <Icon icon={Icons.Fork} height={DEFAULT_ICON_SIZE / 2} />
    <small className="text-primary-text">{forks}</small>
  </div>
));

export default ProjectForks;
