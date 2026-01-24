/**
 * Dashboard icon component definition for Ant Design icon library.
 * Supports two-tone theme with customizable primary and secondary colors.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinate space */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** Fill color for the path */
  fill?: string;
  /** SVG path data */
  d?: string;
}

/**
 * SVG element structure
 */
interface SvgElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
  /** Child elements (only for svg root) */
  children?: SvgElement[];
}

/**
 * Icon function return type
 */
interface IconDefinition {
  /** Root SVG element */
  tag: 'svg';
  /** SVG root attributes */
  attrs: {
    viewBox: string;
    focusable: string;
  };
  /** Child path elements */
  children: SvgElement[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generates the icon SVG structure
   * @param primaryColor - Primary fill color for main icon parts
   * @param secondaryColor - Secondary fill color for accent parts (two-tone effect)
   * @returns SVG element definition with paths
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: 'dashboard';
  
  /** Visual theme style */
  theme: 'twotone';
}

/**
 * Default export: Dashboard icon configuration
 * Represents a dashboard/speedometer icon with gauge needle
 */
declare const dashboardIcon: IconConfig;

export default dashboardIcon;