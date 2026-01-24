/**
 * Left Circle Filled Icon Definition
 * A circular icon with a left-pointing chevron/arrow inside
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Array of child SVG elements */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** SVG icon definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Left circle filled icon - displays a filled circle with a left-pointing chevron
 * Commonly used for navigation, pagination, or directional indicators
 */
declare const iconConfig: IconConfig;

export default iconConfig;