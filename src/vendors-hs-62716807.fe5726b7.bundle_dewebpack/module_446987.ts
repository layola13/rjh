import React from 'react';
import classNames from 'classnames';

interface AvatarProps {
  prefixCls: string;
  className?: string;
  style?: React.CSSProperties;
  size?: 'large' | 'small' | 'default' | number;
  shape?: 'circle' | 'square' | 'round';
}

export default function Avatar(props: AvatarProps): React.ReactElement {
  const { prefixCls, className, style, size, shape } = props;

  const sizeClassNames = classNames({
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-sm`]: size === 'small',
  });

  const shapeClassNames = classNames({
    [`${prefixCls}-circle`]: shape === 'circle',
    [`${prefixCls}-square`]: shape === 'square',
    [`${prefixCls}-round`]: shape === 'round',
  });

  const customSizeStyle: React.CSSProperties =
    typeof size === 'number'
      ? {
          width: size,
          height: size,
          lineHeight: `${size}px`,
        }
      : {};

  return React.createElement('span', {
    className: classNames(prefixCls, sizeClassNames, shapeClassNames, className),
    style: { ...customSizeStyle, ...style },
  });
}