import React, { forwardRef, ForwardRefRenderFunction, ReactElement } from 'react';
import IconComponent from './IconComponent';
import iconData from './iconData';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const renderIcon: ForwardRefRenderFunction<SVGSVGElement, IconProps> = (
  props,
  ref
): ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData,
  });
};

const ForwardedIconComponent = forwardRef(renderIcon);

export default ForwardedIconComponent;