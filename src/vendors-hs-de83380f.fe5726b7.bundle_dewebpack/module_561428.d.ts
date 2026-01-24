/**
 * Shop icon component definition for Ant Design Icons
 * @module ShopOutlined
 */

/**
 * SVG attributes interface for icon elements
 */
interface SVGAttributes {
  /**
   * SVG viewBox attribute defining the coordinate system
   */
  viewBox: string;
  /**
   * Whether the SVG element can receive focus
   */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /**
   * SVG path data string defining the shape
   */
  d: string;
}

/**
 * Generic SVG child element structure
 */
interface SVGChildElement {
  /**
   * HTML/SVG tag name
   */
  tag: string;
  /**
   * Element attributes
   */
  attrs: PathAttributes;
}

/**
 * Icon structure defining the complete SVG icon
 */
interface IconStructure {
  /**
   * SVG root tag name
   */
  tag: string;
  /**
   * SVG root element attributes
   */
  attrs: SVGAttributes;
  /**
   * Child elements (paths, circles, etc.)
   */
  children: SVGChildElement[];
}

/**
 * Complete icon definition including metadata
 */
interface IconDefinition {
  /**
   * Icon SVG structure
   */
  icon: IconStructure;
  /**
   * Icon identifier name
   */
  name: string;
  /**
   * Icon theme variant (outlined, filled, two-tone)
   */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Shop/Store icon in outlined style
 * Represents a storefront with awning
 */
declare const ShopOutlinedIcon: IconDefinition;

export default ShopOutlinedIcon;