import * as React from 'react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

interface IconComponent {
  icon: React.ComponentType<unknown> | React.ReactElement;
}

const defaultIcon: React.ComponentType<unknown> = () => null;

const IconWrapper = React.forwardRef<SVGSVGElement, IconProps & IconComponent>(
  (props, ref) => {
    const { icon, ...restProps } = props;

    return React.createElement(
      IconWrapperComponent,
      {
        ...restProps,
        ref,
        icon: icon || defaultIcon,
      }
    );
  }
);

IconWrapper.displayName = 'IconWrapper';

const IconWrapperComponent: React.FC<IconProps & IconComponent & { ref?: React.Ref<SVGSVGElement> }> = ({
  icon,
  ref,
  ...props
}) => {
  if (React.isValidElement(icon)) {
    return React.cloneElement(icon, { ...props, ref } as Record<string, unknown>);
  }

  if (typeof icon === 'function') {
    const IconComponent = icon as React.ComponentType<IconProps & { ref?: React.Ref<SVGSVGElement> }>;
    return <IconComponent {...props} ref={ref} />;
  }

  return null;
};

export default IconWrapper;