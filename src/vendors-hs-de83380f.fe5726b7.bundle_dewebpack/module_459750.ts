import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import iconComponent from './445959';
import iconData from './188165';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const createIconElement = (
  props: IconProps,
  ref: ForwardedRef<SVGSVGElement>
): ReactElement => {
  return React.createElement(iconComponent, {
    ...props,
    ref,
    icon: iconData
  });
};

const IconComponent = forwardRef<SVGSVGElement, IconProps>(createIconElement);

export default IconComponent;