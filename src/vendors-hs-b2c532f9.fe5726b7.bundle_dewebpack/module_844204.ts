import moment from 'moment';

interface MeridiemOptions {
  hour: number;
  minute: number;
  isLowercase: boolean;
}

interface LocaleSpecification {
  months: string[];
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  meridiemParse: RegExp;
  isPM: (input: string) => boolean;
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
  };
  calendar: {
    sameDay: string;
    nextDay: string;
    nextWeek: string;
    lastDay: string;
    lastWeek: string;
    sameElse: string;
  };
  relativeTime: {
    future: string;
    past: string;
    s: string;
    ss: string;
    m: string;
    mm: string;
    h: string;
    hh: string;
    d: string;
    dd: string;
    M: string;
    MM: string;
    y: string;
    yy: string;
  };
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number) => string;
  week: {
    dow: number;
    doy: number;
  };
}

const NOON_HOUR = 12;
const SPECIAL_ORDINAL_NUMBERS = [1, 8];
const ORDINAL_THRESHOLD = 20;

/**
 * Afrikaans locale configuration for moment.js
 */
function defineAfrikaansLocale(momentInstance: typeof moment): void {
  const localeConfig: LocaleSpecification = {
    months: "Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"),
    monthsShort: "Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),
    weekdays: "Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"),
    weekdaysShort: "Son_Maa_Din_Woe_Don_Vry_Sat".split("_"),
    weekdaysMin: "So_Ma_Di_Wo_Do_Vr_Sa".split("_"),
    meridiemParse: /vm|nm/i,
    isPM: (input: string): boolean => {
      return /^nm$/i.test(input);
    },
    meridiem: (hour: number, minute: number, isLowercase: boolean): string => {
      return hour < NOON_HOUR 
        ? (isLowercase ? "vm" : "VM") 
        : (isLowercase ? "nm" : "NM");
    },
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Vandag om] LT",
      nextDay: "[Môre om] LT",
      nextWeek: "dddd [om] LT",
      lastDay: "[Gister om] LT",
      lastWeek: "[Laas] dddd [om] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "oor %s",
      past: "%s gelede",
      s: "'n paar sekondes",
      ss: "%d sekondes",
      m: "'n minuut",
      mm: "%d minute",
      h: "'n uur",
      hh: "%d ure",
      d: "'n dag",
      dd: "%d dae",
      M: "'n maand",
      MM: "%d maande",
      y: "'n jaar",
      yy: "%d jaar"
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    ordinal: (num: number): string => {
      const usesSte = num === SPECIAL_ORDINAL_NUMBERS[0] || 
                      num === SPECIAL_ORDINAL_NUMBERS[1] || 
                      num >= ORDINAL_THRESHOLD;
      return num + (usesSte ? "ste" : "de");
    },
    week: {
      dow: 1,
      doy: 4
    }
  };

  momentInstance.defineLocale("af", localeConfig);
}

defineAfrikaansLocale(moment);

export default defineAfrikaansLocale;