import type { GenerateConfig } from './generate';
import type { Locale } from './interface';
import type { PanelMode, PanelRefProps } from './interface';
import { createKeyDownHandler } from './utils/uiUtil';
import React from 'react';
import Header from './Header';
import YearBody, { YEAR_COL_COUNT } from './YearBody';

export const YEAR_DECADE_COUNT = 10;

type NullableDateType<DateType> = DateType | null | undefined;

interface YearPanelProps<DateType> {
  prefixCls: string;
  operationRef: React.MutableRefObject<PanelRefProps | undefined>;
  onViewDateChange: (date: DateType) => void;
  generateConfig: GenerateConfig<DateType>;
  value: NullableDateType<DateType>;
  viewDate: DateType;
  sourceMode: PanelMode;
  onSelect: (date: DateType, source: 'key' | 'mouse') => void;
  onPanelChange: (mode: PanelMode, date: DateType) => void;
  locale?: Locale;
}

export default function YearPanel<DateType>(props: YearPanelProps<DateType>): React.ReactElement {
  const {
    prefixCls,
    operationRef,
    onViewDateChange,
    generateConfig,
    value,
    viewDate,
    sourceMode,
    onSelect,
    onPanelChange,
  } = props;

  const yearPanelPrefixCls = `${prefixCls}-year-panel`;

  operationRef.current = {
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
      return createKeyDownHandler(event, {
        onLeftRight: (offset: number) => {
          onSelect(generateConfig.addYear(value || viewDate, offset), 'key');
        },
        onCtrlLeftRight: (offset: number) => {
          onSelect(generateConfig.addYear(value || viewDate, offset * YEAR_DECADE_COUNT), 'key');
        },
        onUpDown: (offset: number) => {
          onSelect(generateConfig.addYear(value || viewDate, offset * YEAR_COL_COUNT), 'key');
        },
        onEnter: () => {
          onPanelChange(sourceMode === 'date' ? 'date' : 'month', value || viewDate);
        },
      });
    },
  };

  const handleDecadeChange = (offset: number): void => {
    const newViewDate = generateConfig.addYear(viewDate, 10 * offset);
    onViewDateChange(newViewDate);
    onPanelChange(null as any, newViewDate);
  };

  return (
    <div className={yearPanelPrefixCls}>
      <Header
        {...props}
        prefixCls={prefixCls}
        onPrevDecade={() => {
          handleDecadeChange(-1);
        }}
        onNextDecade={() => {
          handleDecadeChange(1);
        }}
        onDecadeClick={() => {
          onPanelChange('decade', viewDate);
        }}
      />
      <YearBody
        {...props}
        prefixCls={prefixCls}
        onSelect={(date: DateType) => {
          onPanelChange(sourceMode === 'date' ? 'date' : 'month', date);
          onSelect(date, 'mouse');
        }}
      />
    </div>
  );
}