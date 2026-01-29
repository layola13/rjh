import React from 'react';
import iconComponent from './iconComponent';
import baseIcon from './baseIcon';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

/**
 * Forward ref component that wraps an icon with base icon functionality
 */
const IconWithRef = React.forwardRef<SVGSVGElement, IconProps>(
  (props: IconProps, ref: React.Ref<SVGSVGElement>) => {
    return React.createElement(baseIcon, {
      ...props,
      ref,
      icon: iconComponent,
    });
  }
);

IconWithRef.displayName = 'IconWithRef';

export default IconWithRef;