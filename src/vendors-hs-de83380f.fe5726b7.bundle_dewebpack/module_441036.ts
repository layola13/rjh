import React from 'react';
import type { Ref, ReactElement } from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

function IconComponent(props: IconProps, ref: Ref<SVGSVGElement>): ReactElement {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
}

const ForwardedIcon = React.forwardRef<SVGSVGElement, IconProps>(IconComponent);

export default ForwardedIcon;