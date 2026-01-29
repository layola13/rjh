import React from 'react';
import iconDefault from './iconModule';
import IconWrapper from './IconWrapper';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const IconComponent = React.forwardRef<HTMLElement, IconProps>(
  (props, ref) => {
    return React.createElement(IconWrapper, {
      ...props,
      ref,
      icon: iconDefault,
    });
  }
);

IconComponent.displayName = 'IconComponent';

export default IconComponent;