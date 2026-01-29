import React, { forwardRef, Ref, ForwardRefExoticComponent, RefAttributes } from 'react';
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
  ref: Ref<HTMLElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: defaultIcon
  });
};

const ForwardedIcon: ForwardRefExoticComponent<IconProps & RefAttributes<HTMLElement>> = forwardRef(IconComponent);

export default ForwardedIcon;