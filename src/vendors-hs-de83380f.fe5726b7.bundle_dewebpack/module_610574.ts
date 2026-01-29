import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import iconDefinition from './icon-definition';
import IconComponent from './IconComponent';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  spin?: boolean;
  rotate?: number;
  [key: string]: unknown;
}

/**
 * Icon component with forwarded ref support
 */
const IconWithRef = (
  props: IconProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconDefinition,
  });
};

const ForwardedIcon = forwardRef<HTMLElement, IconProps>(IconWithRef);

export default ForwardedIcon;