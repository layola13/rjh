import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import iconComponent from './icon-component';
import IconWrapper from './icon-wrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const IconForwardRefComponent = (
  props: IconProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconComponent
  });
};

const ForwardedIcon = forwardRef(IconForwardRefComponent);

export default ForwardedIcon;