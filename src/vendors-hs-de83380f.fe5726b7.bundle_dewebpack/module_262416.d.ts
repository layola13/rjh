/**
 * Sort Ascending icon definition for Ant Design Icons
 * @module SortAscendingOutlined
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon SVG structure
 */
interface IconSvg {
  /** HTML tag name */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child elements (paths) */
  children: SvgChild[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Sort Ascending icon - displays an ascending sort indicator with A-Z and arrow
 * Used in sortable tables and lists to indicate ascending sort order
 */
declare const SortAscendingOutlined: IconDefinition;

export default SortAscendingOutlined;