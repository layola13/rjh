/**
 * Discord icon component configuration for Ant Design icon system
 * @module DiscordOutlined
 */

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
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the icon shape */
  d: string;
}

/**
 * SVG child element (path) configuration
 */
interface SvgChildElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconConfiguration {
  /** HTML tag name for root element */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Array of child elements (paths) */
  children: SvgChildElement[];
}

/**
 * Complete Discord icon definition
 */
interface DiscordIconDefinition {
  /** Icon SVG configuration */
  icon: IconConfiguration;
  /** Icon identifier name */
  name: 'discord';
  /** Icon visual style theme */
  theme: 'outlined';
}

/**
 * Discord outlined icon definition for Ant Design Icons
 * Exports the complete configuration object for rendering Discord logo
 */
declare const DiscordOutlined: DiscordIconDefinition;

export default DiscordOutlined;