import React from 'react';
import iconDefinition from './iconDefinition';
import IconWrapper from './IconWrapper';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  spin?: boolean;
  rotate?: number;
  twoToneColor?: string;
  [key: string]: unknown;
}

const IconComponent = React.forwardRef<HTMLSpanElement, IconProps>(
  (props, ref) => {
    return React.createElement(IconWrapper, {
      ...props,
      ref,
      icon: iconDefinition,
    });
  }
);

IconComponent.displayName = 'IconComponent';

export default IconComponent;