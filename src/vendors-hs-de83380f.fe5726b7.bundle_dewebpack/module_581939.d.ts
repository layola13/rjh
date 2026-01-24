/**
 * Icon configuration interface for SVG icons
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
  /** Fill color for the path element */
  fill?: string;
  /** Path data for SVG path element */
  d?: string;
}

/**
 * SVG element node structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
  /** Child nodes (optional, only for container elements) */
  children?: SvgNode[];
}

/**
 * Icon function return type representing complete SVG structure
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: string;
  /** SVG element attributes */
  attrs: IconAttrs;
  /** Child path elements */
  children: SvgNode[];
}

/**
 * Mail icon configuration object with two-tone theme support
 */
interface MailIconConfig {
  /**
   * Generates the SVG icon structure
   * @param primaryColor - Primary fill color for the main icon path
   * @param secondaryColor - Secondary fill color for accent/highlight paths (two-tone effect)
   * @returns Complete SVG icon definition with all paths and attributes
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme variant of the icon */
  theme: string;
}

/**
 * Two-tone mail/envelope icon with primary and secondary colors
 * Displays an envelope with decorative two-tone styling
 */
declare const mailIcon: MailIconConfig;

export default mailIcon;