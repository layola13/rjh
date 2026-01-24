/**
 * SVG icon definition for a node-collapse icon in outlined theme
 * Represents a collapsible tree node indicator with arrow and connection lines
 */
interface IconAttributes {
  /** SVG viewBox coordinates defining the canvas area */
  viewBox?: string;
  /** Prevents the element from receiving keyboard focus */
  focusable?: string;
}

/**
 * SVG path element attributes
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * Generic SVG element node structure
 */
interface SvgElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes as key-value pairs */
  attrs: Record<string, string> | IconAttributes | PathAttributes;
  /** Child elements (optional) */
  children?: SvgElement[];
}

/**
 * Icon definition structure for Ant Design icon components
 */
interface IconDefinition {
  /** Root SVG element configuration */
  icon: {
    /** SVG tag identifier */
    tag: 'svg';
    /** SVG root attributes including viewBox and accessibility props */
    attrs: IconAttributes;
    /** Child elements including defs, styles, and path elements */
    children: SvgElement[];
  };
  /** Semantic name identifier for the icon */
  name: string;
  /** Visual style theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Node collapse icon definition
 * Used to represent a collapsible tree node in outlined style
 * 
 * Visual description:
 * - Arrow pointing left indicating collapse action
 * - Connection lines showing node relationship in tree structure
 * - Outlined style with stroke paths
 * 
 * @example
 *