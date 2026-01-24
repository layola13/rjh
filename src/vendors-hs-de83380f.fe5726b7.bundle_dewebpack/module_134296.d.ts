/**
 * Shopping icon definition for Ant Design Icons
 * 
 * A shopping bag icon in outlined theme style.
 * 
 * @module ShoppingOutlined
 */

/**
 * SVG path attributes interface
 */
interface SVGPathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SVGAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SVGChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: SVGPathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** Root SVG tag name */
    tag: 'svg';
    /** SVG element attributes */
    attrs: SVGAttrs;
    /** Child elements (paths, shapes, etc.) */
    children: SVGChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual style theme */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Shopping bag icon definition
 * 
 * Represents a shopping bag with handles, commonly used for
 * e-commerce, cart, or purchase-related actions.
 */
declare const ShoppingOutlinedIcon: IconDefinition;

export default ShoppingOutlinedIcon;