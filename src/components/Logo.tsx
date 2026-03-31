import TpLogo from '@/assets/images/tp_logo.svg?react';
import { DEFAULT_ICON_SIZE } from '@/src/constants/ui';

interface LogoProps {
  height?: number;
}

const Logo = ({ height = DEFAULT_ICON_SIZE }: LogoProps) => {
  return <TpLogo height={height} className="draw-logo h-auto max-w-full" />;
};

export default Logo;
