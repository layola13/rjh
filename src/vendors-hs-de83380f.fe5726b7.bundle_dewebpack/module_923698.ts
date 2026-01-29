import React, { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import IconComponent from './IconComponent';
import iconDefault from './iconDefault';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

type IconRef = SVGSVGElement;

const IconForwardRef = forwardRef<IconRef, IconProps>((props, ref) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconDefault
  });
});

const IconWrapper: ForwardRefExoticComponent<IconProps & RefAttributes<IconRef>> = IconForwardRef;

export default IconWrapper;