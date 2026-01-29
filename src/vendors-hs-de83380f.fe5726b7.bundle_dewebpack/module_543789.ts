import React from 'react';
import iconComponent from './iconComponent';
import BaseIconWrapper from './BaseIconWrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const IconForwardRefComponent = React.forwardRef<HTMLElement, IconProps>(
  (props: IconProps, ref: React.Ref<HTMLElement>) => {
    return React.createElement(BaseIconWrapper, {
      ...props,
      ref,
      icon: iconComponent,
    });
  }
);

IconForwardRefComponent.displayName = 'IconForwardRefComponent';

export default IconForwardRefComponent;