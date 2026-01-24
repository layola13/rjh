/**
 * Ant Design Icon: Carry Out (Filled Theme)
 * A calendar icon with a checkmark, typically used to represent completed tasks or scheduled items.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
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
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconNode {
  /** HTML tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) that compose the icon */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface IconDefinition {
  /** SVG icon node structure */
  icon: IconNode;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Carry Out icon definition with filled theme
 * Represents a calendar with a checkmark indicating completed or scheduled tasks
 */
declare const CarryOutFilledIcon: IconDefinition;

export default CarryOutFilledIcon;