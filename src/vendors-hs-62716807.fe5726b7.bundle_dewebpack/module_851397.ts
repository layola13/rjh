import React from 'react';
import { padEnd } from 'lodash';

interface StatisticValueProps {
  value: string | number;
  formatter?: (value: string | number) => React.ReactNode;
  precision?: number;
  decimalSeparator?: string;
  groupSeparator?: string;
  prefixCls: string;
}

export default function StatisticValue({
  value,
  formatter,
  precision,
  decimalSeparator = '.',
  groupSeparator = '',
  prefixCls
}: StatisticValueProps): React.ReactElement {
  let formattedContent: React.ReactNode;

  if (typeof formatter === 'function') {
    formattedContent = formatter(value);
  } else {
    const valueString = String(value);
    const matchResult = valueString.match(/^(-?)(\d*)(\.(\d+))?$/);

    if (matchResult && valueString !== '-') {
      const negativeSign = matchResult[1];
      const integerPart = matchResult[2] || '0';
      let decimalPart = matchResult[4] || '';

      const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);

      if (typeof precision === 'number') {
        decimalPart = padEnd(decimalPart, precision, '0').slice(0, precision);
      }

      const decimalElement = decimalPart ? `${decimalSeparator}${decimalPart}` : '';

      formattedContent = [
        <span
          key="int"
          className={`${prefixCls}-content-value-int`}
        >
          {negativeSign}{formattedInteger}
        </span>,
        decimalElement && (
          <span
            key="decimal"
            className={`${prefixCls}-content-value-decimal`}
          >
            {decimalElement}
          </span>
        )
      ];
    } else {
      formattedContent = valueString;
    }
  }

  return (
    <span className={`${prefixCls}-content-value`}>
      {formattedContent}
    </span>
  );
}