/**
 * HTML5 filled icon configuration for Ant Design Icons
 * @module HTML5FilledIcon
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
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** SVG root element tag */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths) of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon definition
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * HTML5 filled icon definition
 * Represents the HTML5 logo in filled style for Ant Design icon system
 */
declare const html5FilledIcon: IconDefinition;

export default html5FilledIcon;