import moment from 'moment';

interface DurationUnits {
  m: [string, string];
  h: [string, string];
  d: [string, string];
  M: [string, string];
  y: [string, string];
}

/**
 * Returns the appropriate duration text based on whether it's used with or without a number
 * @param value - The numeric value (unused in current implementation)
 * @param withoutSuffix - Whether to use the form without suffix
 * @param unit - The time unit key
 * @param isFuture - Whether it refers to future time (unused in current implementation)
 * @returns The localized duration string
 */
function getDurationText(
  value: number,
  withoutSuffix: boolean,
  unit: keyof DurationUnits,
  isFuture: boolean
): string {
  const units: DurationUnits = {
    m: ['eng Minutt', 'enger Minutt'],
    h: ['eng Stonn', 'enger Stonn'],
    d: ['een Dag', 'engem Dag'],
    M: ['ee Mount', 'engem Mount'],
    y: ['ee Joer', 'engem Joer']
  };
  return withoutSuffix ? units[unit][0] : units[unit][1];
}

/**
 * Checks if a number requires the article "a" (instead of "an") in Luxembourgish
 * @param input - The numeric value or string to check
 * @returns True if the number requires "a" article
 */
function requiresAArticle(input: string | number): boolean {
  const numericValue = typeof input === 'string' ? parseInt(input, 10) : input;
  
  if (isNaN(numericValue)) {
    return false;
  }
  
  if (numericValue < 0) {
    return true;
  }
  
  if (numericValue < 10) {
    return numericValue >= 4 && numericValue <= 7;
  }
  
  if (numericValue < 100) {
    const lastDigit = numericValue % 10;
    return requiresAArticle(lastDigit === 0 ? numericValue / 10 : lastDigit);
  }
  
  if (numericValue < 10000) {
    let reduced = numericValue;
    while (reduced >= 10) {
      reduced /= 10;
    }
    return requiresAArticle(reduced);
  }
  
  return requiresAArticle(numericValue / 1000);
}

moment.defineLocale('lb', {
  months: 'Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
  monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
  monthsParseExact: true,
  weekdays: 'Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg'.split('_'),
  weekdaysShort: 'So._Mé._Dë._Më._Do._Fr._Sa.'.split('_'),
  weekdaysMin: 'So_Mé_Dë_Më_Do_Fr_Sa'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'H:mm [Auer]',
    LTS: 'H:mm:ss [Auer]',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm [Auer]',
    LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]'
  },
  calendar: {
    sameDay: '[Haut um] LT',
    sameElse: 'L',
    nextDay: '[Muer um] LT',
    nextWeek: 'dddd [um] LT',
    lastDay: '[Gëschter um] LT',
    lastWeek: function(this: moment.Moment): string {
      const dayOfWeek = this.day();
      switch (dayOfWeek) {
        case 2:
        case 4:
          return '[Leschten] dddd [um] LT';
        default:
          return '[Leschte] dddd [um] LT';
      }
    }
  },
  relativeTime: {
    future: function(output: string): string {
      const firstWord = output.substring(0, output.indexOf(' '));
      return requiresAArticle(firstWord) ? `a ${output}` : `an ${output}`;
    },
    past: function(output: string): string {
      const firstWord = output.substring(0, output.indexOf(' '));
      return requiresAArticle(firstWord) ? `viru ${output}` : `virun ${output}`;
    },
    s: 'e puer Sekonnen',
    ss: '%d Sekonnen',
    m: getDurationText,
    mm: '%d Minutten',
    h: getDurationText,
    hh: '%d Stonnen',
    d: getDurationText,
    dd: '%d Deeg',
    M: getDurationText,
    MM: '%d Méint',
    y: getDurationText,
    yy: '%d Joer'
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: '%d.',
  week: {
    dow: 1,
    doy: 4
  }
});