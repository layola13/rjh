/**
 * SVG icon definition for a bottom-right radius icon.
 * This module exports an Ant Design icon configuration object.
 */

/**
 * Represents SVG element attributes.
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element is focusable */
  focusable?: string;
  /** SVG path data attribute */
  d?: string;
}

/**
 * Represents an SVG element node in the icon tree.
 */
interface SvgNode {
  /** The HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
  /** Child nodes (only applicable for container elements like <svg>) */
  children?: SvgNode[];
}

/**
 * Ant Design icon configuration object.
 */
interface IconDefinition {
  /** The root SVG element configuration */
  icon: SvgNode;
  /** The semantic name of the icon */
  name: string;
  /** The visual theme variant of the icon */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Bottom-right radius icon definition.
 * Represents a visual indicator for border-radius bottom-right corner styling.
 */
declare const RadiusBottomRightOutlined: IconDefinition;

export default RadiusBottomRightOutlined;