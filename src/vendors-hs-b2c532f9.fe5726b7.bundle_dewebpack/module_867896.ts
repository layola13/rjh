interface MomentLocale {
  months: string[];
  monthsShort: string[];
  monthsParseExact: boolean;
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  weekdaysParseExact: boolean;
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
    sameElse: string;
    nextDay: string;
    nextWeek: string;
    lastDay: string;
    lastWeek: string;
  };
  relativeTime: {
    future: string;
    past: string;
    s: string;
    ss: string;
    m: RelativeTimeFunction;
    mm: string;
    h: RelativeTimeFunction;
    hh: string;
    d: RelativeTimeFunction;
    dd: RelativeTimeFunction;
    w: RelativeTimeFunction;
    ww: string;
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

interface Moment {
  defineLocale(locale: string, config: MomentLocale): unknown;
}

type RelativeTimeFunction = (
  count: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
) => string;

interface RelativeTimeMap {
  m: [string, string];
  h: [string, string];
  d: [string, string];
  dd: [string, string];
  w: [string, string];
  M: [string, string];
  MM: [string, string];
  y: [string, string];
  yy: [string, string];
}

/**
 * German locale relative time formatter
 * @param count - The count value
 * @param withoutSuffix - Whether to use nominative (true) or dative (false) case
 * @param key - The time unit key
 * @param isFuture - Whether the time is in the future
 * @returns Formatted relative time string
 */
function formatRelativeTime(
  count: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string {
  const forms: RelativeTimeMap = {
    m: ["eine Minute", "einer Minute"],
    h: ["eine Stunde", "einer Stunde"],
    d: ["ein Tag", "einem Tag"],
    dd: [`${count} Tage`, `${count} Tagen`],
    w: ["eine Woche", "einer Woche"],
    M: ["ein Monat", "einem Monat"],
    MM: [`${count} Monate`, `${count} Monaten`],
    y: ["ein Jahr", "einem Jahr"],
    yy: [`${count} Jahre`, `${count} Jahren`]
  };

  return withoutSuffix ? forms[key as keyof RelativeTimeMap][0] : forms[key as keyof RelativeTimeMap][1];
}

/**
 * Defines the German (de) locale configuration for moment.js
 * @param moment - The moment.js instance
 * @returns The configured locale
 */
export function defineGermanLocale(moment: Moment): unknown {
  return moment.defineLocale("de", {
    months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
    monthsShort: "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
    monthsParseExact: true,
    weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
    weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
    weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY HH:mm",
      LLLL: "dddd, D. MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[heute um] LT [Uhr]",
      sameElse: "L",
      nextDay: "[morgen um] LT [Uhr]",
      nextWeek: "dddd [um] LT [Uhr]",
      lastDay: "[gestern um] LT [Uhr]",
      lastWeek: "[letzten] dddd [um] LT [Uhr]"
    },
    relativeTime: {
      future: "in %s",
      past: "vor %s",
      s: "ein paar Sekunden",
      ss: "%d Sekunden",
      m: formatRelativeTime,
      mm: "%d Minuten",
      h: formatRelativeTime,
      hh: "%d Stunden",
      d: formatRelativeTime,
      dd: formatRelativeTime,
      w: formatRelativeTime,
      ww: "%d Wochen",
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