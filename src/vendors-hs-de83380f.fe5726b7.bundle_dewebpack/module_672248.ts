import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import IconWrapper from './IconWrapper';
import iconConfig from './iconConfig';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const IconComponent = (
  props: IconProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconConfig,
  });
};

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;