/**
 * GIF icon component definition (outlined theme)
 * @module IconDefinition
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Accessibility focus control */
  focusable: string;
}

/**
 * Path attributes interface
 */
interface PathAttributes {
  /** SVG path data */
  d: string;
}

/**
 * Generic attributes for SVG child elements
 */
interface ElementAttributes {
  [key: string]: unknown;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes | PathAttributes | ElementAttributes;
  /** Nested child elements */
  children?: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconNode {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child elements (defs, paths, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconNode;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * GIF file format icon definition (outlined style)
 * Represents a visual indicator for GIF image files
 */
declare const gifOutlinedIcon: IconDefinition;

export default gifOutlinedIcon;