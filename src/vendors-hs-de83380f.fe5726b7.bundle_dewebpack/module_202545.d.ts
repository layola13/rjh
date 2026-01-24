/**
 * Icon configuration for a play-square icon with two-tone theme
 * Module: module_202545
 * Original ID: 202545
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG element child node
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * SVG root attributes
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG icon structure
 */
interface IconSvg {
  /** Root SVG tag */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generates the SVG icon structure
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for two-tone effect
   * @returns SVG icon configuration object
   */
  icon(primaryColor: string, secondaryColor: string): IconSvg;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme style */
  theme: string;
}

/**
 * Play square icon with two-tone theme
 * Displays a play button inside a square outline
 */
declare const iconConfig: IconConfig;

export default iconConfig;