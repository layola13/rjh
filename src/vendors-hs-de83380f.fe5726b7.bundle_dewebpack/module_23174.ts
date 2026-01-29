import React from 'react';
import iconComponent from './icon-component';
import IconWrapper from './IconWrapper';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  size?: number | string;
  color?: string;
  [key: string]: unknown;
}

const ForwardedIconComponent = React.forwardRef<HTMLElement, IconProps>(
  (props: IconProps, ref: React.Ref<HTMLElement>) => {
    return React.createElement(IconWrapper, {
      ...props,
      ref,
      icon: iconComponent,
    });
  }
);

ForwardedIconComponent.displayName = 'ForwardedIconComponent';

export default ForwardedIconComponent;