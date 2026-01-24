/**
 * Spotify icon definition for Ant Design Icons
 * @module SpotifyIcon
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /**
   * Fill rule for SVG rendering
   */
  'fill-rule': string;
  /**
   * ViewBox coordinates and dimensions
   */
  viewBox: string;
  /**
   * Whether the SVG element can receive focus
   */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /**
   * SVG path data string
   */
  d: string;
}

/**
 * SVG child element definition
 */
interface SvgChildElement {
  /**
   * HTML/SVG tag name
   */
  tag: 'path';
  /**
   * Element attributes
   */
  attrs: PathAttributes;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /**
   * Root SVG tag
   */
  tag: 'svg';
  /**
   * SVG element attributes
   */
  attrs: SvgAttributes;
  /**
   * Child elements (paths, shapes, etc.)
   */
  children: SvgChildElement[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /**
   * Icon SVG structure
   */
  icon: IconStructure;
  /**
   * Icon identifier name
   */
  name: 'spotify';
  /**
   * Icon theme variant
   */
  theme: 'filled';
}

/**
 * Spotify filled icon definition
 * Contains the complete SVG structure for rendering the Spotify logo
 */
declare const SpotifyFilledIcon: IconDefinition;

export default SpotifyFilledIcon;