import React from 'react';
import defaultIcon from './defaultIcon';
import IconWrapper from './IconWrapper';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  spin?: boolean;
  rotate?: number;
  [key: string]: unknown;
}

const IconComponent = React.forwardRef<HTMLSpanElement, IconProps>(
  (props: IconProps, ref: React.Ref<HTMLSpanElement>) => {
    return React.createElement(IconWrapper, {
      ...props,
      ref,
      icon: defaultIcon
    });
  }
);

IconComponent.displayName = 'IconComponent';

export default IconComponent;