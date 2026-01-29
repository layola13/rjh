import React from 'react';
import iconComponent from './icon-component';
import IconWrapper from './IconWrapper';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  [key: string]: unknown;
}

const IconWithRef = (
  props: IconProps,
  ref: React.Ref<HTMLElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconComponent,
  });
};

const ForwardedIcon = React.forwardRef<HTMLElement, IconProps>(IconWithRef);

export default ForwardedIcon;