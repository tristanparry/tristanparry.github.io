/* eslint-disable import/no-duplicates */
import AmdocsLogoSvg from '@/assets/images/amdocs_logo.svg?raw';
import AmdocsLogo from '@/assets/images/amdocs_logo.svg?react';
import LcboLogoSvg from '@/assets/images/lcbo_logo.svg?raw';
import LcboLogo from '@/assets/images/lcbo_logo.svg?react';
import MircomLogoSvg from '@/assets/images/mircom_logo.svg?raw';
import MircomLogo from '@/assets/images/mircom_logo.svg?react';
import PointClickCareLogoSvg from '@/assets/images/pointclickcare_logo.svg?raw';
import PointClickCareLogo from '@/assets/images/pointclickcare_logo.svg?react';
import PolarisLogoSvg from '@/assets/images/polaris_logo.svg?raw';
import PolarisLogo from '@/assets/images/polaris_logo.svg?react';
import StackAdaptLogoSvg from '@/assets/images/stackadapt_logo.svg?raw';
import StackAdaptLogo from '@/assets/images/stackadapt_logo.svg?react';
import TheScoreLogoSvg from '@/assets/images/thescore_logo.svg?raw';
import TheScoreLogo from '@/assets/images/thescore_logo.svg?react';
/* eslint-enable import/no-duplicates */

export interface Position {
  title: string;
  start: string; // YYYY-MM
  end?: string; // YYYY-MM or undefined for ongoing
}

export interface Experience {
  company: string;
  url: string;
  logo?: keyof typeof COMPANY_LOGOS;
  positions: Position[];
}

export const COMPANY_LOGOS = {
  StackAdapt: StackAdaptLogo,
  theScore: TheScoreLogo,
  PointClickCare: PointClickCareLogo,
  Amdocs: AmdocsLogo,
  LCBO: LcboLogo,
  'Polaris Intelligence': PolarisLogo,
  Mircom: MircomLogo,
} as const;

export const COMPANY_LOGOS_SVGS = {
  StackAdapt: StackAdaptLogoSvg,
  theScore: TheScoreLogoSvg,
  PointClickCare: PointClickCareLogoSvg,
  Amdocs: AmdocsLogoSvg,
  LCBO: LcboLogoSvg,
  'Polaris Intelligence': PolarisLogoSvg,
  Mircom: MircomLogoSvg,
} as const;

export const EXPERIENCES: Experience[] = [
  {
    company: 'StackAdapt',
    url: 'https://stackadapt.com',
    logo: 'StackAdapt',
    positions: [
      // {
      //   title: 'experience.positions.softwareEngineer',
      //   start: '2026-06',
      // },
      {
        title: 'experience.positions.softwareEngineerIntern',
        start: '2025-09',
        end: '2025-12',
      },
    ],
  },
  {
    company: 'theScore',
    url: 'https://thescore.com',
    logo: 'theScore',
    positions: [
      {
        title: 'experience.positions.softwareEngineerIntern',
        start: '2025-01',
        end: '2025-04',
      },
    ],
  },
  {
    company: 'PointClickCare',
    url: 'https://pointclickcare.com',
    logo: 'PointClickCare',
    positions: [
      {
        title: 'experience.positions.softwareEngineerIntern',
        start: '2024-01',
        end: '2024-04',
      },
    ],
  },
  {
    company: 'Amdocs',
    url: 'https://amdocs.com',
    logo: 'Amdocs',
    positions: [
      {
        title: 'experience.positions.softwareEngineerIntern',
        start: '2023-05',
        end: '2023-08',
      },
    ],
  },
  {
    company: 'LCBO',
    url: 'https://lcbo.com',
    logo: 'LCBO',
    positions: [
      {
        title: 'experience.positions.softwareEngineerIntern',
        start: '2022-09',
        end: '2022-12',
      },
    ],
  },
  {
    company: 'Polaris Intelligence',
    url: 'https://polarisintelligence.com',
    logo: 'Polaris Intelligence',
    positions: [
      {
        title: 'experience.positions.softwareEngineerIntern',
        start: '2022-01',
        end: '2022-04',
      },
    ],
  },
  {
    company: 'Mircom',
    url: 'https://mircom.com',
    logo: 'Mircom',
    positions: [
      {
        title: 'experience.positions.itIntern',
        start: '2021-07',
        end: '2021-08',
      },
    ],
  },
];
