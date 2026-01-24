/**
 * Compass icon component configuration for twotone theme
 * Provides SVG path data and styling attributes for rendering a compass icon
 */

/**
 * Icon attributes for SVG elements
 */
interface IconAttrs {
  /** SVG viewBox coordinates */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** SVG path definition */
  d?: string;
  /** Fill color for the path */
  fill?: string;
}

/**
 * SVG child element (typically a path)
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
}

/**
 * SVG icon structure
 */
interface SvgIcon {
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
   * Icon rendering function
   * @param primaryColor - Primary fill color for main paths
   * @param secondaryColor - Secondary fill color for accent paths
   * @returns SVG icon structure with applied colors
   */
  icon: (primaryColor: string, secondaryColor: string) => SvgIcon;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme variant */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * Default export: Compass icon configuration in twotone theme
 */
declare const compassIconConfig: IconConfig;

export default compassIconConfig;