/**
 * Icon configuration interface for SVG-based icons
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element is focusable */
  focusable: string;
}

/**
 * Path element attributes for SVG rendering
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
  /** Fill color for the path element */
  fill: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon SVG structure definition
 */
interface IconSvg {
  /** Root SVG tag */
  tag: string;
  /** SVG root attributes */
  attrs: IconAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generates the SVG icon structure
   * @param primaryColor - Primary fill color for the main icon paths
   * @param secondaryColor - Secondary fill color for accent/detail paths
   * @returns SVG structure object containing tag, attributes, and children
   */
  icon(primaryColor: string, secondaryColor: string): IconSvg;
  
  /** Semantic name of the icon */
  name: string;
  
  /** Visual theme variant of the icon */
  theme: string;
}

/**
 * Calendar icon configuration with twotone theme
 * Renders a calendar icon with customizable primary and secondary colors
 */
declare const calendarIcon: IconConfig;

export default calendarIcon;