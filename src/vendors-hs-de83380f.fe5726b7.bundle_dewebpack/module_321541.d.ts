/**
 * Reddit Square filled icon component definition
 * @module RedditSquareFilledIcon
 */

/**
 * SVG attributes interface for icon elements
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path attributes interface for SVG path elements
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
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
 * Icon configuration interface
 */
interface IconConfig {
  /** SVG root element tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: string;
}

/**
 * Reddit Square filled icon definition
 * 
 * Represents a Reddit logo inside a filled square shape.
 * Part of the filled icon theme collection.
 */
declare const RedditSquareFilled: IconDefinition;

export default RedditSquareFilled;