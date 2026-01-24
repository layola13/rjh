/**
 * Icon configuration type for Ant Design icons
 */
interface IconAttrs {
  /** SVG fill rule */
  'fill-rule'?: string;
  /** SVG viewBox coordinates */
  viewBox?: string;
  /** Whether the icon is focusable */
  focusable?: string;
  /** SVG path data */
  d?: string;
}

/**
 * Icon node structure
 */
interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
  /** Child nodes (optional) */
  children?: IconNode[];
}

/**
 * Complete icon definition
 */
interface IconDefinition {
  /** Icon structure with SVG elements */
  icon: IconNode;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Product icon (filled variant)
 * Represents a dashboard or product grid layout icon
 * with four squares arranged in a 2x2 pattern
 */
declare const productIcon: IconDefinition;

export default productIcon;