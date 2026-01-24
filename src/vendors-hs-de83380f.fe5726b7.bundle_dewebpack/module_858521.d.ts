/**
 * Security Scan Icon Component Definition
 * 
 * This module exports an Ant Design icon configuration object for a security scan icon
 * with a filled theme. The icon represents a security scanning or protection feature.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** The viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** The SVG path data defining the shape */
  d: string;
}

/**
 * SVG child element definition
 */
interface SvgChildElement {
  /** The HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon SVG structure definition
 */
interface IconSvg {
  /** The HTML/SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements of the SVG */
  children: SvgChildElement[];
}

/**
 * Complete icon configuration object
 */
interface IconDefinition {
  /** The SVG icon structure */
  icon: IconSvg;
  /** The icon identifier name */
  name: string;
  /** The icon visual theme style */
  theme: string;
}

/**
 * Security Scan Icon Configuration
 * 
 * A filled-style icon depicting a magnifying glass over a hexagonal shield,
 * representing security scanning or vulnerability detection functionality.
 * 
 * @constant
 */
declare const securityScanIcon: IconDefinition;

export default securityScanIcon;