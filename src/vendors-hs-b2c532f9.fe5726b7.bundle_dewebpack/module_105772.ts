interface DigitMap {
  [key: string]: string;
}

interface LocaleRelativeTimeFunction {
  (
    count: number,
    withoutSuffix: boolean,
    key: string,
    isFuture: boolean
  ): string;
}

interface MomentLocaleConfig {
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
    s: LocaleRelativeTimeFunction;
    ss: LocaleRelativeTimeFunction;
    m: LocaleRelativeTimeFunction;
    mm: LocaleRelativeTimeFunction;
    h: LocaleRelativeTimeFunction;
    hh: LocaleRelativeTimeFunction;
    d: LocaleRelativeTimeFunction;
    dd: LocaleRelativeTimeFunction;
    M: LocaleRelativeTimeFunction;
    MM: LocaleRelativeTimeFunction;
    y: LocaleRelativeTimeFunction;
    yy: LocaleRelativeTimeFunction;
  };
  preparse: (text: string) => string;
  postformat: (text: string) => string;
  meridiemParse: RegExp;
  meridiemHour: (hour: number, meridiem: string) => number | undefined;
  meridiem: (hour: number, minute: number, isLower: boolean) => string;
  week: {
    dow: number;
    doy: number;
  };
}

interface Moment {
  defineLocale(locale: string, config: MomentLocaleConfig): void;
}

const DEVANAGARI_TO_ARABIC: DigitMap = {
  "१": "1",
  "२": "2",
  "३": "3",
  "४": "4",
  "५": "5",
  "६": "6",
  "७": "7",
  "८": "8",
  "९": "9",
  "०": "0"
};

const ARABIC_TO_DEVANAGARI: DigitMap = {
  "1": "१",
  "2": "२",
  "3": "३",
  "4": "४",
  "5": "५",
  "6": "६",
  "7": "७",
  "8": "८",
  "9": "९",
  "0": "०"
};

/**
 * Formats relative time string in Marathi language
 * @param count - The numeric value
 * @param withoutSuffix - Whether to include suffix
 * @param key - The time unit key
 * @param isFuture - Whether the time is in future (unused)
 * @returns Formatted relative time string in Marathi
 */
function formatRelativeTime(
  count: number,
  withoutSuffix: boolean,
  key: string,
  isFuture: boolean
): string {
  let result = "";

  if (withoutSuffix) {
    switch (key) {
      case "s":
        result = "काही सेकंद";
        break;
      case "ss":
        result = "%d सेकंद";
        break;
      case "m":
        result = "एक मिनिट";
        break;
      case "mm":
        result = "%d मिनिटे";
        break;
      case "h":
        result = "एक तास";
        break;
      case "hh":
        result = "%d तास";
        break;
      case "d":
        result = "एक दिवस";
        break;
      case "dd":
        result = "%d दिवस";
        break;
      case "M":
        result = "एक महिना";
        break;
      case "MM":
        result = "%d महिने";
        break;
      case "y":
        result = "एक वर्ष";
        break;
      case "yy":
        result = "%d वर्षे";
        break;
    }
  } else {
    switch (key) {
      case "s":
        result = "काही सेकंदां";
        break;
      case "ss":
        result = "%d सेकंदां";
        break;
      case "m":
        result = "एका मिनिटा";
        break;
      case "mm":
        result = "%d मिनिटां";
        break;
      case "h":
        result = "एका तासा";
        break;
      case "hh":
        result = "%d तासां";
        break;
      case "d":
        result = "एका दिवसा";
        break;
      case "dd":
        result = "%d दिवसां";
        break;
      case "M":
        result = "एका महिन्या";
        break;
      case "MM":
        result = "%d महिन्यां";
        break;
      case "y":
        result = "एका वर्षा";
        break;
      case "yy":
        result = "%d वर्षां";
        break;
    }
  }

  return result.replace(/%d/i, count.toString());
}

/**
 * Configures Marathi locale for Moment.js
 * @param moment - Moment.js instance
 */
export function defineMarathiLocale(moment: Moment): void {
  moment.defineLocale("mr", {
    months: "जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"),
    monthsShort: "जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"),
    monthsParseExact: true,
    weekdays: "रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
    weekdaysShort: "रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"),
    weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"),
    longDateFormat: {
      LT: "A h:mm वाजता",
      LTS: "A h:mm:ss वाजता",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY, A h:mm वाजता",
      LLLL: "dddd, D MMMM YYYY, A h:mm वाजता"
    },
    calendar: {
      sameDay: "[आज] LT",
      nextDay: "[उद्या] LT",
      nextWeek: "dddd, LT",
      lastDay: "[काल] LT",
      lastWeek: "[मागील] dddd, LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%sमध्ये",
      past: "%sपूर्वी",
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
    preparse: (text: string): string => {
      return text.replace(/[१२३४५६७८९०]/g, (match: string): string => {
        return DEVANAGARI_TO_ARABIC[match];
      });
    },
    postformat: (text: string): string => {
      return text.replace(/\d/g, (match: string): string => {
        return ARABIC_TO_DEVANAGARI[match];
      });
    },
    meridiemParse: /पहाटे|सकाळी|दुपारी|सायंकाळी|रात्री/,
    meridiemHour: (hour: number, meridiem: string): number | undefined => {
      if (hour === 12) {
        hour = 0;
      }

      if (meridiem === "पहाटे" || meridiem === "सकाळी") {
        return hour;
      } else if (meridiem === "दुपारी" || meridiem === "सायंकाळी" || meridiem === "रात्री") {
        return hour >= 12 ? hour : hour + 12;
      }

      return undefined;
    },
    meridiem: (hour: number, minute: number, isLower: boolean): string => {
      if (hour >= 0 && hour < 6) {
        return "पहाटे";
      } else if (hour < 12) {
        return "सकाळी";
      } else if (hour < 17) {
        return "दुपारी";
      } else if (hour < 20) {
        return "सायंकाळी";
      } else {
        return "रात्री";
      }
    },
    week: {
      dow: 0,
      doy: 6
    }
  });
}