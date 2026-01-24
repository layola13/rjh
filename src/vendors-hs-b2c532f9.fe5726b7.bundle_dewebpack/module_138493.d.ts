/**
 * Moment.js locale configuration for Talossan language (tzl)
 * @module moment/locale/tzl
 */

import { Locale, MomentInput } from 'moment';

/**
 * Configuration object for relative time formatting
 */
interface RelativeTimeFormatOptions {
  /** Number value for the time unit */
  value: number;
  /** Whether to use short format */
  withoutSuffix: boolean;
  /** Time unit key (s, ss, m, mm, h, hh, d, dd, M, MM, y, yy) */
  key: string;
  /** Whether the time is in the future */
  isFuture: boolean;
}

/**
 * Map of time unit translations in Talossan
 */
interface TimeUnitTranslations {
  /** Seconds (singular) */
  s: [string, string];
  /** Seconds (plural) */
  ss: [string, string];
  /** Minute (singular) */
  m: [string, string];
  /** Minutes (plural) */
  mm: [string, string];
  /** Hour (singular) */
  h: [string, string];
  /** Hours (plural) */
  hh: [string, string];
  /** Day (singular) */
  d: [string, string];
  /** Days (plural) */
  dd: [string, string];
  /** Month (singular) */
  M: [string, string];
  /** Months (plural) */
  MM: [string, string];
  /** Year (singular) */
  y: [string, string];
  /** Years (plural) */
  yy: [string, string];
}

/**
 * Formats relative time strings in Talossan
 * @param value - The numeric value for the time unit
 * @param withoutSuffix - Whether to format without suffix
 * @param key - The time unit key
 * @param isFuture - Whether the time is in the future
 * @returns Formatted time string
 */
function formatRelativeTime(
  value: number,
  withoutSuffix: boolean,
  key: keyof TimeUnitTranslations,
  isFuture: boolean
): string {
  const translations: TimeUnitTranslations = {
    s: ["viensas secunds", "'iensas secunds"],
    ss: [`${value} secunds`, `${value} secunds`],
    m: ["'n míut", "'iens míut"],
    mm: [`${value} míuts`, `${value} míuts`],
    h: ["'n þora", "'iensa þora"],
    hh: [`${value} þoras`, `${value} þoras`],
    d: ["'n ziua", "'iensa ziua"],
    dd: [`${value} ziuas`, `${value} ziuas`],
    M: ["'n mes", "'iens mes"],
    MM: [`${value} mesen`, `${value} mesen`],
    y: ["'n ar", "'iens ar"],
    yy: [`${value} ars`, `${value} ars`]
  };

  return isFuture || withoutSuffix 
    ? translations[key][0] 
    : translations[key][1];
}

/**
 * Determines if a meridiem string represents PM
 * @param meridiemString - The meridiem string to check
 * @returns True if PM, false if AM
 */
function isPM(meridiemString: string): boolean {
  return meridiemString.toLowerCase() === "d'o";
}

/**
 * Returns the appropriate meridiem string
 * @param hours - Hour value (0-23)
 * @param minutes - Minute value (0-59)
 * @param isLowercase - Whether to return lowercase format
 * @returns Meridiem string in Talossan
 */
function meridiem(hours: number, minutes: number, isLowercase: boolean): string {
  const isAfternoon = hours > 11;
  
  if (isAfternoon) {
    return isLowercase ? "d'o" : "D'O";
  } else {
    return isLowercase ? "d'a" : "D'A";
  }
}

/**
 * Talossan locale configuration for Moment.js
 */
export const tzlLocale: Locale = {
  months: "Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar".split("_"),
  monthsShort: "Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec".split("_"),
  weekdays: "Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi".split("_"),
  weekdaysShort: "Súl_Lún_Mai_Már_Xhú_Vié_Sát".split("_"),
  weekdaysMin: "Sú_Lú_Ma_Má_Xh_Vi_Sá".split("_"),
  longDateFormat: {
    LT: "HH.mm",
    LTS: "HH.mm.ss",
    L: "DD.MM.YYYY",
    LL: "D. MMMM [dallas] YYYY",
    LLL: "D. MMMM [dallas] YYYY HH.mm",
    LLLL: "dddd, [li] D. MMMM [dallas] YYYY HH.mm"
  },
  meridiemParse: /d'o|d'a/i,
  isPM,
  meridiem,
  calendar: {
    sameDay: "[oxhi à] LT",
    nextDay: "[demà à] LT",
    nextWeek: "dddd [à] LT",
    lastDay: "[ieiri à] LT",
    lastWeek: "[sür el] dddd [lasteu à] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "osprei %s",
    past: "ja%s",
    s: formatRelativeTime,
    ss: formatRelativeTime,
    m: formatRelativeTime,
    mm: formatRelativeTime,
    h: formatRelativeTime,
    hh: formatRelativeTime,
    d: formatRelativeTime,
    dd: formatRelativeTime,
    M: formatRelativeTime,
    MM: formatRelativeTime,
    y: formatRelativeTime,
    yy: formatRelativeTime
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: "%d.",
  week: {
    /** First day of week (1 = Monday) */
    dow: 1,
    /** First week of year contains January 4th */
    doy: 4
  }
};

export default tzlLocale;