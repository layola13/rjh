/**
 * Moment.js locale configuration for Kyrgyz (ky)
 * 
 * This module provides localization support for the Kyrgyz language,
 * including month names, weekday names, date formats, and ordinal suffixes.
 */

declare module 'moment' {
  namespace locale {
    /**
     * Kyrgyz locale configuration interface
     */
    interface KyrgyzLocale {
      /** Full month names in Kyrgyz */
      months: string[];
      
      /** Abbreviated month names in Kyrgyz */
      monthsShort: string[];
      
      /** Full weekday names in Kyrgyz */
      weekdays: string[];
      
      /** Abbreviated weekday names in Kyrgyz */
      weekdaysShort: string[];
      
      /** Minimum weekday names in Kyrgyz */
      weekdaysMin: string[];
      
      /** Long date format tokens and their representations */
      longDateFormat: {
        /** Time format (HH:mm) */
        LT: string;
        /** Time with seconds format (HH:mm:ss) */
        LTS: string;
        /** Short date format (DD.MM.YYYY) */
        L: string;
        /** Long date format (D MMMM YYYY) */
        LL: string;
        /** Long date and time format (D MMMM YYYY HH:mm) */
        LLL: string;
        /** Full date and time format (dddd, D MMMM YYYY HH:mm) */
        LLLL: string;
      };
      
      /** Calendar format strings for different time periods */
      calendar: {
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
      };
      
      /** Relative time format strings */
      relativeTime: {
        /** Future time format */
        future: string;
        /** Past time format */
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
      };
      
      /** Regular expression for parsing ordinal day of month */
      dayOfMonthOrdinalParse: RegExp;
      
      /**
       * Function to format ordinal numbers with appropriate Kyrgyz suffix
       * @param dayOfMonth - The day of the month (1-31)
       * @returns The day number with its ordinal suffix
       */
      ordinal: (dayOfMonth: number) => string;
      
      /** Week configuration */
      week: {
        /** Day of week (0=Sunday, 1=Monday) */
        dow: number;
        /** Day of year for week calculation */
        doy: number;
      };
    }
  }
}

/**
 * Ordinal suffix mapping for Kyrgyz numbers
 * Maps specific numbers to their corresponding ordinal suffixes
 */
type KyrgyzOrdinalSuffixMap = {
  [key: number]: string;
};

/**
 * Predefined ordinal suffixes for Kyrgyz language
 * Used to append appropriate endings to numbers (e.g., 1-чи, 2-чи)
 */
export const kyrgyzOrdinalSuffixes: Readonly<KyrgyzOrdinalSuffixMap>;

/**
 * Initializes and registers the Kyrgyz locale with moment.js
 * @param moment - The moment.js instance
 */
export function defineKyrgyzLocale(moment: typeof import('moment')): void;

export default defineKyrgyzLocale;