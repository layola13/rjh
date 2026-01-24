/**
 * SVG icon definition for a "snippets" icon in twotone theme.
 * Represents a document or code snippet with folded corner.
 */
export interface IconDefinition {
  /**
   * Function that generates the SVG icon structure
   * @param primaryColor - Primary fill color for the main icon path
   * @param secondaryColor - Secondary fill color for the accent/highlight path
   * @returns SVG element structure with tag, attributes and children
   */
  icon: (primaryColor: string, secondaryColor: string) => SvgElement;
  
  /**
   * Unique identifier name for this icon
   */
  name: string;
  
  /**
   * Visual theme style of the icon
   */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * SVG element structure
 */
export interface SvgElement {
  /**
   * HTML tag name
   */
  tag: string;
  
  /**
   * Element attributes
   */
  attrs: SvgAttributes;
  
  /**
   * Child elements
   */
  children?: SvgChild[];
}

/**
 * SVG root element attributes
 */
export interface SvgAttributes {
  /**
   * SVG viewBox coordinates and dimensions
   */
  viewBox: string;
  
  /**
   * Whether the element is focusable
   */
  focusable: string;
}

/**
 * SVG path child element
 */
export interface SvgChild {
  /**
   * HTML tag name for child element
   */
  tag: string;
  
  /**
   * Path element attributes
   */
  attrs: PathAttributes;
}

/**
 * SVG path element attributes
 */
export interface PathAttributes {
  /**
   * SVG path data string defining the shape
   */
  d: string;
  
  /**
   * Fill color for the path
   */
  fill: string;
}

declare const snippetsIcon: IconDefinition;

export default snippetsIcon;