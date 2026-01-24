/**
 * Underline icon component definition for Ant Design Icons
 * @module UnderlineOutlined
 */

/**
 * SVG attributes interface
 */
interface SVGAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG element is focusable */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element (path)
 */
interface SVGChildElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** Root SVG tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Array of child elements (paths, groups, etc.) */
  children: SVGChildElement[];
}

/**
 * Complete icon definition
 */
interface IconDefinition {
  /** Icon SVG structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Underline icon definition (outlined theme)
 * Used for text underline formatting in rich text editors
 */
declare const underlineOutlinedIcon: IconDefinition;

export default underlineOutlinedIcon;