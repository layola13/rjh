/**
 * Icon definition for 'carry-out' with two-tone theme
 * Represents a calendar with a checkmark icon
 */

/**
 * SVG attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data defining the shape */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon render function return type
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child path elements */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface CarryOutIconConfig {
  /**
   * Icon render function
   * @param primaryColor - Primary fill color for the icon paths
   * @param secondaryColor - Secondary fill color for two-tone effect
   * @returns Complete SVG icon definition with paths
   */
  icon(primaryColor: string, secondaryColor: string): IconDefinition;
  
  /** Icon identifier name */
  name: 'carry-out';
  
  /** Icon theme variant */
  theme: 'twotone';
}

/**
 * Carry-out icon definition (calendar with checkmark)
 * Two-tone themed icon suitable for task completion or scheduling UI
 */
declare const carryOutIcon: CarryOutIconConfig;

export default carryOutIcon;