import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import iconComponent from './icon-component';
import IconWrapper from './IconWrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

function createIconComponent(
  props: IconProps,
  ref: ForwardedRef<SVGSVGElement>
): ReactElement {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconComponent
  });
}

const ForwardedIconComponent = forwardRef<SVGSVGElement, IconProps>(createIconComponent);

export default ForwardedIconComponent;