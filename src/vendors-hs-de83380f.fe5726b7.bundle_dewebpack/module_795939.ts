import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import iconComponent from './iconComponent';
import IconWrapper from './IconWrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

function IconComponent(
  props: IconProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconComponent
  });
}

const ForwardedIcon = forwardRef<HTMLElement, IconProps>(IconComponent);

export default ForwardedIcon;