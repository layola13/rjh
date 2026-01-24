/**
 * Lock icon component definition for Ant Design Icons
 * @module LockOutlined
 */

/**
 * SVG attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element (path) interface
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition interface
 */
interface IconDefinition {
  /** HTML tag name for root element */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon configuration interface
 */
interface LockIconConfig {
  /** Icon SVG structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'lock';
  /** Icon theme variant */
  theme: 'outlined';
}

/**
 * Lock icon configuration object
 * Represents a lock/security icon in outlined style
 */
declare const lockIcon: LockIconConfig;

export default lockIcon;