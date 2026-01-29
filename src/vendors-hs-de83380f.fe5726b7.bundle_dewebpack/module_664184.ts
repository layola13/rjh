import { forwardRef, createElement, ForwardRefRenderFunction, Ref, ComponentPropsWithoutRef } from 'react';
import iconDefault from './icon-module-282971';

interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  icon?: unknown;
}

const IconComponent: ForwardRefRenderFunction<SVGSVGElement, IconComponentProps> = (props, ref: Ref<SVGSVGElement>) => {
  return createElement('svg', {
    ...props,
    ref,
    icon: iconDefault
  });
};

const ForwardedIconComponent = forwardRef(IconComponent);

export default ForwardedIconComponent;