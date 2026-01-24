/**
 * Icon definition for Smile icon (outlined theme)
 * Represents a circular smiley face with two eyes and a curved smile
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element is focusable */
  focusable?: string;
  /** SVG path data */
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
  /** Child nodes (optional for leaf nodes like path) */
  children?: IconNode[];
}

/**
 * Icon definition structure for Ant Design icons
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconNode;
  /** Icon identifier name */
  name: string;
  /** Visual style theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Smile icon (outlined variant)
 * 
 * A circular smiley face icon with:
 * - Two circular eyes positioned at coordinates for a friendly appearance
 * - A curved smile line at the bottom
 * - Standard 896x896 viewBox with 64px offset
 * 
 * @remarks
 * This icon is commonly used to represent positive emotions, satisfaction,
 * or user-friendly interfaces in UI applications.
 */
declare const SmileOutlined: IconDefinition;

export default SmileOutlined;