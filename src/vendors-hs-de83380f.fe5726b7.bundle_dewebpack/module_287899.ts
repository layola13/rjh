import React from 'react';
import defaultIcon from './icon-module';
import IconWrapper from './IconWrapper';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const IconComponent = (
  props: IconProps,
  ref: React.Ref<HTMLElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: defaultIcon,
  });
};

const ForwardedIconComponent = React.forwardRef<HTMLElement, IconProps>(IconComponent);

export default ForwardedIconComponent;