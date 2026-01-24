/**
 * Moment.js locale configuration for Hungarian (hu)
 * 
 * This module provides Hungarian language support for moment.js date formatting,
 * including month names, weekday names, relative time expressions, and calendar formats.
 */

/**
 * Weekday names in accusative case (used with "on" preposition)
 * Maps to when an event happens "on" a specific day
 */
const WEEKDAYS_ACCUSATIVE: readonly string[] = [
  "vasárnap",
  "hétfőn",
  "kedden",
  "szerdán",
  "csütörtökön",
  "pénteken",
  "szombaton"
];

/**
 * Moment.js locale instance interface
 */
interface MomentLocale {
  day(): number;
}

/**
 * Formats relative time expressions in Hungarian
 * 
 * @param value - The numeric value for the time unit
 * @param withoutSuffix - Whether to format without suffix (e.g., "5 perc" vs "5 perce")
 * @param key - The time unit key (s, ss, m, mm, h, hh, d, dd, M, MM, y, yy)
 * @param isFuture - Whether the time is in the future
 * @returns Formatted relative time string in Hungarian
 */
function formatRelativeTime(
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string {
  const numericValue = value;

  switch (key) {
    case "s":
      return isFuture || withoutSuffix ? "néhány másodperc" : "néhány másodperce";
    case "ss":
      return numericValue + (isFuture || withoutSuffix ? " másodperc" : " másodperce");
    case "m":
      return "egy" + (isFuture || withoutSuffix ? " perc" : " perce");
    case "mm":
      return numericValue + (isFuture || withoutSuffix ? " perc" : " perce");
    case "h":
      return "egy" + (isFuture || withoutSuffix ? " óra" : " órája");
    case "hh":
      return numericValue + (isFuture || withoutSuffix ? " óra" : " órája");
    case "d":
      return "egy" + (isFuture || withoutSuffix ? " nap" : " napja");
    case "dd":
      return numericValue + (isFuture || withoutSuffix ? " nap" : " napja");
    case "M":
      return "egy" + (isFuture || withoutSuffix ? " hónap" : " hónapja");
    case "MM":
      return numericValue + (isFuture || withoutSuffix ? " hónap" : " hónapja");
    case "y":
      return "egy" + (isFuture || withoutSuffix ? " év" : " éve");
    case "yy":
      return numericValue + (isFuture || withoutSuffix ? " év" : " éve");
    default:
      return "";
  }
}

/**
 * Formats calendar date expressions with appropriate weekday names
 * 
 * @param this - Moment instance context
 * @param isNext - Whether the date is in the future (true) or past (false)
 * @returns Formatted calendar string with weekday and time
 */
function formatCalendarWeek(this: MomentLocale, isNext: boolean): string {
  const prefix = isNext ? "" : "[múlt] ";
  const weekdayName = WEEKDAYS_ACCUSATIVE[this.day()];
  return prefix + "[" + weekdayName + "] LT[-kor]";
}

/**
 * Moment.js global interface for locale definition
 */
interface Moment {
  defineLocale(locale: string, config: LocaleConfiguration): void;
}

/**
 * Configuration object for moment.js locale
 */
interface LocaleConfiguration {
  /** Full month names */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Whether to parse month names exactly as provided */
  monthsParseExact: boolean;
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Long date format patterns */
  longDateFormat: LongDateFormat;
  /** Regex for parsing AM/PM markers */
  meridiemParse: RegExp;
  /** Function to determine if time is PM */
  isPM: (input: string) => boolean;
  /** Function to format AM/PM marker */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  /** Calendar format strings */
  calendar: CalendarFormat;
  /** Relative time format configuration */
  relativeTime: RelativeTimeFormat;
  /** Regex for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  /** Format string for ordinal numbers */
  ordinal: string;
  /** Week configuration */
  week: WeekConfiguration;
}

/**
 * Long date format patterns
 */
interface LongDateFormat {
  LT: string;
  LTS: string;
  L: string;
  LL: string;
  LLL: string;
  LLLL: string;
}

/**
 * Calendar format strings for different time periods
 */
interface CalendarFormat {
  sameDay: string;
  nextDay: string;
  nextWeek: () => string;
  lastDay: string;
  lastWeek: () => string;
  sameElse: string;
}

/**
 * Relative time format functions
 */
interface RelativeTimeFormat {
  future: string;
  past: string;
  s: typeof formatRelativeTime;
  ss: typeof formatRelativeTime;
  m: typeof formatRelativeTime;
  mm: typeof formatRelativeTime;
  h: typeof formatRelativeTime;
  hh: typeof formatRelativeTime;
  d: typeof formatRelativeTime;
  dd: typeof formatRelativeTime;
  M: typeof formatRelativeTime;
  MM: typeof formatRelativeTime;
  y: typeof formatRelativeTime;
  yy: typeof formatRelativeTime;
}

/**
 * Week configuration
 */
interface WeekConfiguration {
  /** Day of week (0 = Sunday, 1 = Monday) */
  dow: number;
  /** Day of year for week calculation */
  doy: number;
}

declare const moment: Moment;

/**
 * Initialize Hungarian locale for moment.js
 */
moment.defineLocale("hu", {
  months: [
    "január",
    "február",
    "március",
    "április",
    "május",
    "június",
    "július",
    "augusztus",
    "szeptember",
    "október",
    "november",
    "december"
  ],
  monthsShort: [
    "jan.",
    "feb.",
    "márc.",
    "ápr.",
    "máj.",
    "jún.",
    "júl.",
    "aug.",
    "szept.",
    "okt.",
    "nov.",
    "dec."
  ],
  monthsParseExact: true,
  weekdays: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"],
  weekdaysShort: ["vas", "hét", "kedd", "sze", "csüt", "pén", "szo"],
  weekdaysMin: ["v", "h", "k", "sze", "cs", "p", "szo"],
  longDateFormat: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "YYYY.MM.DD.",
    LL: "YYYY. MMMM D.",
    LLL: "YYYY. MMMM D. H:mm",
    LLLL: "YYYY. MMMM D., dddd H:mm"
  },
  meridiemParse: /de|du/i,
  isPM: (input: string): boolean => {
    return input.charAt(1).toLowerCase() === "u";
  },
  meridiem: (hour: number, minute: number, isLowercase: boolean): string => {
    return hour < 12
      ? isLowercase === true ? "de" : "DE"
      : isLowercase === true ? "du" : "DU";
  },
  calendar: {
    sameDay: "[ma] LT[-kor]",
    nextDay: "[holnap] LT[-kor]",
    nextWeek: function (this: MomentLocale): string {
      return formatCalendarWeek.call(this, true);
    },
    lastDay: "[tegnap] LT[-kor]",
    lastWeek: function (this: MomentLocale): string {
      return formatCalendarWeek.call(this, false);
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "%s múlva",
    past: "%s",
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
    dow: 1, // Monday is the first day of the week
    doy: 4  // The week that contains Jan 4th is the first week of the year
  }
});