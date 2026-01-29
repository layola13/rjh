import moment from 'moment';

interface CalendarSpec {
  sameDay: string;
  nextDay: string;
  nextWeek: string;
  lastDay: string;
  lastWeek: string;
  sameElse: string;
}

interface RelativeTimeSpec {
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
}

interface LongDateFormatSpec {
  LT: string;
  LTS: string;
  L: string;
  LL: string;
  LLL: string;
  LLLL: string;
}

interface LocaleSpecification {
  months: string[];
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  longDateFormat: LongDateFormatSpec;
  calendar: CalendarSpec;
  relativeTime: RelativeTimeSpec;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number) => string;
}

const ORDINAL_SUFFIX_TH_RANGE = 10;
const PERCENT_TEN = 10;
const PERCENT_HUNDRED = 100;

/**
 * Gets the ordinal suffix for a given number
 * @param num - The number to get the ordinal suffix for
 * @returns The number with its ordinal suffix (e.g., "1st", "2nd", "3rd", "4th")
 */
function getOrdinal(num: number): string {
  const lastDigit = num % ORDINAL_SUFFIX_TH_RANGE;
  const isTeen = Math.floor((num % PERCENT_HUNDRED) / ORDINAL_SUFFIX_TH_RANGE) === 1;
  
  if (isTeen) {
    return `${num}th`;
  }
  
  if (lastDigit === 1) {
    return `${num}st`;
  }
  
  if (lastDigit === 2) {
    return `${num}nd`;
  }
  
  if (lastDigit === 3) {
    return `${num}rd`;
  }
  
  return `${num}th`;
}

const localeConfig: LocaleSpecification = {
  months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
  monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
  weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
  weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
  longDateFormat: {
    LT: "h:mm A",
    LTS: "h:mm:ss A",
    L: "YYYY-MM-DD",
    LL: "MMMM D, YYYY",
    LLL: "MMMM D, YYYY h:mm A",
    LLLL: "dddd, MMMM D, YYYY h:mm A"
  },
  calendar: {
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    nextWeek: "dddd [at] LT",
    lastDay: "[Yesterday at] LT",
    lastWeek: "[Last] dddd [at] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    ss: "%d seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  },
  dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
  ordinal: getOrdinal
};

moment.defineLocale("en-ca", localeConfig);

export default localeConfig;