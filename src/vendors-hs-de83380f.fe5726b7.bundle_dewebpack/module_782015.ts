import React, { forwardRef, Ref, ForwardRefExoticComponent, RefAttributes } from 'react';
import defaultIcon from './icon';
import IconWrapper from './IconWrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const IconComponent = (
  props: IconProps,
  ref: Ref<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: defaultIcon
  });
};

const ForwardedIcon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> = forwardRef(IconComponent);

export default ForwardedIcon;