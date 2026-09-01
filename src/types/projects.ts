import { type Dispatch, type SetStateAction } from 'react';

export type ProjectMedia = {
  url: string;
  type: 'image' | 'video';
};

export interface GithubProject {
  name: string;
  description: string;
  url: string;
  languages: string[];
  forks: number;
  media?: ProjectMedia;
}

export type Project = Omit<GithubProject, 'media'>;

export interface ProjectRowProps {
  project: Project;
  hoveredProjectUrl: string | null;
  setHoveredProjectUrl: Dispatch<SetStateAction<string | null>>;
}
