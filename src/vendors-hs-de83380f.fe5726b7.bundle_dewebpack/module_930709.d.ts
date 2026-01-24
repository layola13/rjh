/**
 * Icon definition for Reconciliation (Two-tone theme)
 * 
 * This module exports an icon configuration object used for rendering
 * a reconciliation/accounting SVG icon with two-tone coloring.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** SVG path data string */
  d?: string;
  /** Fill color for the path */
  fill?: string;
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
 * Icon structure returned by the icon function
 */
interface IconDefinition {
  /** Root SVG tag name */
  tag: string;
  /** Root SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) that make up the icon */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /**
   * Generate the icon definition with specified colors
   * @param primaryColor - Primary color for main icon elements
   * @param secondaryColor - Secondary color for accent elements (two-tone effect)
   * @returns Complete SVG icon definition
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme of the icon */
  theme: string;
}

/**
 * Reconciliation icon configuration (two-tone theme)
 * 
 * Represents an accounting/reconciliation icon with customizable colors.
 * The icon depicts a document or ledger with numerical elements.
 */
declare const reconciliationIcon: IconConfig;

export default reconciliationIcon;