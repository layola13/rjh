/**
 * React icon component wrapper with forwarded ref support.
 * 
 * This module creates a React component that wraps an icon component
 * with proper TypeScript types and ref forwarding capabilities.
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * Base props for SVG icon elements
 */
interface SVGProps extends SVGAttributes<SVGSVGElement> {
  /** Additional CSS class name */
  className?: string;
  /** Icon color */
  color?: string;
  /** Icon size in pixels or as string */
  size?: number | string;
  /** Icon title for accessibility */
  title?: string;
}

/**
 * Props for the icon wrapper component
 */
interface IconWrapperProps extends SVGProps {
  /** The underlying icon component to render */
  icon?: React.ComponentType<SVGProps>;
  /** Any additional props to pass through */
  [key: string]: unknown;
}

/**
 * Type definition for the forwarded ref icon component.
 * 
 * This component accepts all standard SVG props and forwards refs
 * to the underlying SVG element, enabling direct DOM manipulation
 * when needed.
 * 
 * @example
 *