/**
 * Icon configuration for ID Card outlined icon
 * Ant Design Icons - ID Card component definition
 */

/**
 * SVG attributes interface for icon elements
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** SVG path data for drawing the icon shape */
  d?: string;
}

/**
 * Icon node structure representing SVG elements
 */
interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
  /** Child elements (for nested SVG structures) */
  children?: IconNode[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** Root SVG icon configuration */
  icon: IconNode;
  /** Semantic name of the icon */
  name: string;
  /** Visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * ID Card outlined icon definition
 * 
 * Represents an identification card with user profile and text lines.
 * Used in user interfaces for profile, credentials, and identity-related features.
 * 
 * @remarks
 * This icon follows Ant Design's icon specification with:
 * - Standard 896x896 viewBox (with 64px offset)
 * - Outlined theme style
 * - Semantic naming convention
 */
declare const IdCardOutlined: IconDefinition;

export default IdCardOutlined;