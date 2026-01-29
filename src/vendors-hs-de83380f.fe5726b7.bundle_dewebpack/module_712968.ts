import React from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import iconComponent from './iconComponent';
import withIcon from './withIcon';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const IconWithRef = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return React.createElement(withIcon, {
      ...props,
      ref,
      icon: iconComponent,
    });
  }
);

const Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = IconWithRef;

export default Icon;