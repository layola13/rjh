import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import IconComponent from './423548';
import BaseIconWrapper from './445959';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const IconForwardComponent = (
  props: IconProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement => {
  return React.createElement(BaseIconWrapper, {
    ...props,
    ref,
    icon: IconComponent
  });
};

const ForwardedIcon = forwardRef(IconForwardComponent);

export default ForwardedIcon;