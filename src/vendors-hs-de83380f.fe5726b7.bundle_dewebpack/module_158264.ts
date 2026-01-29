import * as React from 'react';
import { ForwardRefExoticComponent, RefAttributes, forwardRef, createElement } from 'react';
import iconComponent from './iconComponent';
import BaseIcon from './BaseIcon';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

type IconRef = SVGSVGElement;

const IconComponent = (
  props: IconProps,
  ref: React.Ref<IconRef>
): React.ReactElement => {
  return createElement(BaseIcon, {
    ...props,
    ref,
    icon: iconComponent,
  });
};

const ForwardedIcon: ForwardRefExoticComponent<
  IconProps & RefAttributes<IconRef>
> = forwardRef(IconComponent);

export default ForwardedIcon;