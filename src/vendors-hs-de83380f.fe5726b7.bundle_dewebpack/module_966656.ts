import * as React from 'react';
import iconComponent from './iconComponent';
import baseIcon from './baseIcon';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon?: React.ComponentType;
  [key: string]: unknown;
}

const ForwardedIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props: IconProps, ref: React.Ref<SVGSVGElement>) => {
    return React.createElement(baseIcon, {
      ...props,
      ref,
      icon: iconComponent,
    });
  }
);

ForwardedIcon.displayName = 'ForwardedIcon';

export default ForwardedIcon;