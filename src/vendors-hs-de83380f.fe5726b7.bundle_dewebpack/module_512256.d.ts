/**
 * HTML5 icon component configuration for Ant Design icon library.
 * Provides a two-tone SVG representation of the HTML5 logo.
 */

/**
 * Icon configuration object for the HTML5 logo.
 */
export interface Html5IconConfig {
  /**
   * Generates the SVG icon structure with customizable colors.
   * 
   * @param primaryColor - The primary fill color for the icon's main paths
   * @param secondaryColor - The secondary fill color for the icon's detail paths
   * @returns An SVG element configuration object with tag, attributes, and children
   */
  icon(primaryColor: string, secondaryColor: string): IconSvgElement;
  
  /**
   * The identifier name of the icon.
   */
  name: 'html5';
  
  /**
   * The theme variant of the icon.
   */
  theme: 'twotone';
}

/**
 * Represents an SVG element structure.
 */
export interface IconSvgElement {
  /**
   * The HTML/SVG tag name.
   */
  tag: 'svg';
  
  /**
   * Attributes applied to the SVG root element.
   */
  attrs: SvgRootAttributes;
  
  /**
   * Child path elements that compose the icon graphic.
   */
  children: IconPathElement[];
}

/**
 * Attributes for the root SVG element.
 */
export interface SvgRootAttributes {
  /**
   * The viewBox coordinates defining the SVG canvas area.
   */
  viewBox: '64 64 896 896';
  
  /**
   * Whether the SVG element is focusable.
   */
  focusable: 'false';
}

/**
 * Represents an SVG path element within the icon.
 */
export interface IconPathElement {
  /**
   * The HTML/SVG tag name.
   */
  tag: 'path';
  
  /**
   * Attributes applied to the path element.
   */
  attrs: PathAttributes;
}

/**
 * Attributes for SVG path elements.
 */
export interface PathAttributes {
  /**
   * The SVG path data defining the shape.
   */
  d: string;
  
  /**
   * The fill color for the path.
   */
  fill: string;
}

/**
 * HTML5 two-tone icon configuration.
 * Default export providing the complete icon definition.
 */
declare const html5Icon: Html5IconConfig;

export default html5Icon;