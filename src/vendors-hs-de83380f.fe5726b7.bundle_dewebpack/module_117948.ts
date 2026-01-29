import React, { forwardRef, Ref, ForwardRefExoticComponent, RefAttributes } from 'react';
import IconComponent from './IconComponent';
import iconData from './iconData';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const IconWrapper = (
  props: IconProps,
  ref: Ref<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = forwardRef(IconWrapper);

export default ForwardedIcon;