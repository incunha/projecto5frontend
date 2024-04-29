import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './en.json';
import ptTranslations from './pt.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      pt: {
        translation: ptTranslations
      }
    },
    lng: localStorage.getItem('i18nextLng') || "en",
    fallbackLng: "en",
    interpolation: {
    escapeValue: false
    }
  });

export default i18n;