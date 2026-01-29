import moment from 'moment';

interface MomentLocaleConfig {
  months: ((date: moment.Moment | null, format: string) => string[] | string) | string[];
  monthsShort: string[];
  monthsParse: RegExp[];
  longMonthsParse: RegExp[];
  shortMonthsParse: RegExp[];
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
    s: string;
    ss: (num: number, withoutSuffix: boolean, key: string) => string;
    m: (num: number, withoutSuffix: boolean, key: string) => string;
    mm: (num: number, withoutSuffix: boolean, key: string) => string;
    h: (num: number, withoutSuffix: boolean, key: string) => string;
    hh: (num: number, withoutSuffix: boolean, key: string) => string;
    d: string;
    dd: string;
    w: string;
    ww: (num: number, withoutSuffix: boolean, key: string) => string;
    M: string;
    MM: (num: number, withoutSuffix: boolean, key: string) => string;
    y: string;
    yy: (num: number, withoutSuffix: boolean, key: string) => string;
  };
  dayOfMonthOrdinalParse: RegExp;
  ordinal: string;
  week: {
    dow: number;
    doy: number;
  };
}

const NOMINATIVE_MONTHS = "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_");
const GENITIVE_MONTHS = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_");
const MONTH_PARSE_PATTERNS = [
  /^sty/i,
  /^lut/i,
  /^mar/i,
  /^kwi/i,
  /^maj/i,
  /^cze/i,
  /^lip/i,
  /^sie/i,
  /^wrz/i,
  /^paź/i,
  /^lis/i,
  /^gru/i
];

function shouldUsePluralForm(num: number): boolean {
  return num % 10 < 5 && num % 10 > 1 && Math.floor(num / 10) % 10 !== 1;
}

function formatRelativeTime(num: number, withoutSuffix: boolean, key: string): string {
  const prefix = `${num} `;
  
  switch (key) {
    case "ss":
      return prefix + (shouldUsePluralForm(num) ? "sekundy" : "sekund");
    case "m":
      return withoutSuffix ? "minuta" : "minutę";
    case "mm":
      return prefix + (shouldUsePluralForm(num) ? "minuty" : "minut");
    case "h":
      return withoutSuffix ? "godzina" : "godzinę";
    case "hh":
      return prefix + (shouldUsePluralForm(num) ? "godziny" : "godzin");
    case "ww":
      return prefix + (shouldUsePluralForm(num) ? "tygodnie" : "tygodni");
    case "MM":
      return prefix + (shouldUsePluralForm(num) ? "miesiące" : "miesięcy");
    case "yy":
      return prefix + (shouldUsePluralForm(num) ? "lata" : "lat");
    default:
      return "";
  }
}

const polishLocaleConfig: MomentLocaleConfig = {
  months: (date: moment.Moment | null, format: string) => {
    if (!date) {
      return NOMINATIVE_MONTHS;
    }
    return /D MMMM/.test(format) ? GENITIVE_MONTHS[date.month()] : NOMINATIVE_MONTHS[date.month()];
  },
  monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
  monthsParse: MONTH_PARSE_PATTERNS,
  longMonthsParse: MONTH_PARSE_PATTERNS,
  shortMonthsParse: MONTH_PARSE_PATTERNS,
  weekdays: "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
  weekdaysShort: "ndz_pon_wt_śr_czw_pt_sob".split("_"),
  weekdaysMin: "Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd, D MMMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[Dziś o] LT",
    nextDay: "[Jutro o] LT",
    nextWeek: function(this: moment.Moment): string {
      switch (this.day()) {
        case 0:
          return "[W niedzielę o] LT";
        case 2:
          return "[We wtorek o] LT";
        case 3:
          return "[W środę o] LT";
        case 6:
          return "[W sobotę o] LT";
        default:
          return "[W] dddd [o] LT";
      }
    },
    lastDay: "[Wczoraj o] LT",
    lastWeek: function(this: moment.Moment): string {
      switch (this.day()) {
        case 0:
          return "[W zeszłą niedzielę o] LT";
        case 3:
          return "[W zeszłą środę o] LT";
        case 6:
          return "[W zeszłą sobotę o] LT";
        default:
          return "[W zeszły] dddd [o] LT";
      }
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "za %s",
    past: "%s temu",
    s: "kilka sekund",
    ss: formatRelativeTime,
    m: formatRelativeTime,
    mm: formatRelativeTime,
    h: formatRelativeTime,
    hh: formatRelativeTime,
    d: "1 dzień",
    dd: "%d dni",
    w: "tydzień",
    ww: formatRelativeTime,
    M: "miesiąc",
    MM: formatRelativeTime,
    y: "rok",
    yy: formatRelativeTime
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: "%d.",
  week: {
    dow: 1,
    doy: 4
  }
};

moment.defineLocale("pl", polishLocaleConfig);

export default polishLocaleConfig;