import React, { forwardRef, ForwardRefRenderFunction, Ref } from 'react';
import IconComponent from './IconComponent';
import iconDefaultExport from './iconDefaultExport';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const IconRenderFunction: ForwardRefRenderFunction<HTMLElement, IconProps> = (
  props: IconProps,
  ref: Ref<HTMLElement>
) => {
  return React.createElement(IconComponent, {
    ...props,
    ref,
    icon: iconDefaultExport,
  });
};

const ForwardedIcon = forwardRef(IconRenderFunction);

export default ForwardedIcon;