/**
 * Icon configuration for a left-circle icon with two-tone theme
 * @module LeftCircleIcon
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure returned by the icon function
 */
interface IconStructure {
  /** Root SVG tag */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths) */
  children: SvgChild[];
}

/**
 * Icon function signature
 * @param primaryColor - Primary color for the icon
 * @param secondaryColor - Secondary color for the icon (used in two-tone theme)
 * @returns SVG icon structure
 */
type IconFunction = (primaryColor: string, secondaryColor: string) => IconStructure;

/**
 * Left circle icon configuration object
 */
interface LeftCircleIconConfig {
  /** Function that generates the icon structure */
  icon: IconFunction;
  /** Icon name identifier */
  name: string;
  /** Icon theme type */
  theme: string;
}

/**
 * Default export: Left circle icon configuration
 */
declare const leftCircleIcon: LeftCircleIconConfig;

export default leftCircleIcon;