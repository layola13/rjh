import React, { useContext, useMemo, useRef, ReactNode, CSSProperties } from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import { ConfigContext } from './ConfigContext';
import ScrollNumber from './ScrollNumber';
import Ribbon from './Ribbon';
import { cloneElement } from './utils';
import { isPresetColor } from './colors';

type BadgeStatus = 'success' | 'processing' | 'default' | 'error' | 'warning';
type BadgeSize = 'default' | 'small';

interface BadgeProps {
  prefixCls?: string;
  scrollNumberPrefixCls?: string;
  children?: ReactNode;
  status?: BadgeStatus;
  text?: ReactNode;
  color?: string;
  count?: ReactNode;
  overflowCount?: number;
  dot?: boolean;
  size?: BadgeSize;
  title?: string;
  offset?: [number | string, number | string];
  style?: CSSProperties;
  className?: string;
  showZero?: boolean;
}

interface BadgeComponent extends React.FC<BadgeProps> {
  Ribbon: typeof Ribbon;
}

function omitProps<T extends Record<string, unknown>>(
  obj: T,
  keysToOmit: string[]
): Partial<T> {
  const result: Partial<T> = {};
  
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
        result[symbol as unknown as keyof T] = obj[symbol as unknown as keyof T];
      }
    }
  }
  
  return result;
}

const Badge: BadgeComponent = (props: BadgeProps) => {
  const {
    prefixCls,
    scrollNumberPrefixCls,
    children,
    status,
    text,
    color,
    count = null,
    overflowCount = 99,
    dot = false,
    size = 'default',
    title,
    offset,
    style,
    className,
    showZero = false,
    ...restProps
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const badgePrefixCls = getPrefixCls('badge', prefixCls);
  
  const displayCount = typeof count === 'number' && count > overflowCount 
    ? `${overflowCount}+` 
    : count;
  
  const isStatusBadge = status != null || color != null;
  const isZeroCount = displayCount === '0' || displayCount === 0;
  const shouldShowAsDot = (dot && !isZeroCount) || isStatusBadge;
  const actualCount = shouldShowAsDot ? '' : displayCount;
  
  const isHidden = useMemo(() => {
    return (actualCount == null || actualCount === '' || (isZeroCount && !showZero)) && !shouldShowAsDot;
  }, [actualCount, isZeroCount, showZero, shouldShowAsDot]);

  const countRef = useRef(actualCount);
  if (!isHidden) {
    countRef.current = actualCount;
  }
  const displayedCount = countRef.current;

  const dotRef = useRef(shouldShowAsDot);
  if (!isHidden) {
    dotRef.current = shouldShowAsDot;
  }

  const mergedStyle = useMemo(() => {
    if (!offset) {
      return { ...style };
    }
    
    const offsetStyle: CSSProperties = {
      marginTop: offset[1] as number,
    };
    
    if (direction === 'rtl') {
      offsetStyle.left = parseInt(offset[0] as string, 10);
    } else {
      offsetStyle.right = -parseInt(offset[0] as string, 10);
    }
    
    return { ...offsetStyle, ...style };
  }, [direction, offset, style]);

  const titleText = title ?? (typeof count === 'string' || typeof count === 'number' ? count : undefined);

  const statusTextNode = isHidden || !text 
    ? null 
    : <span className={`${badgePrefixCls}-status-text`}>{text}</span>;

  const clonedCount = count && typeof count === 'object'
    ? cloneElement(count as React.ReactElement, (originalProps: Record<string, unknown>) => ({
        style: { ...mergedStyle, ...(originalProps.style as CSSProperties) }
      }))
    : undefined;

  const statusDotClasses = classNames({
    [`${badgePrefixCls}-status-dot`]: isStatusBadge,
    [`${badgePrefixCls}-status-${status}`]: !!status,
    [`${badgePrefixCls}-status-${color}`]: isPresetColor(color),
  });

  const dotStyle: CSSProperties = {};
  if (color && !isPresetColor(color)) {
    dotStyle.background = color;
  }

  const badgeClasses = classNames(
    badgePrefixCls,
    {
      [`${badgePrefixCls}-status`]: isStatusBadge,
      [`${badgePrefixCls}-not-a-wrapper`]: !children,
      [`${badgePrefixCls}-rtl`]: direction === 'rtl',
    },
    className
  );

  if (!children && isStatusBadge) {
    const textColor = mergedStyle.color;
    return (
      <span {...restProps} className={badgeClasses} style={mergedStyle}>
        <span className={statusDotClasses} style={dotStyle} />
        <span style={{ color: textColor }} className={`${badgePrefixCls}-status-text`}>
          {text}
        </span>
      </span>
    );
  }

  return (
    <span {...restProps} className={badgeClasses}>
      {children}
      <CSSMotion
        visible={!isHidden}
        motionName={`${badgePrefixCls}-zoom`}
        motionAppear={false}
      >
        {({ className: motionClassName }: { className?: string }) => {
          const scrollNumberPrefixCls = getPrefixCls('scroll-number', scrollNumberPrefixCls);
          const isDot = dotRef.current;
          
          const scrollNumberClasses = classNames({
            [`${badgePrefixCls}-dot`]: isDot,
            [`${badgePrefixCls}-count`]: !isDot,
            [`${badgePrefixCls}-count-sm`]: size === 'small',
            [`${badgePrefixCls}-multiple-words`]: !isDot && displayedCount && String(displayedCount).length > 1,
            [`${badgePrefixCls}-status-${status}`]: !!status,
            [`${badgePrefixCls}-status-${color}`]: isPresetColor(color),
          });

          let scrollNumberStyle = { ...mergedStyle };
          if (color && !isPresetColor(color)) {
            scrollNumberStyle = scrollNumberStyle || {};
            scrollNumberStyle.background = color;
          }

          return (
            <ScrollNumber
              prefixCls={scrollNumberPrefixCls}
              show={!isHidden}
              className={classNames(motionClassName, scrollNumberClasses)}
              count={displayedCount}
              title={titleText}
              style={scrollNumberStyle}
              key="scrollNumber"
            >
              {clonedCount}
            </ScrollNumber>
          );
        }}
      </CSSMotion>
      {statusTextNode}
    </span>
  );
};

Badge.Ribbon = Ribbon;

export default Badge;