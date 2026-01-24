/**
 * Gift icon component definition for Ant Design Icons
 * @module GiftOutlined
 */

/**
 * SVG attributes interface for the icon element
 */
interface SvgAttributes {
  /** SVG viewBox coordinates defining the viewport */
  viewBox: string;
  /** Whether the SVG should be focusable */
  focusable: string;
}

/**
 * SVG path element attributes
 */
interface PathAttributes {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconDefinition {
  /** HTML tag name for the root element */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths) that compose the icon */
  children: SvgChild[];
}

/**
 * Complete icon export structure
 */
interface IconExport {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'gift';
  /** Icon visual theme style */
  theme: 'outlined';
}

/**
 * Gift icon in outlined theme
 * Represents a gift box with a bow, commonly used for presents, rewards, or promotional features
 */
declare const GiftOutlined: IconExport;

export default GiftOutlined;