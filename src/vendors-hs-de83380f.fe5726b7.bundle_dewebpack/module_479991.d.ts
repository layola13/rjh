/**
 * Icon Component Module
 * 
 * A React icon component that wraps an icon definition with a forwardable ref.
 * This module follows the Ant Design Icons pattern for creating icon components.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Icon definition interface containing SVG path data and metadata
 */
interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** Icon theme variant (e.g., 'filled', 'outlined', 'twotone') */
  theme?: string;
  /** SVG icon data structure */
  icon: {
    /** Icon tag name (typically 'svg') */
    tag: string;
    /** SVG attributes like viewBox, width, height */
    attrs: Record<string, string | number>;
    /** Child elements/paths of the SVG */
    children: Array<{
      tag: string;
      attrs: Record<string, unknown>;
    }>;
  };
}

/**
 * Base icon component props that can be extended
 */
interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  /** Custom spin animation */
  spin?: boolean;
  /** Icon rotation in degrees */
  rotate?: number;
  /** Whether the icon should have two-tone color effect */
  twoToneColor?: string;
}

/**
 * Props for the icon wrapper component
 * 
 * Combines base icon props with the icon definition and additional React props
 */
interface IconComponentProps extends IconBaseProps {
  /** Icon definition object containing SVG data */
  icon: IconDefinition;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Tab index for accessibility */
  tabIndex?: number;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
}

/**
 * Type definition for the icon component with ref forwarding support
 * 
 * This component renders an icon based on the provided icon definition,
 * supporting all standard SVG attributes and ref forwarding to the underlying SVG element.
 * 
 * @example
 *