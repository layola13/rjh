/**
 * Home icon configuration for Ant Design icon system (two-tone theme)
 * @module HomeIconTwoTone
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon SVG structure
 */
interface IconSvg {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child path elements */
  children: SvgChild[];
}

/**
 * Icon definition interface
 */
interface IconDefinition {
  /**
   * Generate icon SVG structure
   * @param primaryColor - Primary color for the icon (main outline)
   * @param secondaryColor - Secondary color for the icon (fill/background)
   * @returns SVG structure object
   */
  icon: (primaryColor: string, secondaryColor: string) => IconSvg;
  
  /** Icon identifier name */
  name: 'home';
  
  /** Icon theme variant */
  theme: 'twotone';
}

/**
 * Default export: Home icon definition (two-tone theme)
 * Used in Ant Design icon system for rendering home/house icons
 */
declare const homeIconTwoTone: IconDefinition;

export default homeIconTwoTone;