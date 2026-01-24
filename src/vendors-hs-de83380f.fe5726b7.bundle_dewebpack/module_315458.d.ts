/**
 * Account Book Icon Configuration
 * A two-tone themed SVG icon representing an account book with a calendar-like appearance
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox?: string;
  /** Whether the element is focusable */
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
  attrs: SvgAttrs;
}

/**
 * Icon render function return type
 */
interface IconDefinition {
  /** SVG root tag */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface AccountBookIconConfig {
  /**
   * Generates the SVG icon structure
   * @param primaryColor - Primary color for the icon (used for main shapes)
   * @param secondaryColor - Secondary color for the icon (used for highlights/details)
   * @returns SVG icon definition object
   */
  icon(primaryColor: string, secondaryColor: string): IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme variant */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * Default export: Account Book icon configuration
 * Provides a two-tone calendar/account book icon with customizable colors
 */
declare const accountBookIcon: AccountBookIconConfig;

export default accountBookIcon;