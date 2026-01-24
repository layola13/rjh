/**
 * Ant Design Icon: Folder Open (Outlined)
 * 
 * A folder icon in open state, typically used to represent an expanded directory
 * or file system folder in UI components.
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
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon definition structure
 */
interface IconNode {
  /** HTML/SVG tag name */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface AntDesignIconDefinition {
  /** Icon SVG structure */
  icon: IconNode;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Folder Open icon definition
 * 
 * @remarks
 * This icon represents an open folder, commonly used in file managers,
 * navigation menus, and directory tree components.
 * 
 * @example
 *