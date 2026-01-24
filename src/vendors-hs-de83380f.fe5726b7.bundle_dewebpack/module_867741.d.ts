/**
 * Euro Circle Icon Definition
 * 
 * Represents a euro currency symbol (€) enclosed in a circle.
 * This is an outlined theme icon from Ant Design Icons.
 * 
 * @module EuroCircleIcon
 */

/**
 * SVG element attributes interface
 */
interface SVGAttributes {
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
interface SVGChildElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure containing SVG definition
 */
interface IconDefinition {
  /** SVG root element tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Array of child elements (paths, shapes, etc.) */
  children: SVGChildElement[];
}

/**
 * Complete icon export structure
 */
interface EuroCircleIconExport {
  /** SVG icon definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'euro-circle';
  /** Icon theme variant */
  theme: 'outlined';
}

/**
 * Euro Circle outlined icon definition.
 * 
 * Contains the complete SVG structure for rendering a euro currency
 * symbol within a circular outline at 896x896 viewBox dimensions.
 */
declare const euroCircleIcon: EuroCircleIconExport;

export default euroCircleIcon;