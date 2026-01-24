/**
 * TikTok icon configuration for Ant Design icon library
 * @module TikTokIcon
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** Fill rule for SVG rendering */
  'fill-rule': string;
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
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
 * Icon structure definition
 */
interface IconDefinition {
  /** SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** Icon visual definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * TikTok icon configuration
 * Provides outlined theme TikTok logo for Ant Design icon system
 */
declare const TikTokIconConfig: IconConfig;

export default TikTokIconConfig;