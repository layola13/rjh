import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import baseIcon from './baseIcon';
import BaseIconComponent from './BaseIconComponent';

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
  return React.createElement(BaseIconComponent, {
    ...props,
    ref,
    icon: baseIcon,
  });
};

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;