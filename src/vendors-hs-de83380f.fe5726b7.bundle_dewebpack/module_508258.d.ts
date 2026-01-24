/**
 * Icon definition for a fire/flame icon in Ant Design icon system.
 * Provides a two-tone themed SVG icon with customizable colors.
 */
interface IconDefinition {
  /**
   * Icon renderer function that generates the SVG structure
   * @param primaryColor - Primary color for the main icon path
   * @param secondaryColor - Secondary color for the accent/background path
   * @returns SVG element definition with attributes and children paths
   */
  icon: (primaryColor: string, secondaryColor: string) => IconSVG;
  
  /**
   * Icon identifier name
   */
  name: string;
  
  /**
   * Icon theme variant (e.g., 'filled', 'outlined', 'twotone')
   */
  theme: string;
}

/**
 * SVG element structure definition
 */
interface IconSVG {
  /**
   * HTML tag name for the SVG element
   */
  tag: 'svg';
  
  /**
   * SVG root element attributes
   */
  attrs: SVGRootAttributes;
  
  /**
   * Child path elements that form the icon shape
   */
  children: IconPath[];
}

/**
 * Attributes for the root SVG element
 */
interface SVGRootAttributes {
  /**
   * SVG viewBox defining the coordinate system and aspect ratio
   */
  viewBox: string;
  
  /**
   * Whether the SVG element can receive focus
   */
  focusable: 'false' | 'true';
}

/**
 * Path element definition for SVG shapes
 */
interface IconPath {
  /**
   * HTML tag name for the path element
   */
  tag: 'path';
  
  /**
   * Path element attributes including shape data and styling
   */
  attrs: PathAttributes;
}

/**
 * Attributes for SVG path elements
 */
interface PathAttributes {
  /**
   * SVG path data string defining the shape
   */
  d: string;
  
  /**
   * Fill color for the path
   */
  fill: string;
}

/**
 * Fire icon definition with two-tone theme.
 * Exports a complete icon configuration for use in icon libraries.
 */
declare const fireIcon: IconDefinition;

export default fireIcon;