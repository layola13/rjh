import React, { forwardRef, ForwardRefRenderFunction } from 'react';

/**
 * Props for the icon component
 * Extends standard SVG element properties
 */
interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /** Additional CSS class names */
  className?: string;
  /** Icon size */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Custom style object */
  style?: React.CSSProperties;
}

/**
 * Icon data/configuration imported from external module
 * Contains the SVG path data and metadata for the icon
 */
interface IconDefinition {
  name: string;
  theme?: string;
  icon: {
    tag: string;
    attrs: Record<string, unknown>;
    children: unknown[];
  };
}

/**
 * Base icon component that renders SVG icons
 */
declare const IconBase: React.ComponentType<IconComponentProps & { icon: IconDefinition }>;

/**
 * Specific icon definition for this component
 */
declare const iconDefinition: IconDefinition;

/**
 * Forward ref render function for the icon component
 * Combines props with the specific icon definition
 */
const IconComponent: ForwardRefRenderFunction<SVGSVGElement, IconComponentProps> = (
  props,
  ref
) => {
  return React.createElement(IconBase, {
    ...props,
    ref,
    icon: iconDefinition,
  });
};

/**
 * Icon component with forward ref support
 * Allows parent components to access the underlying SVG element
 */
const IconWithRef = forwardRef(IconComponent);

export default IconWithRef;