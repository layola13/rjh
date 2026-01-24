/**
 * Credit Card icon component definition (Ant Design outlined theme)
 * @module CreditCardOutlined
 */

/**
 * SVG attributes interface for icon elements
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** SVG path data for drawing shapes */
  d?: string;
}

/**
 * Icon element node structure
 */
interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SVGAttributes;
  /** Child elements (optional) */
  children?: IconNode[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** Icon SVG structure */
  icon: IconNode;
  /** Icon name identifier */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Credit card icon definition with outlined theme
 * Represents a credit/debit card with card number slots
 */
declare const CreditCardOutlinedIcon: IconDefinition;

export default CreditCardOutlinedIcon;