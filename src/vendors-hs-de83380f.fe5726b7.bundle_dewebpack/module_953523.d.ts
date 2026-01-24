/**
 * Icon configuration for a control/settings icon in twotone theme
 */
export interface IconFunction {
  /**
   * Generates the icon's SVG structure with customizable colors
   * @param primaryColor - The primary fill color for main elements
   * @param secondaryColor - The secondary fill color for accent elements
   * @returns SVG node configuration object
   */
  icon(primaryColor: string, secondaryColor: string): IconNode;
}

/**
 * Represents an SVG node with tag, attributes, and optional children
 */
export interface IconNode {
  /** The SVG element tag name */
  tag: string;
  /** Element attributes */
  attrs: Record<string, string | number | boolean>;
  /** Child SVG nodes */
  children?: IconNode[];
}

/**
 * Complete icon configuration object
 */
export interface IconConfig {
  /** Function to generate the icon SVG structure */
  icon: (primaryColor: string, secondaryColor: string) => IconNode;
  /** Icon identifier name */
  name: string;
  /** Visual theme style */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * Twotone control/settings icon configuration
 * Features adjustment sliders in a bordered square frame
 */
declare const iconConfig: IconConfig;

export default iconConfig;