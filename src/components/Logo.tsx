import { DEFAULT_ICON_SIZE } from '@/src/constants/ui';
import TpLogo from '@/src/images/tp_logo.svg?react';

interface LogoProps {
  height?: number;
}

const Logo = ({ height = DEFAULT_ICON_SIZE }: LogoProps) => {
  return <TpLogo height={height} className="draw-logo h-auto max-w-full" />;
};

export default Logo;
