/**
 * Setting icon component configuration (filled theme)
 * Represents a gear/cog settings icon
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
  focusable?: string;
  /** Path data for SVG shapes */
  d?: string;
}

/**
 * SVG element node in the icon tree structure
 */
interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
  /** Child nodes (for nested SVG elements) */
  children?: IconNode[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** Icon visual representation */
  icon: IconNode;
  /** Icon identifier name */
  name: string;
  /** Visual style variant */
  theme: string;
}

/**
 * Setting icon definition with gear/cog shape
 * @description A circular gear icon with a centered circle and radiating teeth
 * - Center circle radius: ~110.96px at coordinates (512.5, 502.5)
 * - Outer gear ring with mechanical teeth pattern
 * - Total radius: ~175.8px
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;