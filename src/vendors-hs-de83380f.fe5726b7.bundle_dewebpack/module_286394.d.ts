/**
 * Icon component definition for a tablet icon with two-tone theme
 */
interface IconNode {
  /** SVG tag name */
  tag: string;
  /** HTML/SVG attributes for the element */
  attrs: Record<string, string | number | boolean>;
  /** Child elements (optional) */
  children?: IconNode[];
}

/**
 * Icon definition configuration
 */
interface IconDefinition {
  /**
   * Generates the SVG icon structure
   * @param primaryColor - Primary color for the icon (typically for outlines and primary shapes)
   * @param secondaryColor - Secondary color for the icon (typically for fills in two-tone theme)
   * @returns The root SVG node structure
   */
  icon: (primaryColor: string, secondaryColor: string) => IconNode;
  
  /** The semantic name of the icon */
  name: string;
  
  /** The visual theme style of the icon */
  theme: "filled" | "outlined" | "twotone";
}

/**
 * Tablet icon definition with two-tone theme
 * Represents a tablet device with rounded corners and a circular home button
 */
declare const tabletIcon: IconDefinition;

export default tabletIcon;