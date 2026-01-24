/**
 * Icon configuration interface for SVG-based icons
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** Path data for SVG path element */
  d?: string;
  /** Fill color for the SVG element */
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
  /** Child elements (optional) */
  children?: IconNode[];
}

/**
 * Icon function return type representing the complete SVG structure
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: string;
  /** SVG root attributes */
  attrs: IconAttrs;
  /** Child SVG elements */
  children: IconNode[];
}

/**
 * Icon component configuration
 */
interface IconConfig {
  /**
   * Generates the icon SVG structure
   * @param primaryColor - Primary color for the icon (typically for main paths)
   * @param secondaryColor - Secondary color for the icon (typically for accents/fills)
   * @returns Complete SVG icon definition
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant (e.g., 'outlined', 'filled', 'twotone') */
  theme: string;
}

/**
 * Down circle icon with two-tone theme
 * Represents a downward-pointing chevron inside a circle
 */
declare const downCircleIcon: IconConfig;

export default downCircleIcon;