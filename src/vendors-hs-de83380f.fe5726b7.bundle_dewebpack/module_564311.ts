import React, { forwardRef, ForwardRefRenderFunction, RefAttributes } from 'react';
import IconComponent from './IconComponent';
import iconDefault from './iconDefault';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent) => void;
  [key: string]: unknown;
}

const IconRenderFunction: ForwardRefRenderFunction<HTMLElement, IconProps> = (
  props,
  ref
) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconDefault,
  });
};

const ForwardedIcon = forwardRef(IconRenderFunction);

export default ForwardedIcon;