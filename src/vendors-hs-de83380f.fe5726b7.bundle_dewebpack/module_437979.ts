import React from 'react';
import defaultIcon from './icon-module-189952';
import IconWrapper from './icon-wrapper-445959';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  size?: number | string;
  color?: string;
  [key: string]: unknown;
}

const IconComponent = (
  props: IconProps,
  ref: React.Ref<HTMLElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: defaultIcon
  });
};

const ForwardedIcon = React.forwardRef<HTMLElement, IconProps>(IconComponent);

export default ForwardedIcon;