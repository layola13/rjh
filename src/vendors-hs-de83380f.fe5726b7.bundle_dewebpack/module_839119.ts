import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import IconComponent from './IconComponent';
import iconDefinition from './iconDefinition';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  spin?: boolean;
  rotate?: number;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const IconRenderer = (
  props: IconProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconDefinition
  });
};

const ForwardedIcon = forwardRef<HTMLElement, IconProps>(IconRenderer);

export default ForwardedIcon;