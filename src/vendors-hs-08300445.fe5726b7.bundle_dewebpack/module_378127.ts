import React from 'react';
import MonthBody from './MonthBody';
import MonthHeader from './MonthHeader';
import { createKeyDownHandler } from '../utils/keyboardHandler';

export const MONTH_COL_COUNT = 3;

interface GenerateConfig<DateType> {
  addMonth(date: DateType, offset: number): DateType;
  addYear(date: DateType, offset: number): DateType;
}

interface OperationRef {
  onKeyDown: (event: React.KeyboardEvent) => boolean;
}

type PanelMode = 'date' | 'month' | 'year' | null;
type SelectSource = 'key' | 'mouse';

interface MonthPanelProps<DateType> {
  prefixCls: string;
  operationRef: React.MutableRefObject<OperationRef>;
  onViewDateChange: (date: DateType) => void;
  generateConfig: GenerateConfig<DateType>;
  value: DateType;
  viewDate: DateType;
  onPanelChange: (mode: PanelMode, date: DateType) => void;
  onSelect: (date: DateType, source: SelectSource) => void;
}

function MonthPanel<DateType>(props: MonthPanelProps<DateType>): React.ReactElement {
  const {
    prefixCls,
    operationRef,
    onViewDateChange,
    generateConfig,
    value,
    viewDate,
    onPanelChange,
    onSelect
  } = props;

  const panelPrefixCls = `${prefixCls}-month-panel`;

  operationRef.current = {
    onKeyDown: (event: React.KeyboardEvent): boolean => {
      return createKeyDownHandler(event, {
        onLeftRight: (offset: number): void => {
          onSelect(generateConfig.addMonth(value || viewDate, offset), 'key');
        },
        onCtrlLeftRight: (offset: number): void => {
          onSelect(generateConfig.addYear(value || viewDate, offset), 'key');
        },
        onUpDown: (offset: number): void => {
          onSelect(generateConfig.addMonth(value || viewDate, offset * MONTH_COL_COUNT), 'key');
        },
        onEnter: (): void => {
          onPanelChange('date', value || viewDate);
        }
      });
    }
  };

  const handleYearChange = (yearOffset: number): void => {
    const newDate = generateConfig.addYear(viewDate, yearOffset);
    onViewDateChange(newDate);
    onPanelChange(null, newDate);
  };

  const handlePrevYear = (): void => {
    handleYearChange(-1);
  };

  const handleNextYear = (): void => {
    handleYearChange(1);
  };

  const handleYearClick = (): void => {
    onPanelChange('year', viewDate);
  };

  const handleMonthSelect = (selectedDate: DateType): void => {
    onSelect(selectedDate, 'mouse');
    onPanelChange('date', selectedDate);
  };

  return (
    <div className={panelPrefixCls}>
      <MonthHeader
        {...props}
        prefixCls={prefixCls}
        onPrevYear={handlePrevYear}
        onNextYear={handleNextYear}
        onYearClick={handleYearClick}
      />
      <MonthBody
        {...props}
        prefixCls={prefixCls}
        onSelect={handleMonthSelect}
      />
    </div>
  );
}

export default MonthPanel;