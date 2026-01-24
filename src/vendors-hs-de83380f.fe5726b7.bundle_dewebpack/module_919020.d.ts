/**
 * Ant Design Icon: Function (Outlined Theme)
 * Represents a function symbol icon, typically used to indicate functional operations or mathematical functions.
 */

/**
 * SVG attributes for defining the viewBox and focus behavior
 */
interface SvgAttrs {
  /** Defines the position and dimension for the SVG viewport */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes containing the SVG path data
 */
interface PathAttrs {
  /** SVG path commands defining the shape */
  d: string;
}

/**
 * Generic attributes object for SVG child elements
 */
interface ElementAttrs {
  [key: string]: unknown;
}

/**
 * Represents a child element within the SVG structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: ElementAttrs | PathAttrs;
  /** Nested child elements (optional) */
  children?: SvgChild[];
}

/**
 * Icon structure following Ant Design icon specification
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: "svg";
    /** SVG element attributes */
    attrs: SvgAttrs;
    /** Child elements including defs and paths */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: "outlined" | "filled" | "twotone";
}

/**
 * Function icon component definition
 * Exports the complete icon configuration for the "function" icon in outlined theme
 */
declare const functionIcon: IconDefinition;

export default functionIcon;