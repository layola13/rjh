/**
 * Credit Card Icon (Two-tone theme)
 * Ant Design icon component definition
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
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
  /** Nested child elements (optional) */
  children?: SvgChild[];
}

/**
 * Icon render result structure
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child elements array */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Icon render function
   * @param primaryColor - Primary color for the icon (typically the main fill color)
   * @param secondaryColor - Secondary color for the icon (typically for decorative elements)
   * @returns SVG icon definition object
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme type */
  theme: string;
}

/**
 * Default export: Credit Card icon configuration
 * A two-tone credit card icon from Ant Design icon library
 */
declare const creditCardIcon: IconConfig;

export default creditCardIcon;