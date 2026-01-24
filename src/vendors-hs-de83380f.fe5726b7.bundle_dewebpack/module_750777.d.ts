/**
 * Database icon component configuration (outlined theme)
 * Represents a database/server icon with stacked horizontal sections
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG is focusable for accessibility */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** HTML tag name for root element */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Array of child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition with metadata
 */
interface IconDefinition {
  /** Icon visual configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Database icon definition (outlined theme)
 * Default export containing complete icon configuration
 */
declare const databaseOutlinedIcon: IconDefinition;

export default databaseOutlinedIcon;