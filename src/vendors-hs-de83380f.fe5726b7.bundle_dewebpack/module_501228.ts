import { forwardRef, createElement, ForwardRefRenderFunction, Ref, SVGProps } from 'react';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconProps extends SVGProps<SVGSVGElement> {
  icon?: unknown;
  ref?: Ref<SVGSVGElement>;
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