/**
 * Loading icon configuration for Ant Design icon system
 * 
 * This module exports an outlined loading icon definition compatible with
 * Ant Design's icon rendering system.
 * 
 * @module LoadingOutlined
 */

/**
 * Represents the attributes of an SVG element or path
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
  focusable?: string;
  /** SVG path data string */
  d?: string;
}

/**
 * Represents a single SVG element node (path, circle, etc.)
 */
interface SvgNode {
  /** The SVG tag name (e.g., 'path', 'circle', 'rect') */
  tag: string;
  /** Attributes to be applied to the SVG element */
  attrs: SvgAttributes;
  /** Optional child nodes for nested SVG elements */
  children?: SvgNode[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** The root SVG icon structure */
  icon: {
    /** The root SVG tag */
    tag: string;
    /** Root SVG element attributes */
    attrs: SvgAttributes;
    /** Child SVG elements (paths, shapes, etc.) */
    children: SvgNode[];
  };
  /** The semantic name of the icon */
  name: string;
  /** The visual theme style of the icon */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Loading icon definition in outlined theme
 * 
 * Displays a circular loading spinner commonly used to indicate
 * asynchronous operations or content loading states.
 */
declare const LoadingOutlinedIcon: IconDefinition;

export default LoadingOutlinedIcon;