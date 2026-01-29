import * as React from 'react';
import iconComponent from './iconComponent';
import defaultIcon from './defaultIcon';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const ForwardedIconComponent = React.forwardRef<HTMLElement, IconProps>(
  (props: IconProps, ref: React.Ref<HTMLElement>) => {
    return React.createElement(iconComponent, {
      ...props,
      ref,
      icon: defaultIcon,
    });
  }
);

ForwardedIconComponent.displayName = 'ForwardedIconComponent';

export default ForwardedIconComponent;