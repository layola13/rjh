/**
 * Pause icon component definition for Ant Design Icons
 * @module PauseOutlined
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
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
 * SVG child element (path) definition
 */
interface SvgChildElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon configuration structure
 */
interface IconDefinition {
  /** SVG root element tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) of the SVG */
  children: SvgChildElement[];
}

/**
 * Complete pause icon configuration object
 */
interface PauseIconConfig {
  /** Icon SVG structure and attributes */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'pause';
  /** Icon design theme variant */
  theme: 'outlined';
}

/**
 * Pause outlined icon configuration
 * Represents a standard pause symbol with two vertical bars
 */
declare const pauseIcon: PauseIconConfig;

export default pauseIcon;