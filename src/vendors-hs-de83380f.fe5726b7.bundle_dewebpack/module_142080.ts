import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import IconComponent from './IconComponent';
import defaultIconData from './defaultIconData';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

function IconRenderer(
  props: IconProps,
  ref: ForwardedRef<SVGSVGElement>
): ReactElement {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: defaultIconData,
  });
}

const ForwardedIconComponent = forwardRef<SVGSVGElement, IconProps>(IconRenderer);

export default ForwardedIconComponent;