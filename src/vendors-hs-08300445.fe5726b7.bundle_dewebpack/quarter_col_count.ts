import { useContext, createElement, Context } from 'react';
import { isSameQuarter, formatValue } from './utils';
import PanelContext from './PanelContext';
import useCellClassName from './hooks/useCellClassName';
import PanelBody from './PanelBody';

export const QUARTER_COL_COUNT = 4;

interface GenerateConfig<DateType> {
  setDate(date: DateType, dayOfMonth: number): DateType;
  setMonth(date: DateType, month: number): DateType;
  addMonth(date: DateType, offset: number): DateType;
}

interface Locale {
  quarterFormat?: string;
  [key: string]: unknown;
}

interface RangedValue<DateType> {
  start?: DateType | null;
  end?: DateType | null;
}

interface PanelContextValue<DateType> {
  rangedValue?: RangedValue<DateType> | null;
  hoverRangedValue?: RangedValue<DateType> | null;
}

interface QuarterBodyProps<DateType> {
  prefixCls: string;
  locale: Locale;
  value?: DateType | null;
  viewDate: DateType;
  generateConfig: GenerateConfig<DateType>;
}

export default function QuarterBody<DateType>(props: QuarterBodyProps<DateType>): JSX.Element {
  const { prefixCls, locale, value, viewDate, generateConfig } = props;
  
  const context = useContext<PanelContextValue<DateType>>(PanelContext as Context<PanelContextValue<DateType>>);
  const { rangedValue, hoverRangedValue } = context;
  
  const cellPrefixCls = `${prefixCls}-cell`;
  
  const getCellClassName = useCellClassName({
    cellPrefixCls,
    value,
    generateConfig,
    rangedValue,
    hoverRangedValue,
    isSameCell: (date1: DateType, date2: DateType): boolean => {
      return isSameQuarter(generateConfig, date1, date2);
    },
    isInView: (): boolean => {
      return true;
    },
    offsetCell: (date: DateType, offset: number): DateType => {
      return generateConfig.addMonth(date, 3 * offset);
    }
  });
  
  const baseDate = generateConfig.setDate(generateConfig.setMonth(viewDate, 0), 1);
  
  return createElement(PanelBody, {
    ...props,
    rowNum: 1,
    colNum: QUARTER_COL_COUNT,
    baseDate,
    getCellText: (date: DateType): string => {
      return formatValue(date, {
        locale,
        format: locale.quarterFormat || '[Q]Q',
        generateConfig
      });
    },
    getCellClassName,
    getCellDate: (date: DateType, offset: number): DateType => {
      return generateConfig.addMonth(date, 3 * offset);
    },
    titleCell: (date: DateType): string => {
      return formatValue(date, {
        locale,
        format: 'YYYY-[Q]Q',
        generateConfig
      });
    }
  });
}