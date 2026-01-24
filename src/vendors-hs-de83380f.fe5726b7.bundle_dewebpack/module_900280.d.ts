/**
 * Phone icon component definition for Ant Design icon library
 * @module PhoneIcon
 */

/**
 * Icon attributes interface
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the icon can receive focus */
  focusable?: string;
  /** Fill color for the path */
  fill?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * Icon child element structure
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
}

/**
 * Icon rendering structure
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: string;
  /** SVG root attributes */
  attrs: IconAttrs;
  /** Child elements (paths, groups, etc.) */
  children: IconChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generate icon SVG structure
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for the icon (used in twotone theme)
   * @returns Icon definition object with SVG structure
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant (filled, outlined, twotone) */
  theme: string;
}

/**
 * Phone icon in twotone theme
 * Represents a traditional telephone handset
 */
declare const phoneIcon: IconConfig;

export default phoneIcon;