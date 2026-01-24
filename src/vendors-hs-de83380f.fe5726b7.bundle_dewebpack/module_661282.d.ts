/**
 * Alert icon component configuration for a two-tone themed SVG icon.
 * Represents an alert/notification bell symbol.
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG is focusable */
  focusable?: string;
  /** SVG path data */
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
  /** Child nodes (only present on root svg element) */
  children?: IconNode[];
}

/**
 * Icon function return type
 */
interface IconResult {
  /** Root SVG element configuration */
  tag: "svg";
  /** SVG root attributes */
  attrs: {
    viewBox: string;
    focusable: string;
  };
  /** Child path elements defining the icon shape */
  children: IconNode[];
}

/**
 * Icon configuration object
 */
interface AlertIconConfig {
  /**
   * Generates the SVG structure for the alert icon
   * @param primaryColor - Primary fill color for the main icon shape
   * @param secondaryColor - Secondary fill color for accent details
   * @returns SVG element configuration object
   */
  icon(primaryColor: string, secondaryColor: string): IconResult;
  
  /** Icon identifier name */
  name: "alert";
  
  /** Visual theme variant */
  theme: "twotone";
}

/**
 * Two-tone alert bell icon configuration
 * Used to display notification or warning indicators
 */
declare const alertIcon: AlertIconConfig;

export default alertIcon;