/**
 * Ant Design Icon: Pound Circle Outlined
 * 
 * A circular icon with a pound (£) currency symbol in the center.
 * Part of Ant Design's icon library for financial and currency-related UI elements.
 */

/**
 * SVG path attributes defining the shape and geometry of vector graphics
 */
interface PathAttributes {
  /** SVG path data string defining the shape geometry */
  d: string;
}

/**
 * SVG element attributes for configuring the root svg element
 */
interface SvgAttributes {
  /** Defines the coordinate system and aspect ratio for the SVG viewport */
  viewBox: string;
  /** Controls whether the element can receive focus (accessibility) */
  focusable: string;
}

/**
 * Represents a child element within an SVG structure
 */
interface SvgChildElement {
  /** The HTML/SVG tag name (e.g., 'path', 'circle', 'rect') */
  tag: string;
  /** Attributes specific to this SVG element */
  attrs: PathAttributes;
}

/**
 * Configuration object describing an SVG icon structure
 */
interface IconDefinition {
  /** The root SVG element tag name */
  tag: string;
  /** Attributes for the root SVG element */
  attrs: SvgAttributes;
  /** Array of child SVG elements that compose the icon */
  children: SvgChildElement[];
}

/**
 * Complete icon metadata and structure
 */
interface IconData {
  /** The SVG icon definition including all visual elements */
  icon: IconDefinition;
  /** Unique identifier for the icon (kebab-case naming convention) */
  name: string;
  /** Visual style variant of the icon */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Pound Circle Outlined Icon
 * 
 * Displays a pound sterling (£) currency symbol inside a circular border.
 * Commonly used in financial applications, pricing displays, and currency selectors.
 * 
 * @remarks
 * - Theme: outlined (stroke-based design)
 * - ViewBox: 64 64 896 896
 * - Accessible: focusable disabled for decorative use
 */
declare const poundCircleOutlined: IconData;

export default poundCircleOutlined;