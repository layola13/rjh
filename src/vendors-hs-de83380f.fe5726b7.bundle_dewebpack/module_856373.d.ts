/**
 * SVG icon definition for an "appstore-add" icon in outlined theme.
 * This module exports an icon configuration object compatible with Ant Design icon system.
 */

/**
 * Attributes for SVG elements
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** SVG path data for drawing shapes */
  d?: string;
}

/**
 * Represents a node in the SVG tree structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Child nodes (optional) */
  children?: SvgNode[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element configuration */
  icon: SvgNode;
  /** Icon identifier name */
  name: string;
  /** Visual style theme */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Appstore Add Icon - Outlined theme
 * 
 * Displays a grid of three squares with an add/plus symbol,
 * representing the action of adding a new app or item to a collection.
 */
declare const appstoreAddOutlined: IconDefinition;

export default appstoreAddOutlined;