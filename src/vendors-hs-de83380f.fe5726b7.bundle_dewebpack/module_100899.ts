import React from 'react';
import iconComponent from './iconComponent';
import IconWrapper from './IconWrapper';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const ForwardedIcon = React.forwardRef<HTMLElement, IconProps>(
  (props: IconProps, ref: React.Ref<HTMLElement>) => {
    return React.createElement(IconWrapper, {
      ...props,
      ref,
      icon: iconComponent,
    });
  }
);

ForwardedIcon.displayName = 'ForwardedIcon';

export default ForwardedIcon;