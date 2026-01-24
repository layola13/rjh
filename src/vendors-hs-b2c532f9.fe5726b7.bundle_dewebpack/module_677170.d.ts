/**
 * Moment.js locale configuration for Tajik (tg)
 * Provides localization for dates, times, and relative time formatting in Tajik language
 */

import type { Locale, LocaleSpecification } from 'moment';

/**
 * Ordinal suffix mapping for Tajik numbers
 * Maps specific numbers to their corresponding ordinal suffixes
 */
interface OrdinalSuffixMap {
  [key: number]: string;
}

/**
 * Ordinal suffix configuration for Tajik locale
 * Defines how numbers should be suffixed when expressing ordinal positions
 */
declare const ordinalSuffixes: OrdinalSuffixMap;

/**
 * Tajik locale configuration object for moment.js
 * Implements all necessary properties for full locale support
 */
declare const tajikLocaleConfig: LocaleSpecification;

/**
 * Month names in format case (used after prepositions)
 * @example "1 январи" (1st of January)
 */
declare const monthsFormat: readonly [
  'январи', 'феврали', 'марти', 'апрели', 'майи', 'июни',
  'июли', 'августи', 'сентябри', 'октябри', 'ноябри', 'декабри'
];

/**
 * Month names in standalone case (used without prepositions)
 * @example "Январ" (January)
 */
declare const monthsStandalone: readonly [
  'январ', 'феврал', 'март', 'апрел', 'май', 'июн',
  'июл', 'август', 'сентябр', 'октябр', 'ноябр', 'декабр'
];

/**
 * Abbreviated month names
 */
declare const monthsShort: readonly [
  'янв', 'фев', 'мар', 'апр', 'май', 'июн',
  'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
];

/**
 * Full weekday names
 */
declare const weekdays: readonly [
  'якшанбе', 'душанбе', 'сешанбе', 'чоршанбе',
  'панҷшанбе', 'ҷумъа', 'шанбе'
];

/**
 * Short weekday names
 */
declare const weekdaysShort: readonly [
  'яшб', 'дшб', 'сшб', 'чшб', 'пшб', 'ҷум', 'шнб'
];

/**
 * Minimal weekday names (2 characters)
 */
declare const weekdaysMin: readonly [
  'яш', 'дш', 'сш', 'чш', 'пш', 'ҷм', 'шб'
];

/**
 * Meridiem identifiers for different times of day
 * - шаб: night (late night/early morning)
 * - субҳ: morning
 * - рӯз: day/afternoon
 * - бегоҳ: evening
 */
type MeridiemToken = 'шаб' | 'субҳ' | 'рӯз' | 'бегоҳ';

/**
 * Converts 12-hour format with meridiem to 24-hour format
 * @param hour - Hour in 12-hour format (0-12)
 * @param meridiem - Time of day indicator
 * @returns Hour in 24-hour format (0-23)
 */
declare function meridiemHour(hour: number, meridiem: MeridiemToken): number;

/**
 * Determines the appropriate meridiem token for a given time
 * @param hour - Hour in 24-hour format (0-23)
 * @param minute - Minute (0-59)
 * @param isLowercase - Whether to return lowercase version
 * @returns Meridiem token representing the time of day
 */
declare function meridiem(hour: number, minute: number, isLowercase: boolean): MeridiemToken;

/**
 * Returns the ordinal form of a number in Tajik
 * @param num - The number to convert to ordinal form
 * @returns The number with appropriate Tajik ordinal suffix
 * @example ordinal(1) // "1-ум"
 * @example ordinal(30) // "30-юм"
 */
declare function ordinal(num: number): string;

/**
 * Defines and registers the Tajik locale with moment.js
 * @param momentInstance - The moment.js instance to configure
 * @returns The configured Tajik locale object
 */
declare function defineTajikLocale(momentInstance: typeof import('moment')): Locale;

export {
  tajikLocaleConfig,
  ordinalSuffixes,
  monthsFormat,
  monthsStandalone,
  monthsShort,
  weekdays,
  weekdaysShort,
  weekdaysMin,
  meridiemHour,
  meridiem,
  ordinal,
  defineTajikLocale
};

export type {
  MeridiemToken,
  OrdinalSuffixMap
};