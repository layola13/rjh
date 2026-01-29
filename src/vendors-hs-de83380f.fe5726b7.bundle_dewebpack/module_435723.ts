import React, { forwardRef, ForwardRefRenderFunction, Ref } from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const IconComponent: ForwardRefRenderFunction<SVGSVGElement, IconProps> = (
  props: IconProps,
  ref: Ref<SVGSVGElement>
) => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;