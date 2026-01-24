/**
 * Moment.js locale configuration for Irish (Gaeilge)
 * Defines date/time formatting, calendar terms, and relative time expressions
 */

/**
 * Configuration object for Irish locale
 */
interface IrishLocaleConfig {
  /** Full month names in Irish */
  months: readonly [
    "Eanáir",
    "Feabhra",
    "Márta",
    "Aibreán",
    "Bealtaine",
    "Meitheamh",
    "Iúil",
    "Lúnasa",
    "Meán Fómhair",
    "Deireadh Fómhair",
    "Samhain",
    "Nollaig"
  ];
  
  /** Abbreviated month names in Irish */
  monthsShort: readonly [
    "Ean",
    "Feabh",
    "Márt",
    "Aib",
    "Beal",
    "Meith",
    "Iúil",
    "Lún",
    "M.F.",
    "D.F.",
    "Samh",
    "Noll"
  ];
  
  /** Whether to use exact parsing for month names */
  monthsParseExact: true;
  
  /** Full weekday names in Irish */
  weekdays: readonly [
    "Dé Domhnaigh",
    "Dé Luain",
    "Dé Máirt",
    "Dé Céadaoin",
    "Déardaoin",
    "Dé hAoine",
    "Dé Sathairn"
  ];
  
  /** Abbreviated weekday names in Irish */
  weekdaysShort: readonly ["Domh", "Luan", "Máirt", "Céad", "Déar", "Aoine", "Sath"];
  
  /** Minimum weekday names in Irish */
  weekdaysMin: readonly ["Do", "Lu", "Má", "Cé", "Dé", "A", "Sa"];
  
  /** Long date format tokens and their patterns */
  longDateFormat: {
    /** Time format (24-hour) */
    LT: "HH:mm";
    /** Time format with seconds */
    LTS: "HH:mm:ss";
    /** Short date format */
    L: "DD/MM/YYYY";
    /** Long date format */
    LL: "D MMMM YYYY";
    /** Long date with time */
    LLL: "D MMMM YYYY HH:mm";
    /** Full date with weekday and time */
    LLLL: "dddd, D MMMM YYYY HH:mm";
  };
  
  /** Calendar display strings for relative dates */
  calendar: {
    /** Format for today */
    sameDay: "[Inniu ag] LT";
    /** Format for tomorrow */
    nextDay: "[Amárach ag] LT";
    /** Format for next week */
    nextWeek: "dddd [ag] LT";
    /** Format for yesterday */
    lastDay: "[Inné ag] LT";
    /** Format for last week */
    lastWeek: "dddd [seo caite] [ag] LT";
    /** Format for all other dates */
    sameElse: "L";
  };
  
  /** Relative time expressions in Irish */
  relativeTime: {
    /** Future time prefix */
    future: "i %s";
    /** Past time suffix */
    past: "%s ó shin";
    /** Seconds (singular context) */
    s: "cúpla soicind";
    /** Seconds (plural) */
    ss: "%d soicind";
    /** Minute (singular) */
    m: "nóiméad";
    /** Minutes (plural) */
    mm: "%d nóiméad";
    /** Hour (singular) */
    h: "uair an chloig";
    /** Hours (plural) */
    hh: "%d uair an chloig";
    /** Day (singular) */
    d: "lá";
    /** Days (plural) */
    dd: "%d lá";
    /** Month (singular) */
    M: "mí";
    /** Months (plural) */
    MM: "%d míonna";
    /** Year (singular) */
    y: "bliain";
    /** Years (plural) */
    yy: "%d bliain";
  };
  
  /** Regex pattern for parsing ordinal day of month */
  dayOfMonthOrdinalParse: RegExp;
  
  /**
   * Returns the ordinal suffix for a given day number
   * @param dayNumber - The day of the month (1-31)
   * @returns The day number with appropriate Irish ordinal suffix
   */
  ordinal(dayNumber: number): string;
  
  /** Week configuration */
  week: {
    /** Day of week (1 = Monday) */
    dow: 1;
    /** Day of year that defines week 1 */
    doy: 4;
  };
}

/**
 * Moment.js instance with locale definition capability
 */
interface MomentStatic {
  /**
   * Defines a new locale configuration
   * @param localeName - The locale identifier (e.g., "ga" for Irish)
   * @param config - The locale configuration object
   */
  defineLocale(localeName: "ga", config: IrishLocaleConfig): void;
}

/**
 * Initializes the Irish locale for Moment.js
 * @param moment - The Moment.js library instance
 */
export default function initializeIrishLocale(moment: MomentStatic): void;