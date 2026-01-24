/**
 * Icon definition for an Ant Design "insert-row-below" outlined icon
 * Represents the visual data structure for rendering an SVG icon
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinate system */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d?: string;
}

/**
 * Generic attributes for SVG child elements
 */
interface ElementAttributes {
  [key: string]: string | undefined;
}

/**
 * SVG child element structure (recursive)
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes | PathAttributes | ElementAttributes;
  /** Nested child elements */
  children?: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: "svg";
    /** SVG root attributes */
    attrs: SvgAttributes;
    /** Child elements (defs, paths, etc.) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon visual style theme */
  theme: "outlined" | "filled" | "twotone";
}

/**
 * Insert Row Below icon definition
 * An outlined icon representing the action to insert a new row below the current position
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;