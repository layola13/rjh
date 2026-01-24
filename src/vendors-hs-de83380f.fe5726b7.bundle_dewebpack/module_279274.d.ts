/**
 * Shop icon component definition (Two-tone theme)
 * @module ShopTwoTone
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon render result structure
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Array of child path elements */
  children: SvgChildElement[];
}

/**
 * Shop icon configuration interface
 */
interface ShopIconConfig {
  /**
   * Icon render function
   * @param primaryColor - Primary color for the icon (typically the main outline)
   * @param secondaryColor - Secondary color for the icon (typically the fill/highlight)
   * @returns Icon definition object containing SVG structure
   */
  icon(primaryColor: string, secondaryColor: string): IconDefinition;
  
  /**
   * Icon identifier name
   * @description Unique name identifier for the shop icon
   */
  name: 'shop';
  
  /**
   * Icon theme variant
   * @description Specifies the visual style of the icon
   */
  theme: 'twotone';
}

/**
 * Shop icon configuration object
 * @description Exports a two-tone themed shop/store icon with customizable colors.
 * The icon depicts a storefront with an awning, commonly used for e-commerce or retail applications.
 */
declare const shopTwoToneIcon: ShopIconConfig;

export default shopTwoToneIcon;