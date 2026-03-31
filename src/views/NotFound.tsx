import BackButton from '@/src/components/BackButton';
import Footer from '@/src/views/Footer';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <main className="flex h-screen flex-col justify-between">
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8">
        <h1 className="font-heading text-display leading-none font-bold">
          {t('notFound.title')}
        </h1>
        <p className="text-secondary-text text-center text-balance">
          {t('notFound.description')}
        </p>
        <BackButton />
      </div>
      <Footer />
    </main>
  );
};

export default NotFound;
