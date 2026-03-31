import { SectionRoutes } from '@/src/constants/routes';
import {
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_ANIMATION_EASE,
} from '@/src/constants/ui';
import { useNavbarHeight } from '@/src/utils/useNavbarHeight';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface SectionHeaderProps {
  id: SectionRoutes;
  className?: string;
}
const SectionHeader = ({ id, className }: SectionHeaderProps) => {
  const { t } = useTranslation();
  const navbarHeight = useNavbarHeight();

  return (
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        duration: DEFAULT_ANIMATION_DURATION,
        ease: DEFAULT_ANIMATION_EASE,
      }}
      viewport={{ amount: 'all', once: false }}
      className={clsx('font-heading mb-4 font-bold', className)}
      style={{
        marginTop: `${navbarHeight}px`,
      }}
    >
      {t(`sections.${id}`)}
    </motion.h2>
  );
};

export default SectionHeader;
