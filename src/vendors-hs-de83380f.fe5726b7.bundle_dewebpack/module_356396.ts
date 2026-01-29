import React, { forwardRef, ForwardRefRenderFunction, RefObject } from 'react';
import IconComponent from './IconComponent';
import iconData from './iconData';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  spin?: boolean;
  rotate?: number;
  [key: string]: unknown;
}

const IconRenderFunction: ForwardRefRenderFunction<unknown, IconProps> = (props, ref) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(IconRenderFunction);

export default ForwardedIcon;