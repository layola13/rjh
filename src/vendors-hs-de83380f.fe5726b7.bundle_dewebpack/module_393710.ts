import React from 'react';
import IconWrapper from './IconWrapper';
import iconData from './iconData';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const IconComponent = (
  props: IconProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = React.forwardRef<SVGSVGElement, IconProps>(IconComponent);

export default ForwardedIcon;