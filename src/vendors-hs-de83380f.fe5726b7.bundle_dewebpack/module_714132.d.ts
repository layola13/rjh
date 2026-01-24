/**
 * Icon configuration object for a build icon with two-tone theme
 */
interface IconConfig {
  /**
   * Generates the SVG icon structure
   * @param primaryColor - Primary fill color for the main icon paths
   * @param secondaryColor - Secondary fill color for accent/highlight paths
   * @returns SVG element configuration object
   */
  icon: (primaryColor: string, secondaryColor: string) => IconSvgElement;
  
  /**
   * The name identifier for this icon
   */
  name: 'build';
  
  /**
   * The theme style of the icon
   */
  theme: 'twotone';
}

/**
 * SVG element structure with tag, attributes, and children
 */
interface IconSvgElement {
  /**
   * The SVG tag name
   */
  tag: 'svg';
  
  /**
   * SVG root attributes
   */
  attrs: {
    /**
     * SVG viewBox dimensions
     */
    viewBox: string;
    
    /**
     * Whether the SVG is focusable
     */
    focusable: string;
  };
  
  /**
   * Child path elements that compose the icon
   */
  children: IconPathElement[];
}

/**
 * SVG path element configuration
 */
interface IconPathElement {
  /**
   * The path tag name
   */
  tag: 'path';
  
  /**
   * Path element attributes
   */
  attrs: {
    /**
     * SVG path data string
     */
    d: string;
    
    /**
     * Fill color for the path
     */
    fill: string;
  };
}

/**
 * Build icon configuration with two-tone theme support
 * Displays a grid/dashboard-like icon commonly used for build or layout operations
 */
declare const iconConfig: IconConfig;

export default iconConfig;