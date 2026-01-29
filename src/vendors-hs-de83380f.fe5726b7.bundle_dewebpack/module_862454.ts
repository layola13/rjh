import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import iconData from './icon-data';
import IconComponent from './IconComponent';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

function IconRenderFunction(
  props: IconProps,
  ref: ForwardedRef<SVGSVGElement>
): ReactElement {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData
  });
}

const ForwardedIcon = forwardRef<SVGSVGElement, IconProps>(IconRenderFunction);

export default ForwardedIcon;