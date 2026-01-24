/**
 * Arrow Left icon configuration for Ant Design Icons
 * @module ArrowLeftOutlined
 */

/**
 * SVG attributes interface for icon elements
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** SVG path data attribute */
  d?: string;
}

/**
 * Icon child element structure
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SVGAttributes;
  /** Nested child elements (optional) */
  children?: IconChild[];
}

/**
 * Icon configuration structure
 */
interface IconDefinition {
  /** Root SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SVGAttributes;
  /** Child elements of the icon */
  children: IconChild[];
}

/**
 * Complete icon export structure
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
 * Arrow Left outlined icon definition
 * Used for navigation, indicating backward/previous action
 */
declare const ArrowLeftOutlined: IconExport;

export default ArrowLeftOutlined;