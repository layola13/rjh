/**
 * Info circle filled icon component definition
 * Ant Design icon for displaying information in a filled circle style
 */

/**
 * SVG element attributes interface
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
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure definition
 */
interface Icon {
  /** HTML tag name for the root element */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Icon definition object
 */
interface IconDefinition {
  /** Icon SVG structure */
  icon: Icon;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Default export: Info circle filled icon definition
 * Displays an information symbol inside a filled circle
 */
declare const infoCircleFilledIcon: IconDefinition;

export default infoCircleFilledIcon;