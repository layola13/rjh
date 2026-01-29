import { forwardRef, createElement, ForwardRefRenderFunction, RefAttributes } from 'react';
import type { IconComponentProps } from './types';
import iconData from './iconData';
import IconWrapper from './IconWrapper';

interface IconProps extends IconComponentProps {
  ref?: React.Ref<HTMLElement>;
}

const IconComponent: ForwardRefRenderFunction<HTMLElement, IconComponentProps> = (
  props: IconComponentProps,
  ref: React.Ref<HTMLElement>
) => {
  return createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIcon = forwardRef(IconComponent);

export default ForwardedIcon;