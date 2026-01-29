import * as React from 'react';
import iconComponent from './icon-component';
import IconWrapper from './IconWrapper';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  [key: string]: unknown;
}

const IconForwardRef = React.forwardRef<HTMLElement, IconProps>(
  (props: IconProps, ref: React.Ref<HTMLElement>) => {
    return React.createElement(IconWrapper, {
      ...props,
      ref,
      icon: iconComponent
    });
  }
);

IconForwardRef.displayName = 'IconForwardRef';

export default IconForwardRef;