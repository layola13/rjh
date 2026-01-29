import React from 'react';
import iconDefault from './icon';
import ComponentWrapper from './ComponentWrapper';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const IconComponent = (
  props: IconProps,
  ref: React.Ref<HTMLElement>
): React.ReactElement => {
  return React.createElement(ComponentWrapper, {
    ...props,
    ref,
    icon: iconDefault
  });
};

const ForwardedIconComponent = React.forwardRef(IconComponent);

export default ForwardedIconComponent;