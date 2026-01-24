/**
 * Arrow Right icon configuration
 * Theme: outlined
 */
export interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
  focusable?: string;
  /** Path definition for SVG shapes */
  d?: string;
}

/**
 * Icon node structure representing SVG elements
 */
export interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
  /** Child nodes (optional) */
  children?: IconNode[];
}

/**
 * Complete icon definition structure
 */
export interface IconDefinition {
  /** Icon SVG structure */
  icon: IconNode;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Arrow Right icon - Outlined theme
 * 
 * @description A right-pointing arrow icon commonly used for navigation,
 * pagination, or indicating forward movement in UI components.
 * 
 * @example
 *