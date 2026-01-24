/**
 * Moment.js locale configuration for Luxembourgish (lb)
 * Provides localized date/time formatting, relative time calculations,
 * and linguistic rules specific to the Luxembourgish language.
 */

import type { Locale, LocaleSpecification } from 'moment';

/**
 * Time unit translation key
 */
type TimeUnit = 'm' | 'h' | 'd' | 'M' | 'y';

/**
 * Translation map for time units in Luxembourgish
 * Each unit has two forms: indefinite and definite article form
 */
interface TimeUnitTranslations {
  /** Minute translations: [indefinite, definite] */
  m: [string, string];
  /** Hour translations: [indefinite, definite] */
  h: [string, string];
  /** Day translations: [indefinite, definite] */
  d: [string, string];
  /** Month translations: [indefinite, definite] */
  M: [string, string];
  /** Year translations: [indefinite, definite] */
  y: [string, string];
}

/**
 * Returns the appropriate translation for a time unit
 * @param value - The numeric value (unused in current implementation)
 * @param withoutSuffix - If true, returns indefinite form; otherwise definite form
 * @param unit - The time unit key
 * @param isFuture - Whether the time is in the future (unused in current implementation)
 * @returns The translated string for the time unit
 */
function translateTimeUnit(
  value: number,
  withoutSuffix: boolean,
  unit: TimeUnit,
  isFuture: boolean
): string {
  const translations: TimeUnitTranslations = {
    m: ['eng Minutt', 'enger Minutt'],
    h: ['eng Stonn', 'enger Stonn'],
    d: ['een Dag', 'engem Dag'],
    M: ['ee Mount', 'engem Mount'],
    y: ['ee Joer', 'engem Joer']
  };
  
  return withoutSuffix ? translations[unit][0] : translations[unit][1];
}

/**
 * Determines if a number requires the indefinite article "a" (vs "an") in Luxembourgish
 * Implements complex linguistic rules based on number patterns
 * @param numStr - String representation of the number to check
 * @returns true if the number requires "a" (viru), false if it requires "an" (virun)
 */
function requiresIndefiniteArticleA(numStr: string): boolean {
  const num = parseInt(numStr, 10);
  
  if (isNaN(num)) {
    return false;
  }
  
  if (num < 0) {
    return true;
  }
  
  // Numbers 4-7 require "a"
  if (num < 10) {
    return num >= 4 && num <= 7;
  }
  
  // For numbers 10-99, check the last digit (or tens if last digit is 0)
  if (num < 100) {
    const lastDigit = num % 10;
    return requiresIndefiniteArticleA(lastDigit === 0 ? String(num / 10) : String(lastDigit));
  }
  
  // For numbers 100-9999, recursively check the first digit
  if (num < 10000) {
    let reducedNum = num;
    while (reducedNum >= 10) {
      reducedNum = Math.floor(reducedNum / 10);
    }
    return requiresIndefiniteArticleA(String(reducedNum));
  }
  
  // For larger numbers, divide by 1000 and recurse
  return requiresIndefiniteArticleA(String(Math.floor(num / 1000)));
}

/**
 * Luxembourgish locale configuration
 */
export const luxembourgishLocale: LocaleSpecification = {
  months: 'Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
  monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
  monthsParseExact: true,
  weekdays: 'Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg'.split('_'),
  weekdaysShort: 'So._Mé._Dë._Më._Do._Fr._Sa.'.split('_'),
  weekdaysMin: 'So_Mé_Dë_Më_Do_Fr_Sa'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'H:mm [Auer]',
    LTS: 'H:mm:ss [Auer]',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm [Auer]',
    LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]'
  },
  calendar: {
    sameDay: '[Haut um] LT',
    sameElse: 'L',
    nextDay: '[Muer um] LT',
    nextWeek: 'dddd [um] LT',
    lastDay: '[Gëschter um] LT',
    lastWeek(): string {
      // Tuesday (2) and Thursday (4) use "Leschten", other days use "Leschte"
      const dayOfWeek = this.day();
      switch (dayOfWeek) {
        case 2:
        case 4:
          return '[Leschten] dddd [um] LT';
        default:
          return '[Leschte] dddd [um] LT';
      }
    }
  },
  relativeTime: {
    future(relativeTimeString: string): string {
      const numericPart = relativeTimeString.substring(0, relativeTimeString.indexOf(' '));
      return requiresIndefiniteArticleA(numericPart) 
        ? `a ${relativeTimeString}` 
        : `an ${relativeTimeString}`;
    },
    past(relativeTimeString: string): string {
      const numericPart = relativeTimeString.substring(0, relativeTimeString.indexOf(' '));
      return requiresIndefiniteArticleA(numericPart) 
        ? `viru ${relativeTimeString}` 
        : `virun ${relativeTimeString}`;
    },
    s: 'e puer Sekonnen',
    ss: '%d Sekonnen',
    m: translateTimeUnit,
    mm: '%d Minutten',
    h: translateTimeUnit,
    hh: '%d Stonnen',
    d: translateTimeUnit,
    dd: '%d Deeg',
    M: translateTimeUnit,
    MM: '%d Méint',
    y: translateTimeUnit,
    yy: '%d Joer'
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: '%d.',
  week: {
    /** First day of week: Monday */
    dow: 1,
    /** First week of year contains January 4th */
    doy: 4
  }
};

/**
 * Type definitions for the Luxembourgish locale module
 */
export default luxembourgishLocale;