import React from 'react';
import iconComponent from './icon-component';
import IconWrapper from './icon-wrapper';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  [key: string]: unknown;
}

const IconForwardRefComponent = React.forwardRef<HTMLElement, IconProps>(
  (props: IconProps, ref: React.Ref<HTMLElement>) => {
    return React.createElement(IconWrapper, {
      ...props,
      ref,
      icon: iconComponent
    });
  }
);

IconForwardRefComponent.displayName = 'IconForwardRefComponent';

export default IconForwardRefComponent;