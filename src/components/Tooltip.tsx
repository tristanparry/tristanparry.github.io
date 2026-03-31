import { DEFAULT_TOOLTIP_PLACEMENT } from '@/src/constants/ui';
import { useTheme } from '@/src/contexts/ThemeContext';
import type { TooltipPlacement } from '@/src/types/tooltip';
import { Tooltip as FlowbiteTooltip } from 'flowbite-react';
import type { ReactNode } from 'react';

interface TooltipProps {
  content?: string;
  placement?: TooltipPlacement;
  children?: ReactNode;
}

const Tooltip = ({
  children,
  content,
  placement = DEFAULT_TOOLTIP_PLACEMENT,
}: TooltipProps) => {
  const { theme } = useTheme();

  return (
    <FlowbiteTooltip
      content={content}
      placement={placement}
      style={theme}
      trigger="hover"
      animation="duration-100"
      className="text-secondary-text text-center text-xs select-none 2xl:text-sm"
    >
      {children}
    </FlowbiteTooltip>
  );
};

export default Tooltip;
