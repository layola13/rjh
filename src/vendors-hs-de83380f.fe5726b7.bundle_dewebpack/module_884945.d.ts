/**
 * GitLab icon definition for Ant Design Icons
 * 
 * This module exports the configuration for the GitLab filled icon,
 * including SVG path data and metadata.
 */

/**
 * SVG element attributes interface
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element configuration
 */
interface SVGChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon SVG structure configuration
 */
interface IconSVGConfig {
  /** SVG root tag */
  tag: string;
  /** SVG root element attributes */
  attrs: SVGAttributes;
  /** Child elements of the SVG */
  children: SVGChildElement[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconSVGConfig;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * GitLab filled icon definition
 * 
 * Represents the GitLab logo as a filled icon with the characteristic
 * geometric shape composed of triangular segments.
 */
declare const gitlabFilledIcon: IconDefinition;

export default gitlabFilledIcon;