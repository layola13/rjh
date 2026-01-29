import { forwardRef, createElement, Ref, ReactElement } from 'react';
import iconDefault from './icon-module';
import ComponentWrapper from './component-wrapper';

interface IconProps {
  [key: string]: unknown;
}

function createIconComponent(
  props: IconProps,
  ref: Ref<unknown>
): ReactElement {
  return createElement(ComponentWrapper, {
    ...props,
    ref,
    icon: iconDefault
  });
}

const ForwardedIconComponent = forwardRef(createIconComponent);

export default ForwardedIconComponent;