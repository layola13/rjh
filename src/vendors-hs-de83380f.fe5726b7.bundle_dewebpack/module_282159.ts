import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import IconComponent from './445959';
import iconData from './457126';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const IconWrapper = (
  props: IconProps,
  ref: ForwardedRef<SVGSVGElement>
): ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(IconWrapper);

export default ForwardedIcon;