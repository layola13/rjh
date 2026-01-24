/**
 * Moment.js Tamil (ta) locale configuration
 * Provides localization for dates, times, and relative time formatting in Tamil language
 */

/**
 * Mapping from Western Arabic numerals to Tamil numerals
 */
export interface WesternToTamilNumeralMap {
  readonly 1: "௧";
  readonly 2: "௨";
  readonly 3: "௩";
  readonly 4: "௪";
  readonly 5: "௫";
  readonly 6: "௬";
  readonly 7: "௭";
  readonly 8: "௮";
  readonly 9: "௯";
  readonly 0: "௦";
}

/**
 * Mapping from Tamil numerals to Western Arabic numerals
 */
export interface TamilToWesternNumeralMap {
  readonly "௧": "1";
  readonly "௨": "2";
  readonly "௩": "3";
  readonly "௪": "4";
  readonly "௫": "5";
  readonly "௬": "6";
  readonly "௭": "7";
  readonly "௮": "8";
  readonly "௯": "9";
  readonly "௦": "0";
}

/**
 * Date and time format patterns for Tamil locale
 */
export interface LongDateFormat {
  /** Time format (24-hour) */
  LT: "HH:mm";
  /** Time format with seconds */
  LTS: "HH:mm:ss";
  /** Short date format */
  L: "DD/MM/YYYY";
  /** Long date format */
  LL: "D MMMM YYYY";
  /** Long date and time format */
  LLL: "D MMMM YYYY, HH:mm";
  /** Full date and time format with weekday */
  LLLL: "dddd, D MMMM YYYY, HH:mm";
}

/**
 * Calendar-specific date representations
 */
export interface CalendarSpec {
  /** Format for today's date */
  sameDay: "[இன்று] LT";
  /** Format for tomorrow's date */
  nextDay: "[நாளை] LT";
  /** Format for next week */
  nextWeek: "dddd, LT";
  /** Format for yesterday's date */
  lastDay: "[நேற்று] LT";
  /** Format for last week */
  lastWeek: "[கடந்த வாரம்] dddd, LT";
  /** Default format for other dates */
  sameElse: "L";
}

/**
 * Relative time format strings
 */
export interface RelativeTimeSpec {
  /** Future time format template */
  future: "%s இல்";
  /** Past time format template */
  past: "%s முன்";
  /** Few seconds */
  s: "ஒரு சில விநாடிகள்";
  /** Seconds (plural) */
  ss: "%d விநாடிகள்";
  /** One minute */
  m: "ஒரு நிமிடம்";
  /** Minutes (plural) */
  mm: "%d நிமிடங்கள்";
  /** One hour */
  h: "ஒரு மணி நேரம்";
  /** Hours (plural) */
  hh: "%d மணி நேரம்";
  /** One day */
  d: "ஒரு நாள்";
  /** Days (plural) */
  dd: "%d நாட்கள்";
  /** One month */
  M: "ஒரு மாதம்";
  /** Months (plural) */
  MM: "%d மாதங்கள்";
  /** One year */
  y: "ஒரு வருடம்";
  /** Years (plural) */
  yy: "%d ஆண்டுகள்";
}

/**
 * Week configuration
 */
export interface WeekSpec {
  /** Day of week (0 = Sunday) */
  dow: 0;
  /** Day of year for week calculation */
  doy: 6;
}

/**
 * Complete Tamil locale configuration
 */
export interface TamilLocaleConfig {
  /** Full month names in Tamil */
  months: readonly [
    "ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்",
    "ஜூலை", "ஆகஸ்ட்", "செப்டெம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்"
  ];
  
  /** Abbreviated month names in Tamil */
  monthsShort: readonly [
    "ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்",
    "ஜூலை", "ஆகஸ்ட்", "செப்டெம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்"
  ];
  
  /** Full weekday names in Tamil */
  weekdays: readonly [
    "ஞாயிற்றுக்கிழமை", "திங்கட்கிழமை", "செவ்வாய்கிழமை", "புதன்கிழமை",
    "வியாழக்கிழமை", "வெள்ளிக்கிழமை", "சனிக்கிழமை"
  ];
  
  /** Short weekday names in Tamil */
  weekdaysShort: readonly [
    "ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"
  ];
  
  /** Minimal weekday names in Tamil */
  weekdaysMin: readonly ["ஞா", "தி", "செ", "பு", "வி", "வெ", "ச"];
  
  /** Long date format patterns */
  longDateFormat: LongDateFormat;
  
  /** Calendar-specific formats */
  calendar: CalendarSpec;
  
  /** Relative time format strings */
  relativeTime: RelativeTimeSpec;
  
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Returns the ordinal suffix for a day of the month
   * @param day - The day of the month (1-31)
   * @returns The day with Tamil ordinal suffix "வது"
   */
  ordinal(day: number): string;
  
  /**
   * Converts Tamil numerals to Western Arabic numerals during parsing
   * @param input - String containing Tamil numerals
   * @returns String with Western Arabic numerals
   */
  preparse(input: string): string;
  
  /**
   * Converts Western Arabic numerals to Tamil numerals during formatting
   * @param input - String containing Western Arabic numerals
   * @returns String with Tamil numerals
   */
  postformat(input: string): string;
  
  /** Regex pattern for parsing meridiem (AM/PM equivalent in Tamil) */
  meridiemParse: RegExp;
  
  /**
   * Returns the appropriate Tamil meridiem string based on hour
   * @param hour - Hour of the day (0-23)
   * @param minute - Minute of the hour
   * @param isLowercase - Whether to return lowercase (unused in Tamil)
   * @returns Tamil meridiem string
   */
  meridiem(hour: number, minute: number, isLowercase: boolean): string;
  
  /**
   * Converts 12-hour format to 24-hour format based on Tamil meridiem
   * @param hour - Hour in 12-hour format
   * @param meridiem - Tamil meridiem string
   * @returns Hour in 24-hour format (0-23)
   */
  meridiemHour(hour: number, meridiem: string): number;
  
  /** Week configuration */
  week: WeekSpec;
}

/**
 * Tamil locale module for moment.js
 * Registers the Tamil locale with moment.js when imported
 */
declare module "moment" {
  /**
   * Defines a new locale configuration
   * @param localeName - The locale identifier (e.g., "ta" for Tamil)
   * @param config - The locale configuration object
   */
  function defineLocale(localeName: "ta", config: TamilLocaleConfig): void;
}