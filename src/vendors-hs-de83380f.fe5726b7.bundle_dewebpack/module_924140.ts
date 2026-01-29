import { forwardRef, createElement, ForwardRefRenderFunction, Ref, SVGProps } from 'react';
import iconData from './iconData';

interface IconComponentProps extends SVGProps<SVGSVGElement> {
  icon?: unknown;
  [key: string]: unknown;
}

const IconComponent: ForwardRefRenderFunction<SVGSVGElement, IconComponentProps> = (
  props: IconComponentProps,
  ref: Ref<SVGSVGElement>
) => {
  return createElement('svg', {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIconComponent = forwardRef(IconComponent);

export default ForwardedIconComponent;