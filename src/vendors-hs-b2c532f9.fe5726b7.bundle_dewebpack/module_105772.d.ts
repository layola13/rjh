/**
 * Moment.js Marathi (mr) locale configuration
 * Provides Marathi language support for moment.js including:
 * - Date/time formatting
 * - Relative time expressions
 * - Number conversion between Western and Devanagari numerals
 * - Marathi-specific calendar and meridiem handling
 */

import { Locale, LocaleSpecification } from 'moment';

/**
 * Mapping of Western digits to Devanagari numerals
 */
export const WESTERN_TO_DEVANAGARI: Record<string, string> = {
  '1': '१',
  '2': '२',
  '3': '३',
  '4': '४',
  '5': '५',
  '6': '६',
  '7': '७',
  '8': '८',
  '9': '९',
  '0': '०'
};

/**
 * Mapping of Devanagari numerals to Western digits
 */
export const DEVANAGARI_TO_WESTERN: Record<string, string> = {
  '१': '1',
  '२': '2',
  '३': '3',
  '४': '4',
  '५': '5',
  '६': '6',
  '७': '7',
  '८': '8',
  '९': '9',
  '०': '0'
};

/**
 * Type for relative time format keys
 */
type RelativeTimeKey = 's' | 'ss' | 'm' | 'mm' | 'h' | 'hh' | 'd' | 'dd' | 'M' | 'MM' | 'y' | 'yy';

/**
 * Generates localized relative time strings in Marathi
 * @param count - The numeric value for the time unit
 * @param withoutSuffix - Whether to use the suffix-less form
 * @param key - The time unit key (s, m, h, d, M, y, etc.)
 * @param isFuture - Whether the time is in the future (unused but part of signature)
 * @returns Localized relative time string with %d placeholder replaced by count
 */
export function generateRelativeTime(
  count: number,
  withoutSuffix: boolean,
  key: RelativeTimeKey,
  isFuture: boolean
): string {
  let template = '';

  if (withoutSuffix) {
    switch (key) {
      case 's':
        template = 'काही सेकंद';
        break;
      case 'ss':
        template = '%d सेकंद';
        break;
      case 'm':
        template = 'एक मिनिट';
        break;
      case 'mm':
        template = '%d मिनिटे';
        break;
      case 'h':
        template = 'एक तास';
        break;
      case 'hh':
        template = '%d तास';
        break;
      case 'd':
        template = 'एक दिवस';
        break;
      case 'dd':
        template = '%d दिवस';
        break;
      case 'M':
        template = 'एक महिना';
        break;
      case 'MM':
        template = '%d महिने';
        break;
      case 'y':
        template = 'एक वर्ष';
        break;
      case 'yy':
        template = '%d वर्षे';
        break;
    }
  } else {
    switch (key) {
      case 's':
        template = 'काही सेकंदां';
        break;
      case 'ss':
        template = '%d सेकंदां';
        break;
      case 'm':
        template = 'एका मिनिटा';
        break;
      case 'mm':
        template = '%d मिनिटां';
        break;
      case 'h':
        template = 'एका तासा';
        break;
      case 'hh':
        template = '%d तासां';
        break;
      case 'd':
        template = 'एका दिवसा';
        break;
      case 'dd':
        template = '%d दिवसां';
        break;
      case 'M':
        template = 'एका महिन्या';
        break;
      case 'MM':
        template = '%d महिन्यां';
        break;
      case 'y':
        template = 'एका वर्षा';
        break;
      case 'yy':
        template = '%d वर्षां';
        break;
    }
  }

  return template.replace(/%d/i, String(count));
}

/**
 * Converts Devanagari numerals in a string to Western digits
 * @param text - Input string containing Devanagari numerals
 * @returns String with Devanagari numerals replaced by Western digits
 */
export function preparse(text: string): string {
  return text.replace(/[१२३४५६७८९०]/g, (match: string) => DEVANAGARI_TO_WESTERN[match]);
}

/**
 * Converts Western digits in a string to Devanagari numerals
 * @param text - Input string containing Western digits
 * @returns String with Western digits replaced by Devanagari numerals
 */
export function postformat(text: string): string {
  return text.replace(/\d/g, (match: string) => WESTERN_TO_DEVANAGARI[match]);
}

/**
 * Adjusts hour based on Marathi meridiem period
 * @param hour - Hour value (0-23)
 * @param meridiem - Marathi meridiem string
 * @returns Adjusted hour in 24-hour format
 */
export function meridiemHour(hour: number, meridiem: string): number | undefined {
  if (hour === 12) {
    hour = 0;
  }

  if (meridiem === 'पहाटे' || meridiem === 'सकाळी') {
    return hour;
  } else if (meridiem === 'दुपारी' || meridiem === 'सायंकाळी' || meridiem === 'रात्री') {
    return hour >= 12 ? hour : hour + 12;
  }

  return undefined;
}

/**
 * Returns Marathi meridiem string based on hour and minute
 * @param hour - Hour value (0-23)
 * @param minute - Minute value (0-59)
 * @param isLowercase - Whether to return lowercase (unused in Marathi)
 * @returns Marathi meridiem string
 */
export function meridiem(hour: number, minute: number, isLowercase: boolean): string {
  if (hour >= 0 && hour < 6) {
    return 'पहाटे'; // Early morning (12am-6am)
  } else if (hour < 12) {
    return 'सकाळी'; // Morning (6am-12pm)
  } else if (hour < 17) {
    return 'दुपारी'; // Afternoon (12pm-5pm)
  } else if (hour < 20) {
    return 'सायंकाळी'; // Evening (5pm-8pm)
  } else {
    return 'रात्री'; // Night (8pm-12am)
  }
}

/**
 * Marathi locale configuration for moment.js
 */
export const marathiLocaleConfig: LocaleSpecification = {
  months: 'जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर'.split('_'),
  monthsShort: 'जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.'.split('_'),
  monthsParseExact: true,
  weekdays: 'रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
  weekdaysShort: 'रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि'.split('_'),
  weekdaysMin: 'र_सो_मं_बु_गु_शु_श'.split('_'),
  longDateFormat: {
    LT: 'A h:mm वाजता',
    LTS: 'A h:mm:ss वाजता',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm वाजता',
    LLLL: 'dddd, D MMMM YYYY, A h:mm वाजता'
  },
  calendar: {
    sameDay: '[आज] LT',
    nextDay: '[उद्या] LT',
    nextWeek: 'dddd, LT',
    lastDay: '[काल] LT',
    lastWeek: '[मागील] dddd, LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: '%sमध्ये',
    past: '%sपूर्वी',
    s: generateRelativeTime,
    ss: generateRelativeTime,
    m: generateRelativeTime,
    mm: generateRelativeTime,
    h: generateRelativeTime,
    hh: generateRelativeTime,
    d: generateRelativeTime,
    dd: generateRelativeTime,
    M: generateRelativeTime,
    MM: generateRelativeTime,
    y: generateRelativeTime,
    yy: generateRelativeTime
  },
  preparse,
  postformat,
  meridiemParse: /पहाटे|सकाळी|दुपारी|सायंकाळी|रात्री/,
  meridiemHour,
  meridiem,
  week: {
    dow: 0, // Sunday is the first day of the week
    doy: 6  // The week that contains Jan 6th is the first week of the year
  }
};

/**
 * Initializes and registers the Marathi locale with moment.js
 * @param moment - The moment.js instance
 * @returns The registered Marathi locale
 */
export default function initMarathiLocale(moment: typeof import('moment')): Locale {
  return moment.defineLocale('mr', marathiLocaleConfig);
}