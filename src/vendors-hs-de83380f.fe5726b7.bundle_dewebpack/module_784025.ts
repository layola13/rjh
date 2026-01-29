import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import IconWrapper from './IconWrapper';
import iconConfig from './iconConfig';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

function IconComponent(
  props: IconProps,
  ref: ForwardedRef<SVGSVGElement>
): ReactElement {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconConfig
  });
}

const ForwardedIcon = forwardRef<SVGSVGElement, IconProps>(IconComponent);

export default ForwardedIcon;