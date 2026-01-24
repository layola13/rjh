/**
 * Icon configuration for the "eye-invisible" (hidden/obscured eye) icon in twotone theme.
 * This icon is typically used to indicate hidden content, password masking, or visibility toggles.
 */
export interface IconDefinition {
  /**
   * Generates the SVG structure for the icon.
   * @param primaryColor - The primary fill color for the main icon paths
   * @param secondaryColor - The secondary fill color for accent/background paths (twotone effect)
   * @returns An object representing the SVG element structure
   */
  icon(primaryColor: string, secondaryColor: string): SVGElement;

  /**
   * The semantic name identifier for this icon.
   */
  name: string;

  /**
   * The visual theme variant of the icon.
   * "twotone" indicates the icon uses two colors for depth effect.
   */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * Represents an SVG element with its tag, attributes, and children.
 */
export interface SVGElement {
  /**
   * The HTML/SVG tag name (e.g., "svg", "path", "circle").
   */
  tag: string;

  /**
   * HTML/SVG attributes as key-value pairs.
   */
  attrs: Record<string, string | number | boolean>;

  /**
   * Optional nested child elements.
   */
  children?: SVGElement[];
}

/**
 * The "eye-invisible" icon definition with twotone styling.
 * Displays an eye symbol with a diagonal slash, indicating hidden or obscured content.
 */
declare const EyeInvisibleIcon: IconDefinition;

export default EyeInvisibleIcon;