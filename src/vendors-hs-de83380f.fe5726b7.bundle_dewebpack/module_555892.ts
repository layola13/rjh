import React, { forwardRef, ForwardRefRenderFunction, Ref } from 'react';
import IconBase from './IconBase';
import iconDefinition from './iconDefinition';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  spin?: boolean;
  rotate?: number;
  [key: string]: unknown;
}

const IconComponent: ForwardRefRenderFunction<SVGSVGElement, IconProps> = (
  props: IconProps,
  ref: Ref<SVGSVGElement>
) => {
  return React.createElement(IconBase, {
    ...props,
    ref,
    icon: iconDefinition
  });
};

const ForwardedIconComponent = forwardRef(IconComponent);

export default ForwardedIconComponent;