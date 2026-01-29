import React from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const IconComponent = React.forwardRef<HTMLElement, IconProps>(
  (props: IconProps, ref: React.Ref<HTMLElement>) => {
    return React.createElement(IconWrapper, {
      ...props,
      ref,
      icon: iconData
    });
  }
);

IconComponent.displayName = 'IconComponent';

export default IconComponent;