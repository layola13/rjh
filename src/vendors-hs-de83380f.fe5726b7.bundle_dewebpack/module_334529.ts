import React from 'react';
import iconDefault from './icon';
import ComponentWrapper from './ComponentWrapper';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
}

const ForwardedIconComponent = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return React.createElement(ComponentWrapper, {
      ...props,
      ref,
      icon: iconDefault,
    });
  }
);

ForwardedIconComponent.displayName = 'ForwardedIconComponent';

export default ForwardedIconComponent;