import * as React from 'react';
import iconDefault from './icon-module';
import IconWrapper from './IconWrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

/**
 * Icon component that wraps the base icon with additional props and ref forwarding
 */
const IconComponent = (
  props: IconProps,
  ref: React.ForwardedRef<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconDefault
  });
};

const ForwardedIcon = React.forwardRef<SVGSVGElement, IconProps>(IconComponent);

export default ForwardedIcon;