import { forwardRef, createElement, ForwardRefRenderFunction, Ref, SVGProps } from 'react';
import iconData from './iconData';

interface IconProps extends SVGProps<SVGSVGElement> {
  icon?: unknown;
  [key: string]: unknown;
}

const IconComponent: ForwardRefRenderFunction<SVGSVGElement, IconProps> = (
  props: IconProps,
  ref: Ref<SVGSVGElement>
) => {
  return createElement('svg', {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;