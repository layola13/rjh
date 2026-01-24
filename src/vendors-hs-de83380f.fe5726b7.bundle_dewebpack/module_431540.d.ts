/**
 * SVG icon definition for a play-circle icon with two-tone theme
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
  focusable?: string;
  /** SVG path data */
  d?: string;
  /** Fill color for the SVG element */
  fill?: string;
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
 * SVG icon structure returned by the icon function
 */
interface SvgIcon {
  /** Root SVG tag name */
  tag: string;
  /** Root SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Icon definition object
 */
interface IconDefinition {
  /**
   * Generates the SVG icon structure
   * @param primaryColor - Primary fill color for the icon paths
   * @param secondaryColor - Secondary fill color for the two-tone effect
   * @returns SVG icon structure with paths and attributes
   */
  icon(primaryColor: string, secondaryColor: string): SvgIcon;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme style of the icon */
  theme: string;
}

/**
 * Play circle icon with two-tone theme
 * A circular play button icon with layered colors for depth effect
 */
declare const playCircleIcon: IconDefinition;

export default playCircleIcon;