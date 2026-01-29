import * as React from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  spin?: boolean;
  rotate?: number;
  [key: string]: unknown;
}

const IconComponent = (
  props: IconProps,
  ref: React.Ref<HTMLSpanElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = React.forwardRef<HTMLSpanElement, IconProps>(IconComponent);

export default ForwardedIcon;