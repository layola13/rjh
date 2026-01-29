import React from 'react';
import defaultIcon from './defaultIcon';
import IconWrapper from './IconWrapper';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent) => void;
  [key: string]: unknown;
}

const IconComponent = React.forwardRef<HTMLElement, IconProps>(
  (props, ref) => {
    return React.createElement(IconWrapper, {
      ...props,
      ref,
      icon: defaultIcon,
    });
  }
);

export default IconComponent;