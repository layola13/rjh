/**
 * Language service for internationalization (i18n)
 * Provides translation functionality with fallback support
 */

import { Service } from '../service';

/**
 * Symbol used to indicate a missing translation key
 */
declare const LANG_FALLBACK: unique symbol;

/**
 * Locale data structure containing translation keys and values
 */
export interface LocaleMessages {
  [key: string]: string | LocaleMessages;
}

/**
 * Collection of locale messages indexed by locale code
 */
export interface Locales {
  [locale: string]: LocaleMessages;
}

/**
 * Translator function signature
 * @param key - Translation key starting with "$vuetify."
 * @param params - Optional parameters for string replacement
 * @returns Translated string with parameters replaced
 */
export type TranslatorFunction = (key: string, ...params: Array<string | number>) => string;

/**
 * Configuration options for Lang service
 */
export interface LangOptions {
  lang: {
    /** Current active locale code */
    current: string;
    /** Available locale messages */
    locales: Locales;
    /** Optional custom translator function */
    t?: TranslatorFunction;
  };
}

/**
 * Language service class
 * Handles translation and locale management
 */
export declare class Lang extends Service {
  /** Property name used in configuration */
  static readonly property: 'lang';

  /** Current active locale code */
  current: string;

  /** Default fallback locale code */
  defaultLocale: string;

  /** Available locale messages */
  locales: Locales;

  /** Translator function */
  translator: TranslatorFunction;

  /**
   * Creates a new Lang service instance
   * @param options - Configuration options
   */
  constructor(options: LangOptions);

  /**
   * Gets a translated value for the current locale
   * @param key - Translation key (supports dot notation)
   * @returns Translated string or key if not found
   */
  currentLocale(key: string): string;

  /**
   * Translates a key with optional parameter replacement
   * @param key - Translation key
   * @param params - Parameters to replace in the translated string
   * @returns Translated and formatted string
   */
  t(key: string, ...params: Array<string | number>): string;

  /**
   * Default translator implementation
   * @param key - Translation key starting with "$vuetify."
   * @param params - Parameters for replacement
   * @returns Translated and formatted string
   */
  defaultTranslator(key: string, ...params: Array<string | number>): string;

  /**
   * Replaces placeholders in a string with provided parameters
   * Placeholders format: {0}, {1}, {2}, etc.
   * @param str - String containing placeholders
   * @param params - Values to replace placeholders
   * @returns String with replaced values
   */
  replace(str: string, params: Array<string | number>): string;
}

export { Lang };