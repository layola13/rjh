/**
 * Console SQL icon component definition
 * Ant Design icon for SQL console/terminal representation
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
  focusable?: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * Generic attributes interface for SVG child elements
 */
interface ElementAttrs {
  [key: string]: string | undefined;
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
    /** Child elements of the SVG */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: "outlined" | "filled" | "twotone";
}

/**
 * Console SQL icon definition
 * Represents a monitor/screen with SQL text, typically used for database consoles
 */
declare const consoleSqlIcon: IconDefinition;

export default consoleSqlIcon;