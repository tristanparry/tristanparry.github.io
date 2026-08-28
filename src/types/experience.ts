import { COMPANY_ASSETS } from '@/src/constants/experience';
import { type Dispatch, type SetStateAction } from 'react';

export interface Position {
  title: string;
  start: string; // YYYY-MM
  end?: string; // YYYY-MM or undefined for ongoing
}

export interface ExperienceEntry {
  id: keyof typeof COMPANY_ASSETS;
  company: string;
  url: string;
  positions: Position[];
}

export type ExperienceRowContentProps = Pick<
  ExperienceEntry,
  'id' | 'company' | 'positions'
>;

export interface ExperienceRowProps {
  experience: ExperienceEntry;
  hoveredExperienceId: string | null;
  setHoveredExperienceId: Dispatch<SetStateAction<string | null>>;
}
