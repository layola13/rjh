import moment from 'moment';

interface WeekConfig {
  dow: number;
  doy: number;
}

interface LongDateFormatConfig {
  LT: string;
  LTS: string;
  L: string;
  LL: string;
  LLL: string;
  LLLL: string;
}

interface CalendarConfig {
  sameDay: string;
  nextDay: string;
  nextWeek: string;
  lastDay: string;
  lastWeek: string;
  sameElse: string;
}

interface RelativeTimeConfig {
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

interface MaoriLocaleConfig {
  months: string[];
  monthsShort: string[];
  monthsRegex: RegExp;
  monthsStrictRegex: RegExp;
  monthsShortRegex: RegExp;
  monthsShortStrictRegex: RegExp;
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  longDateFormat: LongDateFormatConfig;
  calendar: CalendarConfig;
  relativeTime: RelativeTimeConfig;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: string;
  week: WeekConfig;
}

/**
 * Moment.js locale configuration for Māori (mi)
 * Defines date/time formatting rules for the Māori language
 */
function defineMaoriLocale(momentInstance: typeof moment): typeof moment {
  const localeConfig: MaoriLocaleConfig = {
    months: "Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea".split("_"),
    monthsShort: "Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki".split("_"),
    monthsRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
    monthsStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
    monthsShortRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
    monthsShortStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,
    weekdays: "Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei".split("_"),
    weekdaysShort: "Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"),
    weekdaysMin: "Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY [i] HH:mm",
      LLLL: "dddd, D MMMM YYYY [i] HH:mm"
    },
    calendar: {
      sameDay: "[i teie mahana, i] LT",
      nextDay: "[apopo i] LT",
      nextWeek: "dddd [i] LT",
      lastDay: "[inanahi i] LT",
      lastWeek: "dddd [whakamutunga i] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "i roto i %s",
      past: "%s i mua",
      s: "te hēkona ruarua",
      ss: "%d hēkona",
      m: "he meneti",
      mm: "%d meneti",
      h: "te haora",
      hh: "%d haora",
      d: "he ra",
      dd: "%d ra",
      M: "he marama",
      MM: "%d marama",
      y: "he tau",
      yy: "%d tau"
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: "%dº",
    week: {
      dow: 1,
      doy: 4
    }
  };

  return momentInstance.defineLocale("mi", localeConfig);
}

export default defineMaoriLocale(moment);