import React from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import defaultIcon from './defaultIcon';
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

type IconComponent = ForwardRefExoticComponent<IconProps & RefAttributes<HTMLElement>>;

const IconForwardRefRender = (
  props: IconProps,
  ref: React.Ref<HTMLElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: defaultIcon
  });
};

const IconComponent: IconComponent = React.forwardRef(IconForwardRefRender);

export default IconComponent;