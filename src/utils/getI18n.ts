import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from '../languages/es';
import en from '../languages/en';

export enum Languages {
  EN = 'en',
  ES = 'es',
}

const getI18n = () => {
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      compatibilityJSON: 'v3',
      lng: 'en',
      debug: false,
      fallbackLng: Languages.EN,
      interpolation: {
        escapeValue: false,
      },
      resources: {
        en,
        es,
      },
      react: {
        useSuspense: false,
      },
    });
  }

  return i18n;
};

export default getI18n;
