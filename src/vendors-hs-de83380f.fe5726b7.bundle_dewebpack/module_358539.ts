import React from 'react';
import iconComponent from './iconComponent';
import BaseIconWrapper from './BaseIconWrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const IconForwardRefComponent = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return React.createElement(BaseIconWrapper, {
      ...props,
      ref,
      icon: iconComponent,
    });
  }
);

IconForwardRefComponent.displayName = 'IconForwardRefComponent';

export default IconForwardRefComponent;