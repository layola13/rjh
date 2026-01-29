import { forwardRef, createElement, ForwardRefRenderFunction, Ref, SVGProps } from 'react';
import iconDefinition from './iconDefinition';

interface IconComponentProps extends SVGProps<SVGSVGElement> {
  icon?: any;
  [key: string]: any;
}

interface IconWrapperComponent {
  (props: IconComponentProps): JSX.Element;
}

const renderIcon: ForwardRefRenderFunction<SVGSVGElement, IconComponentProps> = (
  props: IconComponentProps,
  ref: Ref<SVGSVGElement>
) => {
  return createElement(IconWrapperComponent, {
    ...props,
    ref,
    icon: iconDefinition
  });
};

const ForwardedIconComponent = forwardRef(renderIcon);

export default ForwardedIconComponent;