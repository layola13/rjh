import * as React from 'react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

interface IconComponentProps extends IconProps {
  ref?: React.Ref<HTMLElement>;
  icon: React.ComponentType<unknown>;
}

const defaultIcon: React.ComponentType<unknown> = {} as React.ComponentType<unknown>;

const IconWrapper: React.ComponentType<IconProps> = {} as React.ComponentType<IconProps>;

const IconComponent = (props: IconProps, ref: React.Ref<HTMLElement>): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: defaultIcon
  });
};

const ForwardedIconComponent = React.forwardRef<HTMLElement, IconProps>(IconComponent);

export default ForwardedIconComponent;