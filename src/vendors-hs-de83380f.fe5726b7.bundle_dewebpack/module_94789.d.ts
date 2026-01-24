/**
 * Ant Design Icon: Home (Filled)
 * 
 * A filled home icon component definition for Ant Design icon system.
 * Represents a house with a roof and door, commonly used for navigation to homepage.
 */

/**
 * SVG attributes interface for icon elements
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path attributes interface for SVG path elements
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element (path) structure
 */
interface SVGChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element configuration */
  icon: {
    /** HTML tag name */
    tag: 'svg';
    /** SVG element attributes */
    attrs: SVGAttributes;
    /** Child elements (paths) that make up the icon */
    children: SVGChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Home icon (filled theme) definition
 * 
 * @description Complete home icon configuration with SVG path data
 * @example
 *