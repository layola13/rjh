import React from 'react';
import iconComponent from './iconComponent';
import IconWrapper from './IconWrapper';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent) => void;
  [key: string]: unknown;
}

const IconForwardRef = React.forwardRef<HTMLElement, IconProps>(
  (props: IconProps, ref: React.Ref<HTMLElement>) => {
    return React.createElement(IconWrapper, {
      ...props,
      ref,
      icon: iconComponent,
    });
  }
);

IconForwardRef.displayName = 'IconForwardRef';

export default IconForwardRef;