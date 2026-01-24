/**
 * Clear icon definition (outlined theme)
 * Module ID: 317559
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d?: string;
}

/**
 * Generic attributes interface for SVG child elements
 */
interface ElementAttrs {
  [key: string]: unknown;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs | PathAttrs | ElementAttrs;
  /** Nested child elements */
  children?: SvgChild[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: "svg";
    /** SVG root attributes */
    attrs: SvgAttrs;
    /** Child elements (defs, paths, etc.) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: "outlined" | "filled" | "twotone";
}

/**
 * Clear icon definition with outlined theme
 * Represents a delete/clear action icon with trash bin visual
 */
declare const clearIconDefinition: IconDefinition;

export default clearIconDefinition;