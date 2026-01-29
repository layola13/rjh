import React, { forwardRef, ForwardRefRenderFunction, RefAttributes } from 'react';
import IconWrapper from './IconWrapper';
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

const IconComponent: ForwardRefRenderFunction<IconRef, IconProps> = (props, ref) => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef<IconRef, IconProps>(IconComponent);

export default ForwardedIcon;