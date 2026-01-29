import React, { forwardRef, ForwardedRef, ComponentProps } from 'react';
import IconWrapper from './IconWrapper';
import iconConfig from './iconConfig';

interface IconProps extends Omit<ComponentProps<typeof IconWrapper>, 'icon'> {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
}

const IconComponent = (
  props: IconProps,
  ref: ForwardedRef<HTMLElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconConfig
  });
};

const ForwardedIconComponent = forwardRef(IconComponent);

export default ForwardedIconComponent;