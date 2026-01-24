/**
 * Swap Right Icon Definition
 * An outlined arrow icon pointing right, typically used for swap or exchange actions
 */

/**
 * SVG path attributes interface
 */
interface SVGPathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SVGChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SVGPathAttributes;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** Root SVG tag */
  tag: string;
  /** SVG root element attributes */
  attrs: SVGAttributes;
  /** Child elements array */
  children: SVGChild[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** Icon SVG structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon visual style theme */
  theme: string;
}

/**
 * Swap Right icon definition object
 * Represents a right-pointing arrow used for swap/exchange operations
 */
declare const swapRightIcon: IconDefinition;

export default swapRightIcon;