/**
 * Amazon Circle Filled Icon
 * 
 * An Ant Design icon component representing the Amazon logo in a circular filled style.
 * This icon is typically used to display Amazon branding or link to Amazon-related content.
 * 
 * @module AmazonCircleFilledIcon
 */

/**
 * SVG path attributes interface
 * Defines the structure for SVG path element attributes
 */
interface PathAttributes {
  /** SVG path data string that defines the shape */
  d: string;
}

/**
 * SVG path element structure
 * Represents a single path element within an SVG
 */
interface SvgPath {
  /** HTML tag name for the path element */
  tag: 'path';
  /** Attributes for the path element */
  attrs: PathAttributes;
}

/**
 * SVG root element attributes
 * Defines attributes for the root SVG element
 */
interface SvgAttributes {
  /** Defines the coordinate system and aspect ratio for the SVG */
  viewBox: string;
  /** Controls whether the element can receive focus */
  focusable: string;
}

/**
 * SVG icon structure
 * Represents the complete structure of an SVG icon
 */
interface IconSvg {
  /** HTML tag name for the SVG element */
  tag: 'svg';
  /** Attributes for the SVG element */
  attrs: SvgAttributes;
  /** Child elements (paths) within the SVG */
  children: SvgPath[];
}

/**
 * Icon definition interface
 * Complete type definition for an Ant Design icon component
 */
interface IconDefinition {
  /** SVG icon structure and content */
  icon: IconSvg;
  /** Unique identifier name for the icon */
  name: string;
  /** Visual style theme of the icon */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Amazon Circle Filled Icon Definition
 * 
 * Default export containing the complete Amazon circle icon definition
 * conforming to Ant Design's icon structure.
 * 
 * @property {IconSvg} icon - The SVG structure and path data
 * @property {string} name - Icon identifier: "amazon-circle"
 * @property {string} theme - Icon theme: "filled"
 */
declare const AmazonCircleFilledIcon: IconDefinition;

export default AmazonCircleFilledIcon;