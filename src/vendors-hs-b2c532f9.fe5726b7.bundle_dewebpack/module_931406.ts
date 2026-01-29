interface MomentLocale {
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
    lll: string;
    llll: string;
  };
  calendar: {
    sameDay: string;
    nextDay: string;
    lastDay: string;
    nextWeek: string;
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

interface Moment {
  defineLocale(locale: string, config: MomentLocale): MomentLocale;
}

/**
 * Defines Swedish (sv) locale configuration for moment.js
 * @param moment - Moment.js instance
 * @returns Configured locale object
 */
function defineSwedishLocale(moment: Moment): MomentLocale {
  return moment.defineLocale("sv", {
    months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
    monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
    weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),
    weekdaysShort: "sön_mån_tis_ons_tor_fre_lör".split("_"),
    weekdaysMin: "sö_må_ti_on_to_fr_lö".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "YYYY-MM-DD",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY [kl.] HH:mm",
      LLLL: "dddd D MMMM YYYY [kl.] HH:mm",
      lll: "D MMM YYYY HH:mm",
      llll: "ddd D MMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Idag] LT",
      nextDay: "[Imorgon] LT",
      lastDay: "[Igår] LT",
      nextWeek: "[På] dddd LT",
      lastWeek: "[I] dddd[s] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "om %s",
      past: "för %s sedan",
      s: "några sekunder",
      ss: "%d sekunder",
      m: "en minut",
      mm: "%d minuter",
      h: "en timme",
      hh: "%d timmar",
      d: "en dag",
      dd: "%d dagar",
      M: "en månad",
      MM: "%d månader",
      y: "ett år",
      yy: "%d år"
    },
    dayOfMonthOrdinalParse: /\d{1,2}(:e|:a)/,
    ordinal: (dayOfMonth: number): string => {
      const lastDigit = dayOfMonth % 10;
      const secondToLastDigit = Math.floor((dayOfMonth % 100) / 10);
      
      if (secondToLastDigit === 1) {
        return `${dayOfMonth}:e`;
      }
      
      if (lastDigit === 1 || lastDigit === 2) {
        return `${dayOfMonth}:a`;
      }
      
      return `${dayOfMonth}:e`;
    },
    week: {
      dow: 1,
      doy: 4
    }
  });
}

export { defineSwedishLocale, type MomentLocale, type Moment };