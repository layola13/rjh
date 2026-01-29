import * as React from 'react';
import IconComponent from './IconComponent';
import iconData from './iconData';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  color?: string;
  [key: string]: unknown;
}

const ForwardedIconComponent = React.forwardRef<SVGSVGElement, IconProps>(
  (props: IconProps, ref: React.Ref<SVGSVGElement>) => {
    return React.createElement(IconComponent, {
      ...props,
      ref,
      icon: iconData
    });
  }
);

ForwardedIconComponent.displayName = 'ForwardedIconComponent';

export default ForwardedIconComponent;