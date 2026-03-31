import Tooltip from '@/src/components/Tooltip';
import {
  DEFAULT_ICON_SIZE,
  DEFAULT_TOOLTIP_PLACEMENT,
  Icons,
  SMALL_SCREEN_BREAKPOINT,
} from '@/src/constants/ui';
import type { TooltipPlacement } from '@/src/types/tooltip';
import { useWindowSize } from '@/src/utils/useWindowSize';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { noop } from 'lodash';

interface ButtonProps {
  iconName?: Icons;
  iconSize?: number;
  buttonText?: string;
  altText?: string;
  hideTooltip?: boolean;
  tooltipPlacement?: TooltipPlacement;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  secondaryStyle?: boolean;
  className?: string;
}

const Button = ({
  iconName,
  iconSize = DEFAULT_ICON_SIZE,
  buttonText,
  altText,
  hideTooltip = false,
  tooltipPlacement = DEFAULT_TOOLTIP_PLACEMENT,
  onClick = noop,
  onMouseEnter = noop,
  onMouseLeave = noop,
  secondaryStyle = false,
  className,
}: ButtonProps) => {
  const { width } = useWindowSize();

  const ButtonComponent = (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={clsx(
        secondaryStyle ? 'text-secondary-text' : 'text-primary-text',
        'flex items-center justify-center gap-2 rounded-md p-2',
        'hover:bg-secondary-bg hover:text-primary-text',
        'transition-all duration-200',
        className,
      )}
    >
      {iconName && (
        <Icon
          icon={iconName}
          width={
            width < SMALL_SCREEN_BREAKPOINT
              ? (DEFAULT_ICON_SIZE * 2) / 3
              : iconSize
          }
          height={
            width < SMALL_SCREEN_BREAKPOINT
              ? (DEFAULT_ICON_SIZE * 2) / 3
              : iconSize
          }
          aria-label={altText}
        />
      )}
      {buttonText && <span className="text-sm">{buttonText}</span>}
    </button>
  );

  if (!iconName && !buttonText) {
    return null;
  }

  if (hideTooltip || !altText) {
    return ButtonComponent;
  }

  return (
    <Tooltip content={altText} placement={tooltipPlacement}>
      {ButtonComponent}
    </Tooltip>
  );
};

export default Button;
