/**
 * Ant Design Icon: UserGroup Delete (Outlined)
 * Represents an icon for deleting or removing user groups
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes for the root svg tag
 */
interface SvgAttrs {
  /** The viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Represents a child element within the SVG structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Attributes for the SVG element */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** The root SVG element tag */
  tag: string;
  /** Attributes for the root SVG element */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** The icon's SVG structure and configuration */
  icon: IconDefinition;
  /** The icon's identifier name */
  name: string;
  /** The icon's visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Ant Design UserGroup Delete Icon (Outlined theme)
 * 
 * This icon depicts a user group with a delete action indicator.
 * Commonly used in UI to represent removing users from groups or
 * deleting entire user groups.
 */
declare const iconConfig: IconConfig;

export default iconConfig;