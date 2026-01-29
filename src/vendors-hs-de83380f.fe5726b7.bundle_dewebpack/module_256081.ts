import React, { forwardRef, ForwardRefRenderFunction, RefAttributes } from 'react';
import IconWrapper from './IconWrapper';
import iconData from './iconData';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

type IconRef = HTMLElement | null;

const IconComponent: ForwardRefRenderFunction<IconRef, IconProps> = (props, ref) => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;