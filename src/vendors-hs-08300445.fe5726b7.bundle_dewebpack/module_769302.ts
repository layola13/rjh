import { useContext, createElement, ReactElement } from 'react';
import Header from './Header';
import PanelContext from './PanelContext';
import { formatValue } from './utils';

interface GenerateConfig<DateType> {
  locale: {
    getWeekFirstDay(locale: string): number;
    getWeekFirstDate(locale: string, date: DateType): DateType;
    getWeek(locale: string, date: DateType): number;
    getShortWeekDays?(locale: string): string[];
    getShortMonths?(locale: string): string[];
    format(locale: string, date: DateType, format: string): string;
    parse(locale: string, text: string, formats: string[]): DateType | null;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface Locale {
  locale: string;
  [key: string]: unknown;
}

interface PickerHeaderProps<DateType> {
  prefixCls: string;
  generateConfig: GenerateConfig<DateType>;
  locale: Locale;
  value: DateType | null;
  format: string;
}

export default function PickerHeader<DateType>({
  prefixCls,
  generateConfig,
  locale,
  value,
  format
}: PickerHeaderProps<DateType>): ReactElement | null {
  const { hideHeader } = useContext(PanelContext);

  if (hideHeader) {
    return null;
  }

  const headerPrefixCls = `${prefixCls}-header`;

  return createElement(
    Header,
    { prefixCls: headerPrefixCls },
    value
      ? formatValue(value, {
          locale,
          format,
          generateConfig
        })
      : ' '
  );
}