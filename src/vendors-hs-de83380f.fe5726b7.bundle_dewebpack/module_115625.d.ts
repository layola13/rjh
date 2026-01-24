/**
 * Icon definition for a two-tone up-circle icon
 * Represents an upward-pointing arrow within a circular boundary
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
  focusable?: string;
  /** SVG path data describing the shape */
  d?: string;
  /** Fill color for the path */
  fill?: string;
}

/**
 * SVG element node structure
 */
interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
  /** Child elements (only present on root svg node) */
  children?: IconNode[];
}

/**
 * Icon render function return type
 */
interface IconDefinition {
  /** Root SVG element configuration */
  tag: "svg";
  /** SVG container attributes */
  attrs: IconAttrs;
  /** Array of SVG path elements defining the icon graphics */
  children: IconNode[];
}

/**
 * Complete icon configuration object
 */
interface UpCircleTwoToneIcon {
  /**
   * Renders the icon with customizable colors
   * @param primaryColor - Primary fill color for the main icon paths
   * @param secondaryColor - Secondary fill color for accent/background paths
   * @returns SVG icon definition object
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: "up-circle";
  
  /** Icon visual style theme */
  theme: "twotone";
}

/**
 * Two-tone up-circle icon definition
 * Displays an upward-pointing chevron/arrow inside a circle with dual color support
 */
declare const upCircleTwoToneIcon: UpCircleTwoToneIcon;

export default upCircleTwoToneIcon;