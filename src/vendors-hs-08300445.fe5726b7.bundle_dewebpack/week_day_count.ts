export const WEEK_DAY_COUNT = 7;

interface GenerateConfig<DateType = any> {
  locale: {
    format: (locale: string, date: DateType, format: string) => string;
    parse: (locale: string, text: string, formats: string[]) => DateType | null;
    getWeek: (locale: string, date: DateType) => number;
    getWeekFirstDay: (locale: string) => number;
  };
  getYear: (date: DateType) => number;
  setYear: (date: DateType, year: number) => DateType;
  getMonth: (date: DateType) => number;
  setMonth: (date: DateType, month: number) => DateType;
  getDate: (date: DateType) => number;
  setDate: (date: DateType, date: number) => DateType;
  getEndDate: (date: DateType) => DateType;
  getWeekDay: (date: DateType) => number;
  getHour: (date: DateType) => number;
  getMinute: (date: DateType) => number;
  getSecond: (date: DateType) => number;
  addYear: (date: DateType, diff: number) => DateType;
  addMonth: (date: DateType, diff: number) => DateType;
  addDate: (date: DateType, diff: number) => DateType;
  isAfter: (date: DateType, compareDate: DateType) => boolean;
}

interface Locale {
  locale: string;
  DECADE_UNIT_DIFF: number;
}

interface FormatValueOptions<DateType> {
  generateConfig: GenerateConfig<DateType>;
  locale: Locale;
  format: string | ((date: DateType) => string);
}

interface ParseValueOptions<DateType> {
  generateConfig: GenerateConfig<DateType>;
  locale: Locale;
  formatList: Array<string | ((date: DateType) => string)>;
}

interface CellDateDisabledOptions<DateType> {
  cellDate: DateType;
  mode: PanelMode;
  disabledDate?: (date: DateType) => boolean;
  generateConfig: GenerateConfig<DateType>;
}

type PanelMode = 'date' | 'week' | 'month' | 'quarter' | 'year' | 'decade';

export function formatValue<DateType>(
  date: DateType,
  options: FormatValueOptions<DateType>
): string {
  const { generateConfig, locale, format } = options;
  return typeof format === 'function'
    ? format(date)
    : generateConfig.locale.format(locale.locale, date, format);
}

export function parseValue<DateType>(
  text: string | null | undefined,
  options: ParseValueOptions<DateType>
): DateType | null {
  const { generateConfig, locale, formatList } = options;
  if (!text || typeof formatList[0] === 'function') return null;
  return generateConfig.locale.parse(locale.locale, text, formatList as string[]);
}

export function getCellDateDisabled<DateType>(
  options: CellDateDisabledOptions<DateType>
): boolean {
  const { cellDate, mode, disabledDate, generateConfig } = options;
  
  if (!disabledDate) return false;

  const checkRange = (
    checkMode: 'date' | 'month' | 'year',
    start: number,
    end: number
  ): boolean => {
    for (let current = start; current <= end; current++) {
      let dateToCheck: DateType;
      
      switch (checkMode) {
        case 'date':
          dateToCheck = generateConfig.setDate(cellDate, current);
          if (!disabledDate(dateToCheck)) return false;
          break;
        case 'month':
          dateToCheck = generateConfig.setMonth(cellDate, current);
          if (!getCellDateDisabled({
            cellDate: dateToCheck,
            mode: 'month',
            generateConfig,
            disabledDate
          })) return false;
          break;
        case 'year':
          dateToCheck = generateConfig.setYear(cellDate, current);
          if (!getCellDateDisabled({
            cellDate: dateToCheck,
            mode: 'year',
            generateConfig,
            disabledDate
          })) return false;
          break;
      }
    }
    return true;
  };

  switch (mode) {
    case 'date':
    case 'week':
      return disabledDate(cellDate);
    case 'month':
      return checkRange('date', 1, generateConfig.getDate(generateConfig.getEndDate(cellDate)));
    case 'quarter': {
      const quarterStartMonth = 3 * Math.floor(generateConfig.getMonth(cellDate) / 3);
      return checkRange('month', quarterStartMonth, quarterStartMonth + 2);
    }
    case 'year':
      return checkRange('month', 0, 11);
    case 'decade': {
      const currentYear = generateConfig.getYear(cellDate);
      const decadeStart = Math.floor(currentYear / options.locale.DECADE_UNIT_DIFF) * options.locale.DECADE_UNIT_DIFF;
      return checkRange('year', decadeStart, decadeStart + options.locale.DECADE_UNIT_DIFF - 1);
    }
  }
}

export function getClosingViewDate<DateType>(
  date: DateType,
  mode: PanelMode,
  generateConfig: GenerateConfig<DateType>,
  step: number = 1
): DateType {
  switch (mode) {
    case 'year':
      return generateConfig.addYear(date, 10 * step);
    case 'quarter':
    case 'month':
      return generateConfig.addYear(date, step);
    default:
      return generateConfig.addMonth(date, step);
  }
}

export function getQuarter<DateType>(
  generateConfig: GenerateConfig<DateType>,
  date: DateType
): number {
  return Math.floor(generateConfig.getMonth(date) / 3) + 1;
}

