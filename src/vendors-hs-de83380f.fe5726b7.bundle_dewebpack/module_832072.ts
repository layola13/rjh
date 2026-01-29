import React, { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import BaseIcon from './BaseIcon';
import iconDefinition from './iconDefinition';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  spin?: boolean;
  rotate?: number;
  [key: string]: unknown;
}

type IconRef = HTMLElement | SVGSVGElement;

const IconComponent = forwardRef<IconRef, IconProps>((props, ref) => {
  return React.createElement(BaseIcon, {
    ...props,
    ref,
    icon: iconDefinition
  });
});

const Icon: ForwardRefExoticComponent<IconProps & RefAttributes<IconRef>> = IconComponent;

export default Icon;