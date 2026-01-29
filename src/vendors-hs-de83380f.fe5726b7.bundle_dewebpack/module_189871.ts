import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import baseIcon from './baseIcon';
import iconComponent from './iconComponent';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent) => void;
  [key: string]: unknown;
}

const IconRenderer = (
  props: IconProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement => {
  return React.createElement(iconComponent, {
    ...props,
    ref,
    icon: baseIcon
  });
};

const ForwardedIcon = forwardRef<HTMLElement, IconProps>(IconRenderer);

export default ForwardedIcon;