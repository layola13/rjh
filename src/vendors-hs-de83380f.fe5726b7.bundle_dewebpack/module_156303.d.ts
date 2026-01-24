/**
 * Experiment icon component configuration for Ant Design Icons
 * Theme: outlined
 * @module ExperimentOutlined
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element configuration
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * SVG icon configuration
 */
interface SvgIconConfig {
  /** Root SVG tag */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, groups, etc.) */
  children: SvgChildElement[];
}

/**
 * Icon definition structure used by Ant Design Icon system
 */
interface IconDefinition {
  /** SVG icon configuration object */
  icon: SvgIconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant (outlined, filled, twotone) */
  theme: string;
}

/**
 * Experiment icon definition (outlined theme)
 * Represents a laboratory flask/experiment symbol
 */
declare const experimentOutlined: IconDefinition;

export default experimentOutlined;

export { IconDefinition, SvgIconConfig, SvgAttributes, PathAttributes, SvgChildElement };