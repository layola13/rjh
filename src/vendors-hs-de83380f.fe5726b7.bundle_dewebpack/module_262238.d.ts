/**
 * SVG icon definition for a "pic-right" icon in outlined theme.
 * Represents a layout with picture/image aligned to the right.
 */

/**
 * Attributes for SVG elements
 */
interface SvgAttrs {
  /** SVG viewBox defining the coordinate system */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * SVG element node structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
  /** Child elements (optional) */
  children?: SvgNode[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: SvgNode;
  /** Icon identifier name */
  name: string;
  /** Visual theme style */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Default export: Picture-right icon definition
 * An outlined icon showing a layout with content blocks and a picture area on the right
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;