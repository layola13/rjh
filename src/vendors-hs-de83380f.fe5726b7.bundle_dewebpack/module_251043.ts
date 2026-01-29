import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import IconWrapper from './IconWrapper';
import iconData from './iconData';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

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