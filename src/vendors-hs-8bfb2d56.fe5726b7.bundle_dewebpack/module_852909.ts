import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEnUS from './translations/en_US';
import translationEsES from './translations/es_ES';
import translationFrFR from './translations/fr_FR';
import translationItIT from './translations/it_IT';
import translationJaJP from './translations/ja_JP';
import translationPtPT from './translations/pt_PT';
import translationRuRU from './translations/ru_RU';
import translationZhCN from './translations/zh_CN';
import translationZhTW from './translations/zh_TW';
import translationDeDE from './translations/de_DE';
import translationIdID from './translations/id_ID';
import translationPlPL from './translations/pl_PL';
import translationKoKR from './translations/ko_KR';

type SupportedLocale =
  | 'en_US'
  | 'es_ES'
  | 'fr_FR'
  | 'it_IT'
  | 'ja_JP'
  | 'pt_PT'
  | 'ru_RU'
  | 'zh_CN'
  | 'zh_TW'
  | 'de_DE'
  | 'id_ID'
  | 'in_ID'
  | 'pl_PL'
  | 'ko_KR';

interface TranslationResource {
  translation: Record<string, unknown>;
}

type ResourceMap = Record<SupportedLocale, TranslationResource>;

const resources: ResourceMap = {
  en_US: {
    translation: translationEnUS,
  },
  es_ES: {
    translation: translationEsES,
  },
  fr_FR: {
    translation: translationFrFR,
  },
  it_IT: {
    translation: translationItIT,
  },
  ja_JP: {
    translation: translationJaJP,
  },
  pt_PT: {
    translation: translationPtPT,
  },
  ru_RU: {
    translation: translationRuRU,
  },
  zh_CN: {
    translation: translationZhCN,
  },
  zh_TW: {
    translation: translationZhTW,
  },
  de_DE: {
    translation: translationDeDE,
  },
  id_ID: {
    translation: translationIdID,
  },
  in_ID: {
    translation: translationIdID,
  },
  pl_PL: {
    translation: translationPlPL,
  },
  ko_KR: {
    translation: translationKoKR,
  },
};

export const toLanguage: Record<SupportedLocale, string> = {
  en_US: 'en',
  zh_CN: 'zh',
  zh_TW: 'zh-tw',
  ja_JP: 'ja',
  fr_FR: 'fr',
  it_IT: 'it',
  pt_PT: 'pt',
  es_ES: 'es',
  ru_RU: 'ru',
  id_ID: 'id',
  in_ID: 'id',
  de_DE: 'de',
  ko_KR: 'ko',
  pl_PL: 'pl',
};

const DEFAULT_LOCALE: SupportedLocale = 'en_US';

let isInitialized = false;

/**
 * Initialize i18next with the specified locale
 * @param locale - The locale to initialize with, defaults to 'en_US'
 */
export function initI18next(locale?: SupportedLocale): void {
  if (isInitialized) {
    changeLanguage(locale ?? DEFAULT_LOCALE);
    return;
  }

  i18next
    .use(initReactI18next)
    .init({
      resources,
      lng: locale ?? DEFAULT_LOCALE,
      fallbackLng: DEFAULT_LOCALE,
      interpolation: {
        escapeValue: false,
      },
    })
    .catch((error: Error) => {
      console.error('init i18n error', error);
    });

  isInitialized = true;
}

/**
 * Change the current language
 * @param locale - The locale to switch to
 */
export function changeLanguage(locale: SupportedLocale): void {
  i18next.changeLanguage(locale);
}