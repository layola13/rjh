/**
 * Environment icon component configuration for Ant Design Icons
 * @module EnvironmentTwoTone
 */

/**
 * SVG attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon render result structure
 */
interface IconDefinition {
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Array of child path elements */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Renders the icon SVG structure
   * @param primaryColor - Primary color for the icon (typically the main fill color)
   * @param secondaryColor - Secondary color for the icon (typically used for background/accent)
   * @returns SVG icon definition object
   */
  icon(primaryColor: string, secondaryColor: string): IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: string;
}

/**
 * Environment (location pin) icon in two-tone theme
 * Displays a map marker/location pin with a circle in the center
 */
declare const environmentTwoTone: IconConfig;

export default environmentTwoTone;