/**
 * Icon definition for a dollar sign inside a circle (outlined theme)
 * Represents currency, pricing, or financial operations
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * Represents an SVG element node in the icon tree
 */
interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
  /** Child elements (optional) */
  children?: IconNode[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconNode;
  /** Semantic name of the icon */
  name: string;
  /** Visual style theme */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Dollar circle icon - Outlined theme
 * Displays a dollar sign ($) within a circular border
 */
declare const dollarCircleOutlined: IconDefinition;

export default dollarCircleOutlined;