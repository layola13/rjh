import React from 'react';
import type { GenerateConfig } from './generate';
import { createKeyDownHandler } from './utils/uiUtil';
import PanelHeader from './PanelHeader';
import QuarterBody from './QuarterBody';

interface OperationRef {
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => boolean;
}

interface QuarterPanelProps<DateType> {
  prefixCls: string;
  operationRef: React.MutableRefObject<OperationRef | null>;
  onViewDateChange: (date: DateType) => void;
  generateConfig: GenerateConfig<DateType>;
  value: DateType | null;
  viewDate: DateType;
  onPanelChange: (mode: string | null, date: DateType) => void;
  onSelect: (date: DateType, source: 'key' | 'mouse') => void;
}

type SelectSource = 'key' | 'mouse';

export default function QuarterPanel<DateType>(props: QuarterPanelProps<DateType>): React.ReactElement {
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

  const quarterPanelPrefixCls = `${prefixCls}-quarter-panel`;

  operationRef.current = {
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>): boolean => {
      return createKeyDownHandler(event, {
        onLeftRight: (offset: number): void => {
          const MONTHS_PER_QUARTER = 3;
          const newDate = generateConfig.addMonth(value || viewDate, MONTHS_PER_QUARTER * offset);
          onSelect(newDate, 'key');
        },
        onCtrlLeftRight: (offset: number): void => {
          const newDate = generateConfig.addYear(value || viewDate, offset);
          onSelect(newDate, 'key');
        },
        onUpDown: (offset: number): void => {
          const newDate = generateConfig.addYear(value || viewDate, offset);
          onSelect(newDate, 'key');
        }
      });
    }
  };

  const handleYearChange = (yearOffset: number): void => {
    const newViewDate = generateConfig.addYear(viewDate, yearOffset);
    onViewDateChange(newViewDate);
    onPanelChange(null, newViewDate);
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

  const handleQuarterSelect = (date: DateType): void => {
    onSelect(date, 'mouse');
  };

  return (
    <div className={quarterPanelPrefixCls}>
      <PanelHeader
        {...props}
        prefixCls={prefixCls}
        onPrevYear={handlePrevYear}
        onNextYear={handleNextYear}
        onYearClick={handleYearClick}
      />
      <QuarterBody
        {...props}
        prefixCls={prefixCls}
        onSelect={handleQuarterSelect}
      />
    </div>
  );
}