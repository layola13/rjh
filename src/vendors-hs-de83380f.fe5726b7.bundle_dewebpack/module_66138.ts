import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import iconDefinition from './iconDefinition';
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
  ref: ForwardedRef<HTMLElement>
): ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconDefinition,
  });
};

const ForwardedIconComponent = forwardRef(IconComponent);

export default ForwardedIconComponent;