import moment from 'moment';

interface LocaleConfiguration {
  months: string[];
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
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
    nextWeek: () => string;
    lastDay: string;
    lastWeek: () => string;
    sameElse: string;
  };
  relativeTime: {
    future: string;
    past: string;
    s: RelativeTimeFunction;
    ss: RelativeTimeFunction;
    m: RelativeTimeFunction;
    mm: RelativeTimeFunction;
    h: RelativeTimeFunction;
    hh: RelativeTimeFunction;
    d: RelativeTimeFunction;
    dd: RelativeTimeFunction;
    M: RelativeTimeFunction;
    MM: RelativeTimeFunction;
    y: RelativeTimeFunction;
    yy: RelativeTimeFunction;
  };
  dayOfMonthOrdinalParse: RegExp;
  ordinal: string;
  week: {
    dow: number;
    doy: number;
  };
}

type RelativeTimeFunction = (
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
) => string;

const MONTHS: string[] = "január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_");
const MONTHS_SHORT: string[] = "jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_");

const PLURAL_LOWER_BOUND = 1;
const PLURAL_UPPER_BOUND = 5;

/**
 * Check if value requires plural form (2-4 in Slovak)
 */
function isPlural(value: number): boolean {
  return value > PLURAL_LOWER_BOUND && value < PLURAL_UPPER_BOUND;
}

/**
 * Format relative time for Slovak locale
 */
function formatRelativeTime(
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string {
  const valueString = `${value} `;

  switch (key) {
    case "s":
      return withoutSuffix || isFuture ? "pár sekúnd" : "pár sekundami";
    case "ss":
      return withoutSuffix || isFuture
        ? valueString + (isPlural(value) ? "sekundy" : "sekúnd")
        : valueString + "sekundami";
    case "m":
      return withoutSuffix ? "minúta" : isFuture ? "minútu" : "minútou";
    case "mm":
      return withoutSuffix || isFuture
        ? valueString + (isPlural(value) ? "minúty" : "minút")
        : valueString + "minútami";
    case "h":
      return withoutSuffix ? "hodina" : isFuture ? "hodinu" : "hodinou";
    case "hh":
      return withoutSuffix || isFuture
        ? valueString + (isPlural(value) ? "hodiny" : "hodín")
        : valueString + "hodinami";
    case "d":
      return withoutSuffix || isFuture ? "deň" : "dňom";
    case "dd":
      return withoutSuffix || isFuture
        ? valueString + (isPlural(value) ? "dni" : "dní")
        : valueString + "dňami";
    case "M":
      return withoutSuffix || isFuture ? "mesiac" : "mesiacom";
    case "MM":
      return withoutSuffix || isFuture
        ? valueString + (isPlural(value) ? "mesiace" : "mesiacov")
        : valueString + "mesiacmi";
    case "y":
      return withoutSuffix || isFuture ? "rok" : "rokom";
    case "yy":
      return withoutSuffix || isFuture
        ? valueString + (isPlural(value) ? "roky" : "rokov")
        : valueString + "rokmi";
    default:
      return "";
  }
}

/**
 * Get next week calendar string based on day of week
 */
function getNextWeekString(this: moment.Moment): string {
  switch (this.day()) {
    case 0:
      return "[v nedeľu o] LT";
    case 1:
    case 2:
      return "[v] dddd [o] LT";
    case 3:
      return "[v stredu o] LT";
    case 4:
      return "[vo štvrtok o] LT";
    case 5:
      return "[v piatok o] LT";
    case 6:
      return "[v sobotu o] LT";
    default:
      return "";
  }
}

/**
 * Get last week calendar string based on day of week
 */
function getLastWeekString(this: moment.Moment): string {
  switch (this.day()) {
    case 0:
      return "[minulú nedeľu o] LT";
    case 1:
    case 2:
    case 4:
    case 5:
      return "[minulý] dddd [o] LT";
    case 3:
      return "[minulú stredu o] LT";
    case 6:
      return "[minulú sobotu o] LT";
    default:
      return "";
  }
}

/**
 * Slovak locale configuration for moment.js
 */
export function defineSlovakLocale(momentInstance: typeof moment): moment.Locale {
  return momentInstance.defineLocale("sk", {
    months: MONTHS,
    monthsShort: MONTHS_SHORT,
    weekdays: "nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),
    weekdaysShort: "ne_po_ut_st_št_pi_so".split("_"),
    weekdaysMin: "ne_po_ut_st_št_pi_so".split("_"),
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY H:mm",
      LLLL: "dddd D. MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: "[dnes o] LT",
      nextDay: "[zajtra o] LT",
      nextWeek: getNextWeekString,
      lastDay: "[včera o] LT",
      lastWeek: getLastWeekString,
      sameElse: "L"
    },
    relativeTime: {
      future: "za %s",
      past: "pred %s",
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
      dow: 1,
      doy: 4
    }
  });
}

defineSlovakLocale(moment);