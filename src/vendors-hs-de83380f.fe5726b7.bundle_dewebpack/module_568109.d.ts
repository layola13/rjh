/**
 * YouTube filled icon component definition for Ant Design Icons
 * @module YouTubeFilledIcon
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element interface
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure interface
 */
interface IconDefinition {
  /** SVG icon tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements array */
  children: SvgChild[];
}

/**
 * Complete icon configuration interface
 */
interface IconConfig {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * YouTube filled icon configuration
 * Represents the YouTube logo in filled style for Ant Design icon library
 */
declare const YouTubeFilledIcon: IconConfig;

export default YouTubeFilledIcon;