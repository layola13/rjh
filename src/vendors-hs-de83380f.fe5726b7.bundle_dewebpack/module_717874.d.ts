/**
 * Reload icon component definition (Ant Design outlined theme)
 * Represents a circular reload/refresh arrow icon
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates and dimensions */
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
  attrs: SvgPathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon component export structure
 */
interface IconComponent {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: string;
}

/**
 * Reload icon configuration object
 * Default export containing the complete icon definition for a reload/refresh symbol
 */
declare const reloadIcon: IconComponent;

export default reloadIcon;