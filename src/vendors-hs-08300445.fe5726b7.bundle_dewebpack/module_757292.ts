import React, { useContext } from 'react';
import Header from './Header';
import PanelContext from './PanelContext';
import { formatValue } from './utils';

interface YearHeaderProps<DateType> {
  prefixCls: string;
  generateConfig: GenerateConfig<DateType>;
  locale: Locale;
  viewDate: DateType;
  onNextYear: () => void;
  onPrevYear: () => void;
  onYearClick: () => void;
}

interface GenerateConfig<DateType> {
  // Add specific methods as needed
  [key: string]: unknown;
}

interface Locale {
  yearFormat: string;
  [key: string]: unknown;
}

interface PanelContextType {
  hideHeader?: boolean;
}

function YearHeader<DateType>(props: YearHeaderProps<DateType>): React.ReactElement | null {
  const {
    prefixCls,
    generateConfig,
    locale,
    viewDate,
    onNextYear,
    onPrevYear,
    onYearClick
  } = props;

  const { hideHeader } = useContext<PanelContextType>(PanelContext);

  if (hideHeader) {
    return null;
  }

  const headerPrefixCls = `${prefixCls}-header`;

  return (
    <Header
      {...props}
      prefixCls={headerPrefixCls}
      onSuperPrev={onPrevYear}
      onSuperNext={onNextYear}
    >
      <button
        type="button"
        onClick={onYearClick}
        className={`${prefixCls}-year-btn`}
      >
        {formatValue(viewDate, {
          locale,
          format: locale.yearFormat,
          generateConfig
        })}
      </button>
    </Header>
  );
}

export default YearHeader;