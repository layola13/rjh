/**
 * Mobile icon definition for Ant Design icon library
 * @module MobileOutlined
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element is focusable */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** HTML tag name */
    tag: string;
    /** SVG element attributes */
    attrs: SvgAttributes;
    /** Child elements (paths) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Mobile outlined icon definition
 * Represents a mobile phone/device icon in outlined style
 */
declare const MobileOutlined: IconDefinition;

export default MobileOutlined;