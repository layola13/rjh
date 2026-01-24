/**
 * Icon definition for a bank icon in TwoTone theme
 */
export interface IconAttrs {
  /** SVG viewBox attribute */
  viewBox?: string;
  /** Whether the SVG is focusable */
  focusable?: string;
  /** SVG path data */
  d?: string;
  /** Fill color */
  fill?: string;
}

/**
 * SVG child element definition
 */
export interface IconChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
}

/**
 * Icon render result structure
 */
export interface IconDefinition {
  /** Root SVG tag */
  tag: string;
  /** SVG element attributes */
  attrs: IconAttrs;
  /** Child elements */
  children: IconChild[];
}

/**
 * Bank icon configuration
 */
export interface BankIconConfig {
  /**
   * Icon render function
   * @param primaryColor - Primary color for the icon outline
   * @param secondaryColor - Secondary color for the icon fill
   * @returns Icon definition object containing SVG structure
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: string;
}

/**
 * Default export: Bank icon in TwoTone theme
 */
declare const bankIcon: BankIconConfig;

export default bankIcon;