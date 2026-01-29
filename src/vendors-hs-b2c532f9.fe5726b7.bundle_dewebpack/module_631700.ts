interface MomentLocale {
  months: string[];
  monthsShort: string[];
  monthsParseExact: boolean;
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
  meridiemParse: RegExp;
  isPM: (input: string) => boolean;
  meridiem: (hour: number, minute: number, isLower: boolean) => string;
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

interface MomentInstance {
  day(): number;
}

interface Moment {
  defineLocale(locale: string, config: MomentLocale): Moment;
}

const WEEKDAYS_FOR_CALENDAR = "vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" ");

/**
 * Formats relative time in Hungarian locale
 */
function formatRelativeTime(
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string {
  const amount = value;
  
  switch (key) {
    case "s":
      return isFuture || withoutSuffix ? "néhány másodperc" : "néhány másodperce";
    case "ss":
      return amount + (isFuture || withoutSuffix ? " másodperc" : " másodperce");
    case "m":
      return "egy" + (isFuture || withoutSuffix ? " perc" : " perce");
    case "mm":
      return amount + (isFuture || withoutSuffix ? " perc" : " perce");
    case "h":
      return "egy" + (isFuture || withoutSuffix ? " óra" : " órája");
    case "hh":
      return amount + (isFuture || withoutSuffix ? " óra" : " órája");
    case "d":
      return "egy" + (isFuture || withoutSuffix ? " nap" : " napja");
    case "dd":
      return amount + (isFuture || withoutSuffix ? " nap" : " napja");
    case "M":
      return "egy" + (isFuture || withoutSuffix ? " hónap" : " hónapja");
    case "MM":
      return amount + (isFuture || withoutSuffix ? " hónap" : " hónapja");
    case "y":
      return "egy" + (isFuture || withoutSuffix ? " év" : " éve");
    case "yy":
      return amount + (isFuture || withoutSuffix ? " év" : " éve");
  }
  
  return "";
}

/**
 * Formats calendar day in Hungarian locale
 */
function formatCalendarDay(this: MomentInstance, isNext: boolean): string {
  return (isNext ? "" : "[múlt] ") + "[" + WEEKDAYS_FOR_CALENDAR[this.day()] + "] LT[-kor]";
}

export function defineHungarianLocale(moment: Moment): Moment {
  return moment.defineLocale("hu", {
    months: "január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),
    monthsShort: "jan._feb._márc._ápr._máj._jún._júl._aug._szept._okt._nov._dec.".split("_"),
    monthsParseExact: true,
    weekdays: "vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),
    weekdaysShort: "vas_hét_kedd_sze_csüt_pén_szo".split("_"),
    weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"),
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "YYYY.MM.DD.",
      LL: "YYYY. MMMM D.",
      LLL: "YYYY. MMMM D. H:mm",
      LLLL: "YYYY. MMMM D., dddd H:mm"
    },
    meridiemParse: /de|du/i,
    isPM: (input: string): boolean => {
      return "u" === input.charAt(1).toLowerCase();
    },
    meridiem: (hour: number, minute: number, isLower: boolean): string => {
      return hour < 12 
        ? (isLower === true ? "de" : "DE") 
        : (isLower === true ? "du" : "DU");
    },
    calendar: {
      sameDay: "[ma] LT[-kor]",
      nextDay: "[holnap] LT[-kor]",
      nextWeek: function(this: MomentInstance): string {
        return formatCalendarDay.call(this, true);
      },
      lastDay: "[tegnap] LT[-kor]",
      lastWeek: function(this: MomentInstance): string {
        return formatCalendarDay.call(this, false);
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "%s múlva",
      past: "%s",
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