import React, { forwardRef, useContext, useEffect, useRef, useState, CSSProperties, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { ConfigContext } from './ConfigContext';
import { RowContext } from './RowContext';
import { responsiveObserve, responsiveArray, Breakpoint, ScreenMap } from './responsiveObserve';

type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
type Align = 'top' | 'middle' | 'bottom' | 'stretch';

type Gutter = number | Partial<Record<Breakpoint, number>>;

interface RowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'ref'> {
  prefixCls?: string;
  justify?: Justify;
  align?: Align;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  gutter?: Gutter | [Gutter, Gutter];
  wrap?: boolean;
}

interface RowContextState {
  gutter: [number, number];
  wrap?: boolean;
}

const omit = <T extends Record<string, any>>(obj: T, keys: string[]): Partial<T> => {
  const result: Partial<T> = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && keys.indexOf(key) < 0) {
      result[key] = obj[key];
    }
  }
  
  if (typeof Object.getOwnPropertySymbols === 'function') {
    const symbols = Object.getOwnPropertySymbols(obj);
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      if (keys.indexOf(symbol as any) < 0 && Object.prototype.propertyIsEnumerable.call(obj, symbol)) {
        result[symbol as any] = obj[symbol as any];
      }
    }
  }
  
  return result;
};

const Row = forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  const {
    prefixCls,
    justify,
    align,
    className,
    style,
    children,
    gutter = 0,
    wrap,
    ...restProps
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigContext);
  
  const [screens, setScreens] = useState<ScreenMap>({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true,
  });

  const gutterRef = useRef<RowProps['gutter']>(gutter);

  useEffect(() => {
    const token = responsiveObserve.subscribe((screenMap: ScreenMap) => {
      const currentGutter = gutterRef.current ?? 0;
      const shouldUpdate =
        (!Array.isArray(currentGutter) && typeof currentGutter === 'object') ||
        (Array.isArray(currentGutter) &&
          (typeof currentGutter[0] === 'object' || typeof currentGutter[1] === 'object'));
      
      if (shouldUpdate) {
        setScreens(screenMap);
      }
    });

    return () => responsiveObserve.unsubscribe(token);
  }, []);

  const rowPrefixCls = getPrefixCls('row', prefixCls);

  const normalizedGutter: [number, number] = [0, 0];
  const gutterArray = Array.isArray(gutter) ? gutter : [gutter, 0];
  
  gutterArray.forEach((gutterItem, index) => {
    if (typeof gutterItem === 'object') {
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakpoint = responsiveArray[i];
        if (screens[breakpoint] && gutterItem[breakpoint] !== undefined) {
          normalizedGutter[index] = gutterItem[breakpoint] as number;
          break;
        }
      }
    } else {
      normalizedGutter[index] = gutterItem || 0;
    }
  });

  const rowClassName = classNames(
    rowPrefixCls,
    {
      [`${rowPrefixCls}-no-wrap`]: wrap === false,
      [`${rowPrefixCls}-${justify}`]: justify,
      [`${rowPrefixCls}-${align}`]: align,
      [`${rowPrefixCls}-rtl`]: direction === 'rtl',
    },
    className
  );

  const rowStyle: CSSProperties = {
    ...(normalizedGutter[0] > 0
      ? {
          marginLeft: normalizedGutter[0] / -2,
          marginRight: normalizedGutter[0] / -2,
        }
      : {}),
    ...(normalizedGutter[1] > 0
      ? {
          marginTop: normalizedGutter[1] / -2,
          marginBottom: normalizedGutter[1] / 2,
        }
      : {}),
    ...style,
  };

  const rowContextValue: RowContextState = {
    gutter: normalizedGutter,
    wrap,
  };

  return (
    <RowContext.Provider value={rowContextValue}>
      <div {...restProps} className={rowClassName} style={rowStyle} ref={ref}>
        {children}
      </div>
    </RowContext.Provider>
  );
});

Row.displayName = 'Row';

export default Row;