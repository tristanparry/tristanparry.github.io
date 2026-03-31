import { DEFAULT_LANGUAGE, LANGUAGE_RESOURCES } from '@/src/constants/i18n';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const initI18n = async () => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources: LANGUAGE_RESOURCES,
    lng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: DEFAULT_LANGUAGE,
  });
};

initI18n();

export default i18n;
