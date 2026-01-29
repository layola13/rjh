import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import IconComponent from './445959';
import iconConfig from './428083';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const createIconElement = (
  props: IconProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconConfig
  });
};

const ForwardedIconComponent = forwardRef<HTMLElement, IconProps>(createIconElement);

export default ForwardedIconComponent;