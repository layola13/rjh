import React, { createContext, useContext, useMemo, CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import { ConfigContext } from '../config-provider';
import Item from './Item';

type SpaceSize = 'small' | 'middle' | 'large' | number;

interface SpaceContextValue {
  latestIndex: number;
  horizontalSize: number;
  verticalSize: number;
}

export const SpaceContext = createContext<SpaceContextValue>({
  latestIndex: 0,
  horizontalSize: 0,
  verticalSize: 0
});

const SIZE_MAP: Record<'small' | 'middle' | 'large', number> = {
  small: 8,
  middle: 16,
  large: 24
};

interface SpaceProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'size'> {
  size?: SpaceSize | [SpaceSize, SpaceSize];
  align?: 'start' | 'end' | 'center' | 'baseline';
  className?: string;
  children?: ReactNode;
  direction?: 'horizontal' | 'vertical';
  prefixCls?: string;
  split?: ReactNode;
  style?: CSSProperties;
  wrap?: boolean;
}

const normalizeSize = (size: SpaceSize): number => {
  return typeof size === 'string' ? SIZE_MAP[size] : size || 0;
};

const Space: React.FC<SpaceProps> = (props) => {
  const {
    size = 'small',
    align,
    className,
    children,
    direction = 'horizontal',
    prefixCls: customPrefixCls,
    split,
    style,
    wrap = false,
    ...restProps
  } = props;

  const { getPrefixCls, space: spaceConfig, direction: configDirection } = useContext(ConfigContext);

  const finalSize = size ?? spaceConfig?.size ?? 'small';

  const [horizontalSize, verticalSize] = useMemo(() => {
    const sizeArray = Array.isArray(finalSize) ? finalSize : [finalSize, finalSize];
    return sizeArray.map(normalizeSize);
  }, [finalSize]);

  const childNodes = toArray(children, { keepEmpty: true });

  if (childNodes.length === 0) {
    return null;
  }

  const finalAlign = align ?? (direction === 'horizontal' ? 'center' : undefined);
  const prefixCls = getPrefixCls('space', customPrefixCls);
  const isRTL = configDirection === 'rtl';

  const spaceClassName = classNames(
    prefixCls,
    `${prefixCls}-${direction}`,
    {
      [`${prefixCls}-rtl`]: isRTL,
      [`${prefixCls}-align-${finalAlign}`]: finalAlign
    },
    className
  );

  const itemClassName = `${prefixCls}-item`;
  const marginDirection: 'marginLeft' | 'marginRight' = isRTL ? 'marginLeft' : 'marginRight';

  let latestIndex = 0;
  const items = childNodes.map((child, index) => {
    if (child != null) {
      latestIndex = index;
    }

    return (
      <Item
        className={itemClassName}
        key={`${itemClassName}-${index}`}
        direction={direction}
        index={index}
        marginDirection={marginDirection}
        split={split}
        wrap={wrap}
      >
        {child}
      </Item>
    );
  });

  const mergedStyle: CSSProperties = {
    ...style,
    ...(wrap && {
      flexWrap: 'wrap',
      marginBottom: -verticalSize
    })
  };

  return (
    <div className={spaceClassName} style={mergedStyle} {...restProps}>
      <SpaceContext.Provider
        value={{
          horizontalSize,
          verticalSize,
          latestIndex
        }}
      >
        {items}
      </SpaceContext.Provider>
    </div>
  );
};

export default Space;