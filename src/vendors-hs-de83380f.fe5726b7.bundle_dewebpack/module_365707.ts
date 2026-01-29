import React, { forwardRef, ForwardRefRenderFunction, ReactElement } from 'react';
import iconDefinition from './iconDefinition';
import IconComponent from './IconComponent';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  spin?: boolean;
  rotate?: number;
  twoToneColor?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const IconRender: ForwardRefRenderFunction<SVGSVGElement, IconProps> = (
  props,
  ref
): ReactElement => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconDefinition,
  });
};

const ForwardedIcon = forwardRef<SVGSVGElement, IconProps>(IconRender);

export default ForwardedIcon;