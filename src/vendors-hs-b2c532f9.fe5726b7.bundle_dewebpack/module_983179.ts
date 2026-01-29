interface MomentLocale {
  months: string;
  monthsShort: string;
  weekdays: string;
  weekdaysShort: string;
  weekdaysMin: string;
  weekdaysParse: RegExp[];
  fullWeekdaysParse: RegExp[];
  shortWeekdaysParse: RegExp[];
  minWeekdaysParse: RegExp[];
  monthsRegex: RegExp;
  monthsShortRegex: RegExp;
  monthsStrictRegex: RegExp;
  monthsShortStrictRegex: RegExp;
  monthsParse: RegExp[];
  longMonthsParse: RegExp[];
  shortMonthsParse: RegExp[];
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
    s: string;
    ss: string;
    m: string;
    mm: (value: number) => string;
    h: string;
    hh: string;
    d: string;
    dd: (value: number) => string;
    M: string;
    MM: (value: number) => string;
    y: string;
    yy: (value: number) => string;
  };
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (value: number) => string;
  week: {
    dow: number;
    doy: number;
  };
  meridiemParse: RegExp;
  isPM: (input: string) => boolean;
  meridiem: (hour: number, minute: number, isLower: boolean) => string;
}

interface Moment {
  defineLocale(locale: string, config: MomentLocale): MomentLocale;
}

type UnitKey = 'mm' | 'MM' | 'dd';

const UNIT_NAMES: Record<UnitKey, string> = {
  mm: 'munutenn',
  MM: 'miz',
  dd: 'devezh'
};

const LETTER_MUTATIONS: Record<string, string> = {
  m: 'v',
  b: 'v',
  d: 'z'
};

/**
 * Applies Breton mutation rules when count is 2
 */
function applyMutation(word: string): string {
  const firstLetter = word.charAt(0);
  const mutation = LETTER_MUTATIONS[firstLetter];
  
  if (mutation === undefined) {
    return word;
  }
  
  return mutation + word.substring(1);
}

/**
 * Formats relative time with Breton unit names
 */
function formatRelativeTime(value: number, withoutSuffix: boolean, unit: UnitKey): string {
  const unitName = UNIT_NAMES[unit];
  const word = withoutSuffix && value === 2 ? applyMutation(unitName) : unitName;
  
  return `${value} ${word}`;
}

/**
 * Recursively reduces numbers to single digit for year calculation
 */
function reduceToSingleDigit(value: number): number {
  return value > 9 ? reduceToSingleDigit(value % 10) : value;
}

/**
 * Formats years in Breton with correct mutation
 */
function formatYears(value: number): string {
  const digit = reduceToSingleDigit(value);
  
  switch (digit) {
    case 1:
    case 3:
    case 4:
    case 5:
    case 9:
      return `${value} bloaz`;
    default:
      return `${value} vloaz`;
  }
}

const MONTH_PARSE_PATTERNS: RegExp[] = [
  /^gen/i,
  /^c[ʼ']hwe/i,
  /^meu/i,
  /^ebr/i,
  /^mae/i,
  /^(mez|eve)/i,
  /^gou/i,
  /^eos/i,
  /^gwe/i,
  /^her/i,
  /^du/i,
  /^ker/i
];

const MONTH_REGEX = /^(genver|c[ʼ']hwevrer|meurzh|ebrel|mae|mezheven|gouere|eost|gwengolo|here|du|kerzu|gen|c[ʼ']hwe|meu|ebr|mae|eve|gou|eos|gwe|her|du|ker)/i;

const WEEKDAY_MIN_PARSE_PATTERNS: RegExp[] = [
  /^Su/i,
  /^Lu/i,
  /^Me([^r]|$)/i,
  /^Mer/i,
  /^Ya/i,
  /^Gw/i,
  /^Sa/i
];

/**
 * Configures Breton (br) locale for moment.js
 */
export function defineBretonLocale(moment: Moment): MomentLocale {
  return moment.defineLocale('br', {
    months: 'Genver_Cʼhwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu'.split('_'),
    monthsShort: 'Gen_Cʼhwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker'.split('_'),
    weekdays: 'Sul_Lun_Meurzh_Mercʼher_Yaou_Gwener_Sadorn'.split('_'),
    weekdaysShort: 'Sul_Lun_Meu_Mer_Yao_Gwe_Sad'.split('_'),
    weekdaysMin: 'Su_Lu_Me_Mer_Ya_Gw_Sa'.split('_'),
    weekdaysParse: WEEKDAY_MIN_PARSE_PATTERNS,
    fullWeekdaysParse: [
      /^sul/i,
      /^lun/i,
      /^meurzh/i,
      /^merc[ʼ']her/i,
      /^yaou/i,
      /^gwener/i,
      /^sadorn/i
    ],
    shortWeekdaysParse: [
      /^Sul/i,
      /^Lun/i,
      /^Meu/i,
      /^Mer/i,
      /^Yao/i,
      /^Gwe/i,
      /^Sad/i
    ],
    minWeekdaysParse: WEEKDAY_MIN_PARSE_PATTERNS,
    monthsRegex: MONTH_REGEX,
    monthsShortRegex: MONTH_REGEX,
    monthsStrictRegex: /^(genver|c[ʼ']hwevrer|meurzh|ebrel|mae|mezheven|gouere|eost|gwengolo|here|du|kerzu)/i,
    monthsShortStrictRegex: /^(gen|c[ʼ']hwe|meu|ebr|mae|eve|gou|eos|gwe|her|du|ker)/i,
    monthsParse: MONTH_PARSE_PATTERNS,
    longMonthsParse: MONTH_PARSE_PATTERNS,
    shortMonthsParse: MONTH_PARSE_PATTERNS,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D [a viz] MMMM YYYY',
      LLL: 'D [a viz] MMMM YYYY HH:mm',
      LLLL: 'dddd, D [a viz] MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Hiziv da] LT',
      nextDay: '[Warcʼhoazh da] LT',
      nextWeek: 'dddd [da] LT',
      lastDay: '[Decʼh da] LT',
      lastWeek: 'dddd [paset da] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'a-benn %s',
      past: '%s ʼzo',
      s: 'un nebeud segondennoù',
      ss: '%d eilenn',
      m: 'ur vunutenn',
      mm: formatRelativeTime,
      h: 'un eur',
      hh: '%d eur',
      d: 'un devezh',
      dd: formatRelativeTime,
      M: 'ur miz',
      MM: formatRelativeTime,
      y: 'ur bloaz',
      yy: formatYears
    },
    dayOfMonthOrdinalParse: /\d{1,2}(añ|vet)/,
    ordinal: (value: number): string => {
      return `${value}${value === 1 ? 'añ' : 'vet'}`;
    },
    week: {
      dow: 1,
      doy: 4
    },
    meridiemParse: /a\.m\.|g\.m\./,
    isPM: (input: string): boolean => {
      return input === 'g.m.';
    },
    meridiem: (hour: number, minute: number, isLower: boolean): string => {
      return hour < 12 ? 'a.m.' : 'g.m.';
    }
  });
}