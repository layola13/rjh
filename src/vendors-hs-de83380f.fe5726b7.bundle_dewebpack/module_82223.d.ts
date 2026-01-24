/**
 * Ant Design Icon: Experiment (Two-tone theme)
 * 
 * A two-tone experiment/science icon component configuration for Ant Design icon library.
 * This defines the SVG structure, paths, and metadata for rendering the experiment icon.
 */

/**
 * Icon render function parameters
 */
export interface IconRenderParams {
  /**
   * Primary color for the icon (typically for main/outline paths)
   */
  primaryColor: string;
  
  /**
   * Secondary color for the icon (typically for fill/background paths)
   */
  secondaryColor: string;
}

/**
 * SVG path attributes
 */
export interface PathAttrs {
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
 * SVG path element definition
 */
export interface PathElement {
  /**
   * HTML tag name
   */
  tag: 'path';
  
  /**
   * Path element attributes
   */
  attrs: PathAttrs;
}

/**
 * Root SVG element attributes
 */
export interface SvgAttrs {
  /**
   * SVG viewBox defining the coordinate system
   */
  viewBox: string;
  
  /**
   * Whether the SVG is focusable (accessibility)
   */
  focusable: string;
}

/**
 * SVG element definition
 */
export interface SvgElement {
  /**
   * HTML tag name
   */
  tag: 'svg';
  
  /**
   * SVG root element attributes
   */
  attrs: SvgAttrs;
  
  /**
   * Child path elements that make up the icon
   */
  children: PathElement[];
}

/**
 * Icon definition object
 */
export interface IconDefinition {
  /**
   * Function that generates the SVG icon structure
   * 
   * @param primaryColor - Primary color for the icon outline/main paths
   * @param secondaryColor - Secondary color for the icon fill/background paths
   * @returns SVG element structure defining the icon
   */
  icon: (primaryColor: string, secondaryColor: string) => SvgElement;
  
  /**
   * Icon identifier name
   */
  name: 'experiment';
  
  /**
   * Icon theme variant
   */
  theme: 'twotone';
}

/**
 * Experiment icon definition (two-tone theme)
 * 
 * Represents a laboratory experiment flask/beaker icon commonly used
 * in scientific or testing contexts within the Ant Design system.
 */
declare const experimentTwoTone: IconDefinition;

export default experimentTwoTone;