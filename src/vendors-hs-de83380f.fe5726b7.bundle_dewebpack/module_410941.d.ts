/**
 * Android icon component definition for Ant Design Icons
 * @module AndroidOutlined
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** HTML tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements array */
  children: SvgChild[];
}

/**
 * Icon definition object
 */
interface IconDefinition {
  /** Icon SVG structure */
  icon: IconStructure;
  /** Icon name identifier */
  name: 'android';
  /** Icon theme variant */
  theme: 'outlined';
}

/**
 * Android outlined icon definition
 * Represents the Android robot logo in outlined style
 */
declare const androidOutlinedIcon: IconDefinition;

export default androidOutlinedIcon;