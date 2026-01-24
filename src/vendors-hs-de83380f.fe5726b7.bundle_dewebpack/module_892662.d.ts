/**
 * SVG icon definition for a line icon (horizontal line/minus symbol)
 * Used in icon libraries for rendering vector graphics
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes for SVG rendering
 */
interface PathAttrs {
  /** SVG path data string defining the shape geometry */
  d: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon structure defining the SVG markup
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Array of child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface LineIconConfig {
  /** SVG icon definition with markup structure */
  icon: IconDefinition;
  /** Semantic name identifier for the icon */
  name: string;
  /** Visual style theme variant */
  theme: string;
}

/**
 * Line icon configuration
 * Represents a horizontal line (minus/subtract) icon in outlined style
 */
declare const lineIcon: LineIconConfig;

export default lineIcon;