/**
 * Icon definition for the 'up-square' icon with two-tone theme
 */
export interface IconNode {
  /** SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: Record<string, string>;
  /** Child SVG elements */
  children?: IconNode[];
}

/**
 * Icon configuration interface
 */
export interface IconDefinition {
  /**
   * Generate SVG icon structure
   * @param primaryColor - Primary color for the icon (outer path)
   * @param secondaryColor - Secondary color for the icon (inner path)
   * @returns SVG icon node structure
   */
  icon: (primaryColor: string, secondaryColor: string) => IconNode;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * Up-square icon with two-tone theme
 * Displays an upward-pointing arrow within a square border
 */
declare const upSquareIcon: IconDefinition;

export default upSquareIcon;