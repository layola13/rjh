import React, { forwardRef, ForwardRefRenderFunction, RefAttributes } from 'react';
import IconComponent from './IconComponent';
import iconData from './iconData';

interface IconProps extends RefAttributes<HTMLElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  [key: string]: unknown;
}

const IconRenderFunction: ForwardRefRenderFunction<HTMLElement, IconProps> = (
  props,
  ref
) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData,
  });
};

const ForwardedIconComponent = forwardRef(IconRenderFunction);

export default ForwardedIconComponent;