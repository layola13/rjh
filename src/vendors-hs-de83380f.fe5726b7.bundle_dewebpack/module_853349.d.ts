/**
 * Icon configuration for a check-square icon component
 */
export interface IconNode {
  /** SVG element tag name */
  tag: string;
  /** HTML/SVG attributes */
  attrs: Record<string, string | number | boolean>;
  /** Optional child elements */
  children?: IconNode[];
}

/**
 * Icon function parameters
 */
export interface IconColors {
  /** Primary color for the icon */
  primaryColor: string;
  /** Secondary color for the icon (used in twotone theme) */
  secondaryColor: string;
}

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /**
   * Generates the icon's SVG structure
   * @param primaryColor - Primary fill color for icon paths
   * @param secondaryColor - Secondary fill color for twotone theme
   * @returns SVG node tree representing the icon
   */
  icon(primaryColor: string, secondaryColor: string): IconNode;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme of the icon */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Check-square icon definition with twotone theme
 * Represents a checkbox or selection indicator icon
 */
declare const CheckSquareIcon: IconDefinition;

export default CheckSquareIcon;