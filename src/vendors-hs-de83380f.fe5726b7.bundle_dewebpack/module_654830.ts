import React, { forwardRef, ForwardRefRenderFunction, Ref } from 'react';
import IconComponent from './IconComponent';
import iconData from './iconData';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const IconRenderFunction: ForwardRefRenderFunction<SVGSVGElement, IconProps> = (
  props,
  ref
) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(IconRenderFunction);

export default ForwardedIcon;