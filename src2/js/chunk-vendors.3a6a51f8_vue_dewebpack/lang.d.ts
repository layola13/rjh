/**
 * Language service for managing locales and translations
 * @module Lang
 */

import { Service } from '../service';

/**
 * Represents the structure of locale translations
 */
export interface LocaleMessages {
  [key: string]: string | LocaleMessages;
}

/**
 * Map of locale identifiers to their translation messages
 */
export interface LocalesMap {
  [locale: string]: LocaleMessages;
}

/**
 * Translator function type for custom translation logic
 * @param key - Translation key (e.g., "$vuetify.close")
 * @param params - Optional parameters for string interpolation
 * @returns Translated string with parameters replaced
 */
export type TranslatorFunction = (key: string, ...params: Array<string | number>) => string;

/**
 * Configuration options for Lang service initialization
 */
export interface LangOptions {
  lang: {
    /** Current active locale identifier */
    current: string;
    /** Map of all available locales and their translations */
    locales: LocalesMap;
    /** Optional custom translator function */
    t?: TranslatorFunction;
  };
}

/**
 * Service for managing internationalization (i18n) and localization
 * Handles translation lookups, fallbacks, and string interpolation
 * @extends Service
 */
export declare class Lang extends Service {
  /**
   * Service property identifier used in Vuetify framework
   */
  static readonly property: 'lang';

  /**
   * Default locale used as fallback when translations are missing
   * @default "en"
   */
  readonly defaultLocale: string;

  /**
   * Currently active locale identifier
   */
  current: string;

  /**
   * Map of all registered locales and their translation messages
   */
  locales: LocalesMap;

  /**
   * Translation function used for resolving translation keys
   */
  translator: TranslatorFunction;

  /**
   * Creates a new Lang service instance
   * @param options - Configuration options containing locale settings
   */
  constructor(options: LangOptions);

  /**
   * Retrieves a translated message for the current locale
   * Falls back to default locale if translation is not found
   * @param key - Translation key (supports nested paths like "$vuetify.dataTable.sortBy")
   * @returns Translated message or the key itself if not found
   */
  currentLocale(key: string): string;

  /**
   * Translates a message key with optional parameter substitution
   * Supports placeholders in format {0}, {1}, etc.
   * @param key - Translation key
   * @param params - Values to substitute into placeholders
   * @returns Translated and interpolated string
   * @example
   * t("$vuetify.close") // => "Close"
   * t("Hello {0}", "World") // => "Hello World"
   */
  t(key: string, ...params: Array<string | number>): string;

  /**
   * Default translation implementation using currentLocale and string replacement
   * @param key - Translation key
   * @param params - Values to substitute into placeholders
   * @returns Translated and interpolated string
   */
  defaultTranslator(key: string, ...params: Array<string | number>): string;

  /**
   * Replaces placeholder tokens {0}, {1}, etc. with provided parameters
   * @param message - Message string containing placeholders
   * @param params - Values to substitute into placeholders
   * @returns String with all placeholders replaced
   * @internal
   */
  replace(message: string, params: Array<string | number>): string;
}