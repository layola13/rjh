/**
 * Spotify icon component definition for Ant Design Icons
 * @module SpotifyOutlined
 */

/**
 * SVG attributes interface for path elements
 */
interface PathAttributes {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG attributes interface for root SVG elements
 */
interface SvgAttributes {
  /** Fill rule for SVG rendering */
  'fill-rule': string;
  /** ViewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG tag name */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Array of child elements */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'spotify';
  /** Icon theme variant */
  theme: 'outlined';
}

/**
 * Spotify outlined icon configuration
 * Contains the complete SVG definition for the Spotify logo icon
 */
declare const spotifyOutlined: IconConfig;

export default spotifyOutlined;