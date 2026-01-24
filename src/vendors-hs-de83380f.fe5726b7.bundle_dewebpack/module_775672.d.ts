/**
 * Icon definition for a layout icon with two-tone theme
 */
interface IconDefinition {
  /**
   * Generate icon configuration
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for the icon (two-tone theme)
   * @returns SVG icon configuration object
   */
  icon: (primaryColor: string, secondaryColor: string) => IconSvgConfig;
  
  /**
   * Icon identifier name
   */
  name: string;
  
  /**
   * Visual theme of the icon
   */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * SVG icon configuration structure
 */
interface IconSvgConfig {
  /**
   * SVG element tag name
   */
  tag: 'svg';
  
  /**
   * SVG root attributes
   */
  attrs: SvgAttributes;
  
  /**
   * Child elements (paths) of the SVG
   */
  children: SvgPathElement[];
}

/**
 * SVG element attributes
 */
interface SvgAttributes {
  /**
   * SVG viewBox defining the coordinate system
   */
  viewBox: string;
  
  /**
   * Whether the element can receive focus
   */
  focusable: 'true' | 'false';
}

/**
 * SVG path element definition
 */
interface SvgPathElement {
  /**
   * Path element tag name
   */
  tag: 'path';
  
  /**
   * Path element attributes
   */
  attrs: PathAttributes;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /**
   * SVG path data defining the shape
   */
  d: string;
  
  /**
   * Fill color for the path
   */
  fill: string;
}

/**
 * Layout icon definition with two-tone theme
 * Represents a dashboard or grid layout visualization
 */
declare const layoutTwoToneIcon: IconDefinition;

export default layoutTwoToneIcon;