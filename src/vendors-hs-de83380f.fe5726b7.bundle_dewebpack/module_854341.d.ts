/**
 * Exclamation Circle Filled Icon Definition
 * Ant Design Icon Component
 */

/**
 * SVG attribute configuration for the icon element
 */
interface SvgAttributes {
  /** SVG viewBox defining the coordinate system */
  viewBox: string;
  /** Determines if the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
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
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** Root SVG element tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, circles, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** SVG icon configuration object */
  icon: IconConfig;
  /** Semantic name of the icon */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Exclamation circle icon with filled theme
 * Used for warnings, alerts, and important information indicators
 */
declare const exclamationCircleFilledIcon: IconDefinition;

export default exclamationCircleFilledIcon;