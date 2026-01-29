import React, { forwardRef, ForwardRefRenderFunction, Ref } from 'react';
import IconComponent from './IconComponent';
import iconData from './iconData';

interface IconProps extends React.SVGAttributes<SVGElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  [key: string]: unknown;
}

const IconRender: ForwardRefRenderFunction<SVGSVGElement, IconProps> = (
  props: IconProps,
  ref: Ref<SVGSVGElement>
) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData,
  });
};

const ForwardedIcon = forwardRef(IconRender);

export default ForwardedIcon;