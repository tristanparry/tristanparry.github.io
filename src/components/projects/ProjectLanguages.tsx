import TextChip from '@/src/components/TextChip';
import type { Project } from '@/src/types/projects';
import { memo } from 'react';

interface ProjectLanguagesProps {
  languages: Project['languages'];
}

const ProjectLanguages = memo(({ languages }: ProjectLanguagesProps) => (
  <div className="flex flex-wrap items-center gap-1">
    {[...new Set(languages)].map((language) => (
      <TextChip
        key={language}
        text={language}
        className="border-primary-text text-primary-text"
      />
    ))}
  </div>
));

export default ProjectLanguages;
