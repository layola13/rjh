import moment from 'moment';

interface LocaleConfiguration {
  months: string[];
  monthsShort: string[];
  monthsParseExact: boolean;
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  weekdaysParseExact: boolean;
  longDateFormat: {
    LT: string;
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
  ordinal: (dayOfMonth: number) => string;
  week: {
    dow: number;
    doy: number;
  };
}

/**
 * Calculates the ordinal suffix for a given day of month
 * @param dayOfMonth - The day of the month (1-31)
 * @returns The day with appropriate ordinal suffix (st, nd, rd, th)
 */
function getOrdinal(dayOfMonth: number): string {
  const lastDigit = dayOfMonth % 10;
  const lastTwoDigits = dayOfMonth % 100;
  const tensDigit = Math.floor(lastTwoDigits / 10);

  if (tensDigit === 1) {
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

const localeConfig: LocaleConfiguration = {
  months: "J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér".split("_"),
  monthsShort: "J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc".split("_"),
  monthsParseExact: true,
  weekdays: "S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý".split("_"),
  weekdaysShort: "S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát".split("_"),
  weekdaysMin: "S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd, D MMMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[T~ódá~ý át] LT",
    nextDay: "[T~ómó~rró~w át] LT",
    nextWeek: "dddd [át] LT",
    lastDay: "[Ý~ést~érdá~ý át] LT",
    lastWeek: "[L~ást] dddd [át] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "í~ñ %s",
    past: "%s á~gó",
    s: "á ~féw ~sécó~ñds",
    ss: "%d s~écóñ~ds",
    m: "á ~míñ~úté",
    mm: "%d m~íñú~tés",
    h: "á~ñ hó~úr",
    hh: "%d h~óúrs",
    d: "á ~dáý",
    dd: "%d d~áýs",
    M: "á ~móñ~th",
    MM: "%d m~óñt~hs",
    y: "á ~ýéár",
    yy: "%d ý~éárs"
  },
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: getOrdinal,
  week: {
    dow: 1,
    doy: 4
  }
};

moment.defineLocale("x-pseudo", localeConfig);

export default moment;