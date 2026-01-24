/**
 * Vue I18n v8.26.5
 * (c) 2021 kazuya kawaguchi
 * Released under the MIT License.
 * 
 * Type definitions for vue-i18n internationalization plugin
 */

import Vue, { PluginObject, VNode, VNodeData } from 'vue';

/**
 * Locale message value types
 */
export type LocaleMessageObject = { [key: string]: LocaleMessage };
export type LocaleMessageArray = LocaleMessage[];
export type LocaleMessage = string | LocaleMessageObject | LocaleMessageArray;

/**
 * Locale messages collection
 */
export type LocaleMessages = { [locale: string]: LocaleMessageObject };

/**
 * Translation parameters
 */
export type Values = unknown[] | { [key: string]: unknown };

/**
 * Translation choice number
 */
export type Choice = number;

/**
 * Locale identifier
 */
export type Locale = string;

/**
 * Fallback locale configuration
 */
export type FallbackLocale = false | Locale | Locale[] | { [locale: string]: Locale[] };

/**
 * Date/time format options
 */
export interface DateTimeFormat {
  [key: string]: DateTimeFormatOptions;
}

export interface DateTimeFormatOptions extends Intl.DateTimeFormatOptions {
  [key: string]: unknown;
}

export type DateTimeFormats = { [locale: string]: DateTimeFormat };

/**
 * Number format options - includes all Intl.NumberFormatOptions properties
 */
export interface NumberFormat {
  [key: string]: NumberFormatOptions;
}

export interface NumberFormatOptions extends Intl.NumberFormatOptions {
  compactDisplay?: 'short' | 'long';
  currency?: string;
  currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
  currencySign?: 'standard' | 'accounting';
  localeMatcher?: 'best fit' | 'lookup';
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
  numberingSystem?: string;
  signDisplay?: 'auto' | 'never' | 'always' | 'exceptZero';
  style?: 'decimal' | 'currency' | 'percent' | 'unit';
  unit?: string;
  unitDisplay?: 'short' | 'long' | 'narrow';
  useGrouping?: boolean;
  minimumIntegerDigits?: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  minimumSignificantDigits?: number;
  maximumSignificantDigits?: number;
}

export type NumberFormats = { [locale: string]: NumberFormat };

/**
 * Path string for nested object access
 */
export type Path = string;

/**
 * Translation context for custom formatters
 */
export interface MessageContext {
  list: (index: number) => unknown;
  named: (key: string) => unknown;
  values: Values;
  formatter: Formatter;
  path: string;
  messages: LocaleMessages;
  locale: Locale;
  linked: (key: string) => unknown;
}

/**
 * Custom message formatter function
 */
export type MessageFunction = (ctx: MessageContext) => string;

/**
 * Custom formatter interface
 */
export interface Formatter {
  interpolate(message: string, values?: Values, path?: string): Array<unknown> | null;
}

/**
 * Missing translation handler
 */
export type MissingHandler = (
  locale: Locale,
  key: Path,
  vm?: Vue,
  values?: Values
) => string | void;

/**
 * Post-translation processor
 */
export type PostTranslationHandler = (translated: string, key: string) => string;

/**
 * Translation warn levels
 */
export type WarnHtmlInMessageLevel = 'off' | 'warn' | 'error';

/**
 * Pluralization rule function
 */
export type PluralizationRule = (choice: number, choicesLength: number) => number;

/**
 * Pluralization rules map
 */
export type PluralizationRules = { [locale: string]: PluralizationRule };

/**
 * Modifiers for linked messages
 */
export type Modifiers = { [key: string]: (value: string) => string };

/**
 * Component instance created listener
 */
export type ComponentInstanceCreatedListener = (
  target: VueI18n,
  instance: Vue
) => void;

/**
 * Vue I18n constructor options
 */
