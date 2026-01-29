interface Moment {
  defineLocale(locale: string, config: LocaleConfig): Locale;
}

interface Locale {
  months: string[];
  monthsShort: string[];
  monthsParseExact: boolean;
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  weekdaysParseExact: boolean;
  longDateFormat: LongDateFormat;
  calendar: CalendarConfig;
  relativeTime: RelativeTimeConfig;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: string;
  week: WeekConfig;
}

interface LongDateFormat {
  LT: string;
  LTS: string;
  L: string;
  LL: string;
  LLL: string;
  LLLL: string;
}

interface CalendarConfig {
  sameDay: string;
  sameElse: string;
  nextDay: string;
  nextWeek: string;
  lastDay: string;
  lastWeek: string;
}

type RelativeTimeFunction = (
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
) => string;

interface RelativeTimeConfig {
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
}

interface WeekConfig {
  dow: number;
  doy: number;
}

interface RelativeTimeFormats {
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

function formatRelativeTime(
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string {
  const formats: RelativeTimeFormats = {
    m: ["eine Minute", "einer Minute"],
    h: ["eine Stunde", "einer Stunde"],
    d: ["ein Tag", "einem Tag"],
    dd: [`${value} Tage`, `${value} Tagen`],
    w: ["eine Woche", "einer Woche"],
    M: ["ein Monat", "einem Monat"],
    MM: [`${value} Monate`, `${value} Monaten`],
    y: ["ein Jahr", "einem Jahr"],
    yy: [`${value} Jahre`, `${value} Jahren`]
  };

  return withoutSuffix ? formats[key as keyof RelativeTimeFormats][0] : formats[key as keyof RelativeTimeFormats][1];
}

export function defineDeAtLocale(moment: Moment): Locale {
  return moment.defineLocale("de-at", {
    months: "Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
    monthsShort: "Jän._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
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