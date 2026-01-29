interface MomentLocale {
  months: {
    format: string[];
    standalone: string[];
  };
  monthsShort: {
    format: string[];
    standalone: string[];
  };
  weekdays: {
    standalone: string[];
    format: string[];
    isFormat: RegExp;
  };
  weekdaysShort: string[];
  weekdaysMin: string[];
  monthsParse: RegExp[];
  longMonthsParse: RegExp[];
  shortMonthsParse: RegExp[];
  monthsRegex: RegExp;
  monthsShortRegex: RegExp;
  monthsStrictRegex: RegExp;
  monthsShortStrictRegex: RegExp;
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
    lastDay: string;
    nextWeek: (this: MomentInstance, date: MomentInstance) => string;
    lastWeek: (this: MomentInstance, date: MomentInstance) => string;
    sameElse: string;
  };
  relativeTime: {
    future: string;
    past: string;
    s: string;
    ss: RelativeTimeFunction;
    m: RelativeTimeFunction;
    mm: RelativeTimeFunction;
    h: string;
    hh: RelativeTimeFunction;
    d: string;
    dd: RelativeTimeFunction;
    w: string;
    ww: RelativeTimeFunction;
    M: string;
    MM: RelativeTimeFunction;
    y: string;
    yy: RelativeTimeFunction;
  };
  meridiemParse: RegExp;
  isPM: (meridiem: string) => boolean;
  meridiem: (hour: number, minute: number, isLower: boolean) => string;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number, period: string) => string;
  week: {
    dow: number;
    doy: number;
  };
}

interface MomentInstance {
  week(): number;
  day(): number;
}

interface MomentStatic {
  defineLocale(locale: string, config: MomentLocale): MomentLocale;
}

type RelativeTimeFunction = (count: number, withoutSuffix: boolean, key: string) => string;

const UNIT_FORMS: Record<string, string> = {
  ss: "секунда_секунды_секунд",
  ssWithoutSuffix: "секунду_секунды_секунд",
  mm: "минута_минуты_минут",
  mmWithoutSuffix: "минуту_минуты_минут",
  hh: "час_часа_часов",
  dd: "день_дня_дней",
  ww: "неделя_недели_недель",
  MM: "месяц_месяца_месяцев",
  yy: "год_года_лет"
};

function relativeTimeWithPlural(count: number, withoutSuffix: boolean, key: string): string {
  if (key === "m") {
    return withoutSuffix ? "минута" : "минуту";
  }

  const unitKey = key === "ss" || key === "mm" 
    ? withoutSuffix ? key : `${key}WithoutSuffix`
    : key;

  const forms = UNIT_FORMS[unitKey]?.split("_") ?? [];
  const pluralForm = getPluralForm(count, forms);

  return `${count} ${pluralForm}`;
}

function getPluralForm(count: number, forms: string[]): string {
  const absCount = Math.abs(count);
  const mod10 = absCount % 10;
  const mod100 = absCount % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return forms[0] ?? "";
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return forms[1] ?? "";
  }

  return forms[2] ?? "";
}

const MONTH_PARSE_PATTERNS: RegExp[] = [
  /^янв/i,
  /^фев/i,
  /^мар/i,
  /^апр/i,
  /^ма[йя]/i,
  /^июн/i,
  /^июл/i,
  /^авг/i,
  /^сен/i,
  /^окт/i,
  /^ноя/i,
  /^дек/i
];

const WEEKDAY_ACCUSATIVE = 2;

function getNextWeekDay(this: MomentInstance, referenceDate: MomentInstance): string {
  if (referenceDate.week() === this.week()) {
    return this.day() === WEEKDAY_ACCUSATIVE ? "[Во] dddd, [в] LT" : "[В] dddd, [в] LT";
  }

  switch (this.day()) {
    case 0:
      return "[В следующее] dddd, [в] LT";
    case 1:
    case 2:
    case 4:
      return "[В следующий] dddd, [в] LT";
    case 3:
    case 5:
    case 6:
      return "[В следующую] dddd, [в] LT";
    default:
      return "[В] dddd, [в] LT";
  }
}

function getLastWeekDay(this: MomentInstance, referenceDate: MomentInstance): string {
  if (referenceDate.week() === this.week()) {
    return this.day() === WEEKDAY_ACCUSATIVE ? "[Во] dddd, [в] LT" : "[В] dddd, [в] LT";
  }

  switch (this.day()) {
    case 0:
      return "[В прошлое] dddd, [в] LT";
    case 1:
    case 2:
    case 4:
      return "[В прошлый] dddd, [в] LT";
    case 3:
    case 5:
    case 6:
      return "[В прошлую] dddd, [в] LT";
    default:
      return "[В] dddd, [в] LT";
  }
}

function isPM(meridiem: string): boolean {
  return /^(дня|вечера)$/.test(meridiem);
}

function getMeridiem(hour: number, minute: number, isLower: boolean): string {
  if (hour < 4) return "ночи";
  if (hour < 12) return "утра";
  if (hour < 17) return "дня";
  return "вечера";
}

function getOrdinal(num: number, period: string): string {
  switch (period) {
    case "M":
    case "d":
    case "DDD":
      return `${num}-й`;
    case "D":
      return `${num}-го`;
    case "w":
    case "W":
      return `${num}-я`;
    default:
      return String(num);
  }
}

export function defineRussianLocale(moment: MomentStatic): MomentLocale {
  return moment.defineLocale("ru", {
    months: {
      format: "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"),
      standalone: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_")
    },
    monthsShort: {
      format: "янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"),
      standalone: "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_")
    },
    weekdays: {
      standalone: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
      format: "воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_"),
      isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?] ?dddd/
    },
    weekdaysShort: "вс_пн_вт_ср_чт_пт_сб".split("_"),
    weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
    monthsParse: MONTH_PARSE_PATTERNS,
    longMonthsParse: MONTH_PARSE_PATTERNS,
    shortMonthsParse: MONTH_PARSE_PATTERNS,
    monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
    monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
    monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,
    monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY г.",
      LLL: "D MMMM YYYY г., H:mm",
      LLLL: "dddd, D MMMM YYYY г., H:mm"
    },
    calendar: {
      sameDay: "[Сегодня, в] LT",
      nextDay: "[Завтра, в] LT",
      lastDay: "[Вчера, в] LT",
      nextWeek: getNextWeekDay,
      lastWeek: getLastWeekDay,
      sameElse: "L"
    },
    relativeTime: {
      future: "через %s",
      past: "%s назад",
      s: "несколько секунд",
      ss: relativeTimeWithPlural,
      m: relativeTimeWithPlural,
      mm: relativeTimeWithPlural,
      h: "час",
      hh: relativeTimeWithPlural,
      d: "день",
      dd: relativeTimeWithPlural,
      w: "неделя",
      ww: relativeTimeWithPlural,
      M: "месяц",
      MM: relativeTimeWithPlural,
      y: "год",
      yy: relativeTimeWithPlural
    },
    meridiemParse: /ночи|утра|дня|вечера/i,
    isPM,
    meridiem: getMeridiem,
    dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/,
    ordinal: getOrdinal,
    week: {
      dow: 1,
      doy: 4
    }
  });
}