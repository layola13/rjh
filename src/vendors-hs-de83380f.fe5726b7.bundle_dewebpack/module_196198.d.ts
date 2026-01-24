/**
 * Hourglass icon component configuration for two-tone theme
 * @module HourglassIcon
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon render result structure
 */
interface IconRenderResult {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths) */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Icon render function
   * @param primaryColor - Primary color for the icon (typically the main outline)
   * @param secondaryColor - Secondary color for the icon (typically the fill/background)
   * @returns SVG structure object
   */
  icon: (primaryColor: string, secondaryColor: string) => IconRenderResult;
  
  /** Icon name identifier */
  name: 'hourglass';
  
  /** Icon theme variant */
  theme: 'twotone';
}

/**
 * Default hourglass icon export
 */
declare const HourglassIcon: IconConfig;

export default HourglassIcon;