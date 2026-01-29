import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import iconDefinition from './icon-definition';
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
  ref: ForwardedRef<HTMLElement>
): ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconDefinition
  });
};

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;