/**
 * Customer Service Icon Definition
 * 
 * Ant Design icon component configuration for a customer service/headset icon.
 * This definition can be used to render an outlined customer service icon.
 * 
 * @module CustomerServiceOutlined
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** ViewBox coordinates and dimensions for the SVG canvas */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Customer service icon definition with outlined theme
 * 
 * Represents a headset icon commonly used for customer support,
 * help desk, or communication features in user interfaces.
 */
declare const customerServiceOutlined: IconDefinition;

export default customerServiceOutlined;