interface RelativeTimeConfig {
  s: [string, string];
  ss: [string, string];
  m: [string, string];
  mm: [string, string];
  h: [string, string];
  hh: [string, string];
  d: [string, string];
  dd: [string, string];
  w: [string, string];
  ww: [string, string];
  M: [string, string];
  MM: [string, string];
  y: [string, string];
  yy: [string, string];
}

type RelativeTimeKey = keyof RelativeTimeConfig;

interface MomentLocale {
  months: string[];
  monthsShort: string[];
  monthsParseExact: boolean;
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  meridiemParse: RegExp;
  longDateFormat: {
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
    ll: string;
    lll: string;
    llll: string;
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
    s: typeof getRelativeTimeString;
    ss: typeof getRelativeTimeString;
    m: typeof getRelativeTimeString;
    mm: typeof getRelativeTimeString;
    h: typeof getRelativeTimeString;
    hh: typeof getRelativeTimeString;
    d: typeof getRelativeTimeString;
    dd: typeof getRelativeTimeString;
    w: typeof getRelativeTimeString;
    ww: typeof getRelativeTimeString;
    M: typeof getRelativeTimeString;
    MM: typeof getRelativeTimeString;
    y: typeof getRelativeTimeString;
    yy: typeof getRelativeTimeString;
  };
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number, token: string) => string;
  week: {
    dow: number;
    doy: number;
  };
}

interface Moment {
  defineLocale: (locale: string, config: MomentLocale) => Moment;
}

function getRelativeTimeString(
  value: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string {
  const config: RelativeTimeConfig = {
    s: ["çend sanîye", "çend sanîyeyan"],
    ss: [`${value} sanîye`, `${value} sanîyeyan`],
    m: ["deqîqeyek", "deqîqeyekê"],
    mm: [`${value} deqîqe`, `${value} deqîqeyan`],
    h: ["saetek", "saetekê"],
    hh: [`${value} saet`, `${value} saetan`],
    d: ["rojek", "rojekê"],
    dd: [`${value} roj`, `${value} rojan`],
    w: ["hefteyek", "hefteyekê"],
    ww: [`${value} hefte`, `${value} hefteyan`],
    M: ["mehek", "mehekê"],
    MM: [`${value} meh`, `${value} mehan`],
    y: ["salek", "salekê"],
    yy: [`${value} sal`, `${value} salan`]
  };

  return withoutSuffix ? config[key as RelativeTimeKey][0] : config[key as RelativeTimeKey][1];
}

function getOrdinalSuffix(num: number): string {
  const numString = String(num);
  const lastDigit = numString.substring(numString.length - 1);
  const lastTwoDigits = numString.length > 1 ? numString.substring(numString.length - 2) : "";

  if (
    lastTwoDigits === "12" ||
    lastTwoDigits === "13" ||
    (lastDigit !== "2" &&
      lastDigit !== "3" &&
      lastTwoDigits !== "50" &&
      lastDigit !== "70" &&
      lastDigit !== "80")
  ) {
    return "ê";
  }

  return "yê";
}

export function defineKuKmrLocale(moment: Moment): Moment {
  return moment.defineLocale("ku-kmr", {
    months: "Rêbendan_Sibat_Adar_Nîsan_Gulan_Hezîran_Tîrmeh_Tebax_Îlon_Cotmeh_Mijdar_Berfanbar".split("_"),
    monthsShort: "Rêb_Sib_Ada_Nîs_Gul_Hez_Tîr_Teb_Îlo_Cot_Mij_Ber".split("_"),
    monthsParseExact: true,
    weekdays: "Yekşem_Duşem_Sêşem_Çarşem_Pêncşem_În_Şemî".split("_"),
    weekdaysShort: "Yek_Du_Sê_Çar_Pên_În_Şem".split("_"),
    weekdaysMin: "Ye_Du_Sê_Ça_Pê_În_Şe".split("_"),
    meridiem: (hour: number, minute: number, isLowercase: boolean): string => {
      return hour < 12 ? (isLowercase ? "bn" : "BN") : (isLowercase ? "pn" : "PN");
    },
    meridiemParse: /bn|BN|pn|PN/,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "Do MMMM[a] YYYY[an]",
      LLL: "Do MMMM[a] YYYY[an] HH:mm",
      LLLL: "dddd, Do MMMM[a] YYYY[an] HH:mm",
      ll: "Do MMM[.] YYYY[an]",
      lll: "Do MMM[.] YYYY[an] HH:mm",
      llll: "ddd[.], Do MMM[.] YYYY[an] HH:mm"
    },
    calendar: {
      sameDay: "[Îro di saet] LT [de]",
      nextDay: "[Sibê di saet] LT [de]",
      nextWeek: "dddd [di saet] LT [de]",
      lastDay: "[Duh di saet] LT [de]",
      lastWeek: "dddd[a borî di saet] LT [de]",
      sameElse: "L"
    },
    relativeTime: {
      future: "di %s de",
      past: "berî %s",
      s: getRelativeTimeString,
      ss: getRelativeTimeString,
      m: getRelativeTimeString,
      mm: getRelativeTimeString,
      h: getRelativeTimeString,
      hh: getRelativeTimeString,
      d: getRelativeTimeString,
      dd: getRelativeTimeString,
      w: getRelativeTimeString,
      ww: getRelativeTimeString,
      M: getRelativeTimeString,
      MM: getRelativeTimeString,
      y: getRelativeTimeString,
      yy: getRelativeTimeString
    },
    dayOfMonthOrdinalParse: /\d{1,2}(?:yê|ê|\.)/,
    ordinal: (num: number, token: string): string => {
      const tokenLower = token.toLowerCase();
      if (tokenLower.includes("w") || tokenLower.includes("m")) {
        return `${num}.`;
      }
      return num + getOrdinalSuffix(num);
    },
    week: {
      dow: 1,
      doy: 4
    }
  });
}