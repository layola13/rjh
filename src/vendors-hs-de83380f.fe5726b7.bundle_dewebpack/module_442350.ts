import { forwardRef, createElement, ForwardRefRenderFunction, Ref, ReactElement } from 'react';
import type { IconProps } from './types';
import iconDefinition from './iconDefinition';
import IconComponent from './IconComponent';

interface IconComponentProps extends IconProps {
  icon?: unknown;
  ref?: Ref<unknown>;
}

const renderIcon: ForwardRefRenderFunction<unknown, IconComponentProps> = (
  props: IconComponentProps,
  ref: Ref<unknown>
): ReactElement => {
  return createElement(IconComponent, {
    ...props,
    ref,
    icon: iconDefinition,
  });
};

const ForwardedIcon = forwardRef(renderIcon);

export default ForwardedIcon;