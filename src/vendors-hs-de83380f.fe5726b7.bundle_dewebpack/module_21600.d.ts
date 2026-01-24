/**
 * Icon definition for a tool icon component
 * @module ToolIcon
 */

/**
 * Icon configuration object with rendering properties
 */
interface IconDefinition {
  /**
   * Icon component generator function
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for the icon
   * @returns SVG icon structure
   */
  icon: (primaryColor: string, secondaryColor: string) => IconSvgStructure;
  
  /**
   * Unique identifier for the icon
   */
  name: string;
  
  /**
   * Visual theme variant (e.g., 'twotone', 'filled', 'outlined')
   */
  theme: string;
}

/**
 * SVG element structure for icon rendering
 */
interface IconSvgStructure {
  /**
   * SVG element tag name
   */
  tag: 'svg';
  
  /**
   * SVG root element attributes
   */
  attrs: {
    /**
     * SVG viewBox defining the coordinate system
     */
    viewBox: string;
    
    /**
     * Whether the SVG element can receive keyboard focus
     */
    focusable: string;
  };
  
  /**
   * Child SVG path elements
   */
  children: IconPathElement[];
}

/**
 * SVG path element configuration
 */
interface IconPathElement {
  /**
   * SVG element tag name
   */
  tag: 'path';
  
  /**
   * Path element attributes
   */
  attrs: {
    /**
     * SVG path data defining the shape
     */
    d: string;
    
    /**
     * Fill color for the path
     */
    fill: string;
  };
}

/**
 * Tool icon definition with two-tone theme
 * Represents a wrench/tool symbol commonly used in UI applications
 */
declare const toolIcon: IconDefinition;

export default toolIcon;