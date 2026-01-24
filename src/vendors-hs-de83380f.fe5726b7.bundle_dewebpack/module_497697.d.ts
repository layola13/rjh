/**
 * Dislike icon configuration for Ant Design icon system
 * @module DislikeIcon
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinate system */
  viewBox: string;
  /** Indicates whether the element can be focused */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
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
 * Icon function return type representing complete SVG structure
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Array of child path elements */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generates SVG icon definition with dual-tone colors
   * @param primaryColor - Primary fill color for main icon shape
   * @param secondaryColor - Secondary fill color for accent details
   * @returns Complete SVG icon definition object
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: 'dislike';
  
  /** Visual theme variant */
  theme: 'twotone';
}

/**
 * Dislike (thumbs down) icon in two-tone theme
 * Used to represent negative feedback or disapproval actions
 */
declare const dislikeIcon: IconConfig;

export default dislikeIcon;