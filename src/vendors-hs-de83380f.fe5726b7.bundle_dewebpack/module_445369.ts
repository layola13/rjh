import React, { forwardRef, ForwardRefRenderFunction, RefAttributes } from 'react';
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

type IconRef = SVGSVGElement;

const IconRenderFunction: ForwardRefRenderFunction<IconRef, IconProps> = (
  props,
  ref
) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData,
  });
};

const ForwardedIconComponent = forwardRef<IconRef, IconProps>(IconRenderFunction);

export default ForwardedIconComponent;