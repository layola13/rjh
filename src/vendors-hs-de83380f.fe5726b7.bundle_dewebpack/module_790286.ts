import React from 'react';
import iconComponent from './iconComponent';
import BaseIcon from './BaseIcon';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const IconWrapper = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return React.createElement(BaseIcon, {
      ...props,
      ref,
      icon: iconComponent,
    });
  }
);

IconWrapper.displayName = 'IconWrapper';

export default IconWrapper;