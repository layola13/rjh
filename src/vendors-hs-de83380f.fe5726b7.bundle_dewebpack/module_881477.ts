import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import iconComponent from './icon-component';
import IconWrapper from './icon-wrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const IconComponentWithRef = (
  props: IconProps,
  ref: ForwardedRef<SVGSVGElement>
): ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconComponent
  });
};

const ForwardedIconComponent = forwardRef<SVGSVGElement, IconProps>(IconComponentWithRef);

export default ForwardedIconComponent;