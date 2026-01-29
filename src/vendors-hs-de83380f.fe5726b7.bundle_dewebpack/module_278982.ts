import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import BaseIcon from './BaseIcon';
import iconData from './iconData';

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
  return React.createElement(BaseIcon, {
    ...props,
    ref,
    icon: iconData
  });
}

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;