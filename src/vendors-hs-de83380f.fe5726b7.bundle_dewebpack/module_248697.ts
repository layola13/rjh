import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import IconComponent from './445959';
import iconDefault from './593496';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const IconWrapper = (
  props: IconProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconDefault,
  });
};

const ForwardedIcon = forwardRef(IconWrapper);

export default ForwardedIcon;