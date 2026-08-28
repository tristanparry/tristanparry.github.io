/* eslint-disable import/no-duplicates */
import {
  DEFAULT_ANIMATION_DAMPING,
  DEFAULT_ANIMATION_ROW_VIEWPORT_AMOUNT,
  DEFAULT_ANIMATION_STIFFNESS,
} from '@/src/constants/ui';
import AmdocsLogoSvg from '@/src/images/amdocs_logo.svg?raw';
import AmdocsLogo from '@/src/images/amdocs_logo.svg?react';
import LcboLogoSvg from '@/src/images/lcbo_logo.svg?raw';
import LcboLogo from '@/src/images/lcbo_logo.svg?react';
import MircomLogoSvg from '@/src/images/mircom_logo.svg?raw';
import MircomLogo from '@/src/images/mircom_logo.svg?react';
import PointClickCareLogoSvg from '@/src/images/pointclickcare_logo.svg?raw';
import PointClickCareLogo from '@/src/images/pointclickcare_logo.svg?react';
import PolarisLogoSvg from '@/src/images/polaris_logo.svg?raw';
import PolarisLogo from '@/src/images/polaris_logo.svg?react';
import StackAdaptLogoSvg from '@/src/images/stackadapt_logo.svg?raw';
import StackAdaptLogo from '@/src/images/stackadapt_logo.svg?react';
import TheScoreLogoSvg from '@/src/images/thescore_logo.svg?raw';
import TheScoreLogo from '@/src/images/thescore_logo.svg?react';
/* eslint-enable import/no-duplicates */

export const COMPANY_ASSETS = {
  stackadapt: { icon: StackAdaptLogo, svg: StackAdaptLogoSvg },
  thescore: { icon: TheScoreLogo, svg: TheScoreLogoSvg },
  pointclickcare: { icon: PointClickCareLogo, svg: PointClickCareLogoSvg },
  amdocs: { icon: AmdocsLogo, svg: AmdocsLogoSvg },
  lcbo: { icon: LcboLogo, svg: LcboLogoSvg },
  polarisintelligence: {
    icon: PolarisLogo,
    svg: PolarisLogoSvg,
  },
  mircom: { icon: MircomLogo, svg: MircomLogoSvg },
} as const;

export const ROW_VARIANTS = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: DEFAULT_ANIMATION_STIFFNESS,
      damping: DEFAULT_ANIMATION_DAMPING,
    },
  },
} as const;

export const ROW_VIEWPORT = {
  amount: DEFAULT_ANIMATION_ROW_VIEWPORT_AMOUNT,
  once: false,
} as const;
