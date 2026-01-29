import React, { CSSProperties, forwardRef, useContext, ReactNode, Ref } from 'react';
import classNames from 'classnames';
import { ConfigContext } from './ConfigContext';
import { RowContext } from './RowContext';

type ColSpanType = number | string;

interface ColSize {
  span?: ColSpanType;
  order?: ColSpanType;
  offset?: ColSpanType;
  push?: ColSpanType;
  pull?: ColSpanType;
}

interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  span?: ColSpanType;
  order?: ColSpanType;
  offset?: ColSpanType;
  push?: ColSpanType;
  pull?: ColSpanType;
  className?: string;
  children?: ReactNode;
  flex?: string | number;
  style?: CSSProperties;
  xs?: ColSpanType | ColSize;
  sm?: ColSpanType | ColSize;
  md?: ColSpanType | ColSize;
  lg?: ColSpanType | ColSize;
  xl?: ColSpanType | ColSize;
  xxl?: ColSpanType | ColSize;
}

const RESPONSIVE_BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

function parseFlex(flex: string | number): string {
  if (typeof flex === 'number') {
    return `${flex} ${flex} auto`;
  }
  if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
    return `0 0 ${flex}`;
  }
  return flex;
}

const Col = forwardRef<HTMLDivElement, ColProps>((props, ref: Ref<HTMLDivElement>) => {
  const {
    prefixCls: customizePrefixCls,
    span,
    order,
    offset,
    push,
    pull,
    className,
    children,
    flex,
    style,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    ...restProps
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const { gutter, wrap } = useContext(RowContext);

  const prefixCls = getPrefixCls('col', customizePrefixCls);

  let responsiveClasses: Record<string, boolean> = {};

  RESPONSIVE_BREAKPOINTS.forEach((breakpoint) => {
    const breakpointValue = props[breakpoint];
    let breakpointConfig: ColSize = {};

    if (typeof breakpointValue === 'number') {
      breakpointConfig.span = breakpointValue;
    } else if (typeof breakpointValue === 'object' && breakpointValue !== null) {
      breakpointConfig = breakpointValue;
    }

    responsiveClasses = {
      ...responsiveClasses,
      [`${prefixCls}-${breakpoint}-${breakpointConfig.span}`]: breakpointConfig.span !== undefined,
      [`${prefixCls}-${breakpoint}-order-${breakpointConfig.order}`]: breakpointConfig.order !== undefined || breakpointConfig.order === 0,
      [`${prefixCls}-${breakpoint}-offset-${breakpointConfig.offset}`]: breakpointConfig.offset !== undefined || breakpointConfig.offset === 0,
      [`${prefixCls}-${breakpoint}-push-${breakpointConfig.push}`]: breakpointConfig.push !== undefined || breakpointConfig.push === 0,
      [`${prefixCls}-${breakpoint}-pull-${breakpointConfig.pull}`]: breakpointConfig.pull !== undefined || breakpointConfig.pull === 0,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    };
  });

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-${span}`]: span !== undefined,
      [`${prefixCls}-order-${order}`]: order !== undefined,
      [`${prefixCls}-offset-${offset}`]: offset !== undefined,
      [`${prefixCls}-push-${push}`]: push !== undefined,
      [`${prefixCls}-pull-${pull}`]: pull !== undefined,
    },
    className,
    responsiveClasses
  );

  let mergedStyle: CSSProperties = { ...style };

  if (gutter) {
    mergedStyle = {
      ...mergedStyle,
      ...(gutter[0] > 0 ? {
        paddingLeft: gutter[0] / 2,
        paddingRight: gutter[0] / 2,
      } : {}),
      ...(gutter[1] > 0 ? {
        paddingTop: gutter[1] / 2,
        paddingBottom: gutter[1] / 2,
      } : {}),
    };
  }

  if (flex) {
    mergedStyle.flex = parseFlex(flex);
    if (flex === 'auto' && wrap !== false && !mergedStyle.minWidth) {
      mergedStyle.minWidth = 0;
    }
  }

  return (
    <div {...restProps} style={mergedStyle} className={classes} ref={ref}>
      {children}
    </div>
  );
});

Col.displayName = 'Col';

export default Col;