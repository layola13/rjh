/**
 * Security scan icon component configuration for Ant Design icon system.
 * Represents a security scanning symbol with a shield and magnifying glass design.
 */

/**
 * Color configuration for the icon's visual elements
 */
interface IconColors {
  /** Primary color for the main icon elements (shield outline and magnifying glass) */
  primaryColor: string;
  /** Secondary color for filled areas (shield interior and lens) */
  secondaryColor: string;
}

/**
 * SVG path element attributes
 */
interface PathAttrs {
  /** SVG path data defining the shape */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG path element structure
 */
interface PathElement {
  /** Element type identifier */
  tag: 'path';
  /** Path attributes including draw commands and fill color */
  attrs: PathAttrs;
}

/**
 * Root SVG element attributes
 */
interface SvgAttrs {
  /** SVG viewBox defining the coordinate system and aspect ratio */
  viewBox: string;
  /** Controls whether the SVG can receive focus */
  focusable: string;
}

/**
 * SVG element structure containing the complete icon markup
 */
interface SvgElement {
  /** Element type identifier */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child path elements that compose the icon */
  children: PathElement[];
}

/**
 * Icon definition object returned by the icon function
 */
interface IconDefinition {
  /** SVG element structure */
  tag: 'svg';
  /** SVG attributes */
  attrs: SvgAttrs;
  /** Array of path elements */
  children: PathElement[];
}

/**
 * Security scan icon configuration object
 */
interface SecurityScanIcon {
  /**
   * Generates the SVG icon structure with specified colors.
   * 
   * @param primaryColor - Color for primary elements (shield outline, magnifying glass handle)
   * @param secondaryColor - Color for secondary elements (shield fill, magnifying glass lens)
   * @returns SVG element definition with configured colors
   */
  icon(primaryColor: string, secondaryColor: string): IconDefinition;
  
  /** Icon identifier name */
  name: 'security-scan';
  
  /** Icon theme variant (twotone uses two colors) */
  theme: 'twotone';
}

/**
 * Security scan icon export.
 * A twotone icon depicting a shield with a magnifying glass, symbolizing security scanning.
 */
declare const securityScanIcon: SecurityScanIcon;

export default securityScanIcon;