/**
 * Eye icon component definition for Ant Design Icons
 * Supports two-tone theme with customizable primary and secondary colors
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG element node structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs | SvgAttrs;
}

/**
 * Root SVG element attributes
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Icon render result structure
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child SVG elements (paths) */
  children: SvgNode[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generates the icon SVG structure
   * @param primaryColor - Primary color for main icon paths
   * @param secondaryColor - Secondary color for background/shadow paths
   * @returns Complete SVG icon definition
   */
  icon(primaryColor: string, secondaryColor: string): IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * Eye icon (two-tone theme)
 * Represents visibility/preview functionality
 */
declare const eyeIconConfig: IconConfig;

export default eyeIconConfig;