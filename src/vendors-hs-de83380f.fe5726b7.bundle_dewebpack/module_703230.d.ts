/**
 * Rocket icon configuration for Ant Design icon system
 * @module RocketTwoTone
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
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * SVG root attributes
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG icon structure
 */
interface IconSvg {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child path elements */
  children: SvgChild[];
}

/**
 * Icon definition with theme support
 */
interface IconDefinition {
  /**
   * Generate icon SVG structure
   * @param primaryColor - Primary theme color
   * @param secondaryColor - Secondary theme color for twotone icons
   * @returns SVG structure object
   */
  icon: (primaryColor: string, secondaryColor: string) => IconSvg;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: 'twotone' | 'outline' | 'filled';
}

/**
 * Rocket icon (twotone theme)
 * Represents a rocket ship icon with two-tone coloring support
 */
declare const RocketTwoTone: IconDefinition;

export default RocketTwoTone;