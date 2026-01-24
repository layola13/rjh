/**
 * Thunderbolt icon component definition for two-tone theme
 * @module ThunderboltTwoTone
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinate system */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG element node structure
 */
interface SvgElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes | SvgAttributes;
}

/**
 * Icon function return type
 */
interface IconDefinition {
  /** Root SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child SVG elements (paths) */
  children: SvgElement[];
}

/**
 * Icon configuration interface
 */
interface IconConfig {
  /**
   * Generate SVG icon definition
   * @param primaryColor - Primary color for the icon outline
   * @param secondaryColor - Secondary color for the icon fill
   * @returns Complete SVG structure definition
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: string;
}

/**
 * Thunderbolt two-tone icon configuration
 * Provides a lightning bolt icon with customizable primary and secondary colors
 */
declare const ThunderboltTwoToneIcon: IconConfig;

export default ThunderboltTwoToneIcon;