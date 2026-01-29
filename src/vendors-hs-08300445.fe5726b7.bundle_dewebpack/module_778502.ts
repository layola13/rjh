import { ReactElement, ReactNode, useContext, createElement } from 'react';
import Header from './Header';
import { PickerPanelContext } from './PickerPanelContext';
import { formatValue } from './utils';

interface Locale {
  locale: string;
  shortMonths?: string[];
  monthFormat?: string;
  yearFormat: string;
  monthBeforeYear?: boolean;
}

interface LocaleConfig {
  getShortMonths?: (locale: string) => string[];
}

interface GenerateConfig<DateType> {
  locale: LocaleConfig;
  getMonth: (date: DateType) => number;
}

interface MonthHeaderProps<DateType> {
  prefixCls: string;
  generateConfig: GenerateConfig<DateType>;
  locale: Locale;
  viewDate: DateType;
  onNextMonth: () => void;
  onPrevMonth: () => void;
  onNextYear: () => void;
  onPrevYear: () => void;
  onYearClick: () => void;
  onMonthClick: () => void;
}

export default function MonthHeader<DateType>(props: MonthHeaderProps<DateType>): ReactElement | null {
  const {
    prefixCls,
    generateConfig,
    locale,
    viewDate,
    onNextMonth,
    onPrevMonth,
    onNextYear,
    onPrevYear,
    onYearClick,
    onMonthClick
  } = props;

  const { hideHeader } = useContext(PickerPanelContext);

  if (hideHeader) {
    return null;
  }

  const headerPrefixCls = `${prefixCls}-header`;
  const shortMonths = locale.shortMonths || 
    (generateConfig.locale.getShortMonths?.(locale.locale) ?? []);
  const currentMonth = generateConfig.getMonth(viewDate);

  const yearButton = createElement('button', {
    type: 'button',
    key: 'year',
    onClick: onYearClick,
    tabIndex: -1,
    className: `${prefixCls}-year-btn`
  }, formatValue(viewDate, {
    locale,
    format: locale.yearFormat,
    generateConfig
  }));

  const monthButton = createElement('button', {
    type: 'button',
    key: 'month',
    onClick: onMonthClick,
    tabIndex: -1,
    className: `${prefixCls}-month-btn`
  }, locale.monthFormat 
    ? formatValue(viewDate, {
        locale,
        format: locale.monthFormat,
        generateConfig
      })
    : shortMonths[currentMonth]
  );

  const headerNodes: ReactNode[] = locale.monthBeforeYear 
    ? [monthButton, yearButton] 
    : [yearButton, monthButton];

  return createElement(Header, {
    ...props,
    prefixCls: headerPrefixCls,
    onSuperPrev: onPrevYear,
    onPrev: onPrevMonth,
    onNext: onNextMonth,
    onSuperNext: onNextYear
  }, headerNodes);
}