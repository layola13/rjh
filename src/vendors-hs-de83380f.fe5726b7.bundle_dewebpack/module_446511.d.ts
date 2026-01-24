/**
 * Lock icon component definition for two-tone theme
 * Provides SVG path data and configuration for rendering a lock icon
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** Fill color for the path */
  fill?: string;
  /** SVG path data string */
  d?: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
}

/**
 * Icon render result structure
 */
interface IconRenderResult {
  /** Root SVG tag */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Icon render function
   * @param primaryColor - Primary theme color for the icon
   * @param secondaryColor - Secondary theme color for the icon
   * @returns SVG structure with paths and attributes
   */
  icon: (primaryColor: string, secondaryColor: string) => IconRenderResult;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: string;
}

/**
 * Lock icon definition with two-tone theme support
 */
declare const lockIcon: IconConfig;

export default lockIcon;