export interface VueI18nOptions {
  /** Current locale */
  locale?: Locale;
  /** Fallback locale */
  fallbackLocale?: FallbackLocale;
  /** Locale messages */
  messages?: LocaleMessages;
  /** Date/time formats */
  dateTimeFormats?: DateTimeFormats;
  /** Number formats */
  numberFormats?: NumberFormats;
  /** Custom formatter */
  formatter?: Formatter;
  /** Custom modifiers */
  modifiers?: Modifiers;
  /** Missing translation handler */
  missing?: MissingHandler;
  /** Fallback to root instance */
  fallbackRoot?: boolean;
  /** Synchronize root locale */
  sync?: boolean;
  /** Silent translation warnings */
  silentTranslationWarn?: boolean | RegExp;
  /** Silent fallback warnings */
  silentFallbackWarn?: boolean | RegExp;
  /** Format fallback messages */
  formatFallbackMessages?: boolean;
  /** Preserve directive content */
  preserveDirectiveContent?: boolean;
  /** Warn about HTML in messages */
  warnHtmlInMessage?: WarnHtmlInMessageLevel;
  /** Post-translation handler */
  postTranslation?: PostTranslationHandler;
  /** Pluralization rules */
  pluralizationRules?: PluralizationRules;
  /** Escape HTML in parameters */
  escapeParameterHtml?: boolean;
  /** Component instance created listener */
  componentInstanceCreatedListener?: ComponentInstanceCreatedListener;
  /** Root instance */
  root?: Vue;
  /** Bridge mode for composition API */
  __VUE_I18N_BRIDGE__?: boolean;
}

/**
 * Translation options for i18n component
 */
export interface TranslateOptions {
  locale?: Locale;
  params?: Values;
}

/**
 * Main VueI18n class
 */
export declare class VueI18n {
  /** VueI18n version */
  static readonly version: string;
  
  /** Install plugin */
  static install: PluginObject<never>['install'];
  
  /** Feature availability flags */
  static readonly availabilities: {
    dateTimeFormat: boolean;
    numberFormat: boolean;
  };

  constructor(options?: VueI18nOptions);

  /** Internal Vue instance */
  readonly vm: Vue;
  
  /** All locale messages */
  readonly messages: LocaleMessages;
  
  /** All date/time formats */
  readonly dateTimeFormats: DateTimeFormats;
  
  /** All number formats */
  readonly numberFormats: NumberFormats;
  
  /** Available locales */
  readonly availableLocales: Locale[];
  
  /** Current locale */
  locale: Locale;
  
  /** Fallback locale */
  fallbackLocale: FallbackLocale;
  
  /** Format fallback messages flag */
  formatFallbackMessages: boolean;
  
  /** Missing handler */
  missing: MissingHandler | null;
  
  /** Custom formatter */
  formatter: Formatter;
  
  /** Silent translation warning */
  silentTranslationWarn: boolean | RegExp;
  
  /** Silent fallback warning */
  silentFallbackWarn: boolean | RegExp;
  
  /** Preserve directive content */
  preserveDirectiveContent: boolean;
  
  /** Warn HTML in message level */
  warnHtmlInMessage: WarnHtmlInMessageLevel;
  
  /** Post translation handler */
  postTranslation: PostTranslationHandler | null;
  
  /** Sync with root */
  sync: boolean;
  
  /** Pluralization rules */
  pluralizationRules: PluralizationRules;

  /**
   * Get locale message
   * @param locale - Target locale
   */
  getLocaleMessage(locale: Locale): LocaleMessageObject;

  /**
   * Set locale message
   * @param locale - Target locale
   * @param message - Locale messages
   */
  setLocaleMessage(locale: Locale, message: LocaleMessageObject): void;

  /**
   * Merge locale message
   * @param locale - Target locale
   * @param message - Locale messages to merge
   */
  mergeLocaleMessage(locale: Locale, message: LocaleMessageObject): void;

  /**
   * Translate message
   * @param key - Translation key
   * @param locale - Locale (optional)
   * @param values - Translation values (optional)
   */
  t(key: Path, locale?: Locale, values?: Values): string;
  t(key: Path, values?: Values): string;

