/**
 * Insurance icon component definition for Ant Design icon library (Two-tone theme)
 * @module InsuranceIcon
 */

/**
 * Icon configuration interface defining the structure of an icon
 */
export interface IconDefinition {
  /**
   * Icon name identifier
   */
  name: string;
  
  /**
   * Icon theme variant
   */
  theme: 'filled' | 'outlined' | 'twotone';
  
  /**
   * Function that generates the icon's SVG structure
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for two-tone icons
   * @returns SVG node structure
   */
  icon: (primaryColor: string, secondaryColor: string) => IconNode;
}

/**
 * SVG node structure representing an element in the icon
 */
export interface IconNode {
  /**
   * SVG element tag name
   */
  tag: string;
  
  /**
   * Element attributes (viewBox, focusable, fill, d, etc.)
   */
  attrs: Record<string, string | boolean>;
  
  /**
   * Child nodes (for nested SVG elements)
   */
  children?: IconNode[];
}

/**
 * Insurance icon definition (Two-tone theme)
 * Represents a shield/badge with Chinese character "保" (insurance)
 */
declare const insuranceIcon: IconDefinition;

export default insuranceIcon;