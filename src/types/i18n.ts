export enum Language {
  en = 'English',
  fr = 'Français',
  es = 'Español',
  hi = 'हिंदी',
  zh = '中文',
}

export type LanguageCode = keyof typeof Language;
