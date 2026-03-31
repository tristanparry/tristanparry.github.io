import { TooltipPlacement } from '@/src/types/tooltip';
import type { Easing } from 'framer-motion';

// Common UI
export const EXTRA_SMALL_SCREEN_BREAKPOINT: number = 640;
export const SMALL_SCREEN_BREAKPOINT: number = 768;
export const LARGE_SCREEN_BREAKPOINT: number = 1024;
export const SCROLL_THRESHOLD: number = 20;
export const DEFAULT_ICON_SIZE: number = 24;
export const DEFAULT_CURSOR_SIZE: number = 16;
export const DEFAULT_TOOLTIP_PLACEMENT: TooltipPlacement = TooltipPlacement.Top;
export const DEFAULT_BOTTOM_SLOT_MIN_SPACE: number = 200;

// Icon Library
const DEFAULT_ICON_LIBRARY = 'mynaui';
export enum Icons {
  ArrowLeft = `${DEFAULT_ICON_LIBRARY}:arrow-left`,
  Download = `${DEFAULT_ICON_LIBRARY}:download`,
  Email = `${DEFAULT_ICON_LIBRARY}:envelope`,
  Fork = `${DEFAULT_ICON_LIBRARY}:git-branch`,
  GitHub = `${DEFAULT_ICON_LIBRARY}:github`,
  Globe = `${DEFAULT_ICON_LIBRARY}:globe`,
  LinkedIn = `${DEFAULT_ICON_LIBRARY}:linkedin`,
  Moon = `${DEFAULT_ICON_LIBRARY}:moon`,
  Sun = `${DEFAULT_ICON_LIBRARY}:sun`,
}

// Page Transition
export const OVERLAY_FADE_DURATION: number = 0.2;
export const LOGO_FADE_DURATION: number = 0.1;
export const LOGO_DRAW_DURATION: number = 2;
export const LOGO_HEIGHT: number = 50;

// Animations
export const DEFAULT_ANIMATION_DURATION: number = 0.3;
export const DEFAULT_ANIMATION_EASE: Easing = 'easeInOut';
export const DEFAULT_ANIMATION_STAGGER_CHILDREN: number = 0.15;
export const DEFAULT_ANIMATION_DELAY_CHILDREN: number = 0.05;
export const DEFAULT_ANIMATION_STIFFNESS: number = 400;
export const DEFAULT_ANIMATION_DAMPING: number = 20;
export const DEFAULT_ANIMATION_ROW_VIEWPORT_AMOUNT: number = 0.25;
export const DEFAULT_ANIMATION_HEADER_VIEWPORT_AMOUNT: number = 1;
