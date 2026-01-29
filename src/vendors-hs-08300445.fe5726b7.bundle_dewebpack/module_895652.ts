import React, { useContext } from 'react';
import classNames from 'classnames';
import PanelContext from './PanelContext';
import { getCellDateDisabled } from './dateUtils';
import { getLastDay } from './timeUtils';

type PickerMode = 'date' | 'week' | 'month' | 'quarter' | 'year';

interface GenerateConfig<DateType> {
  locale: {
    getWeekFirstDay(locale: string): number;
    getWeek(locale: string, date: DateType): number;
  };
  getNow(): DateType;
  getFixedDate(string: string): DateType;
  getEndDate(date: DateType): DateType;
  getYear(date: DateType): number;
  getMonth(date: DateType): number;
  getDate(date: DateType): number;
  getHour(date: DateType): number;
  getMinute(date: DateType): number;
  getSecond(date: DateType): number;
  addYear(date: DateType, diff: number): DateType;
  addMonth(date: DateType, diff: number): DateType;
  addDate(date: DateType, diff: number): DateType;
  setYear(date: DateType, year: number): DateType;
  setMonth(date: DateType, month: number): DateType;
  setDate(date: DateType, date: number): DateType;
  setHour(date: DateType, hour: number): DateType;
  setMinute(date: DateType, minute: number): DateType;
  setSecond(date: DateType, second: number): DateType;
  isAfter(date1: DateType, date2: DateType): boolean;
  isValidate(date: DateType): boolean;
}

interface PanelBodyProps<DateType> {
  prefixCls: string;
  disabledDate?: (date: DateType) => boolean;
  onSelect: (date: DateType) => void;
  picker: PickerMode;
  rowNum: number;
  colNum: number;
  prefixColumn?: (date: DateType) => React.ReactNode;
  rowClassName?: (date: DateType) => string;
  baseDate: DateType;
  getCellClassName: (date: DateType) => Record<string, boolean>;
  getCellText: (date: DateType) => string | number;
  getCellNode?: (date: DateType) => React.ReactNode;
  getCellDate: (baseDate: DateType, offset: number) => DateType;
  generateConfig: GenerateConfig<DateType>;
  titleCell?: (date: DateType) => string;
  headerCells?: React.ReactNode;
}

export default function PanelBody<DateType>(props: PanelBodyProps<DateType>): React.ReactElement {
  const {
    prefixCls,
    disabledDate,
    onSelect,
    picker,
    rowNum,
    colNum,
    prefixColumn,
    rowClassName,
    baseDate,
    getCellClassName,
    getCellText,
    getCellNode,
    getCellDate,
    generateConfig,
    titleCell,
    headerCells,
  } = props;

  const { onDateMouseEnter, onDateMouseLeave, mode } = useContext(PanelContext);

  const cellPrefixCls = `${prefixCls}-cell`;
  const rows: React.ReactNode[] = [];

  for (let rowIndex = 0; rowIndex < rowNum; rowIndex += 1) {
    const cells: React.ReactNode[] = [];
    let rowStartDate: DateType | undefined;

    for (let colIndex = 0; colIndex < colNum; colIndex += 1) {
      const offset = rowIndex * colNum + colIndex;
      const cellDate = getCellDate(baseDate, offset);
      const isDisabled = getCellDateDisabled({
        cellDate,
        mode,
        disabledDate,
        generateConfig,
      });

      if (colIndex === 0) {
        rowStartDate = cellDate;
        if (prefixColumn) {
          cells.push(prefixColumn(rowStartDate));
        }
      }

      const title = titleCell?.(cellDate);
      const cellText = getCellText(cellDate);
      const isStartCell = cellText === 1 || (picker === 'year' && Number(title) % 10 === 0);
      const isEndCell =
        title === getLastDay(generateConfig, cellDate) ||
        (picker === 'year' && Number(title) % 10 === 9);

      const cellClassNames = classNames(
        cellPrefixCls,
        {
          [`${cellPrefixCls}-disabled`]: isDisabled,
          [`${cellPrefixCls}-start`]: isStartCell,
          [`${cellPrefixCls}-end`]: isEndCell,
        },
        getCellClassName(cellDate)
      );

      const handleClick = (): void => {
        if (!isDisabled) {
          onSelect(cellDate);
        }
      };

      const handleMouseEnter = (): void => {
        if (!isDisabled && onDateMouseEnter) {
          onDateMouseEnter(cellDate);
        }
      };

      const handleMouseLeave = (): void => {
        if (!isDisabled && onDateMouseLeave) {
          onDateMouseLeave(cellDate);
        }
      };

      const cellContent = getCellNode ? (
        getCellNode(cellDate)
      ) : (
        <div className={`${cellPrefixCls}-inner`}>{cellText}</div>
      );

      cells.push(
        <td
          key={colIndex}
          title={title}
          className={cellClassNames}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {cellContent}
        </td>
      );
    }

    const rowClass = rowClassName && rowStartDate ? rowClassName(rowStartDate) : undefined;
    rows.push(
      <tr key={rowIndex} className={rowClass}>
        {cells}
      </tr>
    );
  }

  return (
    <div className={`${prefixCls}-body`}>
      <table className={`${prefixCls}-content`}>
        {headerCells && (
          <thead>
            <tr>{headerCells}</tr>
          </thead>
        )}
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}