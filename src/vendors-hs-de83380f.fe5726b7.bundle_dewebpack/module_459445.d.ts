/**
 * SVG icon definition for "up-circle" outlined icon
 * Represents a circular icon with an upward-pointing chevron/arrow
 */

/**
 * Attributes for SVG elements
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Controls whether the element can receive focus */
  focusable?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * Child element in the SVG structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
}

/**
 * Root SVG icon structure
 */
interface IconDefinition {
  /** SVG root element tag */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** SVG icon definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Visual style theme */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Up-circle outlined icon configuration
 * Contains SVG paths for a circular outline with an upward chevron
 */
declare const upCircleOutlined: IconConfig;

export default upCircleOutlined;