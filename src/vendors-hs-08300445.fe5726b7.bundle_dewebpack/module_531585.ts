interface GenerateConfig<DateType> {
  isInRange(start: DateType | null, end: DateType | null, current: DateType): boolean;
}

interface GetCellClassNamesParams<DateType> {
  cellPrefixCls: string;
  generateConfig: GenerateConfig<DateType>;
  rangedValue: [DateType | null, DateType | null] | null;
  hoverRangedValue: [DateType | null, DateType | null] | null;
  isInView: (date: DateType) => boolean;
  isSameCell: (date1: DateType | null, date2: DateType) => boolean;
  offsetCell: (date: DateType, offset: number) => DateType;
  today: DateType | null;
  value: DateType | null;
}

type ClassNamesRecord = Record<string, boolean>;

function getValue<T>(array: [T, T] | null, index: 0 | 1): T | null {
  return array?.[index] ?? null;
}

function isInRange<DateType>(
  generateConfig: GenerateConfig<DateType>,
  start: DateType | null,
  end: DateType | null,
  current: DateType
): boolean {
  return generateConfig.isInRange(start, end, current);
}

export default function getCellClassNames<DateType>(
  params: GetCellClassNamesParams<DateType>
): (date: DateType) => ClassNamesRecord {
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

  return function(currentDate: DateType): ClassNamesRecord {
    const prevDate = offsetCell(currentDate, -1);
    const nextDate = offsetCell(currentDate, 1);
    
    const rangeStart = getValue(rangedValue, 0);
    const rangeEnd = getValue(rangedValue, 1);
    const hoverStart = getValue(hoverRangedValue, 0);
    const hoverEnd = getValue(hoverRangedValue, 1);
    
    const isInHoverRange = isInRange(generateConfig, hoverStart, hoverEnd, currentDate);

    const isRangeStart = (date: DateType | null): boolean => isSameCell(rangeStart, date);
    const isRangeEnd = (date: DateType | null): boolean => isSameCell(rangeEnd, date);

    const isHoverStart = isSameCell(hoverStart, currentDate);
    const isHoverEnd = isSameCell(hoverEnd, currentDate);
    
    const isHoverEdgeStart = (isInHoverRange || isHoverEnd) && (!isInView(prevDate) || isRangeEnd(prevDate));
    const isHoverEdgeEnd = (isInHoverRange || isHoverStart) && (!isInView(nextDate) || isRangeStart(nextDate));

    const classNames: ClassNamesRecord = {
      [`${cellPrefixCls}-in-view`]: isInView(currentDate),
      [`${cellPrefixCls}-in-range`]: isInRange(generateConfig, rangeStart, rangeEnd, currentDate),
      [`${cellPrefixCls}-range-start`]: isRangeStart(currentDate),
      [`${cellPrefixCls}-range-end`]: isRangeEnd(currentDate),
      [`${cellPrefixCls}-range-start-single`]: isRangeStart(currentDate) && !rangeEnd,
      [`${cellPrefixCls}-range-end-single`]: isRangeEnd(currentDate) && !rangeStart,
      [`${cellPrefixCls}-range-start-near-hover`]: isRangeStart(currentDate) && (isSameCell(prevDate, hoverStart) || isInRange(generateConfig, hoverStart, hoverEnd, prevDate)),
      [`${cellPrefixCls}-range-end-near-hover`]: isRangeEnd(currentDate) && (isSameCell(nextDate, hoverEnd) || isInRange(generateConfig, hoverStart, hoverEnd, nextDate)),
      [`${cellPrefixCls}-range-hover`]: isInHoverRange,
      [`${cellPrefixCls}-range-hover-start`]: isHoverStart,
      [`${cellPrefixCls}-range-hover-end`]: isHoverEnd,
      [`${cellPrefixCls}-range-hover-edge-start`]: isHoverEdgeStart,
      [`${cellPrefixCls}-range-hover-edge-end`]: isHoverEdgeEnd,
      [`${cellPrefixCls}-range-hover-edge-start-near-range`]: isHoverEdgeStart && isSameCell(prevDate, rangeEnd),
      [`${cellPrefixCls}-range-hover-edge-end-near-range`]: isHoverEdgeEnd && isSameCell(nextDate, rangeStart),
      [`${cellPrefixCls}-today`]: isSameCell(today, currentDate),
      [`${cellPrefixCls}-selected`]: isSameCell(value, currentDate)
    };

    return classNames;
  };
}