  /**
   * Translate with choice (pluralization)
   * @param key - Translation key
   * @param choice - Choice number
   * @param values - Translation values (optional)
   */
  tc(key: Path, choice?: Choice, values?: Values): string;
  tc(key: Path, choice?: Choice, locale?: Locale, values?: Values): string;

  /**
   * Check if translation exists
   * @param key - Translation key
   * @param locale - Locale (optional)
   */
  te(key: Path, locale?: Locale): boolean;

  /**
   * Get translation (no fallback)
   * @param key - Translation key
   * @param locale - Locale (optional)
   * @param values - Translation values (optional)
   */
  i(key: Path, locale?: Locale, values?: Values): string;

  /**
   * Format date/time
   * @param value - Date value
   * @param key - Format key (optional)
   * @param locale - Locale (optional)
   */
  d(value: Date | number, key?: string, locale?: Locale): string;
  d(value: Date | number, options?: { key?: string; locale?: Locale }): string;

  /**
   * Format number
   * @param value - Number value
   * @param key - Format key (optional)
   * @param locale - Locale (optional)
   */
  n(value: number, key?: string, locale?: Locale): string;
  n(value: number, options?: { key?: string; locale?: Locale } & NumberFormatOptions): string;

  /**
   * Get date/time format
   * @param locale - Target locale
   */
  getDateTimeFormat(locale: Locale): DateTimeFormat;

  /**
   * Set date/time format
   * @param locale - Target locale
   * @param format - Format configuration
   */
  setDateTimeFormat(locale: Locale, format: DateTimeFormat): void;

  /**
   * Merge date/time format
   * @param locale - Target locale
   * @param format - Format configuration to merge
   */
  mergeDateTimeFormat(locale: Locale, format: DateTimeFormat): void;

  /**
   * Get number format
   * @param locale - Target locale
   */
  getNumberFormat(locale: Locale): NumberFormat;

  /**
   * Set number format
   * @param locale - Target locale
   * @param format - Format configuration
   */
  setNumberFormat(locale: Locale, format: NumberFormat): void;

  /**
   * Merge number format
   * @param locale - Target locale
   * @param format - Format configuration to merge
   */
  mergeNumberFormat(locale: Locale, format: NumberFormat): void;

  /**
   * Get choice index for pluralization
   * @param choice - Choice number
   * @param choicesLength - Number of choices available
   */
  getChoiceIndex(choice: number, choicesLength: number): number;

  /**
   * Format number to parts
   * @internal
   */
  _ntp(value: number, locale?: Locale, key?: string, options?: NumberFormatOptions): Intl.NumberFormatPart[];
}

/**
 * Vue instance augmentation
 */
declare module 'vue/types/vue' {
  interface Vue {
    /** VueI18n instance */
    readonly $i18n: VueI18n;
    
    /** Translate */
    $t: typeof VueI18n.prototype.t;
    
    /** Translate with choice */
    $tc: typeof VueI18n.prototype.tc;
    
    /** Check translation exists */
    $te: typeof VueI18n.prototype.te;
    
    /** Format date/time */
    $d: typeof VueI18n.prototype.d;
    
    /** Format number */
    $n: typeof VueI18n.prototype.n;
  }
}

/**
 * Vue component options augmentation
 */
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    /** VueI18n instance or options */
    i18n?: VueI18n | VueI18nOptions;
    
    /** Internal bridge messages */
    __i18nBridge?: string[];
    
    /** Internal component messages */
    __i18n?: string[];
    
    /** Internal component metadata */
    __INTLIFY_META__?: string;
  }
}

/**
 * i18n functional component props
 */
export interface I18nComponentProps {
  /** HTML tag to render */
  tag?: string | boolean | object;
  /** Translation path */
  path: Path;
  /** Locale override */
  locale?: Locale;
  /** Named/list placeholders */
  places?: Values;
}

/**
 * i18n-n functional component props
 */
export interface I18nNComponentProps {
  /** HTML tag to render */
  tag?: string | boolean | object;
  /** Number value to format */
  value: number;
  /** Format key or options */
  format?: string | NumberFormatOptions;
  /** Locale override */
  locale?: Locale;
}

export default VueI18n;