export function getWeekStartDate<DateType>(
  locale: string,
  generateConfig: GenerateConfig<DateType>,
  date: DateType
): DateType {
  const weekFirstDay = generateConfig.locale.getWeekFirstDay(locale);
  const firstDayOfMonth = generateConfig.setDate(date, 1);
  const weekDay = generateConfig.getWeekDay(firstDayOfMonth);
  let weekStartDate = generateConfig.addDate(firstDayOfMonth, weekFirstDay - weekDay);
  
  if (
    generateConfig.getMonth(weekStartDate) === generateConfig.getMonth(date) &&
    generateConfig.getDate(weekStartDate) > 1
  ) {
    weekStartDate = generateConfig.addDate(weekStartDate, -7);
  }
  
  return weekStartDate;
}

export function isNullEqual<DateType>(
  date1: DateType | null | undefined,
  date2: DateType | null | undefined
): boolean | undefined {
  return !date1 && !date2 || !(!date1 || !date2) && undefined;
}

export function isSameYear<DateType>(
  generateConfig: GenerateConfig<DateType>,
  date1: DateType | null | undefined,
  date2: DateType | null | undefined
): boolean {
  const nullCheck = isNullEqual(date1, date2);
  if (typeof nullCheck === 'boolean') return nullCheck;
  return generateConfig.getYear(date1!) === generateConfig.getYear(date2!);
}

export function isSameMonth<DateType>(
  generateConfig: GenerateConfig<DateType>,
  date1: DateType | null | undefined,
  date2: DateType | null | undefined
): boolean {
  const nullCheck = isNullEqual(date1, date2);
  if (typeof nullCheck === 'boolean') return nullCheck;
  return isSameYear(generateConfig, date1, date2) && 
         generateConfig.getMonth(date1!) === generateConfig.getMonth(date2!);
}

export function isSameQuarter<DateType>(
  generateConfig: GenerateConfig<DateType>,
  date1: DateType | null | undefined,
  date2: DateType | null | undefined
): boolean {
  const nullCheck = isNullEqual(date1, date2);
  if (typeof nullCheck === 'boolean') return nullCheck;
  return isSameYear(generateConfig, date1, date2) && 
         getQuarter(generateConfig, date1!) === getQuarter(generateConfig, date2!);
}

export function isSameDate<DateType>(
  generateConfig: GenerateConfig<DateType>,
  date1: DateType | null | undefined,
  date2: DateType | null | undefined
): boolean {
  const nullCheck = isNullEqual(date1, date2);
  if (typeof nullCheck === 'boolean') return nullCheck;
  return generateConfig.getYear(date1!) === generateConfig.getYear(date2!) &&
         generateConfig.getMonth(date1!) === generateConfig.getMonth(date2!) &&
         generateConfig.getDate(date1!) === generateConfig.getDate(date2!);
}

export function isSameTime<DateType>(
  generateConfig: GenerateConfig<DateType>,
  date1: DateType | null | undefined,
  date2: DateType | null | undefined
): boolean {
  const nullCheck = isNullEqual(date1, date2);
  if (typeof nullCheck === 'boolean') return nullCheck;
  return generateConfig.getHour(date1!) === generateConfig.getHour(date2!) &&
         generateConfig.getMinute(date1!) === generateConfig.getMinute(date2!) &&
         generateConfig.getSecond(date1!) === generateConfig.getSecond(date2!);
}

export function isSameWeek<DateType>(
  generateConfig: GenerateConfig<DateType>,
  locale: string,
  date1: DateType | null | undefined,
  date2: DateType | null | undefined
): boolean {
  const nullCheck = isNullEqual(date1, date2);
  if (typeof nullCheck === 'boolean') return nullCheck;
  return generateConfig.locale.getWeek(locale, date1!) === 
         generateConfig.locale.getWeek(locale, date2!);
}

export function isEqual<DateType>(
  generateConfig: GenerateConfig<DateType>,
  date1: DateType | null | undefined,
  date2: DateType | null | undefined
): boolean {
  return isSameDate(generateConfig, date1, date2) && 
         isSameTime(generateConfig, date1, date2);
}

export function isSameDecade<DateType>(
  generateConfig: GenerateConfig<DateType>,
  date1: DateType | null | undefined,
  date2: DateType | null | undefined
): boolean {
  const nullCheck = isNullEqual(date1, date2);
  if (typeof nullCheck === 'boolean') return nullCheck;
  const decade1 = Math.floor(generateConfig.getYear(date1!) / 10);
  const decade2 = Math.floor(generateConfig.getYear(date2!) / 10);
  return decade1 === decade2;
}

export function isInRange<DateType>(
  generateConfig: GenerateConfig<DateType>,
  rangeStart: DateType | null | undefined,
  rangeEnd: DateType | null | undefined,
  current: DateType | null | undefined
): boolean {
  if (!rangeStart || !rangeEnd || !current) return false;
  return !isSameDate(generateConfig, current, rangeStart) &&
         !isSameDate(generateConfig, current, rangeEnd) &&
         generateConfig.isAfter(current, rangeStart) &&
         generateConfig.isAfter(rangeEnd, current);
}