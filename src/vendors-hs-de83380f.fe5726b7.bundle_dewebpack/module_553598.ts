import React, { forwardRef, ForwardRefRenderFunction, RefAttributes } from 'react';
import IconWrapper from './IconWrapper';
import iconDefinition from './iconDefinition';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const IconComponent: ForwardRefRenderFunction<SVGSVGElement, IconProps> = (props, ref) => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconDefinition
  });
};

const ForwardedIcon = forwardRef<SVGSVGElement, IconProps>(IconComponent);

export default ForwardedIcon;