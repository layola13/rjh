import * as React from 'react';
import iconComponent from './iconComponent';
import BaseIcon from './BaseIcon';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const IconForwardRef = (
  props: IconProps,
  ref: React.Ref<HTMLElement>
): React.ReactElement => {
  return React.createElement(BaseIcon, {
    ...props,
    ref,
    icon: iconComponent
  });
};

const ForwardedIcon = React.forwardRef<HTMLElement, IconProps>(IconForwardRef);

export default ForwardedIcon;