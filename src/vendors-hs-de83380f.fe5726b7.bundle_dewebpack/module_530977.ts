import * as React from 'react';
import IconBase from './IconBase';
import iconDefault from './iconDefault';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon?: React.ReactNode;
  size?: number | string;
  className?: string;
}

const IconComponent = (
  props: IconProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(IconBase, {
    ...props,
    ref,
    icon: iconDefault
  });
};

const ForwardedIconComponent = React.forwardRef<SVGSVGElement, IconProps>(
  IconComponent
);

export default ForwardedIconComponent;