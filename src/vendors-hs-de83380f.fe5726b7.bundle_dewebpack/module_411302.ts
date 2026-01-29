import React from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconProps extends React.SVGAttributes<SVGElement> {
  className?: string;
  style?: React.CSSProperties;
  spin?: boolean;
  rotate?: number;
  twoToneColor?: string;
  [key: string]: unknown;
}

const IconComponent: React.ForwardRefRenderFunction<SVGSVGElement, IconProps> = (
  props,
  ref
) => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData,
  });
};

const ForwardedIcon = React.forwardRef(IconComponent);

export default ForwardedIcon;