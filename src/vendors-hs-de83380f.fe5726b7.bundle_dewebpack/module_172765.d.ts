/**
 * Container icon component configuration for Ant Design icon library.
 * Provides a two-tone themed container/box icon with customizable colors.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** Fill color for the path */
  fill?: string;
  /** SVG path data */
  d?: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
}

/**
 * Icon rendering result structure
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Icon rendering function
   * @param primaryColor - Primary color for main icon elements
   * @param secondaryColor - Secondary color for accent/background elements
   * @returns SVG icon definition object
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme variant */
  theme: string;
}

/**
 * Default export: Container icon configuration
 * A two-tone icon representing a container or document box
 */
declare const containerIcon: IconConfig;

export default containerIcon;