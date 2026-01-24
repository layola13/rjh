/**
 * Moment.js Polish (pl) locale configuration
 * @module moment/locale/pl
 */

declare module 'moment' {
  /**
   * Polish locale configuration for moment.js
   */
  export interface PolishLocale {
    /**
     * Month names in nominative case (subject form)
     */
    readonly monthsNominative: readonly [
      'styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec',
      'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'
    ];

    /**
     * Month names in genitive case (possessive form)
     */
    readonly monthsGenitive: readonly [
      'stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
      'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'
    ];

    /**
     * Abbreviated month names
     */
    readonly monthsShort: readonly [
      'sty', 'lut', 'mar', 'kwi', 'maj', 'cze',
      'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'
    ];

    /**
     * Regular expressions for parsing month names
     */
    readonly monthsParse: readonly RegExp[];

    /**
     * Full weekday names
     */
    readonly weekdays: readonly [
      'niedziela', 'poniedziałek', 'wtorek', 'środa', 
      'czwartek', 'piątek', 'sobota'
    ];

    /**
     * Abbreviated weekday names
     */
    readonly weekdaysShort: readonly [
      'ndz', 'pon', 'wt', 'śr', 'czw', 'pt', 'sob'
    ];

    /**
     * Minimal weekday names
     */
    readonly weekdaysMin: readonly [
      'Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'
    ];

    /**
     * Long date format tokens
     */
    readonly longDateFormat: {
      readonly LT: 'HH:mm';
      readonly LTS: 'HH:mm:ss';
      readonly L: 'DD.MM.YYYY';
      readonly LL: 'D MMMM YYYY';
      readonly LLL: 'D MMMM YYYY HH:mm';
      readonly LLLL: 'dddd, D MMMM YYYY HH:mm';
    };

    /**
     * Calendar format configuration
     */
    readonly calendar: {
      readonly sameDay: '[Dziś o] LT';
      readonly nextDay: '[Jutro o] LT';
      nextWeek(this: moment.Moment): string;
      readonly lastDay: '[Wczoraj o] LT';
      lastWeek(this: moment.Moment): string;
      readonly sameElse: 'L';
    };

    /**
     * Relative time configuration
     */
    readonly relativeTime: {
      readonly future: 'za %s';
      readonly past: '%s temu';
      readonly s: 'kilka sekund';
      ss(count: number, withoutSuffix: boolean): string;
      m(count: number, withoutSuffix: boolean): string;
      mm(count: number, withoutSuffix: boolean): string;
      h(count: number, withoutSuffix: boolean): string;
      hh(count: number, withoutSuffix: boolean): string;
      readonly d: '1 dzień';
      readonly dd: '%d dni';
      readonly w: 'tydzień';
      ww(count: number, withoutSuffix: boolean): string;
      readonly M: 'miesiąc';
      MM(count: number, withoutSuffix: boolean): string;
      readonly y: 'rok';
      yy(count: number, withoutSuffix: boolean): string;
    };

    /**
     * Day of month ordinal parse pattern
     */
    readonly dayOfMonthOrdinalParse: RegExp;

    /**
     * Ordinal number format
     */
    readonly ordinal: '%d.';

    /**
     * Week configuration
     */
    readonly week: {
      /** First day of week (1 = Monday) */
      readonly dow: 1;
      /** First week of year rule (4 = ISO 8601) */
      readonly doy: 4;
    };
  }

  /**
   * Checks if a number should use plural form in Polish
   * @param count - The number to check
   * @returns True if the number should use plural form (2-4, but not 12-14)
   */
  function isPluralForm(count: number): boolean;

  /**
   * Translates relative time units to Polish
   * @param count - The time unit count
   * @param withoutSuffix - Whether to format without suffix
   * @param unit - The time unit key
   * @returns Translated and formatted time string
   */
  function translateRelativeTime(
    count: number,
    withoutSuffix: boolean,
    unit: 'ss' | 'm' | 'mm' | 'h' | 'hh' | 'ww' | 'MM' | 'yy'
  ): string;

  /**
   * Returns month names (nominative or genitive based on context)
   * @param momentInstance - Moment instance (optional)
   * @param format - Date format string
   * @returns Array of month names or specific month name
   */
  function getMonths(
    momentInstance: moment.Moment | undefined,
    format: string
  ): string[] | string;
}

export {};