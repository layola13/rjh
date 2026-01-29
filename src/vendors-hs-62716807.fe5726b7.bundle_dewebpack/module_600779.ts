import React, { useState, useEffect, useContext, ReactElement, CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import { ConfigContext } from './ConfigContext';
import { cloneElement } from './utils';

interface ScrollNumberProps {
  prefixCls?: string;
  count?: number | string;
  className?: string;
  style?: CSSProperties & { borderColor?: string };
  title?: string;
  show?: boolean;
  component?: keyof JSX.IntrinsicElements;
  children?: ReactElement;
  onAnimated?: () => void;
}

type DigitOrSymbol = number | string;

function reverseToDigits(value?: number | string): DigitOrSymbol[] {
  if (!value) {
    return [];
  }
  
  return value.toString().split('').reverse().map((char: string) => {
    const num = Number(char);
    return isNaN(num) ? char : num;
  });
}

function omit<T extends Record<string, any>>(
  obj: T,
  keys: string[]
): Partial<T> {
  const result: Partial<T> = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && keys.indexOf(key) < 0) {
      result[key] = obj[key];
    }
  }
  
  if (obj && typeof Object.getOwnPropertySymbols === 'function') {
    const symbols = Object.getOwnPropertySymbols(obj);
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      if (keys.indexOf(symbol as any) < 0 && Object.prototype.propertyIsEnumerable.call(obj, symbol)) {
        result[symbol as any] = obj[symbol as any];
      }
    }
  }
  
  return result;
}

function renderDigitUnit(offset: number, className: string): ReactElement[] {
  const units: ReactElement[] = [];
  
  for (let i = 0; i < 30; i++) {
    units.push(
      <p
        key={i.toString()}
        className={classNames(className, {
          current: offset === i
        })}
      >
        {i % 10}
      </p>
    );
  }
  
  return units;
}

export default function ScrollNumber(props: ScrollNumberProps): ReactElement {
  const {
    prefixCls,
    count,
    className,
    style,
    title,
    show,
    component = 'sup',
    children,
    onAnimated = () => {},
    ...restProps
  } = props;

  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [currentCount, setCurrentCount] = useState<number | string | undefined>(count);
  const [lastCount, setLastCount] = useState<number | string | undefined>(count);
  const [prevCount, setPrevCount] = useState<number | string | undefined>(count);

  const { getPrefixCls } = useContext(ConfigContext);
  const scrollNumberPrefixCls = getPrefixCls('scroll-number', prefixCls);

  if (lastCount !== count) {
    setIsAnimating(true);
    setLastCount(count);
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    setPrevCount(currentCount);

    if (isAnimating) {
      timeoutId = setTimeout(() => {
        setIsAnimating(false);
        setCurrentCount(count);
        onAnimated();
      });
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isAnimating, count, onAnimated]);

  const calculateOffset = (digit: number, position: number): number => {
    const currentAbsolute = Math.abs(Number(currentCount));
    const prevAbsolute = Math.abs(Number(prevCount));
    const currentDigit = Math.abs(reverseToDigits(currentCount)[position] as number);
    const prevDigit = Math.abs(reverseToDigits(prevCount)[position] as number);

    if (isAnimating) {
      return 10 + digit;
    }

    if (currentAbsolute > prevAbsolute) {
      return currentDigit >= prevDigit ? 10 + digit : 20 + digit;
    }

    return currentDigit <= prevDigit ? 10 + digit : digit;
  };

  const renderDigit = (digitOrSymbol: DigitOrSymbol, position: number): ReactElement => {
    if (typeof digitOrSymbol === 'number') {
      const offset = calculateOffset(digitOrSymbol, position);
      const shouldSkipTransition = isAnimating || reverseToDigits(prevCount)[position] === undefined;

      return (
        <span
          className={`${scrollNumberPrefixCls}-only`}
          style={{
            transition: shouldSkipTransition ? 'none' : undefined,
            msTransform: `translateY(${-100 * offset}%)`,
            WebkitTransform: `translateY(${-100 * offset}%)`,
            transform: `translateY(${-100 * offset}%)`
          }}
          key={position}
        >
          {renderDigitUnit(offset, `${scrollNumberPrefixCls}-only-unit`)}
        </span>
      );
    }

    return (
      <span key="symbol" className={`${scrollNumberPrefixCls}-symbol`}>
        {digitOrSymbol}
      </span>
    );
  };

  const isInteger = currentCount && Number(currentCount) % 1 === 0;
  const displayContent: ReactNode = isInteger
    ? reverseToDigits(currentCount).map((digit, index) => renderDigit(digit, index)).reverse()
    : currentCount;

  const elementProps = {
    ...omit(restProps, ['prefixCls', 'count', 'className', 'style', 'title', 'show', 'component', 'children', 'onAnimated']),
    'data-show': show,
    style,
    className: classNames(scrollNumberPrefixCls, className),
    title
  };

  if (style?.borderColor) {
    elementProps.style = {
      ...style,
      boxShadow: `0 0 0 1px ${style.borderColor} inset`
    };
  }

  if (children) {
    return cloneElement(children, (originalProps: any) => ({
      className: classNames(`${scrollNumberPrefixCls}-custom-component`, originalProps?.className)
    }));
  }

  return React.createElement(component, elementProps, displayContent);
}