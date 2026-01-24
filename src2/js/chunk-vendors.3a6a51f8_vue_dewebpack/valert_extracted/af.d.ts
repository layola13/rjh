/**
 * Locale module index
 * Provides internationalization (i18n) support for multiple languages
 * @module locale
 */

/**
 * Afrikaans locale configuration
 * Language code: af
 */
export declare const af: LocaleConfig;

/**
 * Arabic locale configuration
 * Language code: ar
 */
export declare const ar: LocaleConfig;

/**
 * Catalan locale configuration
 * Language code: ca
 */
export declare const ca: LocaleConfig;

/**
 * Czech locale configuration
 * Language code: cs
 */
export declare const cs: LocaleConfig;

/**
 * German locale configuration
 * Language code: de
 */
export declare const de: LocaleConfig;

/**
 * Greek locale configuration
 * Language code: el
 */
export declare const el: LocaleConfig;

/**
 * English locale configuration
 * Language code: en
 */
export declare const en: LocaleConfig;

/**
 * Spanish locale configuration
 * Language code: es
 */
export declare const es: LocaleConfig;

/**
 * Estonian locale configuration
 * Language code: et
 */
export declare const et: LocaleConfig;

/**
 * Persian/Farsi locale configuration
 * Language code: fa
 */
export declare const fa: LocaleConfig;

/**
 * Finnish locale configuration
 * Language code: fi
 */
export declare const fi: LocaleConfig;

/**
 * French locale configuration
 * Language code: fr
 */
export declare const fr: LocaleConfig;

/**
 * Croatian locale configuration
 * Language code: hr
 */
export declare const hr: LocaleConfig;

/**
 * Hungarian locale configuration
 * Language code: hu
 */
export declare const hu: LocaleConfig;

/**
 * Hebrew locale configuration
 * Language code: he
 */
export declare const he: LocaleConfig;

/**
 * Indonesian locale configuration
 * Language code: id
 */
export declare const id: LocaleConfig;

/**
 * Italian locale configuration
 * Language code: it
 */
export declare const it: LocaleConfig;

/**
 * Japanese locale configuration
 * Language code: ja
 */
export declare const ja: LocaleConfig;

/**
 * Korean locale configuration
 * Language code: ko
 */
export declare const ko: LocaleConfig;

/**
 * Latvian locale configuration
 * Language code: lv
 */
export declare const lv: LocaleConfig;

/**
 * Lithuanian locale configuration
 * Language code: lt
 */
export declare const lt: LocaleConfig;

/**
 * Dutch locale configuration
 * Language code: nl
 */
export declare const nl: LocaleConfig;

/**
 * Norwegian locale configuration
 * Language code: no
 */
export declare const no: LocaleConfig;

/**
 * Polish locale configuration
 * Language code: pl
 */
export declare const pl: LocaleConfig;

/**
 * Portuguese locale configuration
 * Language code: pt
 */
export declare const pt: LocaleConfig;

/**
 * Romanian locale configuration
 * Language code: ro
 */
export declare const ro: LocaleConfig;

/**
 * Russian locale configuration
 * Language code: ru
 */
export declare const ru: LocaleConfig;

/**
 * Slovak locale configuration
 * Language code: sk
 */
export declare const sk: LocaleConfig;

/**
 * Slovenian locale configuration
 * Language code: sl
 */
export declare const sl: LocaleConfig;

/**
 * Serbian (Cyrillic) locale configuration
 * Language code: sr-Cyrl
 */
export declare const srCyrl: LocaleConfig;

/**
 * Swedish locale configuration
 * Language code: sv
 */
export declare const sv: LocaleConfig;

/**
 * Thai locale configuration
 * Language code: th
 */
export declare const th: LocaleConfig;

/**
 * Turkish locale configuration
 * Language code: tr
 */
export declare const tr: LocaleConfig;

/**
 * Ukrainian locale configuration
 * Language code: uk
 */
export declare const uk: LocaleConfig;

/**
 * Chinese Simplified locale configuration
 * Language code: zh-Hans
 */
export declare const zhHans: LocaleConfig;

/**
 * Chinese Traditional locale configuration
 * Language code: zh-Hant
 */
export declare const zhHant: LocaleConfig;

/**
 * Base locale configuration interface
 * Defines the structure for locale-specific settings and translations
 */
export interface LocaleConfig {
  /** Locale identifier (e.g., 'en', 'zh-Hans') */
  code: string;
  
  /** Display name of the locale in its native language */
  name: string;
  
  /** Localized strings and translations */
  translations?: Record<string, string>;
  
  /** Date and time formatting rules */
  dateTimeFormats?: DateTimeFormatConfig;
  
  /** Number formatting rules */
  numberFormats?: NumberFormatConfig;
  
  /** Text direction: left-to-right or right-to-left */
  direction?: 'ltr' | 'rtl';
}

/**
 * Date and time formatting configuration
 */
export interface DateTimeFormatConfig {
  /** Short date format (e.g., 'MM/DD/YYYY') */
  short?: string;
  
  /** Long date format (e.g., 'MMMM DD, YYYY') */
  long?: string;
  
  /** Time format (e.g., 'HH:mm:ss') */
  time?: string;
  
  /** Full date-time format */
  full?: string;
}

/**
 * Number formatting configuration
 */
export interface NumberFormatConfig {
  /** Decimal separator character */
  decimal?: string;
  
  /** Thousands separator character */
  thousands?: string;
  
  /** Currency symbol */
  currency?: string;
  
  /** Currency display position */
  currencyPosition?: 'before' | 'after';
}