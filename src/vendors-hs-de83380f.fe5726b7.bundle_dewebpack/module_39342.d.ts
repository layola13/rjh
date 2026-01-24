/**
 * Icon definition for the "sliders" icon in twotone theme.
 * This icon represents sliders/adjustments control, commonly used for settings or filtering.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** Fill color for the path */
  fill?: string;
  /** SVG path data */
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
 * Icon structure returned by the icon function
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, groups, etc.) */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generates the icon SVG structure with specified colors
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for the icon (twotone theme)
   * @returns Icon definition object containing SVG structure
   */
  icon(primaryColor: string, secondaryColor: string): IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: string;
}

/**
 * Sliders icon configuration in twotone theme.
 * Exports an icon representing adjustment sliders with dual-tone coloring.
 */
declare const slidersIcon: IconConfig;

export default slidersIcon;