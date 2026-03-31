import TpLogo from '@/assets/images/tp_logo.svg?react';
import SocialButtons from '@/src/components/SocialButtons';
import { getCurrentYear } from '@/src/utils/dates';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  showSocialLinks?: boolean;
  className?: string;
}
const Footer = ({ showSocialLinks = true, className }: FooterProps) => {
  const { t } = useTranslation();

  return (
    <section
      className={clsx(
        'border-secondary-bg relative flex w-full shrink-0 flex-col-reverse items-center justify-center border-t px-8 py-4 backdrop-blur-sm sm:flex-row sm:justify-between',
        className,
      )}
    >
      <small className="text-secondary-text text-center">
        {t('footer.copyright', {
          year: getCurrentYear(),
        })}
      </small>
      {showSocialLinks && <TpLogo className="hidden sm:block sm:w-8 md:w-12" />}
      {showSocialLinks && <SocialButtons className="flex items-center gap-2" />}
    </section>
  );
};

export default Footer;
