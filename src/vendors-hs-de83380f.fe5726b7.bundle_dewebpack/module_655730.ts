import React from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconProps extends React.SVGAttributes<SVGElement> {
  className?: string;
  style?: React.CSSProperties;
  spin?: boolean;
  rotate?: number;
  [key: string]: unknown;
}

const IconComponent = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return React.createElement(IconWrapper, {
      ...props,
      ref,
      icon: iconData
    });
  }
);

IconComponent.displayName = 'IconComponent';

export default IconComponent;