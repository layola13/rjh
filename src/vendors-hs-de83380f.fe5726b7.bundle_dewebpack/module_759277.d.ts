/**
 * Right arrow icon definition for Ant Design icon system
 * @module RightOutlined
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
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * Generic SVG child element structure
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Array of child SVG elements */
  children: SvgChildElement[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** Icon SVG structure definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: "outlined" | "filled" | "twotone";
}

/**
 * Right arrow outlined icon configuration
 * Used in Ant Design icon library for directional navigation
 */
declare const rightOutlinedIcon: IconConfig;

export default rightOutlinedIcon;