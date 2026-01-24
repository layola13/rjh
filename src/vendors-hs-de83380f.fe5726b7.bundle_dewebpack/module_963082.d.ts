/**
 * Icon definition for the "meh" filled theme icon
 * Represents a neutral/meh face emoji icon from Ant Design Icons
 */
export interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the icon is focusable for accessibility */
  focusable?: string;
  /** SVG path data for drawing the icon shape */
  d?: string;
}

/**
 * Icon node structure representing an SVG element or its children
 */
export interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
  /** Child nodes (optional, for nested SVG elements) */
  children?: IconNode[];
}

/**
 * Complete icon definition structure
 */
export interface IconDefinition {
  /** Root SVG icon node configuration */
  icon: IconNode;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant (e.g., "filled", "outlined", "twotone") */
  theme: string;
}

/**
 * Meh face icon (filled theme)
 * A circular face with neutral expression including two eyes and a straight mouth
 * @constant
 */
declare const mehFilledIcon: IconDefinition;

export default mehFilledIcon;