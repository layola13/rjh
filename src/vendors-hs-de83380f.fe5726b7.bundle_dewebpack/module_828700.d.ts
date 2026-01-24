/**
 * Star icon component definition (outlined theme)
 * Represents a star shape commonly used for ratings, favorites, or bookmarks
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Path-specific attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element configuration */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) that make up the icon */
  children: SvgChild[];
}

/**
 * Complete icon component configuration
 */
interface StarIconConfig {
  /** Icon visual definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'star';
  /** Visual style theme */
  theme: 'outlined';
}

/**
 * Star icon configuration (outlined theme)
 * Used for star ratings, favorites, and bookmark indicators
 */
declare const starIcon: StarIconConfig;

export default starIcon;