/**
 * Utility module for generating CSS class names for date picker cells based on their state
 * (selected, hovered, in-range, etc.)
 */

/**
 * Generic date type that can be used with the date picker
 */
type DateType = any;

/**
 * Configuration object for generating and manipulating dates
 */
interface GenerateConfig<T = DateType> {
  // Add specific methods based on your date library (e.g., dayjs, moment)
  [key: string]: any;
}

/**
 * Ranged value tuple containing start and end dates
 */
type RangedValue<T = DateType> = readonly [T | null, T | null] | null;

/**
 * Parameters for the cell class name generator factory
 */
interface CellClassNameParams<T = DateType> {
  /** CSS class prefix for cells */
  cellPrefixCls: string;
  /** Date generation and manipulation configuration */
  generateConfig: GenerateConfig<T>;
  /** Currently selected date range */
  rangedValue: RangedValue<T>;
  /** Date range being hovered over */
  hoverRangedValue: RangedValue<T>;
  /** Check if a date is in the current view */
  isInView: (date: T) => boolean;
  /** Check if two dates represent the same cell */
  isSameCell: (date1: T | null, date2: T | null) => boolean;
  /** Get a date offset by a specific number of cells */
  offsetCell: (date: T, offset: number) => T;
  /** Today's date */
  today: T;
  /** Currently selected single date value */
  value: T | null;
}

/**
 * CSS class names object for a date picker cell
 */
type CellClassNames = Record<string, boolean>;

/**
 * Helper function to get value from ranged value tuple
 */
declare function getValue<T>(rangedValue: RangedValue<T>, index: 0 | 1): T | null;

/**
 * Helper function to check if a date is within a range
 */
declare function isInRange<T>(
  generateConfig: GenerateConfig<T>,
  start: T | null,
  end: T | null,
  target: T
): boolean;

/**
 * Creates a function that generates CSS class names for date picker cells based on their state.
 * Handles selection states, hover states, range states, and edge cases.
 *
 * @param params - Configuration parameters for cell class name generation
 * @returns A function that takes a date and returns an object of CSS class names
 *
 * @example
 * const getCellClassNames = createCellClassNameGenerator({
 *   cellPrefixCls: 'rc-picker-cell',
 *   generateConfig: dayjsGenerateConfig,
 *   rangedValue: [startDate, endDate],
 *   hoverRangedValue: [hoverStart, hoverEnd],
 *   isInView: (date) => isCurrentMonth(date),
 *   isSameCell: (a, b) => isSameDay(a, b),
 *   offsetCell: (date, offset) => date.add(offset, 'day'),
 *   today: dayjs(),
 *   value: selectedDate
 * });
 *
 * const classNames = getCellClassNames(someDate);
 * // Returns: { 'rc-picker-cell-in-view': true, 'rc-picker-cell-selected': false, ... }
 */
export default function createCellClassNameGenerator<T = DateType>(
  params: CellClassNameParams<T>
): (date: T) => CellClassNames {
  const {
    cellPrefixCls,
    generateConfig,
    rangedValue,
    hoverRangedValue,
    isInView,
    isSameCell,
    offsetCell,
    today,
    value
  } = params;

  return (date: T): CellClassNames => {
    const previousDate = offsetCell(date, -1);
    const nextDate = offsetCell(date, 1);

    const rangeStartDate = getValue(rangedValue, 0);
    const rangeEndDate = getValue(rangedValue, 1);
    const hoverStartDate = getValue(hoverRangedValue, 0);
    const hoverEndDate = getValue(hoverRangedValue, 1);

    const isInHoverRange = isInRange(generateConfig, hoverStartDate, hoverEndDate, date);

    /** Check if the given date is the range start */
    const isRangeStart = (checkDate: T | null): boolean => {
      return isSameCell(rangeStartDate, checkDate);
    };

    /** Check if the given date is the range end */
    const isRangeEnd = (checkDate: T | null): boolean => {
      return isSameCell(rangeEndDate, checkDate);
    };

    const isCurrentDateHoverStart = isSameCell(hoverStartDate, date);
    const isCurrentDateHoverEnd = isSameCell(hoverEndDate, date);

    const isHoverEdgeStart =
      (isInHoverRange || isCurrentDateHoverEnd) &&
      (!isInView(previousDate) || isRangeEnd(previousDate));

    const isHoverEdgeEnd =
      (isInHoverRange || isCurrentDateHoverStart) &&
      (!isInView(nextDate) || isRangeStart(nextDate));

    const classNames: CellClassNames = {
      [`${cellPrefixCls}-in-view`]: isInView(date),
      [`${cellPrefixCls}-in-range`]: isInRange(generateConfig, rangeStartDate, rangeEndDate, date),
      [`${cellPrefixCls}-range-start`]: isRangeStart(date),
      [`${cellPrefixCls}-range-end`]: isRangeEnd(date),
      [`${cellPrefixCls}-range-start-single`]: isRangeStart(date) && !rangeEndDate,
      [`${cellPrefixCls}-range-end-single`]: isRangeEnd(date) && !rangeStartDate,
      [`${cellPrefixCls}-range-start-near-hover`]:
        isRangeStart(date) &&
        (isSameCell(previousDate, hoverStartDate) ||
          isInRange(generateConfig, hoverStartDate, hoverEndDate, previousDate)),
      [`${cellPrefixCls}-range-end-near-hover`]:
        isRangeEnd(date) &&
        (isSameCell(nextDate, hoverEndDate) ||
          isInRange(generateConfig, hoverStartDate, hoverEndDate, nextDate)),
      [`${cellPrefixCls}-range-hover`]: isInHoverRange,
      [`${cellPrefixCls}-range-hover-start`]: isCurrentDateHoverStart,
      [`${cellPrefixCls}-range-hover-end`]: isCurrentDateHoverEnd,
      [`${cellPrefixCls}-range-hover-edge-start`]: isHoverEdgeStart,
      [`${cellPrefixCls}-range-hover-edge-end`]: isHoverEdgeEnd,
      [`${cellPrefixCls}-range-hover-edge-start-near-range`]:
        isHoverEdgeStart && isSameCell(previousDate, rangeEndDate),
      [`${cellPrefixCls}-range-hover-edge-end-near-range`]:
        isHoverEdgeEnd && isSameCell(nextDate, rangeStartDate),
      [`${cellPrefixCls}-today`]: isSameCell(today, date),
      [`${cellPrefixCls}-selected`]: isSameCell(value, date)
    };

    return classNames;
  };
}