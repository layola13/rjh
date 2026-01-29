import moment from 'moment';

interface DigitMap {
  [key: string]: string;
}

const ARABIC_TO_KANNADA_DIGITS: DigitMap = {
  '1': '೧',
  '2': '೨',
  '3': '೩',
  '4': '೪',
  '5': '೫',
  '6': '೬',
  '7': '೭',
  '8': '೮',
  '9': '೯',
  '0': '೦'
};

const KANNADA_TO_ARABIC_DIGITS: DigitMap = {
  '೧': '1',
  '೨': '2',
  '೩': '3',
  '೪': '4',
  '೫': '5',
  '೬': '6',
  '೭': '7',
  '೮': '8',
  '೯': '9',
  '೦': '0'
};

const NIGHT_START_HOUR = 4;
const MORNING_START_HOUR = 10;
const AFTERNOON_START_HOUR = 17;
const EVENING_START_HOUR = 20;
const NOON_HOUR = 12;

/**
 * Converts Kannada numerals to Arabic numerals
 */
function kannadaToArabic(text: string): string {
  return text.replace(/[೧೨೩೪೫೬೭೮೯೦]/g, (match: string): string => {
    return KANNADA_TO_ARABIC_DIGITS[match] ?? match;
  });
}

/**
 * Converts Arabic numerals to Kannada numerals
 */
function arabicToKannada(text: string): string {
  return text.replace(/\d/g, (match: string): string => {
    return ARABIC_TO_KANNADA_DIGITS[match] ?? match;
  });
}

/**
 * Adjusts hour based on meridiem period
 */
function getMeridiemHour(hour: number, meridiem: string): number | undefined {
  let adjustedHour = hour;
  
  if (adjustedHour === NOON_HOUR) {
    adjustedHour = 0;
  }
  
  if (meridiem === 'ರಾತ್ರಿ') {
    return adjustedHour < NIGHT_START_HOUR ? adjustedHour : adjustedHour + NOON_HOUR;
  }
  
  if (meridiem === 'ಬೆಳಿಗ್ಗೆ') {
    return adjustedHour;
  }
  
  if (meridiem === 'ಮಧ್ಯಾಹ್ನ') {
    return adjustedHour >= MORNING_START_HOUR ? adjustedHour : adjustedHour + NOON_HOUR;
  }
  
  if (meridiem === 'ಸಂಜೆ') {
    return adjustedHour + NOON_HOUR;
  }
  
  return undefined;
}

/**
 * Returns the meridiem string based on hour
 */
function getMeridiem(hour: number, minute: number, isLowercase: boolean): string {
  if (hour < NIGHT_START_HOUR) {
    return 'ರಾತ್ರಿ';
  }
  
  if (hour < MORNING_START_HOUR) {
    return 'ಬೆಳಿಗ್ಗೆ';
  }
  
  if (hour < AFTERNOON_START_HOUR) {
    return 'ಮಧ್ಯಾಹ್ನ';
  }
  
  if (hour < EVENING_START_HOUR) {
    return 'ಸಂಜೆ';
  }
  
  return 'ರಾತ್ರಿ';
}

/**
 * Returns ordinal suffix for day of month
 */
function getOrdinal(num: number): string {
  return `${num}ನೇ`;
}

moment.defineLocale('kn', {
  months: 'ಜನವರಿ_ಫೆಬ್ರವರಿ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್_ಅಕ್ಟೋಬರ್_ನವೆಂಬರ್_ಡಿಸೆಂಬರ್'.split('_'),
  monthsShort: 'ಜನ_ಫೆಬ್ರ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂ_ಅಕ್ಟೋ_ನವೆಂ_ಡಿಸೆಂ'.split('_'),
  monthsParseExact: true,
  weekdays: 'ಭಾನುವಾರ_ಸೋಮವಾರ_ಮಂಗಳವಾರ_ಬುಧವಾರ_ಗುರುವಾರ_ಶುಕ್ರವಾರ_ಶನಿವಾರ'.split('_'),
  weekdaysShort: 'ಭಾನು_ಸೋಮ_ಮಂಗಳ_ಬುಧ_ಗುರು_ಶುಕ್ರ_ಶನಿ'.split('_'),
  weekdaysMin: 'ಭಾ_ಸೋ_ಮಂ_ಬು_ಗು_ಶು_ಶ'.split('_'),
  longDateFormat: {
    LT: 'A h:mm',
    LTS: 'A h:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm',
    LLLL: 'dddd, D MMMM YYYY, A h:mm'
  },
  calendar: {
    sameDay: '[ಇಂದು] LT',
    nextDay: '[ನಾಳೆ] LT',
    nextWeek: 'dddd, LT',
    lastDay: '[ನಿನ್ನೆ] LT',
    lastWeek: '[ಕೊನೆಯ] dddd, LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: '%s ನಂತರ',
    past: '%s ಹಿಂದೆ',
    s: 'ಕೆಲವು ಕ್ಷಣಗಳು',
    ss: '%d ಸೆಕೆಂಡುಗಳು',
    m: 'ಒಂದು ನಿಮಿಷ',
    mm: '%d ನಿಮಿಷ',
    h: 'ಒಂದು ಗಂಟೆ',
    hh: '%d ಗಂಟೆ',
    d: 'ಒಂದು ದಿನ',
    dd: '%d ದಿನ',
    M: 'ಒಂದು ತಿಂಗಳು',
    MM: '%d ತಿಂಗಳು',
    y: 'ಒಂದು ವರ್ಷ',
    yy: '%d ವರ್ಷ'
  },
  preparse: kannadaToArabic,
  postformat: arabicToKannada,
  meridiemParse: /ರಾತ್ರಿ|ಬೆಳಿಗ್ಗೆ|ಮಧ್ಯಾಹ್ನ|ಸಂಜೆ/,
  meridiemHour: getMeridiemHour,
  meridiem: getMeridiem,
  dayOfMonthOrdinalParse: /\d{1,2}(ನೇ)/,
  ordinal: getOrdinal,
  week: {
    dow: 0,
    doy: 6
  }
});

export default moment;