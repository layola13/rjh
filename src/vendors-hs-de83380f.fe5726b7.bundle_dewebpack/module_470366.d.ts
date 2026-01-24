/**
 * Shopping cart icon definition for Ant Design Icons
 * @module ShoppingCartOutlined
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element interface
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure interface
 */
interface IconDefinition {
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Array of child elements (paths, groups, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon export interface
 */
interface IconExport {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Shopping cart outlined icon definition
 * Represents a shopping cart symbol commonly used in e-commerce applications
 */
declare const shoppingCartOutlined: IconExport;

export default shoppingCartOutlined;