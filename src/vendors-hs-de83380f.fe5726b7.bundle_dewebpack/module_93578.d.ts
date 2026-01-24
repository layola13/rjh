/**
 * Ant Design Icon: CI Circle Filled
 * 
 * A filled circle icon containing "CI" text, commonly used to represent
 * continuous integration or similar concepts in development workflows.
 */

/**
 * SVG attributes interface for icon elements
 */
interface SvgAttributes {
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
 * SVG child element representing a path
 */
interface SvgPathChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure interface defining the complete icon schema
 */
interface IconStructure {
  /** Root SVG element configuration */
  icon: {
    /** HTML tag name */
    tag: 'svg';
    /** SVG element attributes */
    attrs: SvgAttributes;
    /** Array of child elements (paths, shapes, etc.) */
    children: SvgPathChild[];
  };
  /** Unique identifier name for the icon */
  name: string;
  /** Visual theme variant of the icon */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * CI Circle filled icon definition
 * 
 * This icon displays a circular badge with "CI" letters inside,
 * rendered in a filled style. The icon uses a 896x896 viewBox
 * coordinate system with standard Ant Design icon specifications.
 * 
 * @example
 *