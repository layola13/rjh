/**
 * Tablet icon component definition (outlined theme)
 * Represents a tablet device icon in SVG format
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG path element structure
 */
interface SvgPathElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: SvgPathAttrs;
}

/**
 * SVG root element attributes interface
 */
interface SvgRootAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG is keyboard focusable */
  focusable: string;
}

/**
 * SVG icon structure interface
 */
interface SvgIcon {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgRootAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgPathElement[];
}

/**
 * Icon definition interface
 * Complete structure for an Ant Design icon
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: SvgIcon;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Tablet icon (outlined theme)
 * Default export containing the complete icon definition
 */
declare const tabletOutlined: IconDefinition;

export default tabletOutlined;