import moment from 'moment';

interface RelativeTimeConfig {
  ss: string;
  mm: string;
  hh: string;
  dd: string;
  ww: string;
  MM: string;
  yy: string;
}

const RELATIVE_TIME_UNITS: RelativeTimeConfig = {
  ss: 'secunde',
  mm: 'minute',
  hh: 'ore',
  dd: 'zile',
  ww: 'săptămâni',
  MM: 'luni',
  yy: 'ani'
};

const PERCENTAGE_THRESHOLD = 100;
const PERCENTAGE_DIVISOR = 100;
const THRESHOLD_TWENTY = 20;

function formatRelativeTime(
  count: number,
  withoutSuffix: boolean,
  unit: keyof RelativeTimeConfig
): string {
  let separator = ' ';
  
  const remainder = count % PERCENTAGE_DIVISOR;
  const isSpecialCase = remainder >= THRESHOLD_TWENTY || 
                        (count >= PERCENTAGE_THRESHOLD && remainder === 0);
  
  if (isSpecialCase) {
    separator = ' de ';
  }
  
  return count + separator + RELATIVE_TIME_UNITS[unit];
}

moment.defineLocale('ro', {
  months: 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
  monthsShort: 'ian._feb._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
  monthsParseExact: true,
  weekdays: 'duminică_luni_marți_miercuri_joi_vineri_sâmbătă'.split('_'),
  weekdaysShort: 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
  weekdaysMin: 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
  longDateFormat: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY H:mm',
    LLLL: 'dddd, D MMMM YYYY H:mm'
  },
  calendar: {
    sameDay: '[azi la] LT',
    nextDay: '[mâine la] LT',
    nextWeek: 'dddd [la] LT',
    lastDay: '[ieri la] LT',
    lastWeek: '[fosta] dddd [la] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'peste %s',
    past: '%s în urmă',
    s: 'câteva secunde',
    ss: formatRelativeTime,
    m: 'un minut',
    mm: formatRelativeTime,
    h: 'o oră',
    hh: formatRelativeTime,
    d: 'o zi',
    dd: formatRelativeTime,
    w: 'o săptămână',
    ww: formatRelativeTime,
    M: 'o lună',
    MM: formatRelativeTime,
    y: 'un an',
    yy: formatRelativeTime
  },
  week: {
    dow: 1,
    doy: 7
  }
});

export default moment;