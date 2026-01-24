/**
 * Moment.js locale configuration for Kurdish (Kurmanji)
 * 
 * This module provides localization support for the Kurdish Kurmanji language,
 * including month names, weekday names, date formatting, and relative time expressions.
 * 
 * @module moment-locale-ku-kmr
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Represents a pair of singular and plural forms for time units
 */
type TimeUnitForms = [singular: string, plural: string];

/**
 * Map of time unit keys to their Kurdish translations
 */
interface RelativeTimeTranslations {
  /** Seconds (singular/plural) */
  s: TimeUnitForms;
  /** Seconds with count */
  ss: TimeUnitForms;
  /** Minute (singular/plural) */
  m: TimeUnitForms;
  /** Minutes with count */
  mm: TimeUnitForms;
  /** Hour (singular/plural) */
  h: TimeUnitForms;
  /** Hours with count */
  hh: TimeUnitForms;
  /** Day (singular/plural) */
  d: TimeUnitForms;
  /** Days with count */
  dd: TimeUnitForms;
  /** Week (singular/plural) */
  w: TimeUnitForms;
  /** Weeks with count */
  ww: TimeUnitForms;
  /** Month (singular/plural) */
  M: TimeUnitForms;
  /** Months with count */
  MM: TimeUnitForms;
  /** Year (singular/plural) */
  y: TimeUnitForms;
  /** Years with count */
  yy: TimeUnitForms;
}

/**
 * Generates relative time strings in Kurdish with proper singular/plural forms
 * 
 * @param count - The numeric value for the time unit
 * @param withoutSuffix - Whether to return the form without suffix (true for singular context)
 * @param key - The time unit key (e.g., 's', 'mm', 'hh')
 * @param isFuture - Whether the time reference is in the future (unused in this implementation)
 * @returns The properly formatted Kurdish time string
 */
function relativeTimeFormatter(
  count: number,
  withoutSuffix: boolean,
  key: keyof RelativeTimeTranslations,
  isFuture: boolean
): string {
  const forms: RelativeTimeTranslations = {
    s: ['çend sanîye', 'çend sanîyeyan'],
    ss: [`${count} sanîye`, `${count} sanîyeyan`],
    m: ['deqîqeyek', 'deqîqeyekê'],
    mm: [`${count} deqîqe`, `${count} deqîqeyan`],
    h: ['saetek', 'saetekê'],
    hh: [`${count} saet`, `${count} saetan`],
    d: ['rojek', 'rojekê'],
    dd: [`${count} roj`, `${count} rojan`],
    w: ['hefteyek', 'hefteyekê'],
    ww: [`${count} hefte`, `${count} hefteyan`],
    M: ['mehek', 'mehekê'],
    MM: [`${count} meh`, `${count} mehan`],
    y: ['salek', 'salekê'],
    yy: [`${count} sal`, `${count} salan`]
  };

  return withoutSuffix ? forms[key][0] : forms[key][1];
}

/**
 * Determines the appropriate ordinal suffix for Kurdish numbers
 * 
 * @param num - The number to get the ordinal suffix for
 * @returns The ordinal suffix ('yê' or 'ê')
 */
function getOrdinalSuffix(num: number): string {
  const numStr = String(num);
  const lastDigit = numStr.substring(numStr.length - 1);
  const lastTwoDigits = numStr.length > 1 ? numStr.substring(numStr.length - 2) : '';

  // Special cases: 12, 13, or numbers ending in specific patterns
  if (
    lastTwoDigits === '12' ||
    lastTwoDigits === '13' ||
    lastDigit !== '2' && lastDigit !== '3' &&
    lastTwoDigits !== '50' &&
    lastDigit !== '70' &&
    lastDigit !== '80'
  ) {
    return 'ê';
  }

  return 'yê';
}

/**
 * Kurdish (Kurmanji) locale configuration object
 */
