import { forwardRef, createElement, ForwardRefRenderFunction, Ref, SVGProps } from 'react';
import iconData from './icon-data';
import IconWrapper from './IconWrapper';

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
}

const IconComponent: ForwardRefRenderFunction<SVGSVGElement, IconProps> = (props, ref) => {
  return createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;