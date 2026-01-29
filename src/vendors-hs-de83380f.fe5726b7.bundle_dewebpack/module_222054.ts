import * as React from 'react';
import iconDefault from './icon';
import BaseIconComponent from './BaseIconComponent';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const IconComponent = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return React.createElement(BaseIconComponent, {
      ...props,
      ref,
      icon: iconDefault
    });
  }
);

IconComponent.displayName = 'IconComponent';

export default IconComponent;