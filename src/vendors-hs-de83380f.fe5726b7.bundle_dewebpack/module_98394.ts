import React from 'react';
import defaultIcon from './icon';
import IconWrapper from './IconWrapper';

interface IconComponentProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  size?: number | string;
  color?: string;
  [key: string]: unknown;
}

const IconComponent = React.forwardRef<HTMLElement, IconComponentProps>(
  (props, ref) => {
    return React.createElement(IconWrapper, {
      ...props,
      ref,
      icon: defaultIcon,
    });
  }
);

IconComponent.displayName = 'IconComponent';

export default IconComponent;