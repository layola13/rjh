import React, { forwardRef, ForwardedRef, RefAttributes } from 'react';
import IconComponent from './IconComponent';
import iconDefault from './iconDefault';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent) => void;
  [key: string]: unknown;
}

/**
 * Icon wrapper component that forwards ref and merges props with default icon configuration
 */
const IconWithRef = (
  props: IconProps,
  ref: ForwardedRef<HTMLElement>
): React.ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconDefault
  });
};

const ForwardedIcon = forwardRef<HTMLElement, IconProps>(IconWithRef);

export default ForwardedIcon;