import type { GenerateConfig } from './generate';
import type { Locale } from './interface';
import type { PanelSharedProps } from './WeekPanel';
import React from 'react';
import classNames from 'classnames';
import DatePanel from './DatePanel';
import { isSameWeek } from './utils/dateUtil';

interface WeekPanelProps<DateType> extends PanelSharedProps<DateType> {
  prefixCls: string;
  generateConfig: GenerateConfig<DateType>;
  locale: Locale;
  value?: DateType | null;
}

export default function WeekPanel<DateType>(props: WeekPanelProps<DateType>): React.ReactElement {
  const { prefixCls, generateConfig, locale, value } = props;
  
  const cellClassName = `${prefixCls}-cell`;
  const rowClassName = `${prefixCls}-week-panel-row`;

  const renderPrefixColumn = (date: DateType): React.ReactElement => {
    return (
      <td 
        key="week" 
        className={classNames(cellClassName, `${cellClassName}-week`)}
      >
        {generateConfig.locale.getWeek(locale.locale, date)}
      </td>
    );
  };

  const getRowClassName = (date: DateType): string => {
    return classNames(rowClassName, {
      [`${rowClassName}-selected`]: isSameWeek(generateConfig, locale.locale, value, date)
    });
  };

  return (
    <DatePanel
      {...props}
      panelName="week"
      prefixColumn={renderPrefixColumn}
      rowClassName={getRowClassName}
      keyboardConfig={{
        onLeftRight: null
      }}
    />
  );
}