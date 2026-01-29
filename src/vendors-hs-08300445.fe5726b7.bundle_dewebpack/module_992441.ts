import { useState } from 'react';

interface PickerValue<DateType> {
  values: [DateType | null, DateType | null] | null;
  picker: 'date' | 'week' | 'month' | 'quarter' | 'year';
  defaultDates: [DateType | null, DateType | null] | null;
  generateConfig: GenerateConfig<DateType>;
}

interface GenerateConfig<DateType> {
  getNow: () => DateType;
  // Add other generate config methods as needed
}

type PickerMode = 'date' | 'week' | 'month' | 'quarter' | 'year';
type ViewDateDistance = 'same' | 'closing' | 'far';

function getValue<T>(values: [T, T] | null | undefined, index: number): T | null {
  return values?.[index] ?? null;
}

function updateValues<T>(
  values: [T | null, T | null] | null,
  value: T | null,
  index: number
): [T | null, T | null] {
  const result: [T | null, T | null] = values ? [...values] : [null, null];
  result[index] = value;
  return result;
}

function isSameDecade<DateType>(
  generateConfig: GenerateConfig<DateType>,
  date1: DateType,
  date2: DateType
): boolean {
  // Implementation needed
  return false;
}

function isSameYear<DateType>(
  generateConfig: GenerateConfig<DateType>,
  date1: DateType,
  date2: DateType
): boolean {
  // Implementation needed
  return false;
}

function isSameMonth<DateType>(
  generateConfig: GenerateConfig<DateType>,
  date1: DateType,
  date2: DateType
): boolean {
  // Implementation needed
  return false;
}

function getClosingViewDate<DateType>(
  date: DateType,
  mode: PickerMode,
  generateConfig: GenerateConfig<DateType>,
  offset: number
): DateType {
  // Implementation needed
  return date;
}

function getViewDateDistance<DateType>(
  startDate: DateType,
  endDate: DateType,
  mode: PickerMode,
  generateConfig: GenerateConfig<DateType>
): ViewDateDistance {
  const closingDate = getClosingViewDate(startDate, mode, generateConfig, 1);

  function checkDistance(
    compareFn: (date1: DateType, date2: DateType) => boolean
  ): ViewDateDistance {
    if (compareFn(startDate, endDate)) return 'same';
    if (compareFn(closingDate, endDate)) return 'closing';
    return 'far';
  }

  switch (mode) {
    case 'year':
      return checkDistance((date1, date2) => isSameDecade(generateConfig, date1, date2));
    case 'quarter':
    case 'month':
      return checkDistance((date1, date2) => isSameYear(generateConfig, date1, date2));
    default:
      return checkDistance((date1, date2) => isSameMonth(generateConfig, date1, date2));
  }
}

function calculateDefaultViewDate<DateType>(
  values: [DateType | null, DateType | null] | null,
  index: number,
  mode: PickerMode,
  generateConfig: GenerateConfig<DateType>
): DateType | null {
  const startValue = getValue(values, 0);
  const endValue = getValue(values, 1);

  if (index === 0) return startValue;

  if (startValue && endValue) {
    const distance = getViewDateDistance(startValue, endValue, mode, generateConfig);

    switch (distance) {
      case 'same':
      case 'closing':
        return startValue;
      default:
        return getClosingViewDate(endValue, mode, generateConfig, -1);
    }
  }

  return startValue;
}

export default function useRangeViewDates<DateType>(
  props: PickerValue<DateType>
): [
  (index: number) => DateType,
  (viewDate: DateType | null, index: number) => void
] {
  const { values, picker, defaultDates, generateConfig } = props;

  const [internalViewDates, setInternalViewDates] = useState<[DateType | null, DateType | null]>(
    () => [getValue(defaultDates, 0), getValue(defaultDates, 1)]
  );

  const [userViewDates, setUserViewDates] = useState<[DateType | null, DateType | null] | null>(null);

  const startValue = getValue(values, 0);
  const endValue = getValue(values, 1);

  const getViewDate = (index: number): DateType => {
    if (internalViewDates[index]) {
      return internalViewDates[index]!;
    }

    const userViewDate = getValue(userViewDates, index);
    if (userViewDate) {
      return userViewDate;
    }

    const calculatedDate = calculateDefaultViewDate(values, index, picker, generateConfig);
    if (calculatedDate) {
      return calculatedDate;
    }

    return startValue ?? endValue ?? generateConfig.getNow();
  };

  const setViewDate = (viewDate: DateType | null, index: number): void => {
    if (viewDate) {
      let updatedUserViewDates = updateValues(userViewDates, viewDate, index);
      setInternalViewDates(updateValues(internalViewDates, null, index) ?? [null, null]);

      const oppositeIndex = (index + 1) % 2;
      if (!getValue(values, oppositeIndex)) {
        updatedUserViewDates = updateValues(updatedUserViewDates, viewDate, oppositeIndex);
      }

      setUserViewDates(updatedUserViewDates);
    } else if (startValue || endValue) {
      setUserViewDates(null);
    }
  };

  return [getViewDate, setViewDate];
}