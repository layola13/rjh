/**
 * Facebook icon component configuration for Ant Design Icons
 * @module FacebookOutlined
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinate system */
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
}

/**
 * SVG child element definition
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChildElement[];
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
 * Facebook outlined icon configuration
 * Renders a Facebook logo icon with outlined style
 */
declare const facebookOutlinedIcon: IconConfig;

export default facebookOutlinedIcon;