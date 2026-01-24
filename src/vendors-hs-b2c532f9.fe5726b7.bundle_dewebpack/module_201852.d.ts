/**
 * Moment.js Arabic (Palestine) locale configuration
 * Provides date/time formatting, parsing, and localization for Palestinian Arabic
 */

/**
 * Mapping from Western Arabic numerals (0-9) to Eastern Arabic numerals
 */
type WesternToEasternNumeralMap = {
  readonly [K in '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9']: string;
};

/**
 * Mapping from Eastern Arabic numerals to Western Arabic numerals (0-9)
 */
type EasternToWesternNumeralMap = {
  readonly [key: string]: string;
};

/**
 * Configuration object for long date formats
 */
interface LongDateFormatConfig {
  /** Time format (hours:minutes) */
  LT: string;
  /** Time format with seconds */
  LTS: string;
  /** Short date format */
  L: string;
  /** Long date format */
  LL: string;
  /** Long date with time */
  LLL: string;
  /** Full date with day name and time */
  LLLL: string;
}

/**
 * Calendar strings for relative day formatting
 */
interface CalendarConfig {
  /** Format for today */
  sameDay: string;
  /** Format for tomorrow */
  nextDay: string;
  /** Format for next week */
  nextWeek: string;
  /** Format for yesterday */
  lastDay: string;
  /** Format for last week */
  lastWeek: string;
  /** Format for other dates */
  sameElse: string;
}

/**
 * Relative time format strings
 */
interface RelativeTimeConfig {
  /** Future time prefix */
  future: string;
  /** Past time prefix */
  past: string;
  /** Seconds (singular) */
  s: string;
  /** Seconds (plural) */
  ss: string;
  /** Minute (singular) */
  m: string;
  /** Minutes (plural) */
  mm: string;
  /** Hour (singular) */
  h: string;
  /** Hours (plural) */
  hh: string;
  /** Day (singular) */
  d: string;
  /** Days (plural) */
  dd: string;
  /** Month (singular) */
  M: string;
  /** Months (plural) */
  MM: string;
  /** Year (singular) */
  y: string;
  /** Years (plural) */
  yy: string;
}

/**
 * Week configuration for calendar calculations
 */
interface WeekConfig {
  /** Day of week (0 = Sunday) */
  dow: number;
  /** Day of year for week calculation */
  doy: number;
}

/**
 * Complete locale configuration for Moment.js
 */
interface MomentLocaleConfig {
  /** Full month names */
  months: string[];
  /** Abbreviated month names */
  monthsShort: string[];
  /** Full weekday names */
  weekdays: string[];
  /** Abbreviated weekday names */
  weekdaysShort: string[];
  /** Minimal weekday names */
  weekdaysMin: string[];
  /** Whether to use exact parsing for weekdays */
  weekdaysParseExact: boolean;
  /** Long date format configurations */
  longDateFormat: LongDateFormatConfig;
  /** Regex pattern for meridiem (AM/PM) parsing */
  meridiemParse: RegExp;
  /** Determines if given string represents PM */
  isPM: (input: string) => boolean;
  /** Returns meridiem string for given hour */
  meridiem: (hour: number, minute: number, isLower: boolean) => string;
  /** Calendar format strings */
  calendar: CalendarConfig;
  /** Relative time format strings */
  relativeTime: RelativeTimeConfig;
  /** Preprocesses input string (converts Eastern to Western numerals) */
  preparse: (input: string) => string;
  /** Postprocesses output string (converts Western to Eastern numerals) */
  postformat: (input: string) => string;
  /** Week calculation configuration */
  week: WeekConfig;
}

/**
 * Moment.js instance with locale methods
 */
interface Moment {
  /**
   * Defines a new locale or retrieves an existing one
   * @param localeName - The locale identifier (e.g., 'ar-ps')
   * @param config - The locale configuration object
   * @returns The configured locale
   */
  defineLocale(localeName: string, config: MomentLocaleConfig): unknown;
}

/**
 * Western to Eastern Arabic numeral mappings
 */
export const WESTERN_TO_EASTERN_NUMERALS: WesternToEasternNumeralMap;

/**
 * Eastern to Western Arabic numeral mappings
 */
export const EASTERN_TO_WESTERN_NUMERALS: EasternToWesternNumeralMap;

/**
 * Initializes and registers the Arabic (Palestine) locale with Moment.js
 * @param moment - The Moment.js instance
 * @returns The configured locale object
 */
export function initializeArPsLocale(moment: Moment): unknown;

/**
 * Default export: The locale initialization function
 */
export default initializeArPsLocale;