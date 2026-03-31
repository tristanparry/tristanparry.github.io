import en from '@/src/i18n/locales/en.json';
import es from '@/src/i18n/locales/es.json';
import fr from '@/src/i18n/locales/fr.json';
import hi from '@/src/i18n/locales/hi.json';
import zh from '@/src/i18n/locales/zh.json';
import type { LanguageCode } from '@/src/types/i18n';

export const LANGUAGE_RESOURCES = {
  en: { translation: en },
  fr: { translation: fr },
  es: { translation: es },
  hi: { translation: hi },
  zh: { translation: zh },
};

export const DEFAULT_LANGUAGE: LanguageCode = 'en';
