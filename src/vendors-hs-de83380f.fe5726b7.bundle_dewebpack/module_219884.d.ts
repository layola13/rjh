/**
 * SVG icon definition for a close-circle icon with two-tone theme.
 * This icon represents a circular button with an 'X' symbol inside.
 */
interface IconDefinition {
  /**
   * Factory function that generates the SVG icon structure.
   * @param primaryColor - The primary color for the icon's main elements (outer circle and 'X' symbol)
   * @param secondaryColor - The secondary color for the icon's background/fill elements
   * @returns SVG virtual DOM structure
   */
  icon: (primaryColor: string, secondaryColor: string) => SvgElement;
  
  /**
   * The unique name identifier for this icon.
   */
  name: string;
  
  /**
   * The visual theme of the icon.
   * 'twotone' indicates the icon uses two colors for depth and visual hierarchy.
   */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * Represents an SVG element in virtual DOM format.
 */
interface SvgElement {
  /**
   * The HTML/SVG tag name.
   */
  tag: 'svg' | 'path' | 'circle' | 'rect' | 'g';
  
  /**
   * Attributes to be applied to the SVG element.
   */
  attrs: SvgAttributes;
  
  /**
   * Child elements of this SVG node.
   */
  children?: SvgElement[];
}

/**
 * Attributes that can be applied to SVG elements.
 */
interface SvgAttributes {
  /**
   * SVG viewBox attribute defining the coordinate system.
   */
  viewBox?: string;
  
  /**
   * Whether the element can receive focus.
   */
  focusable?: 'true' | 'false';
  
  /**
   * SVG path data string.
   */
  d?: string;
  
  /**
   * Fill color for the shape.
   */
  fill?: string;
}

/**
 * Close circle icon definition with two-tone styling.
 * Displays a circular outline with an 'X' symbol in the center.
 */
declare const closeCircleIcon: IconDefinition;

export default closeCircleIcon;