import moment from 'moment';

interface RelativeTimeConfig {
  future: string;
  past: string;
  s: string;
  ss: (value: number, withoutSuffix: boolean, key: string) => string;
  m: (value: number, withoutSuffix: boolean, key: string, isFuture: boolean) => string | undefined;
  mm: (value: number, withoutSuffix: boolean, key: string) => string;
  h: (value: number, withoutSuffix: boolean, key: string) => string;
  hh: (value: number, withoutSuffix: boolean, key: string) => string;
  d: string;
  dd: (value: number, withoutSuffix: boolean, key: string) => string;
  M: string;
  MM: (value: number, withoutSuffix: boolean, key: string) => string;
  y: string;
  yy: (value: number, withoutSuffix: boolean, key: string) => string;
}

function getRelativeTimeString(value: number, withoutSuffix: boolean, key: string): string {
  let result = value + " ";

  switch (key) {
    case "ss":
      return result += value === 1 ? "sekunda" : value === 2 || value === 3 || value === 4 ? "sekunde" : "sekundi";
    case "mm":
      return result += value === 1 ? "minuta" : value === 2 || value === 3 || value === 4 ? "minute" : "minuta";
    case "h":
      return "jedan sat";
    case "hh":
      return result += value === 1 ? "sat" : value === 2 || value === 3 || value === 4 ? "sata" : "sati";
    case "dd":
      return result += value === 1 ? "dan" : "dana";
    case "MM":
      return result += value === 1 ? "mjesec" : value === 2 || value === 3 || value === 4 ? "mjeseca" : "mjeseci";
    case "yy":
      return result += value === 1 ? "godina" : value === 2 || value === 3 || value === 4 ? "godine" : "godina";
    default:
      return result;
  }
}

function handleMinuteRelativeTime(value: number, withoutSuffix: boolean, key: string, isFuture: boolean): string | undefined {
  if (key === "m") {
    return withoutSuffix ? "jedna minuta" : isFuture ? "jednu minutu" : "jedne minute";
  }
  return undefined;
}

function getNextWeekFormat(this: moment.Moment): string {
  switch (this.day()) {
    case 0:
      return "[u] [nedjelju] [u] LT";
    case 3:
      return "[u] [srijedu] [u] LT";
    case 6:
      return "[u] [subotu] [u] LT";
    case 1:
    case 2:
    case 4:
    case 5:
      return "[u] dddd [u] LT";
    default:
      return "[u] dddd [u] LT";
  }
}

function getLastWeekFormat(this: moment.Moment): string {
  switch (this.day()) {
    case 0:
    case 3:
      return "[prošlu] dddd [u] LT";
    case 6:
      return "[prošle] [subote] [u] LT";
    case 1:
    case 2:
    case 4:
    case 5:
      return "[prošli] dddd [u] LT";
    default:
      return "[prošli] dddd [u] LT";
  }
}

moment.defineLocale("bs", {
  months: "januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"),
  monthsShort: "jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"),
  monthsParseExact: true,
  weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
  weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"),
  weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D. MMMM YYYY",
    LLL: "D. MMMM YYYY H:mm",
    LLLL: "dddd, D. MMMM YYYY H:mm"
  },
  calendar: {
    sameDay: "[danas u] LT",
    nextDay: "[sutra u] LT",
    nextWeek: getNextWeekFormat,
    lastDay: "[jučer u] LT",
    lastWeek: getLastWeekFormat,
    sameElse: "L"
  },
  relativeTime: {
    future: "za %s",
    past: "prije %s",
    s: "par sekundi",
    ss: getRelativeTimeString,
    m: handleMinuteRelativeTime,
    mm: getRelativeTimeString,
    h: getRelativeTimeString,
    hh: getRelativeTimeString,
    d: "dan",
    dd: getRelativeTimeString,
    M: "mjesec",
    MM: getRelativeTimeString,
    y: "godinu",
    yy: getRelativeTimeString
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: "%d.",
  week: {
    dow: 1,
    doy: 7
  }
});