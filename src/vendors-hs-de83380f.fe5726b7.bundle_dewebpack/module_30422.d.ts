/**
 * Ant Design Table Icon Definition
 * @module TableOutlined
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG root attributes interface
 */
interface SvgRootAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon structure definition
 */
interface IconDefinition {
  /** SVG root element tag */
  tag: string;
  /** SVG root attributes */
  attrs: SvgRootAttrs;
  /** Child elements array */
  children: SvgChild[];
}

/**
 * Complete icon export structure
 */
interface TableOutlinedIcon {
  /** Icon configuration object */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Table outlined icon definition for Ant Design
 * Represents a table/grid layout icon with outlined style
 */
declare const TableOutlined: TableOutlinedIcon;

export default TableOutlined;