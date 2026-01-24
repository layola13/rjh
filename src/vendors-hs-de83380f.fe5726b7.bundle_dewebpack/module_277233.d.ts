/**
 * Pushpin icon component configuration for Ant Design Icons
 * @module PushpinTwoTone
 */

/**
 * Icon render function parameters
 */
interface IconRenderParams {
  /** Primary color for the icon */
  primaryColor: string;
  /** Secondary color for the icon */
  secondaryColor: string;
}

/**
 * SVG element attributes
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon render result structure
 */
interface IconRenderResult {
  /** HTML tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths) */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Renders the icon SVG structure
   * @param primaryColor - Primary color for the icon
   * @param secondaryColor - Secondary color for the icon
   * @returns SVG structure object
   */
  icon(primaryColor: string, secondaryColor: string): IconRenderResult;
  
  /** Icon name identifier */
  name: 'pushpin';
  
  /** Icon theme variant */
  theme: 'twotone';
}

/**
 * Pushpin two-tone icon configuration
 * Provides a pushpin/pin icon in the two-tone style
 */
declare const PushpinTwoToneIcon: IconConfig;

export default PushpinTwoToneIcon;