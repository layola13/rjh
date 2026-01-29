import React, { forwardRef, ForwardRefRenderFunction, RefObject } from 'react';
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

const IconRenderFunction: ForwardRefRenderFunction<SVGSVGElement, IconProps> = (
  props: IconProps,
  ref: RefObject<SVGSVGElement>
) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: defaultIconData,
  });
};

const ForwardedIcon = forwardRef(IconRenderFunction);

export default ForwardedIcon;