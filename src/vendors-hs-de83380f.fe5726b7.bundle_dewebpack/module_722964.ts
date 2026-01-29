import React from 'react';
import type { Ref, ReactElement } from 'react';
import iconComponent from './iconComponent';
import BaseIcon from './BaseIcon';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const IconForwardRefComponent = (
  props: IconProps,
  ref: Ref<SVGSVGElement>
): ReactElement => {
  return React.createElement(BaseIcon, {
    ...props,
    ref,
    icon: iconComponent
  });
};

const ForwardedIcon = React.forwardRef<SVGSVGElement, IconProps>(
  IconForwardRefComponent
);

export default ForwardedIcon;