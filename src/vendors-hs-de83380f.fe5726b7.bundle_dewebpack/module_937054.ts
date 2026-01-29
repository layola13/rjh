import { forwardRef, createElement, ForwardRefRenderFunction, Ref, ReactElement } from 'react';
import type { IconProps } from './types';
import iconData from './icon-data';
import IconComponent from './IconComponent';

interface IconWrapperProps extends IconProps {
  ref?: Ref<HTMLElement>;
}

const renderIcon: ForwardRefRenderFunction<HTMLElement, IconProps> = (
  props: IconProps,
  ref: Ref<HTMLElement>
): ReactElement => {
  return createElement(IconComponent, {
    ...props,
    ref,
    icon: iconData,
  });
};

const ForwardedIcon = forwardRef(renderIcon);

export default ForwardedIcon;