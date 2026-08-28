import { type Dispatch, type SetStateAction } from 'react';

export interface GithubProject {
  name: string;
  description: string;
  url: string;
  languages: string[];
  forks: number;
  media?: { image?: Blob; video?: Blob };
}

export type Project = Omit<GithubProject, 'media'>;

export interface ProjectRowProps {
  project: Project;
  hoveredProjectUrl: string | null;
  setHoveredProjectUrl: Dispatch<SetStateAction<string | null>>;
  showPopup: (projectUrl: string) => void;
  hidePopup: () => void;
}
