/**
 * React component wrapper for an icon component
 * 
 * This module provides a forwarded ref icon component that wraps a base icon
 * with additional props spreading functionality.
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * Base props for the icon component
 */
interface IconBaseProps {
  /** Optional CSS class name */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
  /** Icon size (width and height) */
  size?: number | string;
  /** Icon color */
  color?: string;
  /** Optional title for accessibility */
  title?: string;
  /** Optional click handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  [key: string]: any;
}

/**
 * Props for the forwarded icon component
 */
interface IconComponentProps extends IconBaseProps {
  /** Ref to be forwarded to the underlying element */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * Forwarded ref icon component type
 * 
 * A React component that renders an icon with forwarded ref support.
 * All props are spread to the base icon component, with the icon data
 * injected automatically.
 */
type IconComponent = ForwardRefExoticComponent<
  PropsWithoutRef<IconBaseProps> & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: A forwarded ref icon component
 * 
 * This component:
 * - Accepts all standard icon props
 * - Forwards refs to the underlying SVG element
 * - Automatically injects icon data from the imported icon definition
 * - Spreads all additional props to the base icon component
 */
declare const IconComponent: IconComponent;

export default IconComponent;