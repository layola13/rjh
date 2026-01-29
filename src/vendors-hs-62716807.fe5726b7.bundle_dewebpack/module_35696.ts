import React, { useContext, ReactNode, ReactElement, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigContext } from './ConfigContext';
import TimelineItem from './TimelineItem';
import LoadingIcon from './LoadingIcon';

interface TimelineProps {
  prefixCls?: string;
  pending?: ReactNode | boolean;
  pendingDot?: ReactNode;
  children?: ReactNode;
  className?: string;
  reverse?: boolean;
  mode?: 'left' | 'right' | 'alternate' | '';
  style?: CSSProperties;
}

interface TimelineItemProps {
  position?: 'left' | 'right';
  className?: string;
  label?: ReactNode;
}

type TimelineComponent = React.FC<TimelineProps> & {
  Item: typeof TimelineItem;
};

/**
 * Omit utility type implementation
 */
function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result: Record<string, any> = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && keys.indexOf(key as any) < 0) {
      result[key] = obj[key];
    }
  }
  
  if (obj != null && typeof Object.getOwnPropertySymbols === 'function') {
    const symbols = Object.getOwnPropertySymbols(obj);
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      if (
        keys.indexOf(symbol as any) < 0 &&
        Object.prototype.propertyIsEnumerable.call(obj, symbol)
      ) {
        result[symbol as any] = obj[symbol as any];
      }
    }
  }
  
  return result as Omit<T, K>;
}

/**
 * Clone React element with additional props
 */
function cloneElement(
  element: ReactElement<any>,
  props: Record<string, any>
): ReactElement {
  return React.cloneElement(element, props);
}

const Timeline: TimelineComponent = (props) => {
  const {
    prefixCls: customPrefixCls,
    pending = null,
    pendingDot,
    children,
    className,
    reverse = false,
    mode = '',
    ...restProps
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('timeline', customPrefixCls);

  const hasPending = !!pending;
  const pendingNode = typeof pending === 'boolean' ? null : pending;

  const pendingItem = hasPending
    ? React.createElement(TimelineItem, {
        pending: true,
        dot: pendingDot || React.createElement(LoadingIcon, null),
      }, pendingNode)
    : null;

  const childrenArray = React.Children.toArray(children);
  childrenArray.push(pendingItem);

  if (reverse) {
    childrenArray.reverse();
  }

  const getPositionClassName = (
    item: ReactElement<TimelineItemProps>,
    index: number
  ): string => {
    const itemPosition = item.props.position;

    if (mode === 'alternate') {
      if (itemPosition === 'right') {
        return `${prefixCls}-item-right`;
      }
      if (itemPosition === 'left') {
        return `${prefixCls}-item-left`;
      }
      return index % 2 === 0 ? `${prefixCls}-item-left` : `${prefixCls}-item-right`;
    }

    if (mode === 'left') {
      return `${prefixCls}-item-left`;
    }

    if (mode === 'right' || itemPosition === 'right') {
      return `${prefixCls}-item-right`;
    }

    return '';
  };

  const filteredChildren = childrenArray.filter((child) => !!child);
  const childrenCount = React.Children.count(filteredChildren);
  const lastItemClassName = `${prefixCls}-item-last`;

  const timelineItems = React.Children.map(filteredChildren, (child, index) => {
    if (!React.isValidElement<TimelineItemProps>(child)) {
      return child;
    }

    const isSecondToLast = index === childrenCount - 2;
    const isLast = index === childrenCount - 1;
    const lastClassName = !reverse && hasPending ? 
      (isSecondToLast ? lastItemClassName : '') :
      (isLast ? lastItemClassName : '');

    return cloneElement(child, {
      className: classNames([
        child.props.className,
        lastClassName,
        getPositionClassName(child, index),
      ]),
    });
  });

  const hasLabel = childrenArray.some((child) => {
    if (!React.isValidElement<TimelineItemProps>(child)) {
      return false;
    }
    return !!(child.props?.label);
  });

  const timelineClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-pending`]: hasPending,
      [`${prefixCls}-reverse`]: reverse,
      [`${prefixCls}-${mode}`]: !!mode && !hasLabel,
      [`${prefixCls}-label`]: hasLabel,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className
  );

  return (
    <ul {...restProps} className={timelineClassName}>
      {timelineItems}
    </ul>
  );
};

Timeline.Item = TimelineItem;

export default Timeline;