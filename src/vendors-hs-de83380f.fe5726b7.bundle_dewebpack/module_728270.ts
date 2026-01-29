import React, { forwardRef, ForwardedRef } from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent) => void;
  [key: string]: unknown;
}

const IconComponent = (
  props: IconProps,
  ref: ForwardedRef<HTMLElement>
): JSX.Element => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;