/**
 * Icon definition for the "ci-circle" outlined icon.
 * Represents a circle with "CI" text inside, commonly used for continuous integration indicators.
 */

/**
 * SVG attributes interface for icon elements
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
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
  attrs: SvgAttributes;
  /** Child nodes (only for container elements) */
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
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * CI Circle outlined icon definition.
 * 
 * This icon displays a circular badge with "CI" letters inside,
 * typically used to represent Continuous Integration status or features.
 * 
 * @remarks
 * - ViewBox: 64 64 896 896 (standard Ant Design icon dimensions)
 * - Theme: outlined
 * - Size: Scalable vector graphic
 */
declare const ciCircleIcon: IconDefinition;

export default ciCircleIcon;