const kuKmrLocale: LocaleSpecification = {
  /** Full month names in Kurdish */
  months: 'Rêbendan_Sibat_Adar_Nîsan_Gulan_Hezîran_Tîrmeh_Tebax_Îlon_Cotmeh_Mijdar_Berfanbar'.split('_'),
  
  /** Abbreviated month names */
  monthsShort: 'Rêb_Sib_Ada_Nîs_Gul_Hez_Tîr_Teb_Îlo_Cot_Mij_Ber'.split('_'),
  
  /** Use exact month name matching */
  monthsParseExact: true,
  
  /** Full weekday names */
  weekdays: 'Yekşem_Duşem_Sêşem_Çarşem_Pêncşem_În_Şemî'.split('_'),
  
  /** Abbreviated weekday names */
  weekdaysShort: 'Yek_Du_Sê_Çar_Pên_În_Şem'.split('_'),
  
  /** Minimal weekday names */
  weekdaysMin: 'Ye_Du_Sê_Ça_Pê_În_Şe'.split('_'),
  
  /**
   * Returns AM/PM equivalent in Kurdish
   * @param hours - Hour of the day (0-23)
   * @param minutes - Minute of the hour
   * @param isLower - Whether to return lowercase version
   */
  meridiem: (hours: number, minutes: number, isLower: boolean): string => {
    return hours < 12 ? (isLower ? 'bn' : 'BN') : (isLower ? 'pn' : 'PN');
  },
  
  /** Pattern to parse meridiem strings */
  meridiemParse: /bn|BN|pn|PN/,
  
  /** Long date format templates */
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'Do MMMM[a] YYYY[an]',
    LLL: 'Do MMMM[a] YYYY[an] HH:mm',
    LLLL: 'dddd, Do MMMM[a] YYYY[an] HH:mm',
    ll: 'Do MMM[.] YYYY[an]',
    lll: 'Do MMM[.] YYYY[an] HH:mm',
    llll: 'ddd[.], Do MMM[.] YYYY[an] HH:mm'
  },
  
  /** Calendar format strings for relative dates */
  calendar: {
    sameDay: '[Îro di saet] LT [de]',       // Today at [time]
    nextDay: '[Sibê di saet] LT [de]',      // Tomorrow at [time]
    nextWeek: 'dddd [di saet] LT [de]',     // [Weekday] at [time]
    lastDay: '[Duh di saet] LT [de]',       // Yesterday at [time]
    lastWeek: 'dddd[a borî di saet] LT [de]', // Last [weekday] at [time]
    sameElse: 'L'                            // Default date format
  },
  
  /** Relative time formatting */
  relativeTime: {
    future: 'di %s de',  // in %s
    past: 'berî %s',     // %s ago
    s: relativeTimeFormatter,
    ss: relativeTimeFormatter,
    m: relativeTimeFormatter,
    mm: relativeTimeFormatter,
    h: relativeTimeFormatter,
    hh: relativeTimeFormatter,
    d: relativeTimeFormatter,
    dd: relativeTimeFormatter,
    w: relativeTimeFormatter,
    ww: relativeTimeFormatter,
    M: relativeTimeFormatter,
    MM: relativeTimeFormatter,
    y: relativeTimeFormatter,
    yy: relativeTimeFormatter
  },
  
  /** Pattern to parse ordinal day of month */
  dayOfMonthOrdinalParse: /\d{1,2}(?:yê|ê|\.)/,
  
  /**
   * Returns the ordinal form of a number for a given token
   * @param num - The number to format
   * @param token - The format token being used
   */
  ordinal: (num: number, token: string): string => {
    const tokenLower = token.toLowerCase();
    
    // For weeks and months, use simple dot suffix
    if (tokenLower.includes('w') || tokenLower.includes('m')) {
      return `${num}.`;
    }
    
    // For other cases, use Kurdish ordinal suffix
    return num + getOrdinalSuffix(num);
  },
  
  /** Week configuration */
  week: {
    dow: 1,  // Monday is the first day of the week
    doy: 4   // The week that contains Jan 4th is the first week of the year
  }
};

/**
 * Defines the Kurdish (Kurmanji) locale in moment.js
 * @param moment - The moment.js instance
 * @returns The defined locale
 */
export function defineKuKmrLocale(moment: typeof import('moment')): Locale {
  return moment.defineLocale('ku-kmr', kuKmrLocale);
}

export default defineKuKmrLocale;