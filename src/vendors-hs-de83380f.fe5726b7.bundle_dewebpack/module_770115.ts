import React, { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import IconComponent from './IconComponent';
import iconDefinition from './iconDefinition';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  spin?: boolean;
  rotate?: number;
  [key: string]: unknown;
}

type IconRef = HTMLSpanElement | SVGSVGElement;

const IconWrapper = (
  props: IconProps,
  ref: React.Ref<IconRef>
): React.ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconDefinition
  });
};

const ForwardedIcon: ForwardRefExoticComponent<IconProps & RefAttributes<IconRef>> = 
  forwardRef(IconWrapper);

export default ForwardedIcon;