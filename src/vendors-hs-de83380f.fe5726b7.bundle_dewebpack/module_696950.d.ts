/**
 * Icon descriptor for a two-tone unlock icon
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
  focusable?: string;
  /** SVG path data string */
  d?: string;
  /** Fill color for the path */
  fill?: string;
}

/**
 * Represents a single SVG element (path, circle, etc.)
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
}

/**
 * SVG icon structure
 */
interface IconDefinition {
  /** Root SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: IconChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generates the SVG icon structure
   * @param primaryColor - Primary color for the icon foreground elements
   * @param secondaryColor - Secondary color for the icon background/accent elements
   * @returns SVG icon definition object
   */
  icon(primaryColor: string, secondaryColor: string): IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual style theme of the icon */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * Two-tone unlock icon component
 * Displays a padlock in unlocked state with customizable colors
 */
declare const unlockIcon: IconConfig;

export default unlockIcon;