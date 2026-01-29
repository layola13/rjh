import React, { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';
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

const IconWrapper = forwardRef<IconRef, IconProps>((props, ref) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData
  });
});

IconWrapper.displayName = 'IconWrapper';

export default IconWrapper as ForwardRefExoticComponent<IconProps & RefAttributes<IconRef>>;