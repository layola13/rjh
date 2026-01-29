import React from 'react';
import iconDefault from './icon-module';
import ComponentWrapper from './component-wrapper';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
}

const IconComponent = (
  props: IconProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(ComponentWrapper, {
    ...props,
    ref,
    icon: iconDefault,
  });
};

const ForwardedIconComponent = React.forwardRef<SVGSVGElement, IconProps>(IconComponent);

export default ForwardedIconComponent;