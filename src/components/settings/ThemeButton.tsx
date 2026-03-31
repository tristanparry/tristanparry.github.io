import Button from '@/src/components/Button';
import { Icons } from '@/src/constants/ui';
import { useTheme } from '@/src/contexts/ThemeContext';
import { Theme } from '@/src/types/theme';

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      iconName={theme === Theme.Light ? Icons.Moon : Icons.Sun}
      onClick={toggleTheme}
      className="rounded-none rounded-t-md sm:rounded-none sm:rounded-l-md"
    />
  );
};

export default ThemeButton;
