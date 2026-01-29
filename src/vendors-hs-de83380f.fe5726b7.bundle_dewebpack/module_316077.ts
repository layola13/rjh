import React from 'react';
import type { Ref, ReactElement } from 'react';
import iconComponent from './iconComponent';
import IconWrapper from './IconWrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const ForwardedIcon = (props: IconProps, ref: Ref<HTMLElement>): ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconComponent
  });
};

const IconComponent = React.forwardRef<HTMLElement, IconProps>(ForwardedIcon);

export default IconComponent;