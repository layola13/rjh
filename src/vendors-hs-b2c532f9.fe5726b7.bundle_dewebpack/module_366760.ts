import moment from 'moment';

interface MeridiemConfig {
  រាត្រី: string;
  ఉదయం: string;
  మధ్యాహ్నం: string;
  సాయంత్రం: string;
}

const NIGHT = 'రాత్రి';
const MORNING = 'ఉదయం';
const AFTERNOON = 'మధ్యాహ్నం';
const EVENING = 'సాయంత్రం';

const NIGHT_THRESHOLD = 4;
const MORNING_THRESHOLD = 10;
const AFTERNOON_THRESHOLD = 17;
const EVENING_THRESHOLD = 20;
const NOON = 12;

/**
 * Converts 12-hour format to 24-hour format based on meridiem
 */
function meridiemHour(hour: number, meridiem: string): number {
  let adjustedHour = hour;
  
  if (hour === NOON) {
    adjustedHour = 0;
  }
  
  if (meridiem === NIGHT) {
    return adjustedHour < NIGHT_THRESHOLD ? adjustedHour : adjustedHour + NOON;
  }
  
  if (meridiem === MORNING) {
    return adjustedHour;
  }
  
  if (meridiem === AFTERNOON) {
    return adjustedHour >= MORNING_THRESHOLD ? adjustedHour : adjustedHour + NOON;
  }
  
  if (meridiem === EVENING) {
    return adjustedHour + NOON;
  }
  
  return adjustedHour;
}

/**
 * Determines the meridiem period based on hour
 */
function meridiem(hour: number, minute: number, isLowercase: boolean): string {
  if (hour < NIGHT_THRESHOLD) {
    return NIGHT;
  }
  
  if (hour < MORNING_THRESHOLD) {
    return MORNING;
  }
  
  if (hour < AFTERNOON_THRESHOLD) {
    return AFTERNOON;
  }
  
  if (hour < EVENING_THRESHOLD) {
    return EVENING;
  }
  
  return NIGHT;
}

/**
 * Telugu locale configuration for moment.js
 */
moment.defineLocale('te', {
  months: 'జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జులై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్'.split('_'),
  monthsShort: 'జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జులై_ఆగ._సెప్._అక్టో._నవ._డిసె.'.split('_'),
  monthsParseExact: true,
  weekdays: 'ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం'.split('_'),
  weekdaysShort: 'ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని'.split('_'),
  weekdaysMin: 'ఆ_సో_మం_బు_గు_శు_శ'.split('_'),
  longDateFormat: {
    LT: 'A h:mm',
    LTS: 'A h:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm',
    LLLL: 'dddd, D MMMM YYYY, A h:mm'
  },
  calendar: {
    sameDay: '[నేడు] LT',
    nextDay: '[రేపు] LT',
    nextWeek: 'dddd, LT',
    lastDay: '[నిన్న] LT',
    lastWeek: '[గత] dddd, LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: '%s లో',
    past: '%s క్రితం',
    s: 'కొన్ని క్షణాలు',
    ss: '%d సెకన్లు',
    m: 'ఒక నిమిషం',
    mm: '%d నిమిషాలు',
    h: 'ఒక గంట',
    hh: '%d గంటలు',
    d: 'ఒక రోజు',
    dd: '%d రోజులు',
    M: 'ఒక నెల',
    MM: '%d నెలలు',
    y: 'ఒక సంవత్సరం',
    yy: '%d సంవత్సరాలు'
  },
  dayOfMonthOrdinalParse: /\d{1,2}వ/,
  ordinal: '%dవ',
  meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,
  meridiemHour,
  meridiem,
  week: {
    dow: 0,
    doy: 6
  }
});

export default moment;