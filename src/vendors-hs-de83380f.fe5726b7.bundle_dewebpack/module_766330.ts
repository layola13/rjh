import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

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
 * Icon component that renders an SVG icon with customizable properties.
 * @param props - Icon properties including size, color, rotation, etc.
 * @param ref - Forwarded ref to the underlying element
 * @returns Rendered icon element
 */
const Icon = (props: IconProps, ref: ForwardedRef<HTMLElement>): ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(Icon);

export default ForwardedIcon;