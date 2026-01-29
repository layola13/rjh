import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGElement>) => void;
  [key: string]: unknown;
}

/**
 * Icon component that wraps the base icon with additional props
 */
const IconComponent = (
  props: IconProps,
  ref: ForwardedRef<SVGSVGElement>
): ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef<SVGSVGElement, IconProps>(IconComponent);

export default ForwardedIcon;