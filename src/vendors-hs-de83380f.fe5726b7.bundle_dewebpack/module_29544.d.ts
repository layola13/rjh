/**
 * Highlight icon component definition for two-tone theme
 * @module HighlightTwoTone
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon render result structure
 */
interface IconRenderResult {
  /** Root SVG tag */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child path elements */
  children: SvgChild[];
}

/**
 * Highlight icon configuration
 */
interface HighlightIconConfig {
  /**
   * Renders the highlight icon with specified colors
   * @param primaryColor - Primary color for the main icon shape
   * @param secondaryColor - Secondary color for accent/highlight areas
   * @returns SVG structure object for rendering
   */
  icon(primaryColor: string, secondaryColor: string): IconRenderResult;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: string;
}

/**
 * Default export: Highlight icon in two-tone theme
 */
declare const highlightTwoTone: HighlightIconConfig;

export default highlightTwoTone;