import React from 'react';

interface StatisticProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  valueStyle?: React.CSSProperties;
  value?: number | string;
  title?: React.ReactNode;
  valueRender?: (node: React.ReactNode) => React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  loading?: boolean;
  direction?: 'ltr' | 'rtl';
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
  decimalSeparator?: string;
  groupSeparator?: string;
}

const Statistic: React.FC<StatisticProps> = (props) => {
  const {
    prefixCls = 'statistic',
    className,
    style,
    valueStyle,
    value = 0,
    title,
    valueRender,
    prefix,
    suffix,
    loading = false,
    direction,
    onMouseEnter,
    onMouseLeave,
    ...restProps
  } = props;

  const formattedValue = React.createElement(StatisticNumber, {
    ...restProps,
    value,
  });

  const classNames = [
    prefixCls,
    direction === 'rtl' ? `${prefixCls}-rtl` : undefined,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {title && (
        <div className={`${prefixCls}-title`}>
          {title}
        </div>
      )}
      <Skeleton paragraph={false} loading={loading}>
        <div style={valueStyle} className={`${prefixCls}-content`}>
          {prefix && (
            <span className={`${prefixCls}-content-prefix`}>
              {prefix}
            </span>
          )}
          {valueRender ? valueRender(formattedValue) : formattedValue}
          {suffix && (
            <span className={`${prefixCls}-content-suffix`}>
              {suffix}
            </span>
          )}
        </div>
      </Skeleton>
    </div>
  );
};

Statistic.defaultProps = {
  decimalSeparator: '.',
  groupSeparator: ',',
  loading: false,
};

export default Statistic;