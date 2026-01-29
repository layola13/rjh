import React, { forwardRef, ForwardRefRenderFunction, RefAttributes } from 'react';
import IconComponent from './IconComponent';
import iconDefinition from './iconDefinition';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  spin?: boolean;
  rotate?: number;
  [key: string]: unknown;
}

type IconRef = HTMLSpanElement | SVGSVGElement;

const IconRenderFunction: ForwardRefRenderFunction<IconRef, IconProps> = (props, ref) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconDefinition
  });
};

const ForwardedIcon = forwardRef(IconRenderFunction);

export default ForwardedIcon;