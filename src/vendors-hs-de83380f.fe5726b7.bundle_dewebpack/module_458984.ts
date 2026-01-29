import * as React from 'react';
import iconComponent from './iconComponent';
import BaseIcon from './BaseIcon';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

const IconForwardRefComponent = (
  props: IconProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement => {
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