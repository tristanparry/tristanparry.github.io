import Button from '@/src/components/Button';
import { AppRoutes } from '@/src/constants/routes';
import { Icons } from '@/src/constants/ui';
import { TooltipPlacement } from '@/src/types/tooltip';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  tooltipPlacement?: TooltipPlacement;
}

const BackButton = ({
  tooltipPlacement = TooltipPlacement.Bottom,
}: BackButtonProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBack = () => navigate(AppRoutes.Home);

  return (
    <Button
      iconName={Icons.ArrowLeft}
      altText={t('notFound.actions.back')}
      tooltipPlacement={tooltipPlacement}
      onClick={handleBack}
    />
  );
};

export default BackButton;
