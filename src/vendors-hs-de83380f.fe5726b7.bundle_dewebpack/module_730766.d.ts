/**
 * Send icon configuration for Ant Design Icons
 * @module SendOutlined
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
 * Path attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * Generic attributes interface for SVG child elements
 */
interface ElementAttributes {
  [key: string]: unknown;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes | PathAttributes | ElementAttributes;
  /** Nested children elements (optional) */
  children?: SvgChild[];
}

/**
 * Icon configuration structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** Root SVG tag */
    tag: 'svg';
    /** SVG root attributes */
    attrs: SvgAttributes;
    /** Child elements of the SVG */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Send icon definition (Outlined theme)
 * Represents a paper plane/send action icon
 */
declare const SendOutlinedIcon: IconDefinition;

export default SendOutlinedIcon;