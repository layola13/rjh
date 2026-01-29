import moment from 'moment';

interface PluralForms {
  ss: string;
  mm: string;
  hh: string;
  dd: string;
  MM: string;
  yy: string;
}

interface WeekdayForms {
  nominative: string[];
  accusative: string[];
  genitive: string[];
}

const PLURAL_FORMS: Record<string, PluralForms> = {
  withNominative: {
    ss: "секунда_секунди_секунд",
    mm: "хвилина_хвилини_хвилин",
    hh: "година_години_годин",
    dd: "день_дні_днів",
    MM: "місяць_місяці_місяців",
    yy: "рік_роки_років"
  },
  withAccusative: {
    ss: "секунду_секунди_секунд",
    mm: "хвилину_хвилини_хвилин",
    hh: "годину_години_годин",
    dd: "день_дні_днів",
    MM: "місяць_місяці_місяців",
    yy: "рік_роки_років"
  }
};

const WEEKDAY_FORMS: WeekdayForms = {
  nominative: "неділя_понеділок_вівторок_середа_четвер_п'ятниця_субота".split("_"),
  accusative: "неділю_понеділок_вівторок_середу_четвер_п'ятницю_суботу".split("_"),
  genitive: "неділі_понеділка_вівторка_середи_четверга_п'ятниці_суботи".split("_")
};

const ACCUSATIVE_PATTERN = /(\[[ВвУу]\]) ?dddd/;
const GENITIVE_PATTERN = /\[?(?:минулої|наступної)? ?\] ?dddd/;

/**
 * Selects the appropriate plural form for Ukrainian language
 */
function selectPluralForm(number: number, forms: string[]): string {
  const mod10 = number % 10;
  const mod100 = number % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return forms[0];
  }
  
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return forms[1];
  }
  
  return forms[2];
}

/**
 * Formats relative time strings with proper Ukrainian grammar
 */
function relativeTimeWithPlural(
  number: number,
  withoutSuffix: boolean,
  key: string
): string {
  const forms = withoutSuffix ? PLURAL_FORMS.withNominative : PLURAL_FORMS.withAccusative;

  if (key === "m") {
    return withoutSuffix ? "хвилина" : "хвилину";
  }

  if (key === "h") {
    return withoutSuffix ? "година" : "годину";
  }

  const pluralKey = key as keyof PluralForms;
  const pluralForms = forms[pluralKey].split("_");
  const selectedForm = selectPluralForm(number, pluralForms);

  return `${number} ${selectedForm}`;
}

/**
 * Creates a calendar format function with proper time suffix
 */
function createCalendarFormat(prefix: string): () => string {
  return function (this: moment.Moment): string {
    const suffix = this.hours() === 11 ? "б" : "";
    return `${prefix}о${suffix}] LT`;
  };
}

/**
 * Determines the weekday case based on the format string
 */
function getWeekdayCase(format: string): keyof WeekdayForms {
  if (ACCUSATIVE_PATTERN.test(format)) {
    return "accusative";
  }
  
  if (GENITIVE_PATTERN.test(format)) {
    return "genitive";
  }
  
  return "nominative";
}

/**
 * Returns the appropriate weekday name based on context
 */
function getWeekdays(momentInstance: moment.Moment | boolean, format: string): string[] | string {
  if (momentInstance === true) {
    return [
      ...WEEKDAY_FORMS.nominative.slice(1, 7),
      WEEKDAY_FORMS.nominative[0]
    ];
  }

  if (!momentInstance) {
    return WEEKDAY_FORMS.nominative;
  }

  const weekdayCase = getWeekdayCase(format);
  const dayIndex = (momentInstance as moment.Moment).day();
  
  return WEEKDAY_FORMS[weekdayCase][dayIndex];
}

/**
 * Determines the last week calendar format
 */
function getLastWeekFormat(this: moment.Moment): string {
  const dayOfWeek = this.day();

  if (dayOfWeek === 0 || dayOfWeek === 3 || dayOfWeek === 5 || dayOfWeek === 6) {
    return createCalendarFormat("[Минулої] dddd [").call(this);
  }

  return createCalendarFormat("[Минулого] dddd [").call(this);
}

/**
 * Determines meridiem (time of day) in Ukrainian
 */
function getMeridiem(hour: number, minute: number, isLower: boolean): string {
  if (hour < 4) {
    return "ночі";
  }
  
  if (hour < 12) {
    return "ранку";
  }
  
  if (hour < 17) {
    return "дня";
  }
  
  return "вечора";
}

/**
 * Checks if the meridiem represents PM
 */
function isPM(meridiemString: string): boolean {
  return /^(дня|вечора)$/.test(meridiemString);
}

/**
 * Formats ordinal numbers in Ukrainian
 */
function getOrdinal(number: number, period: string): string {
  switch (period) {
    case "M":
    case "d":
    case "DDD":
    case "w":
    case "W":
      return `${number}-й`;
    case "D":
      return `${number}-го`;
    default:
      return number.toString();
  }
}

moment.defineLocale("uk", {
  months: {
    format: "січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_"),
    standalone: "січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_")
  },
  monthsShort: "січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),
  weekdays: getWeekdays,
  weekdaysShort: "нд_пн_вт_ср_чт_пт_сб".split("_"),
  weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY р.",
    LLL: "D MMMM YYYY р., HH:mm",
    LLLL: "dddd, D MMMM YYYY р., HH:mm"
  },
  calendar: {
    sameDay: createCalendarFormat("[Сьогодні "),
    nextDay: createCalendarFormat("[Завтра "),
    lastDay: createCalendarFormat("[Вчора "),
    nextWeek: createCalendarFormat("[У] dddd ["),
    lastWeek: getLastWeekFormat,
    sameElse: "L"
  },
  relativeTime: {
    future: "за %s",
    past: "%s тому",
    s: "декілька секунд",
    ss: relativeTimeWithPlural,
    m: relativeTimeWithPlural,
    mm: relativeTimeWithPlural,
    h: "годину",
    hh: relativeTimeWithPlural,
    d: "день",
    dd: relativeTimeWithPlural,
    M: "місяць",
    MM: relativeTimeWithPlural,
    y: "рік",
    yy: relativeTimeWithPlural
  },
  meridiemParse: /ночі|ранку|дня|вечора/,
  isPM: isPM,
  meridiem: getMeridiem,
  dayOfMonthOrdinalParse: /\d{1,2}-(й|го)/,
  ordinal: getOrdinal,
  week: {
    dow: 1,
    doy: 7
  }
});