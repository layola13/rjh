/**
 * Copyright icon definition for Ant Design icon library (Two-tone theme)
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Controls whether the element can receive focus */
  focusable?: string;
  /** Fill color for the path element */
  fill?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * Represents a single SVG element node
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Child elements (optional) */
  children?: SvgNode[];
}

/**
 * Icon rendering function return type
 */
interface IconDefinition {
  /** Root SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child SVG elements */
  children: SvgNode[];
}

/**
 * Icon configuration object
 */
interface AntDesignIconConfig {
  /**
   * Generates the SVG icon structure with customizable colors
   * @param primaryColor - Primary color for outer circle and copyright symbol outline
   * @param secondaryColor - Secondary color for inner circle background and symbol fill
   * @returns SVG structure representing the copyright icon
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme variant (filled, outlined, twotone) */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Two-tone copyright icon configuration
 * Displays a copyright symbol (©) inside a circle with dual-color support
 */
declare const copyrightIcon: AntDesignIconConfig;

export default copyrightIcon;