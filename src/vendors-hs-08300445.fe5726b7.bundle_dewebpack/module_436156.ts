import dayjs, { Dayjs } from 'dayjs';
import { noteOnce } from './utils';

interface LocaleUtils {
  getWeekFirstDay: (locale: string) => number;
  getWeekFirstDate: (locale: string, date: Dayjs) => Dayjs;
  getWeek: (locale: string, date: Dayjs) => number;
  getShortWeekDays: (locale: string) => string[];
  getShortMonths: (locale: string) => string[];
  format: (locale: string, date: Dayjs, formatString: string) => string;
  parse: (locale: string, dateString: string, formats: string[]) => Dayjs | null;
}

interface DateUtils {
  getNow: () => Dayjs;
  getFixedDate: (date: Dayjs) => string;
  getEndDate: (date: Dayjs) => Dayjs;
  getWeekDay: (date: Dayjs) => number;
  getYear: (date: Dayjs) => number;
  getMonth: (date: Dayjs) => number;
  getDate: (date: Dayjs) => number;
  getHour: (date: Dayjs) => number;
  getMinute: (date: Dayjs) => number;
  getSecond: (date: Dayjs) => number;
  addYear: (date: Dayjs, amount: number) => Dayjs;
  addMonth: (date: Dayjs, amount: number) => Dayjs;
  addDate: (date: Dayjs, amount: number) => Dayjs;
  setYear: (date: Dayjs, year: number) => Dayjs;
  setMonth: (date: Dayjs, month: number) => Dayjs;
  setDate: (date: Dayjs, day: number) => Dayjs;
  setHour: (date: Dayjs, hour: number) => Dayjs;
  setMinute: (date: Dayjs, minute: number) => Dayjs;
  setSecond: (date: Dayjs, second: number) => Dayjs;
  isAfter: (date: Dayjs, compareDate: Dayjs) => boolean;
  isValidate: (date: Dayjs) => boolean;
  locale: LocaleUtils;
}

const dateUtils: DateUtils = {
  getNow(): Dayjs {
    return dayjs();
  },

  getFixedDate(date: Dayjs): string {
    return dayjs(date, 'YYYY-MM-DD');
  },

  getEndDate(date: Dayjs): Dayjs {
    return date.clone().endOf('month');
  },

  getWeekDay(date: Dayjs): number {
    const localeDate = date.clone().locale('en_US');
    return localeDate.weekday() + localeDate.localeData().firstDayOfWeek();
  },

  getYear(date: Dayjs): number {
    return date.year();
  },

  getMonth(date: Dayjs): number {
    return date.month();
  },

  getDate(date: Dayjs): number {
    return date.date();
  },

  getHour(date: Dayjs): number {
    return date.hour();
  },

  getMinute(date: Dayjs): number {
    return date.minute();
  },

  getSecond(date: Dayjs): number {
    return date.second();
  },

  addYear(date: Dayjs, amount: number): Dayjs {
    return date.clone().add(amount, 'year');
  },

  addMonth(date: Dayjs, amount: number): Dayjs {
    return date.clone().add(amount, 'month');
  },

  addDate(date: Dayjs, amount: number): Dayjs {
    return date.clone().add(amount, 'day');
  },

  setYear(date: Dayjs, year: number): Dayjs {
    return date.clone().year(year);
  },

  setMonth(date: Dayjs, month: number): Dayjs {
    return date.clone().month(month);
  },

  setDate(date: Dayjs, day: number): Dayjs {
    return date.clone().date(day);
  },

  setHour(date: Dayjs, hour: number): Dayjs {
    return date.clone().hour(hour);
  },

  setMinute(date: Dayjs, minute: number): Dayjs {
    return date.clone().minute(minute);
  },

  setSecond(date: Dayjs, second: number): Dayjs {
    return date.clone().second(second);
  },

  isAfter(date: Dayjs, compareDate: Dayjs): boolean {
    return date.isAfter(compareDate);
  },

  isValidate(date: Dayjs): boolean {
    return date.isValid();
  },

  locale: {
    getWeekFirstDay(locale: string): number {
      return dayjs().locale(locale).localeData().firstDayOfWeek();
    },

    getWeekFirstDate(locale: string, date: Dayjs): Dayjs {
      return date.clone().locale(locale).weekday(0);
    },

    getWeek(locale: string, date: Dayjs): number {
      return date.clone().locale(locale).week();
    },

    getShortWeekDays(locale: string): string[] {
      return dayjs().locale(locale).localeData().weekdaysMin();
    },

    getShortMonths(locale: string): string[] {
      return dayjs().locale(locale).localeData().monthsShort();
    },

    format(locale: string, date: Dayjs, formatString: string): string {
      return date.clone().locale(locale).format(formatString);
    },

    parse(locale: string, dateString: string, formats: string[]): Dayjs | null {
      const fallbackFormats: string[] = [];

      for (let i = 0; i < formats.length; i += 1) {
        let format = formats[i];
        let parseDateString = dateString;

        if (format.includes('wo') || format.includes('Wo')) {
          format = format.replace(/wo/g, 'w').replace(/Wo/g, 'W');
          const formatTokens = format.match(/[-YyMmDdHhSsWwGg]+/g);
          const dateTokens = parseDateString.match(/[-\d]+/g);

          if (formatTokens && dateTokens) {
            format = formatTokens.join('');
            parseDateString = dateTokens.join('');
          } else {
            fallbackFormats.push(format.replace(/o/g, ''));
          }
        }

        const parsedDate = dayjs(parseDateString, format, locale, true);
        if (parsedDate.isValid()) {
          return parsedDate;
        }
      }

      for (let i = 0; i < fallbackFormats.length; i += 1) {
        const parsedDate = dayjs(dateString, fallbackFormats[i], locale, false);
        if (parsedDate.isValid()) {
          noteOnce(
            false,
            'Not match any format strictly and fallback to fuzzy match. Please help to fire a issue about this.'
          );
          return parsedDate;
        }
      }

      return null;
    },
  },
};

export default dateUtils;