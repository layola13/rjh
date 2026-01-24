/**
 * Two-tone API icon configuration for Ant Design icon system.
 * Provides SVG path data and attributes for rendering an API/plugin icon.
 */
export interface IconDefinition {
  /**
   * Generates the SVG icon structure with customizable colors.
   * @param primaryColor - The primary fill color for the main icon paths
   * @param secondaryColor - The secondary fill color for background/accent paths
   * @returns SVG node configuration object
   */
  icon: (primaryColor: string, secondaryColor: string) => SvgNode;
  
  /**
   * The semantic name of the icon
   */
  name: string;
  
  /**
   * The visual theme variant of the icon
   */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Represents an SVG element node with tag name, attributes, and children.
 */
export interface SvgNode {
  /**
   * The SVG element tag name (e.g., 'svg', 'path', 'circle')
   */
  tag: string;
  
  /**
   * HTML/SVG attributes for the element
   */
  attrs: Record<string, string | boolean>;
  
  /**
   * Child SVG nodes (optional)
   */
  children?: SvgNode[];
}

/**
 * API icon definition with two-tone theme.
 * Displays a wrench/tools icon commonly used to represent API, settings, or plugin functionality.
 */
declare const apiIcon: IconDefinition;

export default apiIcon;