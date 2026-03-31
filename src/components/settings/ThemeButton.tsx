import Button from '@/src/components/Button';
import { Icons } from '@/src/constants/ui';
import { useTheme } from '@/src/contexts/ThemeContext';
import { Theme } from '@/src/types/theme';
import { useWindowScroll } from '@/src/utils/useWindowScroll';
import clsx from 'clsx';

const ThemeButton = () => {
  const { isScrolled } = useWindowScroll();
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      iconName={theme === Theme.Light ? Icons.Moon : Icons.Sun}
      onClick={toggleTheme}
      className={clsx(
        'rounded-none rounded-t-md sm:rounded-none sm:rounded-l-md',
        isScrolled &&
          'group-hover:bg-secondary-bg/50 mix-blend-difference group-hover:mix-blend-normal',
      )}
    />
  );
};

export default ThemeButton;
