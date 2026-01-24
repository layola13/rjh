/**
 * Icon component configuration for a fund/chart icon in twotone theme
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinate system */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Path attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure returned by the icon function
 */
interface IconStructure {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Array of child path elements */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generates the icon structure with specified colors
   * @param primaryColor - Primary fill color for main paths
   * @param secondaryColor - Secondary fill color for accent paths
   * @returns SVG icon structure
   */
  icon: (primaryColor: string, secondaryColor: string) => IconStructure;
  
  /** Icon identifier name */
  name: 'fund';
  
  /** Icon theme variant */
  theme: 'twotone';
}

/**
 * Default export: Fund chart icon configuration in twotone theme
 * Displays a framed line chart trending upward
 */
declare const iconConfig: IconConfig;

export default iconConfig;