import React, { forwardRef, ForwardRefRenderFunction, ReactElement } from 'react';
import IconComponent from './IconComponent';
import iconData from './iconData';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const IconRender: ForwardRefRenderFunction<SVGSVGElement, IconProps> = (
  props: IconProps,
  ref: React.Ref<SVGSVGElement>
): ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData
  });
};

const IconForwardRef = forwardRef(IconRender);

export default IconForwardRef;