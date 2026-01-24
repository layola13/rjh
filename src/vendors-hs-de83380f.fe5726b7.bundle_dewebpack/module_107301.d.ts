import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * Icon component props
 * Extends standard SVG element properties with additional icon-specific configurations
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels or CSS size string
   */
  size?: number | string;
  
  /**
   * Icon color, accepts any valid CSS color value
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Icon rotation in degrees
   */
  rotate?: number;
  
  /**
   * Spin animation flag
   */
  spin?: boolean;
}

/**
 * Icon definition interface
 * Contains the raw SVG path data and metadata for rendering icons
 */
export interface IconDefinition {
  /**
   * Icon name identifier
   */
  name: string;
  
  /**
   * Icon theme (e.g., 'outlined', 'filled', 'two-tone')
   */
  theme: string;
  
  /**
   * SVG icon data including viewBox and path definitions
   */
  icon: {
    /**
     * SVG tag name
     */
    tag: string;
    
    /**
     * SVG attributes (e.g., viewBox, width, height)
     */
    attrs: Record<string, string | number>;
    
    /**
     * SVG child elements (paths, groups, etc.)
     */
    children: Array<{
      tag: string;
      attrs: Record<string, string | number>;
    }>;
  };
}

/**
 * Icon component type
 * A forward ref component that renders an SVG icon based on icon definition
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * Default export: Icon component
 * 
 * @remarks
 * This is a React component that wraps an icon definition with customizable props.
 * It forwards refs to the underlying SVG element for direct DOM access.
 * 
 * @example
 *