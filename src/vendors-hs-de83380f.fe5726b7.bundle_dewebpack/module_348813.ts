import React, { forwardRef, ForwardRefRenderFunction, RefAttributes } from 'react';
import IconBase from './IconBase';
import iconData from './iconData';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const renderIcon: ForwardRefRenderFunction<SVGSVGElement, IconProps> = (
  props: IconProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(IconBase, {
    ...props,
    ref,
    icon: iconData
  });
};

const IconComponent = forwardRef(renderIcon);

export default IconComponent;