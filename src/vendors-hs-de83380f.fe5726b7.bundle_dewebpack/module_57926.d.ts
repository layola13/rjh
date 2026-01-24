/**
 * Right circle filled icon component configuration
 * @module RightCircleFilledIcon
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** ViewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChildElement {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** HTML tag name */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child elements array */
  children: SvgChildElement[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Right circle filled icon definition
 * Represents a circular button with a right-pointing arrow
 */
declare const rightCircleFilledIcon: IconDefinition;

export default rightCircleFilledIcon;