import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from './ConfigProvider';

interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  className?: string;
  hoverable?: boolean;
}

const CardGrid: React.FC<CardGridProps> = (props) => {
  const {
    prefixCls,
    className,
    hoverable = true,
    ...restProps
  } = props;

  return (
    <ConfigConsumer>
      {({ getPrefixCls }: ConfigConsumerProps) => {
        const cardPrefixCls = getPrefixCls('card', prefixCls);
        const gridClassName = classNames(
          `${cardPrefixCls}-grid`,
          className,
          {
            [`${cardPrefixCls}-grid-hoverable`]: hoverable
          }
        );

        return (
          <div
            {...restProps}
            className={gridClassName}
          />
        );
      }}
    </ConfigConsumer>
  );
};

export default CardGrid;