import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import defaultIcon from './defaultIcon';
import IconWrapper from './IconWrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const IconComponent = (
  props: IconProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: defaultIcon,
  });
};

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;