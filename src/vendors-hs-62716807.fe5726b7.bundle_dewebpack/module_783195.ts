import React, { useContext, CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import { ConfigContext } from './ConfigContext';

interface TimelineItemProps {
  prefixCls?: string;
  className?: string;
  color?: string;
  dot?: ReactNode;
  pending?: boolean;
  position?: string;
  label?: ReactNode;
  children?: ReactNode;
  style?: CSSProperties;
}

type OmitKeys = 'prefixCls' | 'className' | 'color' | 'dot' | 'pending' | 'position' | 'label' | 'children';

const DEFAULT_COLOR = 'blue';
const STANDARD_COLORS = /blue|red|green|gray/;

function omitProps<T extends Record<string, unknown>>(
  obj: T,
  keysToOmit: string[]
): Omit<T, OmitKeys> {
  const result: Record<string, unknown> = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && keysToOmit.indexOf(key) < 0) {
      result[key] = obj[key];
    }
  }
  
  if (obj != null && typeof Object.getOwnPropertySymbols === 'function') {
    const symbols = Object.getOwnPropertySymbols(obj);
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      if (
        keysToOmit.indexOf(symbol as unknown as string) < 0 &&
        Object.prototype.propertyIsEnumerable.call(obj, symbol)
      ) {
        result[symbol as unknown as string] = obj[symbol as unknown as string];
      }
    }
  }
  
  return result as Omit<T, OmitKeys>;
}

const TimelineItem: React.FC<TimelineItemProps> = (props) => {
  const {
    prefixCls: customPrefixCls,
    className,
    color = DEFAULT_COLOR,
    dot,
    pending = false,
    position,
    label,
    children,
    ...restProps
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('timeline', customPrefixCls);

  const itemClassName = classNames(
    `${prefixCls}-item`,
    {
      [`${prefixCls}-item-pending`]: pending,
    },
    className
  );

  const headClassName = classNames(
    `${prefixCls}-item-head`,
    {
      [`${prefixCls}-item-head-custom`]: dot,
      [`${prefixCls}-item-head-${color}`]: true,
    }
  );

  const headStyle: CSSProperties = {
    borderColor: STANDARD_COLORS.test(color || '') ? undefined : color,
  };

  return (
    <li {...restProps} className={itemClassName}>
      {label && (
        <div className={`${prefixCls}-item-label`}>
          {label}
        </div>
      )}
      <div className={`${prefixCls}-item-tail`} />
      <div className={headClassName} style={headStyle}>
        {dot}
      </div>
      <div className={`${prefixCls}-item-content`}>
        {children}
      </div>
    </li>
  );
};

export default TimelineItem;