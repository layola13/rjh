import { useContext, createElement, Context } from 'react';
import { isSameMonth, formatValue } from './utils';
import { useRangeViewDates } from './hooks';
import PanelBody from './PanelBody';

export const MONTH_COL_COUNT = 3;

interface Locale {
  locale: string;
  shortMonths?: string[];
  monthFormat?: string;
}

interface GenerateConfig<DateType> {
  locale: {
    getShortMonths?: (locale: string) => string[];
  };
  setMonth: (date: DateType, month: number) => DateType;
  addMonth: (date: DateType, offset: number) => DateType;
  getMonth: (date: DateType) => number;
}

interface RangeContextValue<DateType> {
  rangedValue?: [DateType | null, DateType | null] | null;
  hoverRangedValue?: [DateType | null, DateType | null] | null;
}

interface MonthBodyProps<DateType> {
  prefixCls: string;
  locale: Locale;
  value?: DateType | null;
  viewDate: DateType;
  generateConfig: GenerateConfig<DateType>;
  monthCellRender?: (date: DateType, locale: Locale) => React.ReactNode;
}

interface PanelBodyProps<DateType> {
  prefixCls: string;
  locale: Locale;
  value?: DateType | null;
  viewDate: DateType;
  generateConfig: GenerateConfig<DateType>;
  monthCellRender?: (date: DateType, locale: Locale) => React.ReactNode;
  rowNum: number;
  colNum: number;
  baseDate: DateType;
  getCellNode?: (date: DateType) => React.ReactNode;
  getCellText: (date: DateType) => string;
  getCellClassName: (date: DateType) => string;
  getCellDate: (date: DateType, offset: number) => DateType;
  titleCell: (date: DateType) => string;
}

declare const RangeContext: Context<RangeContextValue<any>>;

export default function MonthBody<DateType>(props: MonthBodyProps<DateType>): JSX.Element {
  const {
    prefixCls,
    locale,
    value,
    viewDate,
    generateConfig,
    monthCellRender,
  } = props;

  const rangeContext = useContext<RangeContextValue<DateType>>(RangeContext);
  const { rangedValue, hoverRangedValue } = rangeContext;

  const cellPrefixCls = `${prefixCls}-cell`;

  const getCellClassName = useRangeViewDates<DateType>({
    cellPrefixCls,
    value,
    generateConfig,
    rangedValue,
    hoverRangedValue,
    isSameCell: (current: DateType, target: DateType): boolean => {
      return isSameMonth(generateConfig, current, target);
    },
    isInView: (): boolean => {
      return true;
    },
    offsetCell: (date: DateType, offset: number): DateType => {
      return generateConfig.addMonth(date, offset);
    },
  });

  const shortMonths: string[] =
    locale.shortMonths ??
    (generateConfig.locale.getShortMonths
      ? generateConfig.locale.getShortMonths(locale.locale)
      : []);

  const baseDate = generateConfig.setMonth(viewDate, 0);

  const getCellNode = monthCellRender
    ? (date: DateType): React.ReactNode => monthCellRender(date, locale)
    : undefined;

  return createElement<PanelBodyProps<DateType>>(PanelBody, {
    ...props,
    rowNum: 4,
    colNum: MONTH_COL_COUNT,
    baseDate,
    getCellNode,
    getCellText: (date: DateType): string => {
      if (locale.monthFormat) {
        return formatValue(date, {
          locale,
          format: locale.monthFormat,
          generateConfig,
        });
      }
      return shortMonths[generateConfig.getMonth(date)];
    },
    getCellClassName,
    getCellDate: generateConfig.addMonth,
    titleCell: (date: DateType): string => {
      return formatValue(date, {
        locale,
        format: 'YYYY-MM',
        generateConfig,
      });
    },
  });
}