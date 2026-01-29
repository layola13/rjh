import * as React from 'react';
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
 * Icon component that wraps the icon data with common icon functionality
 * @param props - Icon properties
 * @param ref - Forwarded ref to the icon element
 */
const IconComponent = (
  props: IconProps,
  ref: React.Ref<HTMLSpanElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = React.forwardRef<HTMLSpanElement, IconProps>(IconComponent);

export default ForwardedIcon;