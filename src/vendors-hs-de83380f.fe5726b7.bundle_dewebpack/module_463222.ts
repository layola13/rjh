import React, { forwardRef, ForwardRefRenderFunction, RefAttributes } from 'react';
import IconBase from './IconBase';
import iconData from './iconData';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const IconComponent: ForwardRefRenderFunction<SVGSVGElement, IconProps> = (props, ref) => {
  return React.createElement(IconBase, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;