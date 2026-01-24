/**
 * Moment.js Basque (Euskara) locale configuration
 * Defines date/time formatting rules and translations for the Basque language
 */

declare module 'moment' {
  /**
   * Locale configuration object for Basque (eu) language
   */
  interface LocaleSpecification {
    /**
     * Full month names in Basque
     * @example ["urtarrila", "otsaila", "martxoa", ...]
     */
    months?: string[];

    /**
     * Abbreviated month names in Basque
     * @example ["urt.", "ots.", "mar.", ...]
     */
    monthsShort?: string[];

    /**
     * Whether to parse month names exactly as provided
     */
    monthsParseExact?: boolean;

    /**
     * Full weekday names in Basque
     * @example ["igandea", "astelehena", "asteartea", ...]
     */
    weekdays?: string[];

    /**
     * Short weekday names in Basque
     * @example ["ig.", "al.", "ar.", ...]
     */
    weekdaysShort?: string[];

    /**
     * Minimal weekday names in Basque
     * @example ["ig", "al", "ar", ...]
     */
    weekdaysMin?: string[];

    /**
     * Whether to parse weekday names exactly as provided
     */
    weekdaysParseExact?: boolean;

    /**
     * Long date format tokens
     */
    longDateFormat?: {
      /** Time format (24-hour) - "HH:mm" */
      LT: string;
      /** Time format with seconds - "HH:mm:ss" */
      LTS: string;
      /** Numeric date - "YYYY-MM-DD" */
      L: string;
      /** Long date - "YYYY[ko] MMMM[ren] D[a]" */
      LL: string;
      /** Long date with time - "YYYY[ko] MMMM[ren] D[a] HH:mm" */
      LLL: string;
      /** Full date with weekday and time - "dddd, YYYY[ko] MMMM[ren] D[a] HH:mm" */
      LLLL: string;
      /** Short numeric date - "YYYY-M-D" */
      l: string;
      /** Short long date - "YYYY[ko] MMM D[a]" */
      ll: string;
      /** Short long date with time - "YYYY[ko] MMM D[a] HH:mm" */
      lll: string;
      /** Short full date with time - "ddd, YYYY[ko] MMM D[a] HH:mm" */
      llll: string;
    };

    /**
     * Calendar date formatting relative to current day
     */
    calendar?: {
      /** Today - "[gaur] LT[etan]" (today at [time]) */
      sameDay: string;
      /** Tomorrow - "[bihar] LT[etan]" (tomorrow at [time]) */
      nextDay: string;
      /** Next week - "dddd LT[etan]" ([weekday] at [time]) */
      nextWeek: string;
      /** Yesterday - "[atzo] LT[etan]" (yesterday at [time]) */
      lastDay: string;
      /** Last week - "[aurreko] dddd LT[etan]" (last [weekday] at [time]) */
      lastWeek: string;
      /** Everything else - "L" */
      sameElse: string;
    };

    /**
     * Relative time expressions
     */
    relativeTime?: {
      /** Future time - "%s barru" (in %s) */
      future: string;
      /** Past time - "duela %s" (%s ago) */
      past: string;
      /** Few seconds - "segundo batzuk" */
      s: string;
      /** Seconds - "%d segundo" */
      ss: string;
      /** One minute - "minutu bat" */
      m: string;
      /** Minutes - "%d minutu" */
      mm: string;
      /** One hour - "ordu bat" */
      h: string;
      /** Hours - "%d ordu" */
      hh: string;
      /** One day - "egun bat" */
      d: string;
      /** Days - "%d egun" */
      dd: string;
      /** One month - "hilabete bat" */
      M: string;
      /** Months - "%d hilabete" */
      MM: string;
      /** One year - "urte bat" */
      y: string;
      /** Years - "%d urte" */
      yy: string;
    };

    /**
     * Regular expression for parsing day of month ordinal numbers
     * Matches 1 or 2 digits followed by a period
     */
    dayOfMonthOrdinalParse?: RegExp;

    /**
     * Function to format ordinal numbers
     * @param num - The number to format
     * @returns Formatted ordinal string (e.g., "1.", "2.")
     */
    ordinal?: string | ((num: number) => string);

    /**
     * Week configuration
     */
    week?: {
      /** Day of week (0=Sunday, 1=Monday) */
      dow: number;
      /** Day of year that marks the first week */
      doy: number;
    };
  }

  /**
   * Define or update a locale configuration
   * @param localeName - The locale identifier (e.g., "eu")
   * @param config - Locale configuration object
   */
  function defineLocale(localeName: string, config: LocaleSpecification): Locale;

  /**
   * Locale object representing configured locale settings
   */
  interface Locale {
    _config: LocaleSpecification;
  }
}

export {};