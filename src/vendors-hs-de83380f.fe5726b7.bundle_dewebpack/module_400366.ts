import React, { forwardRef, ForwardedRef, ReactElement } from 'react';
import iconData from './icon-data';
import IconWrapper from './IconWrapper';

interface IconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

/**
 * Renders an icon component with the specified props
 */
const IconComponent = (
  props: IconProps,
  ref: ForwardedRef<SVGSVGElement>
): ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData
  });
};

const ForwardedIconComponent = forwardRef(IconComponent);

export default ForwardedIconComponent;