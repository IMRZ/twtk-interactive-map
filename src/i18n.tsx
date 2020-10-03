import React, { FC } from 'react';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import I18NextBrowserLanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(I18NextHttpBackend)
  .use(I18NextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}.json`,
    },
    whitelist: ['en'],
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export const I18nProvider: FC = ({ children }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export { useTranslation } from 'react-i18next';

export default i18n;
