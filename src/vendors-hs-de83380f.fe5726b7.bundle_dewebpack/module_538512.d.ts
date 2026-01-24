import React, { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Icon component properties
 * Extends standard React component props with icon-specific attributes
 */
interface IconComponentProps {
  /** Icon size in pixels or CSS unit */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: unknown;
}

/**
 * Reference type for the icon element
 */
type IconRef = SVGSVGElement;

/**
 * Icon data structure containing SVG path and metadata
 */
interface IconDefinition {
  name: string;
  theme: string;
  icon: {
    tag: string;
    attrs: Record<string, string | number>;
    children: Array<{
      tag: string;
      attrs: Record<string, string | number>;
    }>;
  };
}

/**
 * Base icon renderer component (imported from module 445959)
 */
declare const IconBase: React.ComponentType<IconComponentProps & { icon: IconDefinition; ref?: React.Ref<IconRef> }>;

/**
 * Specific icon definition (imported from module 888109)
 */
declare const iconDefinition: IconDefinition;

/**
 * Icon component render function
 * Combines user props with predefined icon definition
 * 
 * @param props - Component properties
 * @param ref - Forwarded ref to underlying SVG element
 * @returns Rendered icon component
 */
const renderIconComponent = (
  props: IconComponentProps,
  ref: React.Ref<IconRef>
): React.ReactElement => {
  return React.createElement(IconBase, {
    ...props,
    ref,
    icon: iconDefinition
  });
};

/**
 * Forward-ref wrapped icon component
 * Allows parent components to access the underlying SVG element
 */
const IconComponent: ForwardRefExoticComponent<IconComponentProps & RefAttributes<IconRef>> = 
  forwardRef(renderIconComponent);

export default IconComponent;