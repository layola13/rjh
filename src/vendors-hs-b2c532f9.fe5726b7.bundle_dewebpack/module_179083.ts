import moment from 'moment';

interface MonthsConfig {
  format: string[];
  standalone: string[];
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
  lastDay: string;
  nextWeek: () => string;
  lastWeek: () => string;
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

interface WeekConfig {
  dow: number;
  doy: number;
}

interface LocaleConfig {
  months: MonthsConfig;
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
  longDateFormat: LongDateFormatConfig;
  calendar: CalendarConfig;
  relativeTime: RelativeTimeConfig;
  meridiemParse: RegExp;
  isPM: (input: string) => boolean;
  meridiem: (hour: number) => string;
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number, token: string) => string | number;
  week: WeekConfig;
}

/**
 * Armenian (Armenia) locale configuration for moment.js
 */
function defineArmenianLocale(momentInstance: typeof moment): typeof moment {
  return momentInstance.defineLocale('hy-am', {
    months: {
      format: 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_'),
      standalone: 'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split('_')
    },
    monthsShort: 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
    weekdays: 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_'),
    weekdaysShort: 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
    weekdaysMin: 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY թ.',
      LLL: 'D MMMM YYYY թ., HH:mm',
      LLLL: 'dddd, D MMMM YYYY թ., HH:mm'
    },
    calendar: {
      sameDay: '[այսօր] LT',
      nextDay: '[վաղը] LT',
      lastDay: '[երեկ] LT',
      nextWeek: function(): string {
        return 'dddd [օրը ժամը] LT';
      },
      lastWeek: function(): string {
        return '[անցած] dddd [օրը ժամը] LT';
      },
      sameElse: 'L'
    },
    relativeTime: {
      future: '%s հետո',
      past: '%s առաջ',
      s: 'մի քանի վայրկյան',
      ss: '%d վայրկյան',
      m: 'րոպե',
      mm: '%d րոպե',
      h: 'ժամ',
      hh: '%d ժամ',
      d: 'օր',
      dd: '%d օր',
      M: 'ամիս',
      MM: '%d ամիս',
      y: 'տարի',
      yy: '%d տարի'
    },
    meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
    isPM: function(input: string): boolean {
      return /^(ցերեկվա|երեկոյան)$/.test(input);
    },
    meridiem: function(hour: number): string {
      if (hour < 4) {
        return 'գիշերվա';
      } else if (hour < 12) {
        return 'առավոտվա';
      } else if (hour < 17) {
        return 'ցերեկվա';
      } else {
        return 'երեկոյան';
      }
    },
    dayOfMonthOrdinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
    ordinal: function(num: number, token: string): string | number {
      switch (token) {
        case 'DDD':
        case 'w':
        case 'W':
        case 'DDDo':
          return num === 1 ? `${num}-ին` : `${num}-րդ`;
        default:
          return num;
      }
    },
    week: {
      dow: 1,
      doy: 7
    }
  });
}

export default defineArmenianLocale(moment);