import moment from 'moment';

interface LocaleSpecification {
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

/**
 * Returns the ordinal suffix for a given day of month number.
 * @param dayOfMonth - The day of month number (1-31)
 * @returns The number with its ordinal suffix (e.g., "1st", "2nd", "3rd", "4th")
 */
function getOrdinal(dayOfMonth: number): string {
  const lastDigit = dayOfMonth % 10;
  const lastTwoDigits = dayOfMonth % 100;
  const isTeen = Math.floor(lastTwoDigits / 10) === 1;
  
  if (isTeen) {
    return `${dayOfMonth}th`;
  }
  
  if (lastDigit === 1) {
    return `${dayOfMonth}st`;
  }
  
  if (lastDigit === 2) {
    return `${dayOfMonth}nd`;
  }
  
  if (lastDigit === 3) {
    return `${dayOfMonth}rd`;
  }
  
  return `${dayOfMonth}th`;
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
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY h:mm A",
    LLLL: "dddd, D MMMM YYYY h:mm A"
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
  ordinal: getOrdinal,
  week: {
    dow: 0,
    doy: 4
  }
};

moment.defineLocale("en-au", localeConfig);

export default localeConfig;