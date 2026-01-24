/**
 * Locale module that exports all supported language locale definitions.
 * This module provides internationalization (i18n) support for various languages.
 * 
 * @module locale
 */

/**
 * Represents a locale configuration object containing translations and formatting rules.
 * Each locale includes date formats, month names, day names, and other localized strings.
 */
export interface LocaleDefinition {
  /** Locale code (e.g., 'en', 'zh-Hans') */
  code: string;
  /** Localized month names */
  months?: string[];
  /** Short month names */
  monthsShort?: string[];
  /** Localized weekday names */
  weekdays?: string[];
  /** Short weekday names */
  weekdaysShort?: string[];
  /** Minimal weekday names */
  weekdaysMin?: string[];
  /** First day of week (0 = Sunday, 1 = Monday) */
  weekStart?: number;
  /** Ordinal function for numbers */
  ordinal?: (n: number) => string;
  /** Date format patterns */
  formats?: {
    LT?: string;
    LTS?: string;
    L?: string;
    LL?: string;
    LLL?: string;
    LLLL?: string;
  };
  /** Relative time translations */
  relativeTime?: {
    future?: string;
    past?: string;
    s?: string;
    m?: string;
    mm?: string;
    h?: string;
    hh?: string;
    d?: string;
    dd?: string;
    M?: string;
    MM?: string;
    y?: string;
    yy?: string;
  };
}

/** Afrikaans locale */
export declare const af: LocaleDefinition;

/** Arabic locale */
export declare const ar: LocaleDefinition;

/** Catalan locale */
export declare const ca: LocaleDefinition;

/** Czech locale */
export declare const cs: LocaleDefinition;

/** German locale */
export declare const de: LocaleDefinition;

/** Greek locale */
export declare const el: LocaleDefinition;

/** English locale */
export declare const en: LocaleDefinition;

/** Spanish locale */
export declare const es: LocaleDefinition;

/** Estonian locale */
export declare const et: LocaleDefinition;

/** Persian locale */
export declare const fa: LocaleDefinition;

/** Finnish locale */
export declare const fi: LocaleDefinition;

/** French locale */
export declare const fr: LocaleDefinition;

/** Croatian locale */
export declare const hr: LocaleDefinition;

/** Hungarian locale */
export declare const hu: LocaleDefinition;

/** Hebrew locale */
export declare const he: LocaleDefinition;

/** Indonesian locale */
export declare const id: LocaleDefinition;

/** Italian locale */
export declare const it: LocaleDefinition;

/** Japanese locale */
export declare const ja: LocaleDefinition;

/** Korean locale */
export declare const ko: LocaleDefinition;

/** Latvian locale */
export declare const lv: LocaleDefinition;

/** Lithuanian locale */
export declare const lt: LocaleDefinition;

/** Dutch locale */
export declare const nl: LocaleDefinition;

/** Norwegian locale */
export declare const no: LocaleDefinition;

/** Polish locale */
export declare const pl: LocaleDefinition;

/** Portuguese locale */
export declare const pt: LocaleDefinition;

/** Romanian locale */
export declare const ro: LocaleDefinition;

/** Russian locale */
export declare const ru: LocaleDefinition;

/** Slovak locale */
export declare const sk: LocaleDefinition;

/** Slovenian locale */
export declare const sl: LocaleDefinition;

/** Serbian (Cyrillic) locale */
export declare const srCyrl: LocaleDefinition;

/** Swedish locale */
export declare const sv: LocaleDefinition;

/** Thai locale */
export declare const th: LocaleDefinition;

/** Turkish locale */
export declare const tr: LocaleDefinition;

/** Ukrainian locale */
export declare const uk: LocaleDefinition;

/** Chinese Simplified locale */
export declare const zhHans: LocaleDefinition;

/** Chinese Traditional locale */
export declare const zhHant: LocaleDefinition;