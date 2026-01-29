import React, { forwardRef, ForwardRefRenderFunction, RefAttributes } from 'react';
import IconComponent from './IconComponent';
import iconConfig from './iconConfig';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  spin?: boolean;
  rotate?: number;
  [key: string]: unknown;
}

const IconRenderFunction: ForwardRefRenderFunction<
  HTMLSpanElement,
  IconProps
> = (props, ref) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconConfig
  });
};

const Icon = forwardRef(IconRenderFunction);

export default Icon;