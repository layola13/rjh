/**
 * Crown icon component configuration for Ant Design Icons
 * Provides a two-tone crown SVG icon with customizable primary and secondary colors
 */

/**
 * Icon configuration object structure
 */
interface IconConfig {
  /** The root SVG element tag */
  tag: string;
  /** SVG element attributes */
  attrs: {
    /** SVG viewBox coordinates */
    viewBox: string;
    /** Whether the SVG is focusable */
    focusable: string;
  };
  /** Child path elements that compose the icon */
  children: IconPath[];
}

/**
 * SVG path element configuration
 */
interface IconPath {
  /** The path element tag name */
  tag: string;
  /** Path element attributes */
  attrs: {
    /** SVG path data string */
    d: string;
    /** Fill color for the path */
    fill: string;
  };
}

/**
 * Icon definition with metadata
 */
interface IconDefinition {
  /**
   * Generates the icon configuration with specified colors
   * @param primaryColor - Primary color for main icon elements
   * @param secondaryColor - Secondary color for background/accent elements
   * @returns Complete icon configuration object
   */
  icon(primaryColor: string, secondaryColor: string): IconConfig;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon visual theme style */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * Crown icon definition for Ant Design Icons library
 * Two-tone theme with customizable primary and secondary colors
 */
declare const CrownTwoTone: IconDefinition;

export default CrownTwoTone;