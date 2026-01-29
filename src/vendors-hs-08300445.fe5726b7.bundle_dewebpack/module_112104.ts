import { formatValue } from './format-utils';
import { GenerateConfig } from './generate-config';
import { Locale } from './locale-types';
import { useContext, createElement } from 'react';
import Header from './Header';
import PanelContext from './PanelContext';

interface YearHeaderProps<DateType> {
  prefixCls: string;
  generateConfig: GenerateConfig<DateType>;
  locale: Locale;
  viewDate: DateType;
  onNextYear: () => void;
  onPrevYear: () => void;
  onYearClick: () => void;
}

export default function YearHeader<DateType>(props: YearHeaderProps<DateType>): JSX.Element | null {
  const {
    prefixCls,
    generateConfig,
    locale,
    viewDate,
    onNextYear,
    onPrevYear,
    onYearClick
  } = props;

  const { hideHeader } = useContext(PanelContext);

  if (hideHeader) {
    return null;
  }

  const headerPrefixCls = `${prefixCls}-header`;

  return createElement(
    Header,
    {
      ...props,
      prefixCls: headerPrefixCls,
      onSuperPrev: onPrevYear,
      onSuperNext: onNextYear
    },
    createElement(
      'button',
      {
        type: 'button',
        onClick: onYearClick,
        className: `${prefixCls}-year-btn`
      },
      formatValue(viewDate, {
        locale,
        format: locale.yearFormat,
        generateConfig
      })
    )
  );
}