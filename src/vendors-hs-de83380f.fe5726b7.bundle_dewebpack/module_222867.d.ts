/**
 * Backward filled icon component definition
 * Represents a double left arrow icon used for backward navigation
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML tag name */
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
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface BackwardIconConfig {
  /** Icon SVG structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme style */
  theme: string;
}

/**
 * Backward filled icon configuration
 * Double left arrow icon for backward/rewind actions
 */
declare const backwardFilledIcon: BackwardIconConfig;

export default backwardFilledIcon;