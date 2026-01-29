import { forwardRef, createElement, Ref, ReactElement } from 'react';
import iconData from './icon-data';
import IconWrapper from './IconWrapper';

interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

function IconComponent(
  props: IconProps,
  ref: Ref<SVGSVGElement>
): ReactElement {
  return createElement(IconWrapper, {
    ...props,
    ref,
    icon: iconData,
  });
}

const ForwardedIcon = forwardRef<SVGSVGElement, IconProps>(IconComponent);

export default ForwardedIcon;