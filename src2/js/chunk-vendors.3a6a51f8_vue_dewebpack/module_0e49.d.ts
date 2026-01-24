/**
 * Moment.js locale configuration for French (Switzerland)
 * @see https://momentjs.com/docs/#/i18n/
 */

declare module 'moment' {
  /**
   * Locale-specific configuration object for fr-ch (French - Switzerland)
   */
  interface LocaleSpecification {
    /**
     * Full month names
     * @example "janvier", "février", "mars"
     */
    months?: string | string[] | ((momentToFormat: Moment, format?: string) => string);

    /**
     * Abbreviated month names
     * @example "janv.", "févr.", "mars"
     */
    monthsShort?: string | string[] | ((momentToFormat: Moment, format?: string) => string);

    /**
     * If true, uses exact parsing for months
     */
    monthsParseExact?: boolean;

    /**
     * Full weekday names
     * @example "dimanche", "lundi", "mardi"
     */
    weekdays?: string | string[] | ((momentToFormat: Moment, format?: string) => string);

    /**
     * Abbreviated weekday names
     * @example "dim.", "lun.", "mar."
     */
    weekdaysShort?: string | string[] | ((momentToFormat: Moment, format?: string) => string);

    /**
     * Minimal weekday names
     * @example "di", "lu", "ma"
     */
    weekdaysMin?: string | string[] | ((momentToFormat: Moment, format?: string) => string);

    /**
     * If true, uses exact parsing for weekdays
     */
    weekdaysParseExact?: boolean;

    /**
     * Long date format tokens
     * @property {string} LT - Time format (HH:mm)
     * @property {string} LTS - Time with seconds format (HH:mm:ss)
     * @property {string} L - Short date format (DD.MM.YYYY)
     * @property {string} LL - Long date format (D MMMM YYYY)
     * @property {string} LLL - Long date with time format (D MMMM YYYY HH:mm)
     * @property {string} LLLL - Full date with time format (dddd D MMMM YYYY HH:mm)
     */
    longDateFormat?: {
      LT?: string;
      LTS?: string;
      L?: string;
      LL?: string;
      LLL?: string;
      LLLL?: string;
      [key: string]: string | undefined;
    };

    /**
     * Calendar date format strings relative to current day
     */
    calendar?: {
      /**
       * Format for today
       * @example "[Aujourd'hui à] LT" -> "Aujourd'hui à 14:30"
       */
      sameDay?: string | ((now?: Moment) => string);

      /**
       * Format for tomorrow
       * @example "[Demain à] LT" -> "Demain à 14:30"
       */
      nextDay?: string | ((now?: Moment) => string);

      /**
       * Format for next week
       * @example "dddd [à] LT" -> "lundi à 14:30"
       */
      nextWeek?: string | ((now?: Moment) => string);

      /**
       * Format for yesterday
       * @example "[Hier à] LT" -> "Hier à 14:30"
       */
      lastDay?: string | ((now?: Moment) => string);

      /**
       * Format for last week
       * @example "dddd [dernier à] LT" -> "lundi dernier à 14:30"
       */
      lastWeek?: string | ((now?: Moment) => string);

      /**
       * Format for all other dates
       * @example "L" -> "25.12.2023"
       */
      sameElse?: string | ((now?: Moment) => string);

      [key: string]: string | ((now?: Moment) => string) | undefined;
    };

    /**
     * Relative time format strings
     */
    relativeTime?: {
      /**
       * Format for future dates
       * @example "dans %s" -> "dans 2 heures"
       */
      future?: string | ((relTime: string) => string);

      /**
       * Format for past dates
       * @example "il y a %s" -> "il y a 2 heures"
       */
      past?: string | ((relTime: string) => string);

      /** Format for seconds */
      s?: string | ((withoutSuffix: boolean) => string);

      /** Format for multiple seconds (%d is replaced with count) */
      ss?: string | ((count: number, withoutSuffix: boolean) => string);

      /** Format for one minute */
      m?: string | ((withoutSuffix: boolean) => string);

      /** Format for multiple minutes (%d is replaced with count) */
      mm?: string | ((count: number, withoutSuffix: boolean) => string);

      /** Format for one hour */
      h?: string | ((withoutSuffix: boolean) => string);

      /** Format for multiple hours (%d is replaced with count) */
      hh?: string | ((count: number, withoutSuffix: boolean) => string);

      /** Format for one day */
      d?: string | ((withoutSuffix: boolean) => string);

      /** Format for multiple days (%d is replaced with count) */
      dd?: string | ((count: number, withoutSuffix: boolean) => string);

      /** Format for one month */
      M?: string | ((withoutSuffix: boolean) => string);

      /** Format for multiple months (%d is replaced with count) */
      MM?: string | ((count: number, withoutSuffix: boolean) => string);

      /** Format for one year */
      y?: string | ((withoutSuffix: boolean) => string);

      /** Format for multiple years (%d is replaced with count) */
      yy?: string | ((count: number, withoutSuffix: boolean) => string);

      [key: string]: string | Function | undefined;
    };

    /**
     * Regular expression for parsing ordinal day of month
     * @example Matches "1er", "2e", "3e", etc.
     */
    dayOfMonthOrdinalParse?: RegExp;

    /**
     * Returns ordinal suffix for a number
     * @param num - The number to ordinalize
     * @param token - The format token (M, Q, D, DDD, d, w, W)
     * @returns The ordinalized number (e.g., "1er", "2e")
     */
    ordinal?: (num: number, token?: string) => string;

    /**
     * Week settings for locale
     */
    week?: {
      /**
       * Day of week (0 = Sunday, 1 = Monday, etc.)
       * @default 1 (Monday for fr-ch)
       */
      dow?: number;

      /**
       * Day of year for first week of year
       * @default 4 (ISO 8601 standard)
       */
      doy?: number;
    };
  }

  /**
   * Defines a new locale configuration
   * @param localeName - Locale identifier (e.g., "fr-ch")
   * @param config - Locale configuration object
   * @returns The created locale
   */
  function defineLocale(localeName: string, config: LocaleSpecification | null): Locale;

  interface Moment {
    // Moment instance methods are already defined in @types/moment
  }

  interface Locale {
    // Locale interface is already defined in @types/moment
  }
}

export {};