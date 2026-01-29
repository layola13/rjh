import * as React from 'react';
import iconComponent from './iconComponent';
import IconWrapper from './IconWrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const ForwardedIconComponent = React.forwardRef<HTMLElement, IconProps>(
  (props, ref) => {
    return React.createElement(IconWrapper, {
      ...props,
      ref,
      icon: iconComponent
    });
  }
);

ForwardedIconComponent.displayName = 'ForwardedIconComponent';

export default ForwardedIconComponent;