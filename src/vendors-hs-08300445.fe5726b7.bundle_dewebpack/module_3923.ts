import { useCallback } from 'react';
import { getValue } from './utils';
import { isSameDate, getQuarter } from './dateUtils';

interface Locale {
  locale: string;
}

interface GenerateConfig<DateType> {
  getYear(date: DateType): number;
  getMonth(date: DateType): number;
  isAfter(date1: DateType, date2: DateType): boolean;
  locale: {
    getWeekFirstDate(locale: string, date: DateType): DateType;
  };
}

type PickerMode = 'date' | 'week' | 'month' | 'quarter' | 'year';

interface UseRangeDisabledParams<DateType> {
  picker: PickerMode;
  locale: Locale;
  selectedValue: [DateType | null, DateType | null];
  disabledDate?: (date: DateType) => boolean;
  disabled: [boolean, boolean];
  generateConfig: GenerateConfig<DateType>;
}

type DisabledDateChecker<DateType> = (date: DateType) => boolean;

export default function useRangeDisabled<DateType>(
  params: UseRangeDisabledParams<DateType>,
  isStartDisabled: boolean,
  isEndDisabled: boolean
): [DisabledDateChecker<DateType>, DisabledDateChecker<DateType>] {
  const {
    picker,
    locale,
    selectedValue,
    disabledDate,
    disabled,
    generateConfig
  } = params;

  const startDate = getValue(selectedValue, 0);
  const endDate = getValue(selectedValue, 1);

  function getWeekFirstDate(date: DateType): DateType {
    return generateConfig.locale.getWeekFirstDate(locale.locale, date);
  }

  function getYearMonth(date: DateType): number {
    return 100 * generateConfig.getYear(date) + generateConfig.getMonth(date);
  }

  function getYearQuarter(date: DateType): number {
    return 10 * generateConfig.getYear(date) + getQuarter(generateConfig, date);
  }

  const checkStartDisabled = useCallback(
    (date: DateType): boolean => {
      if (disabledDate && disabledDate(date)) {
        return true;
      }

      if (disabled[1] && endDate) {
        return !isSameDate(generateConfig, date, endDate) && generateConfig.isAfter(date, endDate);
      }

      if (isStartDisabled && endDate) {
        switch (picker) {
          case 'quarter':
            return getYearQuarter(date) > getYearQuarter(endDate);
          case 'month':
            return getYearMonth(date) > getYearMonth(endDate);
          case 'week':
            return getWeekFirstDate(date) > getWeekFirstDate(endDate);
          default:
            return !isSameDate(generateConfig, date, endDate) && generateConfig.isAfter(date, endDate);
        }
      }

      return false;
    },
    [disabledDate, disabled[1], endDate, isStartDisabled]
  );

  const checkEndDisabled = useCallback(
    (date: DateType): boolean => {
      if (disabledDate && disabledDate(date)) {
        return true;
      }

      if (disabled[0] && startDate) {
        return !isSameDate(generateConfig, date, endDate) && generateConfig.isAfter(startDate, date);
      }

      if (isEndDisabled && startDate) {
        switch (picker) {
          case 'quarter':
            return getYearQuarter(date) < getYearQuarter(startDate);
          case 'month':
            return getYearMonth(date) < getYearMonth(startDate);
          case 'week':
            return getWeekFirstDate(date) < getWeekFirstDate(startDate);
          default:
            return !isSameDate(generateConfig, date, startDate) && generateConfig.isAfter(startDate, date);
        }
      }

      return false;
    },
    [disabledDate, disabled[0], startDate, isEndDisabled]
  );

  return [checkStartDisabled, checkEndDisabled];
}