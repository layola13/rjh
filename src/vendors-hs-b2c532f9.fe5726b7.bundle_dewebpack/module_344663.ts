import moment from 'moment';

interface WeekdaysConfig {
  standalone: string[];
  format: string[];
  isFormat: RegExp;
}

interface LocaleConfig {
  months: string[];
  monthsShort: string[];
  weekdays: WeekdaysConfig;
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
    lastDay: string;
    nextWeek: string;
    lastWeek: string;
    sameElse: string;
  };
  relativeTime: {
    future: (value: string) => string;
    past: (value: string) => string;
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
  };
  dayOfMonthOrdinalParse: RegExp;
  ordinal: (num: number) => string;
  week: {
    dow: number;
    doy: number;
  };
}

moment.defineLocale('ka', {
  months: 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
  monthsShort: 'იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ'.split('_'),
  weekdays: {
    standalone: 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
    format: 'კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს'.split('_'),
    isFormat: /(წინა|შემდეგ)/
  },
  weekdaysShort: 'კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ'.split('_'),
  weekdaysMin: 'კვ_ორ_სა_ოთ_ხუ_პა_შა'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  calendar: {
    sameDay: '[დღეს] LT[-ზე]',
    nextDay: '[ხვალ] LT[-ზე]',
    lastDay: '[გუშინ] LT[-ზე]',
    nextWeek: '[შემდეგ] dddd LT[-ზე]',
    lastWeek: '[წინა] dddd LT-ზე',
    sameElse: 'L'
  },
  relativeTime: {
    future: (value: string): string => {
      return value.replace(/(წამ|წუთ|საათ|წელ|დღ|თვ)(ი|ე)/, (match: string, unit: string, suffix: string): string => {
        return suffix === 'ი' ? `${unit}ში` : `${unit}${suffix}ში`;
      });
    },
    past: (value: string): string => {
      if (/(წამი|წუთი|საათი|დღე|თვე)/.test(value)) {
        return value.replace(/(ი|ე)$/, 'ის წინ');
      }
      if (/წელი/.test(value)) {
        return value.replace(/წელი$/, 'წლის წინ');
      }
      return value;
    },
    s: 'რამდენიმე წამი',
    ss: '%d წამი',
    m: 'წუთი',
    mm: '%d წუთი',
    h: 'საათი',
    hh: '%d საათი',
    d: 'დღე',
    dd: '%d დღე',
    M: 'თვე',
    MM: '%d თვე',
    y: 'წელი',
    yy: '%d წელი'
  },
  dayOfMonthOrdinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
  ordinal: (num: number): string => {
    if (num === 0) {
      return num.toString();
    }
    if (num === 1) {
      return `${num}-ლი`;
    }
    if (num < 20 || (num <= 100 && num % 20 === 0) || num % 100 === 0) {
      return `მე-${num}`;
    }
    return `${num}-ე`;
  },
  week: {
    dow: 1,
    doy: 7
  }
} as LocaleConfig);

export default moment;