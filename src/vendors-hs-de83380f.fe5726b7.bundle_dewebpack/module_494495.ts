import React, { forwardRef, ForwardRefRenderFunction, RefAttributes } from 'react';
import IconWrapper from './IconWrapper';
import iconData from './iconData';

interface IconProps extends RefAttributes<HTMLElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const IconComponent: ForwardRefRenderFunction<HTMLElement, IconProps> = (props, ref) => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;